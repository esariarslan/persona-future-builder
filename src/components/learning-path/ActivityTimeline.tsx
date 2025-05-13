
import React from 'react';
import { ActivityItem } from './ActivityItem';
import { Activity } from './types';

interface ActivityTimelineProps {
  activities: Activity[];
  onOpenDialog: (activity: Activity) => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  onOpenDialog
}) => {
  return (
    <div className="relative">
      <div className="absolute top-0 left-5 h-full w-0.5 bg-gray-200" />
      {activities.map((activity) => (
        <ActivityItem 
          key={activity.id} 
          activity={activity} 
          onOpenDialog={onOpenDialog} 
        />
      ))}
    </div>
  );
};
