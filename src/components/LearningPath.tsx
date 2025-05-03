
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Calendar, Pencil, BookOpen, Award, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

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

interface Observation {
  id: number;
  content: string;
  date: string;
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
  
  // Sample past observations (replace with actual data from backend)
  const [observations, setObservations] = useState<Observation[]>([
    { id: 1, content: "Shows interest in building blocks and constructing towers.", date: "2025-04-15" },
    { id: 2, content: "Engages well with peers during group activities.", date: "2025-04-10" },
    { id: 3, content: "Displays curiosity about animals and nature.", date: "2025-04-05" },
  ]);
  
  // State for new observation
  const [newObservation, setNewObservation] = useState("");
  const [isObservationDialogOpen, setIsObservationDialogOpen] = useState(false);
  
  // Form for interests
  const interestsForm = useForm({
    defaultValues: {
      interests: "",
    },
  });
  
  const [selectedObservation, setSelectedObservation] = useState<Observation | null>(null);
  const [isViewObservationDialogOpen, setIsViewObservationDialogOpen] = useState(false);
  
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
  
  const handleAddObservation = () => {
    if (!newObservation.trim()) return;
    
    // Add the new observation to the list
    const newObservationObj = {
      id: observations.length + 1,
      content: newObservation,
      date: new Date().toISOString().split('T')[0]
    };
    
    setObservations([newObservationObj, ...observations]);
    setNewObservation("");
    setIsObservationDialogOpen(false);
    
    toast.success("Observation added", {
      description: "Your observation has been saved."
    });
  };
  
  const handleAddInterests = (data: { interests: string }) => {
    if (!data.interests.trim()) return;
    
    toast.success("Interests updated", {
      description: "Child's interests have been updated."
    });
    
    interestsForm.reset();
  };
  
  const viewObservation = (observation: Observation) => {
    setSelectedObservation(observation);
    setIsViewObservationDialogOpen(true);
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
        
        <div className="mt-4 flex flex-wrap gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white hover:bg-gray-50"
            onClick={() => setIsObservationDialogOpen(true)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Add Observation
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-gray-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Past Observations
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <div className="p-4 bg-persona-soft-bg border-b border-gray-100">
                <h3 className="font-medium">Past Observations</h3>
                <p className="text-sm text-gray-500">Click on an observation to view details</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {observations.length > 0 ? observations.map((obs) => (
                  <button
                    key={obs.id}
                    className="w-full text-left p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                    onClick={() => viewObservation(obs)}
                  >
                    <p className="text-sm font-medium line-clamp-2">{obs.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{obs.date}</p>
                  </button>
                )) : (
                  <div className="p-4 text-center text-gray-500">
                    No observations yet
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Add Interests
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <Form {...interestsForm}>
                <form onSubmit={interestsForm.handleSubmit(handleAddInterests)} className="space-y-4">
                  <FormField
                    control={interestsForm.control}
                    name="interests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Child Interests</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. music, dinosaurs, space"
                            className="bg-white"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" size="sm" className="bg-persona-blue text-white hover:bg-persona-blue/90">
                      Save Interests
                    </Button>
                  </div>
                </form>
              </Form>
            </PopoverContent>
          </Popover>
        </div>
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

      {/* Add Observation Dialog */}
      <Dialog open={isObservationDialogOpen} onOpenChange={setIsObservationDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-persona-blue">
              Add New Observation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="observation" className="text-sm font-medium text-gray-700">
                  What have you observed?
                </label>
                <span className={`text-xs ${newObservation.length > 400 ? 'text-persona-orange' : 'text-gray-500'}`}>
                  {newObservation.length}/500
                </span>
              </div>
              <Textarea
                id="observation"
                placeholder="Describe what you've observed about the child's behavior, interests, or development..."
                value={newObservation}
                onChange={(e) => setNewObservation(e.target.value.substring(0, 500))}
                className="min-h-[150px] border-gray-300 focus:border-persona-blue focus:ring focus:ring-persona-blue/20 bg-white text-gray-800"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between border-t border-gray-100 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsObservationDialogOpen(false)}
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddObservation} 
              className="bg-persona-blue hover:bg-persona-blue/90 min-w-[160px] text-white"
              disabled={!newObservation.trim()}
            >
              Save Observation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Observation Dialog */}
      <Dialog open={isViewObservationDialogOpen} onOpenChange={setIsViewObservationDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-persona-blue">
              Observation Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-persona-soft-bg p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Recorded on {selectedObservation?.date}</span>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{selectedObservation?.content}</p>
            </div>
          </div>
          <DialogFooter className="border-t border-gray-100 pt-4">
            <Button 
              onClick={() => setIsViewObservationDialogOpen(false)} 
              className="bg-persona-blue hover:bg-persona-blue/90 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LearningPath;
