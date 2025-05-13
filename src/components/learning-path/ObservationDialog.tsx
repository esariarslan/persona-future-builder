
import React from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ObservationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observation: string;
  setObservation: (value: string) => void;
  onSave: () => void;
}

export const ObservationDialog: React.FC<ObservationDialogProps> = ({
  isOpen,
  onOpenChange,
  observation,
  setObservation,
  onSave
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              <span className={`text-xs ${observation.length > 400 ? 'text-persona-orange' : 'text-gray-500'}`}>
                {observation.length}/500
              </span>
            </div>
            <Textarea
              id="observation"
              placeholder="Describe what you've observed about the child's behavior, interests, or development..."
              value={observation}
              onChange={(e) => setObservation(e.target.value.substring(0, 500))}
              className="min-h-[150px] border-gray-300 focus:border-persona-blue focus:ring focus:ring-persona-blue/20 bg-white text-gray-800"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between border-t border-gray-100 pt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={onSave} 
            className="bg-persona-blue hover:bg-persona-blue/90 min-w-[160px] text-white"
            disabled={!observation.trim()}
          >
            Save Observation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
