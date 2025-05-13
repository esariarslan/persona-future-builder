
import { useState } from 'react';
import { useChildren } from '../useChildren';
import { useToast } from '../use-toast';
import { Activity } from './types';
import { getChildObservations, callEdgeFunctionForLearningPath } from './api';

export const useAdvancedLearningPath = (childId?: string) => {
  const [advancedActivities, setAdvancedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { children } = useChildren();
  const { toast } = useToast();

  // Generate advanced learning path using Gemini with Geneva-specific information
  const generateAdvancedLearningPath = async () => {
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
      
      if (!childProfile) {
        throw new Error('Child profile not found');
      }
      
      // Call the edge function to generate learning path with Gemini
      const activities = await callEdgeFunctionForLearningPath(
        targetChildId,
        childObservations,
        childProfile
      );
      
      // Set the advanced activities
      setAdvancedActivities(activities);
      
      toast({
        title: "Geneva-specific learning path generated",
        description: "New activities based on current Geneva events have been created for your child"
      });
      
    } catch (error: any) {
      console.error('Error generating advanced learning path:', error);
      toast({
        title: "Error generating advanced learning path",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    advancedActivities,
    loading,
    generateAdvancedLearningPath,
  };
};
