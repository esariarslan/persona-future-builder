
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Activity } from './types';

interface ActivityItemProps {
  activity: Activity;
  onOpenDialog: (activity: Activity) => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ 
  activity, 
  onOpenDialog 
}) => {
  const getActivityIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'workshop':
        return <BookOpen className="h-4 w-4 mr-1" />;
      case 'course':
        return <Award className="h-4 w-4 mr-1" />;
      default:
        return <Calendar className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="mb-8 relative">
      <div className="flex">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center z-10 ${activity.completed ? "bg-persona-green" : "bg-white border-2 border-gray-300"}`}>
          {activity.completed && <Check className="h-4 w-4 text-white" />}
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{activity.title}</h3>
            <Badge variant="outline" className="bg-persona-soft-gray text-gray-700">
              {activity.skillArea}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            {getActivityIcon(activity.type)}
            <span>{activity.type}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-3 w-3 mr-1" />
            <span>{activity.date}</span>
          </div>
          <p className="text-gray-600 mt-2">{activity.description}</p>
          
          {activity.completed ? (
            <div className="mt-3">
              <Badge className="bg-persona-green">Completed</Badge>
              {activity.memo && (
                <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Memo</span>
                  </div>
                  <p className="text-gray-700">{activity.memo}</p>
                </div>
              )}
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="mt-3 hover:bg-persona-blue/10"
              onClick={() => onOpenDialog(activity)}
            >
              Mark as completed
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
