
import React from 'react';
import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import LearningPath from '@/components/LearningPath';
import RecommendationCard from '@/components/RecommendationCard';
import { sampleLearningPath, recommendedActivities } from '@/data/futureSkills';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-persona-soft-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-persona-blue">Emma's Development Journey</h1>
          <p className="text-gray-600">Track progress and explore new opportunities for growth</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Skills Dashboard */}
          <div className="lg:col-span-1 space-y-8">
            <Dashboard />
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Child Profile</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-persona-light-purple flex items-center justify-center text-persona-purple text-2xl font-bold">
                    E
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-lg">Emma Grace Johnson</h4>
                    <p className="text-gray-500">7 years old</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Personality Type</h5>
                    <p>ENFP ("The Explorer")</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Top Intelligences</h5>
                    <p>Linguistic, Interpersonal, Musical</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Growth Areas</h5>
                    <p>Persistence, self-regulation, problem-solving</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Learning Path */}
          <div className="lg:col-span-2">
            <LearningPath activities={sampleLearningPath} />
            
            {/* Recommendations */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {recommendedActivities.slice(0, 2).map((activity) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
