
import { useState, useEffect } from 'react';
import { useLearningPathBasic } from './learning-path/useLearningPathBasic';
import { useAdvancedLearningPath } from './learning-path/useAdvancedLearningPath';
import { useActivityStatus } from './learning-path/useActivityStatus';
import type { Activity } from './learning-path/types';

export type { Activity } from './learning-path/types';

export const useLearningPath = (childId?: string) => {
  const basicPath = useLearningPathBasic(childId);
  const advancedPath = useAdvancedLearningPath(childId);
  const activityStatus = useActivityStatus(
    childId || 'default',
    basicPath.activities, 
    advancedPath.advancedActivities
  );
  
  // Sync activities from basic path to activity status
  useEffect(() => {
    if (basicPath.activities.length > 0) {
      // Merge existing completion status with new activities
      const mergedActivities = basicPath.activities.map(newActivity => {
        const existingActivity = activityStatus.activities.find(a => a.id === newActivity.id);
        return existingActivity 
          ? { ...newActivity, completed: existingActivity.completed, memo: existingActivity.memo }
          : newActivity;
      });
      activityStatus.setActivities(mergedActivities);
    }
  }, [basicPath.activities]);
  
  // Sync activities from advanced path to activity status
  useEffect(() => {
    if (advancedPath.advancedActivities.length > 0) {
      // Merge existing completion status with new activities
      const mergedActivities = advancedPath.advancedActivities.map(newActivity => {
        const existingActivity = activityStatus.advancedActivities.find(a => a.id === newActivity.id);
        return existingActivity 
          ? { ...newActivity, completed: existingActivity.completed, memo: existingActivity.memo }
          : newActivity;
      });
      activityStatus.setAdvancedActivities(mergedActivities);
    }
  }, [advancedPath.advancedActivities]);
  
  return {
    // Basic path properties
    activities: activityStatus.activities,
    loading: basicPath.loading,
    generateLearningPath: basicPath.generateLearningPath,
    
    // Advanced path properties (renamed for Geneva focus)
    advancedActivities: activityStatus.advancedActivities,
    advancedLoading: advancedPath.loading,
    generateAdvancedLearningPath: advancedPath.generateAdvancedLearningPath,
    
    // Activity status management
    updateActivityStatus: activityStatus.updateActivityStatus
  };
};
