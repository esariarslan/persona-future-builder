
import React from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-persona-soft-bg">
      <Navbar />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-persona-blue to-persona-light-blue py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold font-heading text-white">How PersonaLearn Works</h1>
        </div>
      </div>
      
      {/* Detailed Process */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-persona-light-purple rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-persona-purple">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Understand Your Child</h3>
              <p className="text-gray-600 mb-4">We begin by collecting meaningful observations about your child's behaviors, interests, and natural tendencies.</p>
              <h4 className="font-semibold text-gray-800 mb-2">How you participate:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Complete our comprehensive observation form</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Upload any previous assessments or reports</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Add regular updates about new interests or behaviors</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-persona-light-green rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-persona-green">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Generate Personalized Path</h3>
              <p className="text-gray-600 mb-4">Our AI system analyzes your child's profile against future skill requirements and current local opportunities.</p>
              <h4 className="font-semibold text-gray-800 mb-2">Behind the scenes:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Pattern identification in interests and strengths</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Alignment with future career and skill forecasts</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Real-time search of Geneva local opportunities</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="w-16 h-16 bg-persona-orange/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-persona-orange">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Implement & Iterate</h3>
              <p className="text-gray-600 mb-4">Follow the personalized learning path and track progress while receiving updated recommendations.</p>
              <h4 className="font-semibold text-gray-800 mb-2">Ongoing support:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Dashboard tracking of completed activities</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Regular path adjustments based on feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 text-persona-green flex-shrink-0 mr-2">✓</span>
                  <span>Community support and parent resources</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-persona-light-purple/10 rounded-lg p-8 border border-persona-purple/20">
            <h3 className="text-2xl font-semibold mb-6 text-center">The PersonaLearn Difference</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-persona-purple mb-3">Holistic Development Focus</h4>
                <p className="text-gray-700 mb-6">
                  Unlike traditional educational approaches that focus solely on academic achievement, 
                  PersonaLearn considers all aspects of your child's development including social skills, 
                  emotional intelligence, creativity, and practical life skills.
                </p>
                
                <h4 className="font-semibold text-persona-purple mb-3">Real-World Application</h4>
                <p className="text-gray-700">
                  We prioritize learning experiences that connect directly to real-world applications, 
                  helping your child understand the relevance and importance of the skills they're developing.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-persona-purple mb-3">Future-Ready Skillset</h4>
                <p className="text-gray-700 mb-6">
                  Our recommendations are constantly updated based on the latest research about future 
                  workforce needs, ensuring your child develops competencies that will remain relevant 
                  throughout their life.
                </p>
                
                <h4 className="font-semibold text-persona-purple mb-3">Continuous Adaptation</h4>
                <p className="text-gray-700">
                  As your child grows and their interests evolve, our system adapts to provide new 
                  and relevant learning opportunities that continue to engage and challenge them.
                </p>
              </div>
            </div>
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

export default HowItWorks;
