
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUpload from './FileUpload';

const ObservationForm = () => {
  const [activeTab, setActiveTab] = useState<string>("observations");
  const [observations, setObservations] = useState<string>("");
  const [childName, setChildName] = useState<string>("");
  const [childAge, setChildAge] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    console.log("Form submitted:", { childName, childAge, observations });
    
    // Show success message or redirect
    alert("Thank you for your input! We've analyzed the information and created a personalized learning path.");
    // Redirect to dashboard would happen here
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

          <Button type="submit" className="mt-6 bg-persona-blue hover:bg-persona-blue/90 text-white">
            Generate Learning Path
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ObservationForm;
