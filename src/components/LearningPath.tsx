
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Activity {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  completed: boolean;
  skillArea: string;
}

interface LearningPathProps {
  activities: Activity[];
}

const LearningPath: React.FC<LearningPathProps> = ({ activities }) => {
  // Calculate overall progress
  const completedActivities = activities.filter(activity => activity.completed).length;
  const progressPercentage = Math.round((completedActivities / activities.length) * 100);

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-persona-blue">Learning Path</CardTitle>
          <Badge variant="outline" className="bg-persona-light-purple text-persona-purple">
            {progressPercentage}% Complete
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="path-line" />
          {activities.map((activity, index) => (
            <div key={activity.id} className="mb-8 relative">
              <div className="flex">
                <div className={`path-node ${activity.completed ? "path-node-complete" : ""}`}>
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
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{activity.date}</span>
                    <span className="mx-2">•</span>
                    <span>{activity.type}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{activity.description}</p>
                  {activity.completed ? (
                    <Badge className="mt-3 bg-persona-green">Completed</Badge>
                  ) : (
                    <Badge variant="outline" className="mt-3 cursor-pointer hover:bg-persona-blue/10">
                      Mark as completed
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningPath;
