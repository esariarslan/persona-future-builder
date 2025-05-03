
import React from 'react';
import Navbar from '@/components/Navbar';
import ObservationForm from '@/components/ObservationForm';
import RecommendationCard from '@/components/RecommendationCard';
import { futureSkills, recommendedActivities } from '@/data/futureSkills';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthLinks from '@/components/AuthLinks';

const Index = () => {
  return (
    <div className="min-h-screen bg-persona-soft-bg">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-persona-blue to-persona-light-blue py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Building Future-Ready Children Through Personalized Learning
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Help your child develop the skills they need for tomorrow's world based on their unique personality and interests.
            </p>
            <AuthLinks />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">How PersonaLearn Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-persona-light-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-persona-purple">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Observations</h3>
              <p className="text-gray-600">Tell us about your child's interests, personality traits, strengths, and areas for growth.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-persona-light-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-persona-green">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Receive Recommendations</h3>
              <p className="text-gray-600">Get personalized suggestions for activities, programs, and resources aligned with future skills.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-16 h-16 bg-persona-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-persona-orange">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Development</h3>
              <p className="text-gray-600">Follow your child's progress on their personalized learning path over time.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-4">Start Your Child's Journey</h2>
          <p className="text-center text-gray-600 mb-8">Share your observations or upload an assessment to create a personalized learning path</p>
          <ObservationForm />
        </div>
      </section>
      
      {/* Future Skills Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Future Skills We Focus On</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureSkills.map((category, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-persona-blue">{category.category}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center text-gray-700">
                      <span className="h-2 w-2 bg-persona-green rounded-full mr-2"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Sample Recommendations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-4">Recommended Activities</h2>
          <p className="text-center text-gray-600 mb-12">Examples of personalized recommendations based on children's needs</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          
          <div className="text-center mt-10">
            <Link to="/resources">
              <Button variant="outline" className="border-persona-blue text-persona-blue hover:bg-persona-blue/10">
                View More Recommendations <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4 font-heading">Persona<span className="text-persona-green">Learn</span></h2>
              <p className="max-w-xs text-gray-400">Helping children develop future-ready skills through personalized learning paths.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-3">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">How It Works</a></li>
                  <li><a href="#" className="hover:text-white">Future Skills</a></li>
                  <li><a href="#" className="hover:text-white">Learning Paths</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Research</a></li>
                  <li><a href="#" className="hover:text-white">Experts</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PersonaLearn. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
