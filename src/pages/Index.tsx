
import React from 'react';
import Navbar from '@/components/Navbar';
import ObservationForm from '@/components/ObservationForm';
import { futureSkills } from '@/data/futureSkills';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';
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
          <div className="mt-10 text-center">
            <Link to="/how-it-works">
              <Button variant="outline" className="border-persona-blue text-persona-blue hover:bg-persona-blue/10">
                Learn More About How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Real-Time Activities Feature */}
      <section className="py-12 px-4 bg-persona-light-purple/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="bg-white p-6 rounded-lg shadow-md border border-persona-purple/20">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-persona-purple" />
                  <h3 className="text-xl font-semibold text-persona-purple">Real-Time Activity Discovery</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Our advanced technology scans the web to find real-time local activities perfectly matched to your child's interests and developmental needs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                    <span className="text-gray-700">Discover local workshops, classes, and events</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                    <span className="text-gray-700">Personalized to child's age and developmental stage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                    <span className="text-gray-700">Updated regularly with new opportunities</span>
                  </li>
                </ul>
                <Button className="w-full bg-persona-purple hover:bg-persona-purple/90 text-white">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl font-bold font-heading mb-4">Always Fresh Activities</h2>
              <p className="text-lg mb-6">
                We continuously scan the web for new activities, classes, and resources in your area that match your child's unique profile, ensuring they always have access to fresh learning opportunities.
              </p>
              <p className="text-gray-700 mb-6">
                Our intelligent system combines your observations with real-time activity discovery to create a constantly evolving and personalized learning journey for your child.
              </p>
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
          <div className="mt-10 text-center">
            <Link to="/future-skills">
              <Button variant="outline" className="border-persona-blue text-persona-blue hover:bg-persona-blue/10">
                Learn More About Future Skills <ArrowRight className="ml-2 h-4 w-4" />
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
                  <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
                  <li><Link to="/future-skills" className="hover:text-white">Future Skills</Link></li>
                  <li><Link to="/learning-paths" className="hover:text-white">Learning Paths</Link></li>
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
