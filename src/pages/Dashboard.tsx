
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Dashboard from '@/components/Dashboard';
import LearningPath from '@/components/LearningPath';
import RecommendationCard from '@/components/RecommendationCard';
import { recommendedActivities } from '@/data/futureSkills';
import { useChildren } from '@/hooks/useChildren';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle, Pencil, Eye, BookOpen } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

// Sample activities for the learning path
const sampleLearningActivities = [
  {
    id: 1,
    title: "Introduction to Coding",
    type: "Workshop",
    description: "A beginner-friendly workshop to learn basic programming concepts.",
    date: "Next Saturday, 10:00 AM",
    completed: false,
    skillArea: "Technology"
  },
  {
    id: 2,
    title: "Team Sports Program",
    type: "Regular Activity",
    description: "Weekly team sports to develop social skills and teamwork.",
    date: "Every Tuesday, 4:00 PM",
    completed: true,
    skillArea: "Social Skills"
  },
  {
    id: 3,
    title: "Creative Writing Class",
    type: "Course",
    description: "A six-week course to develop storytelling and writing abilities.",
    date: "Starts June 15th",
    completed: false,
    skillArea: "Communication"
  }
];

const DashboardPage = () => {
  const { user, profile } = useAuth();
  const { children, loading } = useChildren();
  const [selectedChild, setSelectedChild] = useState<any | null>(null);
  const navigate = useNavigate();
  
  // State for observations
  const [observations, setObservations] = useState<any[]>([]);
  const [observationsLoading, setObservationsLoading] = useState(false);

  // Dialog states
  const [isAddObservationOpen, setIsAddObservationOpen] = useState(false);
  const [isViewObservationOpen, setIsViewObservationOpen] = useState(false);
  const [isAddInterestsOpen, setIsAddInterestsOpen] = useState(false);
  const [selectedObservation, setSelectedObservation] = useState<any | null>(null);
  
  // Form states
  const [newObservation, setNewObservation] = useState('');
  const [newInterests, setNewInterests] = useState('');

  useEffect(() => {
    // Set the first child as selected when data loads
    if (children && children.length > 0 && !selectedChild) {
      setSelectedChild(children[0]);
    }
  }, [children, selectedChild]);

  useEffect(() => {
    // Fetch observations when selectedChild changes
    if (selectedChild) {
      fetchObservations();
    }
  }, [selectedChild]);

  const fetchObservations = async () => {
    if (!selectedChild) return;
    
    setObservationsLoading(true);
    try {
      const { data, error } = await supabase
        .from('observations')
        .select('*')
        .eq('child_id', selectedChild.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setObservations(data || []);
    } catch (error: any) {
      console.error('Error fetching observations:', error.message);
    } finally {
      setObservationsLoading(false);
    }
  };

  const handleAddObservation = async () => {
    if (!newObservation.trim() || !selectedChild) return;
    
    try {
      const { error } = await supabase
        .from('observations')
        .insert([{
          child_id: selectedChild.id,
          content: newObservation,
          observation_type: 'manual'
        }]);
      
      if (error) throw error;
      
      toast.success('Observation added successfully');
      setNewObservation('');
      setIsAddObservationOpen(false);
      fetchObservations();
    } catch (error: any) {
      toast.error('Failed to add observation: ' + error.message);
    }
  };

  const handleAddInterests = async () => {
    if (!newInterests.trim() || !selectedChild) return;
    
    // Convert comma-separated interests to an array
    const interestsArray = newInterests
      .split(',')
      .map(interest => interest.trim())
      .filter(interest => interest.length > 0);
    
    try {
      const { error } = await supabase
        .from('children')
        .update({
          interests: interestsArray
        })
        .eq('id', selectedChild.id);
      
      if (error) throw error;
      
      // Update the selected child with the new interests
      setSelectedChild({
        ...selectedChild,
        interests: interestsArray
      });
      
      toast.success('Interests updated successfully');
      setNewInterests('');
      setIsAddInterestsOpen(false);
    } catch (error: any) {
      toast.error('Failed to update interests: ' + error.message);
    }
  };

  const handleViewObservation = (observation: any) => {
    setSelectedObservation(observation);
    setIsViewObservationOpen(true);
  };

  const handleAddChild = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-persona-soft-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-lg">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-persona-soft-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-bold mb-4">Welcome {profile?.first_name}!</h2>
            <p className="text-gray-600 mb-6 text-center">
              You haven't added any children yet. Start by sharing some observations about your child.
            </p>
            <Button onClick={handleAddChild} className="bg-persona-blue hover:bg-persona-blue/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Child
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">My Children</h1>
                <p className="text-gray-600">
                  Track your {children.length > 1 ? "children's" : "child's"} development and learning paths
                </p>
              </div>
              <Button 
                onClick={handleAddChild} 
                className="mt-4 md:mt-0 bg-persona-blue hover:bg-persona-blue/90"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Another Child
              </Button>
            </div>
            
            {children.length > 1 && (
              <div className="mb-6">
                <Tabs 
                  defaultValue={selectedChild?.id} 
                  onValueChange={(value) => {
                    const child = children.find(c => c.id === value);
                    if (child) setSelectedChild(child);
                  }}
                >
                  <TabsList className="mb-4">
                    {children.map((child) => (
                      <TabsTrigger key={child.id} value={child.id}>
                        {child.first_name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            )}
            
            {selectedChild && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <div className="lg:col-span-1">
                    <Card className="h-full">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-2xl">{selectedChild.first_name}'s Profile</CardTitle>
                        <CardDescription>Personal details and interests</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Age</h4>
                            <p>{selectedChild.birth_date ? calculateAge(selectedChild.birth_date) : "Not specified"}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Interests</h4>
                            {selectedChild.interests && selectedChild.interests.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {selectedChild.interests.map((interest: string, index: number) => (
                                  <span 
                                    key={index} 
                                    className="bg-persona-soft-bg text-gray-700 text-xs px-2 py-1 rounded-full"
                                  >
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 text-sm">No interests specified yet</p>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2 text-xs"
                              onClick={() => setIsAddInterestsOpen(true)}
                            >
                              <Pencil className="h-3 w-3 mr-1" /> Add Interests
                            </Button>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="text-sm font-medium text-gray-500">Observations</h4>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => setIsAddObservationOpen(true)}
                              >
                                <PlusCircle className="h-3 w-3 mr-1" /> Add
                              </Button>
                            </div>
                            
                            {observationsLoading ? (
                              <p className="text-sm text-gray-500">Loading observations...</p>
                            ) : observations.length > 0 ? (
                              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                {observations.map((obs) => (
                                  <div 
                                    key={obs.id} 
                                    className="bg-white p-2 rounded-md shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleViewObservation(obs)}
                                  >
                                    <div className="flex justify-between items-start">
                                      <p className="text-xs text-gray-500">
                                        {new Date(obs.created_at).toLocaleDateString()}
                                      </p>
                                      <Eye className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                                    </div>
                                    <p className="text-sm line-clamp-2 mt-1">{obs.content}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">No observations recorded yet</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 pb-4 flex justify-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-persona-blue border-persona-blue hover:bg-persona-light-blue"
                          onClick={() => setIsAddObservationOpen(true)}
                        >
                          <BookOpen className="h-4 w-4 mr-2" /> Record New Observation
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="lg:col-span-2">
                    <Dashboard />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-8 mb-8">
                  <LearningPath activities={sampleLearningActivities} />
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Recommended Activities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedActivities.slice(0, 3).map((activity) => (
                      <RecommendationCard
                        key={activity.id}
                        title={activity.title}
                        description={activity.description}
                        type={activity.type}
                        location={activity.location}
                        date={activity.date}
                        skills={activity.skills}
                        image={activity.image}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Add Observation Dialog */}
      <Dialog open={isAddObservationOpen} onOpenChange={setIsAddObservationOpen}>
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
                  What have you observed about {selectedChild?.first_name}?
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
              onClick={() => setIsAddObservationOpen(false)}
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
      <Dialog open={isViewObservationOpen} onOpenChange={setIsViewObservationOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-persona-blue">
              Observation Details
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-persona-soft-bg p-4 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">
                  Recorded on {selectedObservation ? new Date(selectedObservation.created_at).toLocaleDateString() : ''}
                </span>
              </div>
              <p className="text-gray-800 whitespace-pre-wrap">{selectedObservation?.content}</p>
            </div>
          </div>
          <DialogFooter className="border-t border-gray-100 pt-4">
            <Button 
              onClick={() => setIsViewObservationOpen(false)} 
              className="bg-persona-blue hover:bg-persona-blue/90 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Interests Dialog */}
      <Dialog open={isAddInterestsOpen} onOpenChange={setIsAddInterestsOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-persona-blue">
              Update {selectedChild?.first_name}'s Interests
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                Enter interests (comma separated)
              </label>
              <Input
                id="interests"
                placeholder="e.g. dinosaurs, space, music, drawing"
                value={newInterests}
                onChange={(e) => setNewInterests(e.target.value)}
                className="border-gray-300 focus:border-persona-blue focus:ring focus:ring-persona-blue/20 bg-white text-gray-800"
              />
              <p className="mt-2 text-xs text-gray-500">
                Separate each interest with a comma
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between border-t border-gray-100 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsAddInterestsOpen(false)}
              className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddInterests} 
              className="bg-persona-blue hover:bg-persona-blue/90 min-w-[160px] text-white"
              disabled={!newInterests.trim()}
            >
              Save Interests
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper function to calculate age from birth date
const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return `${age} years old`;
};

export default DashboardPage;
