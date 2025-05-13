
import { supabase } from '@/integrations/supabase/client';
import { Activity, ObservationData, ChildProfile } from './types';

// Get observations for a child
export const getChildObservations = async (childId: string): Promise<ObservationData[]> => {
  const { data, error } = await supabase
    .from('observations')
    .select('content, created_at')
    .eq('child_id', childId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data || [];
};

// Generate sample activities (simulating web voyager data)
export const generateSampleActivities = async (): Promise<Activity[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return [
    {
      id: Date.now(),
      title: "Local Science Workshop",
      type: "Workshop",
      description: "Hands-on experiments designed for elementary school children to explore basic scientific principles.",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      skillArea: "Scientific Thinking",
      location: "Community Center",
      source: "Web Voyager"
    },
    {
      id: Date.now() + 1,
      title: "Children's Art Exhibition",
      type: "Event",
      description: "Interactive art exhibition where children can both view and create art.",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      skillArea: "Creativity",
      location: "Local Art Gallery",
      source: "Web Voyager"
    }
  ];
};

// Call the edge function to generate advanced learning path
export const callEdgeFunctionForLearningPath = async (
  childId: string,
  observations: ObservationData[],
  childProfile: ChildProfile
): Promise<Activity[]> => {
  const supabaseUrl = "https://ukyuiphvvolxhdkaptrz.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXVpcGh2dm9seGhka2FwdHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzUxOTgsImV4cCI6MjA2MTg1MTE5OH0.BTE3Nc2jqaUbKqChWtvy-fqW0aQsK3AftR5H4y4iBzY";
  
  const response = await fetch(`${supabaseUrl}/functions/v1/generate-learning-path`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({
      childId: childId,
      observations: observations || [],
      interests: childProfile?.interests || [],
      documentContent: null
    })
  });
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error);
  }
  
  if (!data.activities || !Array.isArray(data.activities)) {
    throw new Error('Invalid response from AI service');
  }
  
  return data.activities;
};
