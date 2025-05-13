
import { useState, useEffect } from 'react';
import { useChildren } from '../useChildren';
import { useToast } from '../use-toast';
import { Activity } from './types';
import { getChildObservations, callEdgeFunctionForLearningPath } from './api';

export const useAdvancedLearningPath = (childId?: string) => {
  const [advancedActivities, setAdvancedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { children } = useChildren();
  const { toast } = useToast();

  // Load saved activities from localStorage on initial mount - specific to this child
  useEffect(() => {
    if (childId) {
      const storageKey = `adv-learning-path-${childId}`;
      console.log(`Loading advanced activities from ${storageKey}`);
      
      const savedActivities = localStorage.getItem(storageKey);
      if (savedActivities) {
        try {
          const parsedActivities = JSON.parse(savedActivities);
          if (Array.isArray(parsedActivities) && parsedActivities.length > 0) {
            console.log(`Found ${parsedActivities.length} saved advanced activities for child ${childId}`);
            setAdvancedActivities(parsedActivities);
          }
        } catch (e) {
          console.error(`Error parsing saved advanced activities for child ${childId}:`, e);
        }
      }
    }
  }, [childId]);

  // Save activities to localStorage whenever they change - specific to this child
  useEffect(() => {
    if (childId && advancedActivities.length > 0) {
      const storageKey = `adv-learning-path-${childId}`;
      console.log(`Saving ${advancedActivities.length} advanced activities to ${storageKey}`);
      localStorage.setItem(storageKey, JSON.stringify(advancedActivities));
    }
  }, [advancedActivities, childId]);

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
      // Get the child data - ensure we're using the correct child ID
      const targetChildId = childId || children[0].id;
      console.log(`Generating advanced learning path for child ${targetChildId}`);
      
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
      
      // Save to localStorage with child-specific key
      if (targetChildId) {
        const storageKey = `adv-learning-path-${targetChildId}`;
        console.log(`Saving generated advanced learning path to ${storageKey}`);
        localStorage.setItem(storageKey, JSON.stringify(activities));
      }
      
      toast({
        title: "Geneva-specific learning path generated",
        description: `New activities based on current Geneva events have been created for ${childProfile.first_name}`
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
