
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
  const [loading, setLoading] = useState<boolean>(false);
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

  return {
    activities,
    loading,
    generateLearningPath
  };
};
