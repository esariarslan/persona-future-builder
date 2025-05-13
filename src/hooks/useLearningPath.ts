
import { useState } from 'react';
import { useChildren } from './useChildren';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface Activity {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  completed: boolean;
  skillArea: string;
  memo?: string;
  location?: string;
  source?: string;
}

export const useLearningPath = (childId?: string) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [advancedActivities, setAdvancedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [advancedLoading, setAdvancedLoading] = useState<boolean>(false);
  const { children } = useChildren();
  const { toast } = useToast();

  // Generate a new learning path
  const generateLearningPath = async (observations?: string) => {
    if (!childId && (!children || children.length === 0)) {
      toast({
        title: "No child profile found",
        description: "Please create a child profile first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Get the child data
      const targetChildId = childId || children[0].id;
      
      // Get existing observations for this child
      const { data: childObservations, error: obsError } = await supabase
        .from('observations')
        .select('content, created_at')
        .eq('child_id', targetChildId)
        .order('created_at', { ascending: false });
        
      if (obsError) throw obsError;
      
      const childProfile = children.find(child => child.id === targetChildId);
      
      // Here we would integrate with a web voyager or external API to get real-time activities
      // For now, we'll simulate this with a delay
      
      // In a production app, you would send the child profile data and observations 
      // to your backend where the web voyager agent would run to find real-time activities
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sample activities - in production, these would come from the web voyager
      const newActivities: Activity[] = [
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
      
      setActivities(newActivities);
      
      toast({
        title: "Learning path generated",
        description: "New activities have been added based on the child's profile"
      });
      
    } catch (error: any) {
      toast({
        title: "Error generating learning path",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate advanced learning path using Gemini
  const generateAdvancedLearningPath = async () => {
    if (!childId && (!children || children.length === 0)) {
      toast({
        title: "No child profile found",
        description: "Please create a child profile first",
        variant: "destructive"
      });
      return;
    }

    setAdvancedLoading(true);

    try {
      // Get the child data
      const targetChildId = childId || children[0].id;
      
      // Get existing observations for this child
      const { data: childObservations, error: obsError } = await supabase
        .from('observations')
        .select('content, created_at')
        .eq('child_id', targetChildId)
        .order('created_at', { ascending: false });
        
      if (obsError) throw obsError;
      
      const childProfile = children.find(child => child.id === targetChildId);
      
      // Call the Supabase Edge Function to generate learning path with Gemini
      // Use direct URL and key references instead of accessing protected properties
      const supabaseUrl = "https://ukyuiphvvolxhdkaptrz.supabase.co";
      const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXVpcGh2dm9seGhka2FwdHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNzUxOTgsImV4cCI6MjA2MTg1MTE5OH0.BTE3Nc2jqaUbKqChWtvy-fqW0aQsK3AftR5H4y4iBzY";
      
      const response = await fetch(`${supabaseUrl}/functions/v1/generate-learning-path`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          childId: targetChildId,
          observations: childObservations || [],
          interests: childProfile?.interests || [],
          documentContent: null  // We can add document content processing later
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate advanced learning path');
      }
      
      const data = await response.json();
      
      if (!data.activities || !Array.isArray(data.activities)) {
        throw new Error('Invalid response from AI service');
      }
      
      // Transform the Gemini activities to match our Activity interface
      const newActivities: Activity[] = data.activities.map((activity: any, index: number) => ({
        id: Date.now() + index,
        title: activity.title,
        type: activity.type,
        description: activity.description,
        date: activity.date,
        completed: false,
        skillArea: activity.skillArea,
        location: activity.location,
        source: activity.source || "Parentville Geneva"
      }));
      
      setAdvancedActivities(newActivities);
      
      toast({
        title: "Advanced learning path generated",
        description: "New Geneva-specific activities have been created for your child"
      });
      
    } catch (error: any) {
      console.error('Error generating advanced learning path:', error);
      toast({
        title: "Error generating advanced learning path",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setAdvancedLoading(false);
    }
  };

  // Update activity completion status
  const updateActivityStatus = (activityId: number, completed: boolean, memo?: string) => {
    // Update regular activities
    setActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed, memo: memo || activity.memo }
          : activity
      )
    );
    
    // Update advanced activities
    setAdvancedActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed, memo: memo || activity.memo }
          : activity
      )
    );
  };

  return {
    activities,
    advancedActivities,
    loading,
    advancedLoading,
    generateLearningPath,
    generateAdvancedLearningPath,
    updateActivityStatus
  };
};
