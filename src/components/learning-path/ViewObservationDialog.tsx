
import React from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Observation } from './types';

interface ViewObservationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  observation: Observation | null;
}

export const ViewObservationDialog: React.FC<ViewObservationDialogProps> = ({
  isOpen,
  onOpenChange,
  observation
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-persona-blue">
            Observation Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-persona-soft-bg p-4 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Recorded on {observation?.date}</span>
            </div>
            <p className="text-gray-800 whitespace-pre-wrap">{observation?.content}</p>
          </div>
        </div>
        <DialogFooter className="border-t border-gray-100 pt-4">
          <Button 
            onClick={() => onOpenChange(false)} 
            className="bg-persona-blue hover:bg-persona-blue/90 text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
