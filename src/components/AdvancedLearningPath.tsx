
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Pencil, BookOpen, Award, Sparkles, Clock, X } from "lucide-react";
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
  location?: string;
  source?: string;
}

interface AdvancedLearningPathProps {
  activities: Activity[];
  childId: string;
  onActivityComplete: (activityId: number, completed: boolean, memo?: string) => void;
  onClose?: () => void;
}

const AdvancedLearningPath: React.FC<AdvancedLearningPathProps> = ({ 
  activities, 
  childId, 
  onActivityComplete,
  onClose 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate overall progress
  const completedActivities = activities.filter(activity => activity.completed).length;
  const progressPercentage = activities.length > 0 ? Math.round((completedActivities / activities.length) * 100) : 0;

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
      onActivityComplete(currentActivity.id, true, memo.trim() || undefined);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      toast.success("Activity completed successfully!", {
        description: `Your progress for ${childId ? 'this child' : 'your child'} has been updated.`
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
  
  // Function to check if an activity is upcoming soon (within next 7 days)
  const isUpcomingSoon = (dateString: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const activityDate = new Date(dateString);
    const timeDiff = activityDate.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    
    return dayDiff >= 0 && dayDiff <= 7;
  };

  return (
    <>
      <Card className="w-full shadow-md mb-8">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-persona-purple flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-persona-purple" />
              Geneva Learning Path
              <Badge variant="outline" className="bg-persona-light-purple/20 border-persona-purple text-persona-purple text-xs ml-2">
                Up-to-date
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-persona-light-purple text-persona-purple">
                {progressPercentage}% Complete
              </Badge>
              {onClose && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose} 
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              )}
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2 mt-2" />
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 left-5 h-full w-0.5 bg-gray-200" />
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={activity.id} className="mb-8 relative">
                  <div className="flex">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center z-10 ${activity.completed ? "bg-persona-purple" : "bg-white border-2 border-gray-300"}`}>
                      {activity.completed && <Check className="h-4 w-4 text-white" />}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between flex-wrap">
                        <h3 className="text-lg font-medium">{activity.title}</h3>
                        <Badge variant="outline" className="bg-persona-soft-gray text-gray-700 mt-1 sm:mt-0">
                          {activity.skillArea}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap">
                        {getActivityIcon(activity.type)}
                        <span>{activity.type}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="flex items-center">
                          {activity.date}
                          {isUpcomingSoon(activity.date) && (
                            <Badge className="ml-2 bg-persona-orange text-white text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Soon
                            </Badge>
                          )}
                        </span>
                        {activity.location && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{activity.location}</span>
                          </>
                        )}
                      </div>
                      {activity.source && (
                        <div className="mt-1">
                          <span className="text-persona-purple text-xs bg-persona-light-purple/20 px-2 py-1 rounded-full">
                            Source: {activity.source}
                          </span>
                        </div>
                      )}
                      <p className="text-gray-600 mt-2">{activity.description}</p>
                      
                      {activity.completed ? (
                        <div className="mt-3">
                          <Badge className="bg-persona-purple">Completed</Badge>
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
                          className="mt-3 hover:bg-persona-purple/10 border-persona-purple text-persona-purple"
                          onClick={() => handleOpenDialog(activity)}
                        >
                          Mark as completed
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-500">No activities generated yet. Click the "Geneva Learning Path" button to generate personalized activities.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activity Completion Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-persona-purple">
              Complete Activity
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-persona-light-purple/50 p-4 rounded-md border border-persona-purple/20">
              <h4 className="font-medium text-lg text-persona-purple mb-1">{currentActivity?.title}</h4>
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
                className="min-h-[120px] border-gray-300 focus:border-persona-purple focus:ring focus:ring-persona-purple/20 bg-white text-gray-800"
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
              className="bg-persona-purple hover:bg-persona-purple/90 min-w-[160px] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Complete Activity'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdvancedLearningPath;
