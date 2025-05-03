
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import FileUpload from './FileUpload';

const ObservationForm = () => {
  const [activeTab, setActiveTab] = useState<string>("observations");
  const [observations, setObservations] = useState<string>("");
  const [childName, setChildName] = useState<string>("");
  const [childAge, setChildAge] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit observations.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setIsLoading(true);

    try {
      // First, create or get the child record
      const birthYear = new Date().getFullYear() - parseInt(childAge);
      const birthDate = new Date(birthYear, 0, 1).toISOString().split('T')[0]; // Approximate to Jan 1st of birth year
      
      // Check if we already have this child in the database
      const { data: existingChildren } = await supabase
        .from('children')
        .select('id, first_name')
        .eq('profile_id', user.id)
        .eq('first_name', childName)
        .limit(1);
      
      let childId;
      
      if (existingChildren && existingChildren.length > 0) {
        childId = existingChildren[0].id;
      } else {
        // Create a new child record
        const { data: newChild, error: childError } = await supabase
          .from('children')
          .insert({
            profile_id: user.id,
            first_name: childName,
            last_name: '', // We're not collecting last name in this form
            birth_date: birthDate,
          })
          .select('id')
          .single();
          
        if (childError) throw childError;
        childId = newChild.id;
      }
      
      // Now create the observation
      const { error: observationError } = await supabase
        .from('observations')
        .insert({
          child_id: childId,
          content: observations,
          observation_type: 'manual',
        });
        
      if (observationError) throw observationError;
      
      toast({
        title: "Success!",
        description: "We've analyzed the information and created a personalized learning path.",
      });
      
      // Redirect to dashboard after successful submission
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit observation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-persona-blue">Share Your Observations</CardTitle>
        <CardDescription>
          Tell us about your child or student to help us create a personalized development path
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="childName">Child's Name</Label>
              <Input
                id="childName"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter child's name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="childAge">Child's Age</Label>
              <Input
                id="childAge"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="Enter age"
                required
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="observations">Write Observations</TabsTrigger>
              <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="observations" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="observations">Your Observations</Label>
                <Textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Describe your observations, concerns, or goals for the child's development..."
                  className="min-h-[200px]"
                  required
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Include details about interests, strengths, challenges, and any specific goals you have.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="upload">
              <FileUpload />
            </TabsContent>
          </Tabs>

          <Button 
            type="submit" 
            className="mt-6 bg-persona-blue hover:bg-persona-blue/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Generate Learning Path'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ObservationForm;
