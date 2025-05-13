
import { useState } from 'react';
import { Activity } from './types';

export const useActivityStatus = (
  initialActivities: Activity[] = [], 
  initialAdvancedActivities: Activity[] = []
) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [advancedActivities, setAdvancedActivities] = useState<Activity[]>(initialAdvancedActivities);

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
    setActivities,
    advancedActivities,
    setAdvancedActivities,
    updateActivityStatus
  };
};
