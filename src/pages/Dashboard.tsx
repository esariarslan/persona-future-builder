
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Dashboard from '@/components/Dashboard';
import LearningPath from '@/components/LearningPath';
import RecommendationCard from '@/components/RecommendationCard';
import { recommendedActivities } from '@/data/futureSkills';
import { useChildren } from '@/hooks/useChildren';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  useEffect(() => {
    // Set the first child as selected when data loads
    if (children && children.length > 0 && !selectedChild) {
      setSelectedChild(children[0]);
    }
  }, [children, selectedChild]);

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
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">Most Recent Observation</h4>
                            <p className="text-sm text-gray-600 line-clamp-3">
                              Observations about {selectedChild.first_name}'s interests and development will appear here
                            </p>
                          </div>
                        </div>
                      </CardContent>
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
