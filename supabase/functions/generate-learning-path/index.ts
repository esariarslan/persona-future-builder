import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Access the Gemini API key directly from Deno.env
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

// Log the API key status (not the actual key) for debugging
console.log(`Gemini API key status: ${geminiApiKey ? 'configured' : 'not configured'}`);

// CORS headers for the response
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { childId, observations, interests, documentContent } = await req.json();

    if (!childId) {
      return new Response(
        JSON.stringify({ error: "Child ID is required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Better error handling for missing API key
    if (!geminiApiKey) {
      console.error("Gemini API key is not configured in environment variables");
      return new Response(
        JSON.stringify({ 
          error: "Gemini API key is not configured", 
          details: "Please add the GEMINI_API_KEY to your Supabase secrets" 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Base prompt for generating learning paths
    let promptContent = `Generate a personalized learning path for a child with the following information:`;
    
    // Add interests if available
    if (interests && interests.length > 0) {
      promptContent += `\n\nInterests: ${interests.join(', ')}`;
    } else {
      // Add sample interests if none provided
      promptContent += `\n\nInterests: sports, science, art`;
    }
    
    // Add observations if available
    if (observations && observations.length > 0) {
      promptContent += `\n\nParent/Teacher Observations:`;
      observations.forEach((obs) => {
        promptContent += `\n- ${obs.content || "Child shows curiosity in learning new things"}`;
      });
    } else {
      // Add a default observation if none provided
      promptContent += `\n\nParent/Teacher Observations:\n- Child shows curiosity in learning new things`;
    }
    
    // Add processed document content if available
    if (documentContent) {
      promptContent += `\n\nAdditional Information from Documents: ${documentContent}`;
    }
    
    // Updated instructions for Gemini to generate Geneva-specific activities with more specific format guidance
    promptContent += `\n\nBased on this information, create a tailored learning path with 3 activities that:
    1. Are specifically located in Geneva, Switzerland
    2. Include actual local resources that would be appropriate for children
    3. Match the child's interests and developmental needs
    4. Provide specific details for each activity including:
       - Activity title
       - Activity type (Workshop, Event, Course, etc.)
       - Description (30-50 words)
       - Location (specific Geneva venue)
       - Date (within the next 4 weeks)
       - Skill area being developed
       - Source (where this activity was found)
    
    Format the response as a JSON array with the following structure:
    [
      {
        "title": "Activity name",
        "type": "Activity type",
        "description": "Activity description",
        "date": "YYYY-MM-DD",
        "location": "Specific Geneva location",
        "skillArea": "Main skill developed",
        "source": "Website or source name"
      }
    ]
    
    Return ONLY the JSON array with no additional text or explanation.`;

    console.log("Sending prompt to Gemini with model gemini-1.5-flash");
    
    try {
      // Call Gemini API with improved error handling
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: promptContent
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 1,
            topK: 32
          }
        })
      });

      // Handle non-200 responses better
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", response.status, errorText);
        
        // Create a friendly error message with more details
        let errorMessage = `Gemini API error: ${response.status}`;
        if (response.status === 400) {
          errorMessage = "Invalid request to Gemini API. The prompt may be too complex or contain invalid parameters.";
        } else if (response.status === 401 || response.status === 403) {
          errorMessage = "Authentication error with Gemini API. Please verify your API key.";
        } else if (response.status === 429) {
          errorMessage = "Gemini API quota exceeded. Please try again later.";
        } else if (response.status >= 500) {
          errorMessage = "Gemini API service error. Please try again later.";
        }
        
        return new Response(
          JSON.stringify({ 
            error: errorMessage, 
            details: errorText 
          }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const geminiResponse = await response.json();
      console.log("Received response from Gemini");
      
      // Generate fallback activities in case parsing fails
      const fallbackActivities = [
        {
          title: "Science Workshop at Geneva Natural History Museum",
          type: "Workshop",
          description: "Interactive science experiments designed for children to learn about biodiversity and ecosystems.",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          location: "Geneva Natural History Museum",
          skillArea: "Scientific Thinking",
          source: "Geneva Activities"
        },
        {
          title: "Children's Art Exhibition",
          type: "Event",
          description: "Interactive art exhibition where children can view and create their own art pieces.",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          location: "Geneva Contemporary Art Center",
          skillArea: "Creativity",
          source: "Geneva Arts Council"
        },
        {
          title: "Junior Sports Day",
          type: "Event",
          description: "A fun day of various sports activities for children of all ages and abilities.",
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          location: "Geneva Sports Complex",
          skillArea: "Physical Development",
          source: "Geneva Sports Association"
        }
      ];

      // Extract the generated text from Gemini response with better error handling
      let activities = [];
      
      // Check if the response has the expected structure
      if (geminiResponse.candidates && 
          geminiResponse.candidates[0] && 
          geminiResponse.candidates[0].content && 
          geminiResponse.candidates[0].content.parts && 
          geminiResponse.candidates[0].content.parts[0]) {
        
        const generatedText = geminiResponse.candidates[0].content.parts[0].text;
        console.log("Generated text received");
        
        // Try multiple parsing approaches with better error handling
        try {
          // First approach: Extract JSON array from the response using regex
          const jsonMatch = generatedText.match(/\[\s*\{.*\}\s*\]/s);
          if (jsonMatch) {
            activities = JSON.parse(jsonMatch[0]);
            console.log("Successfully parsed activities from JSON match");
          }
          // Second approach: Try to parse the entire text as JSON
          else if (generatedText.trim().startsWith('[') && generatedText.trim().endsWith(']')) {
            activities = JSON.parse(generatedText);
            console.log("Successfully parsed activities from full text");
          }
          // Third approach: Look for JSON within markdown code blocks
          else {
            const codeBlockMatch = generatedText.match(/```(?:json)?\s*([\s\S]*?)```/);
            if (codeBlockMatch && codeBlockMatch[1]) {
              const jsonContent = codeBlockMatch[1].trim();
              activities = JSON.parse(jsonContent);
              console.log("Successfully parsed activities from code block");
            }
          }
          
          // If no activities were parsed, use fallback
          if (!activities || activities.length === 0) {
            console.log("Could not parse activities, using fallback");
            activities = fallbackActivities;
          }
        } catch (parseError) {
          console.error("Failed to parse activities:", parseError, "Using fallback activities");
          activities = fallbackActivities;
        }
      } else {
        console.error("Unexpected Gemini response structure, using fallback activities");
        activities = fallbackActivities;
      }

      // Ensure we have valid activities with all required fields
      activities = activities.map((activity, index) => {
        // Generate a valid date if missing or invalid
        let date = activity.date;
        if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
          date = new Date(Date.now() + (7 + index * 3) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        }
        
        return {
          id: Date.now() + index,
          title: activity.title || `Activity ${index + 1}`,
          type: activity.type || "Workshop",
          description: activity.description || "A fun and educational activity for children.",
          date: date,
          completed: false,
          skillArea: activity.skillArea || "General Development",
          location: activity.location || "Geneva, Switzerland",
          source: activity.source || "Geneva Activities"
        };
      });

      // Return the activities with success message
      return new Response(
        JSON.stringify({ 
          activities: activities,
          message: "Successfully generated learning path"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      console.error("Error calling Gemini API:", apiError);
      
      // Return fallback activities instead of error
      const fallbackActivities = [
        {
          id: Date.now(),
          title: "Science Workshop at Geneva Natural History Museum",
          type: "Workshop",
          description: "Interactive science experiments designed for children to learn about biodiversity and ecosystems.",
          date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: false,
          skillArea: "Scientific Thinking",
          location: "Geneva Natural History Museum",
          source: "Geneva Activities"
        },
        {
          id: Date.now() + 1,
          title: "Children's Art Exhibition",
          type: "Event",
          description: "Interactive art exhibition where children can view and create their own art pieces.",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: false,
          skillArea: "Creativity",
          location: "Geneva Contemporary Art Center",
          source: "Geneva Arts Council"
        },
        {
          id: Date.now() + 2,
          title: "Junior Sports Day",
          type: "Event",
          description: "A fun day of various sports activities for children of all ages and abilities.",
          date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          completed: false,
          skillArea: "Physical Development",
          location: "Geneva Sports Complex",
          source: "Geneva Sports Association"
        }
      ];
      
      return new Response(
        JSON.stringify({ 
          activities: fallbackActivities,
          message: "Using fallback activities due to API error",
          details: apiError.message 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Error in generate-learning-path function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
