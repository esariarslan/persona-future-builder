
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Pencil, BookOpen, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Activity {
  id: number;
  title: string;
  type: string;
  description: string;
  date: string;
  completed: boolean;
  skillArea: string;
  memo?: string;
}

interface LearningPathProps {
  activities: Activity[];
}

const LearningPath: React.FC<LearningPathProps> = ({ activities: initialActivities }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate overall progress
  const completedActivities = activities.filter(activity => activity.completed).length;
  const progressPercentage = Math.round((completedActivities / activities.length) * 100);

  const handleOpenDialog = (activity: Activity) => {
    setCurrentActivity(activity);
    setMemo(activity.memo || "");
    setIsDialogOpen(true);
  };

  const handleMarkAsCompleted = () => {
    if (!currentActivity) return;
    
    setIsSubmitting(true);
    
    // Simulate a small delay to show loading state
    setTimeout(() => {
      const updatedActivities = activities.map(activity => {
        if (activity.id === currentActivity.id) {
          return { ...activity, completed: true, memo: memo.trim() || undefined };
        }
        return activity;
      });
      
      setActivities(updatedActivities);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      toast.success("Activity completed successfully!", {
        description: "Your progress has been updated."
      });
    }, 500);
  };

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
          <div className="absolute top-0 left-5 h-full w-0.5 bg-gray-200" />
          {activities.map((activity, index) => (
            <div key={activity.id} className="mb-8 relative">
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
                            <Pencil className="h-3 w-3 mr-1" />
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
                      onClick={() => handleOpenDialog(activity)}
                    >
                      Mark as completed
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-persona-blue">
              Complete Activity
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-persona-light-blue/50 p-4 rounded-md border border-persona-blue/20">
              <h4 className="font-medium text-lg text-persona-blue mb-1">{currentActivity?.title}</h4>
              <p className="text-gray-600">{currentActivity?.description}</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="memo" className="text-sm font-medium text-gray-700 flex items-center">
                  <Pencil className="h-4 w-4 mr-1 text-persona-purple" />
                  Add reflection notes (optional)
                </label>
                <span className={`text-xs ${memo.length > 400 ? 'text-persona-orange' : 'text-gray-500'}`}>
                  {memo.length}/500
                </span>
              </div>
              <Textarea
                id="memo"
                placeholder="What did you learn? What went well? What could be improved next time?"
                value={memo}
                onChange={(e) => setMemo(e.target.value.substring(0, 500))}
                className="min-h-[120px] border-gray-300 focus:border-persona-blue focus:ring focus:ring-persona-blue/20 bg-white text-gray-800"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between border-t border-gray-100 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleMarkAsCompleted} 
              className="bg-persona-green hover:bg-persona-green/90 min-w-[160px] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Complete Activity'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LearningPath;
