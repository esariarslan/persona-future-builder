
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import AdvancedLearningPath from './AdvancedLearningPath';
import { useLearningPath } from '@/hooks/useLearningPath';

// Import our new modular components
import { 
  ActivityTimeline,
  ActivityCompletionDialog,
  ObservationDialog,
  ViewObservationDialog,
  PathControls,
  Activity,
  Observation
} from './learning-path';

interface LearningPathProps {
  activities: Activity[];
  childId?: string;
}

const LearningPath: React.FC<LearningPathProps> = ({ activities: initialActivities, childId }) => {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get advanced learning path functionality
  const { 
    advancedActivities, 
    advancedLoading, 
    generateAdvancedLearningPath,
    updateActivityStatus,
    showAdvancedPath,
    toggleAdvancedPath
  } = useLearningPath(childId);
  
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
  const progressPercentage = activities.length > 0 ? Math.round((completedActivities / activities.length) * 100) : 0;

  const handleOpenDialog = (activity: Activity) => {
    setCurrentActivity(activity);
    setIsDialogOpen(true);
  };

  const handleMarkAsCompleted = () => {
    if (!currentActivity) return;
    
    setIsSubmitting(true);
    
    // Simulate a small delay to show loading state
    setTimeout(() => {
      const updatedActivities = activities.map(activity => {
        if (activity.id === currentActivity.id) {
          return { ...activity, completed: true, memo: currentActivity.memo };
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

  const handleGenerateAdvancedPath = () => {
    generateAdvancedLearningPath();
  };

  return (
    <>
      <Card className="w-full shadow-md mb-8">
        <CardHeader className="pb-3">
          <PathControls 
            progressPercentage={progressPercentage}
            onAddObservation={() => setIsObservationDialogOpen(true)}
            onShowAdvancedPath={handleGenerateAdvancedPath}
            advancedLoading={advancedLoading}
            observations={observations}
            onViewObservation={viewObservation}
            interestsForm={interestsForm}
            handleAddInterests={handleAddInterests}
          />
        </CardHeader>
        <CardContent>
          <ActivityTimeline 
            activities={activities} 
            onOpenDialog={handleOpenDialog} 
          />
        </CardContent>
      </Card>

      {/* Display Advanced Learning Path if available */}
      {showAdvancedPath && advancedActivities.length > 0 && (
        <AdvancedLearningPath 
          activities={advancedActivities} 
          childId={childId || ''}
          onActivityComplete={updateActivityStatus}
          onClose={() => toggleAdvancedPath(false)}
        />
      )}

      {/* Activity Completion Dialog */}
      <ActivityCompletionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        activity={currentActivity}
        onComplete={handleMarkAsCompleted}
        isSubmitting={isSubmitting}
      />

      {/* Add Observation Dialog */}
      <ObservationDialog 
        isOpen={isObservationDialogOpen}
        onOpenChange={setIsObservationDialogOpen}
        observation={newObservation}
        setObservation={setNewObservation}
        onSave={handleAddObservation}
      />
      
      {/* View Observation Dialog */}
      <ViewObservationDialog
        isOpen={isViewObservationDialogOpen}
        onOpenChange={setIsViewObservationDialogOpen}
        observation={selectedObservation}
      />
    </>
  );
};

export default LearningPath;
