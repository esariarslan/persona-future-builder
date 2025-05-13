
import { useState, useEffect } from 'react';
import { useLearningPathBasic } from './learning-path/useLearningPathBasic';
import { useAdvancedLearningPath } from './learning-path/useAdvancedLearningPath';
import { useActivityStatus } from './learning-path/useActivityStatus';
import type { Activity } from './learning-path/types';

export type { Activity } from './learning-path/types';

export const useLearningPath = (childId?: string) => {
  const basicPath = useLearningPathBasic(childId);
  const advancedPath = useAdvancedLearningPath(childId);
  const activityStatus = useActivityStatus(basicPath.activities, advancedPath.advancedActivities);
  
  // Sync activities from basic path to activity status
  useEffect(() => {
    if (basicPath.activities.length > 0) {
      activityStatus.setActivities(basicPath.activities);
    }
  }, [basicPath.activities]);
  
  // Sync activities from advanced path to activity status
  useEffect(() => {
    if (advancedPath.advancedActivities.length > 0) {
      activityStatus.setAdvancedActivities(advancedPath.advancedActivities);
    }
  }, [advancedPath.advancedActivities]);
  
  return {
    // Basic path properties
    activities: activityStatus.activities,
    loading: basicPath.loading,
    generateLearningPath: basicPath.generateLearningPath,
    
    // Advanced path properties
    advancedActivities: activityStatus.advancedActivities,
    advancedLoading: advancedPath.loading,
    generateAdvancedLearningPath: advancedPath.generateAdvancedLearningPath,
    
    // Activity status management
    updateActivityStatus: activityStatus.updateActivityStatus
  };
};
