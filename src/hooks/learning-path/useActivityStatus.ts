
import { useState, useEffect } from 'react';
import { Activity } from './types';
import { supabase } from "@/integrations/supabase/client";

export const useActivityStatus = (
  childId: string,
  initialActivities: Activity[] = [], 
  initialAdvancedActivities: Activity[] = []
) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [advancedActivities, setAdvancedActivities] = useState<Activity[]>(initialAdvancedActivities);
  // Create distinct storage keys for each child
  const localStorageKey = `learning-path-${childId}`;
  const advLocalStorageKey = `adv-learning-path-${childId}`;

  // Load saved activity status from local storage on initial mount or when childId changes
  useEffect(() => {
    if (childId) {
      console.log(`Loading activities for child: ${childId}`);
      console.log(`Using storage keys: ${localStorageKey} and ${advLocalStorageKey}`);
      
      const savedActivities = localStorage.getItem(localStorageKey);
      const savedAdvActivities = localStorage.getItem(advLocalStorageKey);
      
      if (savedActivities) {
        try {
          const parsedActivities = JSON.parse(savedActivities);
          if (Array.isArray(parsedActivities) && parsedActivities.length > 0) {
            console.log(`Found ${parsedActivities.length} saved regular activities for child ${childId}`);
            setActivities(parsedActivities);
          } else if (initialActivities.length > 0) {
            setActivities(initialActivities);
          }
        } catch (e) {
          console.error(`Error parsing saved activities for child ${childId}:`, e);
          setActivities(initialActivities);
        }
      } else if (initialActivities.length > 0) {
        setActivities(initialActivities);
      }
      
      if (savedAdvActivities) {
        try {
          const parsedAdvActivities = JSON.parse(savedAdvActivities);
          if (Array.isArray(parsedAdvActivities) && parsedAdvActivities.length > 0) {
            console.log(`Found ${parsedAdvActivities.length} saved advanced activities for child ${childId}`);
            setAdvancedActivities(parsedAdvActivities);
          } else if (initialAdvancedActivities.length > 0) {
            setAdvancedActivities(initialAdvancedActivities);
          }
        } catch (e) {
          console.error(`Error parsing saved advanced activities for child ${childId}:`, e);
          setAdvancedActivities(initialAdvancedActivities);
        }
      } else if (initialAdvancedActivities.length > 0) {
        setAdvancedActivities(initialAdvancedActivities);
      }
    }
  }, [childId, localStorageKey, advLocalStorageKey, initialActivities, initialAdvancedActivities]);

  // Save activities to local storage whenever they change
  useEffect(() => {
    if (childId && activities.length > 0) {
      console.log(`Saving ${activities.length} activities for child ${childId} to ${localStorageKey}`);
      localStorage.setItem(localStorageKey, JSON.stringify(activities));
    }
  }, [activities, childId, localStorageKey]);

  // Save advanced activities to local storage whenever they change
  useEffect(() => {
    if (childId && advancedActivities.length > 0) {
      console.log(`Saving ${advancedActivities.length} advanced activities for child ${childId} to ${advLocalStorageKey}`);
      localStorage.setItem(advLocalStorageKey, JSON.stringify(advancedActivities));
    }
  }, [advancedActivities, childId, advLocalStorageKey]);

  // Update activity completion status
  const updateActivityStatus = (activityId: number, completed: boolean, memo?: string) => {
    // Update regular activities
    setActivities(prevActivities => {
      const updatedActivities = prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed, memo: memo || activity.memo }
          : activity
      );
      return updatedActivities;
    });
    
    // Update advanced activities
    setAdvancedActivities(prevActivities => {
      const updatedActivities = prevActivities.map(activity => 
        activity.id === activityId 
          ? { ...activity, completed, memo: memo || activity.memo }
          : activity
      );
      return updatedActivities;
    });

    // Optional: If you want to persist to a backend as well
    if (childId) {
      try {
        // Store activity completion status in Supabase (if available)
        // This is a placeholder for future backend integration
        console.log(`Storing activity ${activityId} status for child ${childId}: completed=${completed}`);
      } catch (error) {
        console.error("Error saving activity status to backend:", error);
      }
    }
  };

  return {
    activities,
    setActivities,
    advancedActivities,
    setAdvancedActivities,
    updateActivityStatus
  };
};
