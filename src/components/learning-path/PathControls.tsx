
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eye, Sparkles } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Observation } from './types';

interface PathControlsProps {
  progressPercentage: number;
  onAddObservation: () => void;
  onShowAdvancedPath: () => void;
  advancedLoading: boolean;
  observations: Observation[];
  onViewObservation: (observation: Observation) => void;
  interestsForm: any;
  handleAddInterests: (data: { interests: string }) => void;
}

export const PathControls: React.FC<PathControlsProps> = ({
  progressPercentage,
  onAddObservation,
  onShowAdvancedPath,
  advancedLoading,
  observations,
  onViewObservation,
  interestsForm,
  handleAddInterests
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-persona-blue">Learning Path</h2>
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
          onClick={onAddObservation}
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
                  onClick={() => onViewObservation(obs)}
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

        <Button 
          className="bg-persona-purple hover:bg-persona-purple/90 text-white ms-auto"
          onClick={onShowAdvancedPath}
          disabled={advancedLoading}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {advancedLoading ? 'Generating...' : 'Advanced Learning Path'}
        </Button>
      </div>
    </>
  );
};
