
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, MapPin, ArrowUpRight, Star, Award, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
}

const AdvancedLearningPath: React.FC<AdvancedLearningPathProps> = ({ 
  activities,
  childId,
  onActivityComplete 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate overall progress
  const completedActivities = activities.filter(activity => activity.completed).length;
  const progressPercentage = activities.length > 0 
    ? Math.round((completedActivities / activities.length) * 100)
    : 0;

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
      onActivityComplete(currentActivity.id, true, memo);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      toast.success("Activity completed successfully!", {
        description: "Your progress has been updated."
      });
    }, 500);
  };

  return (
    <Card className="w-full shadow-md mb-8">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-persona-orange" />
            <CardTitle className="text-2xl text-persona-blue">Advanced Learning Path</CardTitle>
          </div>
          <Badge variant="outline" className="bg-persona-light-purple text-persona-purple">
            {progressPercentage}% Complete
          </Badge>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="pt-6">
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
                  <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-2">
                    <span className="flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      <span>{activity.type}</span>
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{activity.date}</span>
                    </span>
                    {activity.location && (
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{activity.location}</span>
                      </span>
                    )}
                    {activity.source && (
                      <span className="flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        <span>{activity.source}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{activity.description}</p>
                  
                  {activity.completed ? (
                    <div className="mt-3">
                      <Badge className="bg-persona-green">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                      {activity.memo && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm">
                          <div className="flex items-center text-gray-500 mb-1">
                            <span>Reflection Notes</span>
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

      {/* Activity Completion Dialog */}
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
                <label htmlFor="memo" className="text-sm font-medium text-gray-700">
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

export default AdvancedLearningPath;
