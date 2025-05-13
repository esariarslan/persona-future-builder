
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Calendar } from "lucide-react";
import { Activity } from './types';

interface ActivityCompletionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity | null;
  onComplete: () => void;
  isSubmitting: boolean;
}

export const ActivityCompletionDialog: React.FC<ActivityCompletionDialogProps> = ({
  isOpen,
  onOpenChange,
  activity,
  onComplete,
  isSubmitting
}) => {
  const [memo, setMemo] = useState(activity?.memo || "");

  // Update memo when activity changes
  React.useEffect(() => {
    if (activity) {
      setMemo(activity.memo || "");
    }
  }, [activity]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-persona-blue">
            Complete Activity
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-persona-light-blue/50 p-4 rounded-md border border-persona-blue/20">
            <h4 className="font-medium text-lg text-persona-blue mb-1">{activity?.title}</h4>
            <p className="text-gray-600">{activity?.description}</p>
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
            onClick={() => onOpenChange(false)}
            className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={onComplete} 
            className="bg-persona-green hover:bg-persona-green/90 min-w-[160px] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Complete Activity'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
