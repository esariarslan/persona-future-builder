
import { useState } from 'react';
import { useChildren } from '../useChildren';
import { useToast } from '../use-toast';
import { Activity } from './types';
import { getChildObservations, generateSampleActivities } from './api';

export const useLearningPathBasic = (childId?: string) => {
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
      const childObservations = await getChildObservations(targetChildId);
      
      const childProfile = children.find(child => child.id === targetChildId);
      
      // Here we would integrate with a web voyager or external API to get real-time activities
      // For now, we'll use our sample activities generator
      
      const newActivities = await generateSampleActivities();
      
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
    generateLearningPath,
  };
};
