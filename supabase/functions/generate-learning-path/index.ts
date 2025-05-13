
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// Access the Gemini API key
const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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
    
    // Base prompt for generating learning paths
    let promptContent = `Generate a personalized learning path for a child with the following information:`;
    
    // Add interests if available
    if (interests && interests.length > 0) {
      promptContent += `\n\nInterests: ${interests.join(', ')}`;
    }
    
    // Add observations if available
    if (observations && observations.length > 0) {
      promptContent += `\n\nParent/Teacher Observations:`;
      observations.forEach((obs: any) => {
        promptContent += `\n- ${obs.content}`;
      });
    }
    
    // Add processed document content if available
    if (documentContent) {
      promptContent += `\n\nAdditional Information from Documents: ${documentContent}`;
    }
    
    // Instructions for Gemini to generate Geneva-specific activities
    promptContent += `\n\nBased on this information, create a tailored learning path with 3-5 activities that:
    1. Are specifically located in Geneva, Switzerland
    2. Include actual local resources, especially from https://www.parentville.ch/
    3. Match the child's interests and developmental needs
    4. Provide specific details for each activity including:
       - Activity title
       - Activity type (Workshop, Event, Course, etc.)
       - Description (60-80 words)
       - Location (specific Geneva venue)
       - Date (within the next 4 weeks)
       - Skill area being developed
       - Source (where this activity was found)
    
    Format the response as a JSON array with the following structure for each activity:
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
    ]`;
    
    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`, {
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
          maxOutputTokens: 2048
        }
      })
    });

    const geminiResponse = await response.json();
    
    // Extract the generated text from Gemini response
    let activities = [];
    try {
      // Check if the response has the expected structure
      if (geminiResponse.candidates && 
          geminiResponse.candidates[0] && 
          geminiResponse.candidates[0].content && 
          geminiResponse.candidates[0].content.parts && 
          geminiResponse.candidates[0].content.parts[0]) {
        
        const generatedText = geminiResponse.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response text
        // The response might include markdown formatting, so we need to extract just the JSON part
        const jsonMatch = generatedText.match(/\[\s*\{.*\}\s*\]/s);
        if (jsonMatch) {
          activities = JSON.parse(jsonMatch[0]);
        } else {
          // If we can't find a JSON array, try to parse the entire text as JSON
          try {
            activities = JSON.parse(generatedText);
          } catch (e) {
            console.error("Failed to parse activities from Gemini response");
            // Return a descriptive error about the parsing issue
            return new Response(
              JSON.stringify({ 
                error: "Failed to parse activities from AI response", 
                rawResponse: generatedText 
              }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
        }
      }
    } catch (error) {
      console.error("Error extracting activities from Gemini response:", error);
      return new Response(
        JSON.stringify({ 
          error: "Error processing AI response", 
          details: error.message,
          rawResponse: geminiResponse
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If we have valid activities, return them
    if (Array.isArray(activities) && activities.length > 0) {
      return new Response(
        JSON.stringify({ 
          activities: activities,
          message: "Successfully generated learning path"
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // If we couldn't get valid activities, return an error
      return new Response(
        JSON.stringify({ 
          error: "Failed to generate valid activities", 
          rawResponse: geminiResponse
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
