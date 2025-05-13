
import React from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { sampleLearningPath } from '@/data/futureSkills';
import { CheckCircle2, Circle } from 'lucide-react';

const LearningPaths = () => {
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
          <h1 className="text-4xl font-bold font-heading text-white">Learning Paths</h1>
          <p className="text-xl text-white/90 mt-4">
            Personalized journeys that guide your child's development based on their unique profile
          </p>
        </div>
      </div>
      
      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-heading mb-6 text-center">What is a Learning Path?</h2>
            <p className="text-lg text-gray-700 mb-6">
              A learning path is a personalized roadmap that guides your child's development journey, 
              focusing on their unique interests, strengths, and growth opportunities. Each path is 
              dynamically generated and updated to ensure it remains relevant and engaging.
            </p>
            <p className="text-lg text-gray-700">
              Unlike traditional educational curricula, our learning paths integrate formal and 
              informal learning experiences, connecting children with real-world opportunities in 
              your local area that match their specific developmental needs.
            </p>
          </div>
          
          {/* Sample Path */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-2xl font-semibold">Sample Learning Path: Medical & Performance Arts</h3>
              <p className="text-gray-600 mt-2">For Emma, age 9, with interests in medicine and theatre</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {sampleLearningPath.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-start p-4 rounded-lg border ${
                      item.completed ? 'border-persona-green/30 bg-persona-green/5' : 'border-gray-200'
                    }`}
                  >
                    <div className="mr-4 mt-1">
                      {item.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-persona-green" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-800 mt-1">
                            {item.type}
                          </span>
                          <span className="inline-block px-2 py-1 text-xs rounded bg-persona-light-purple text-persona-purple ml-2 mt-1">
                            {item.skillArea}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-gray-700 mt-3">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-16 px-4 bg-persona-light-blue/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Key Features of Our Learning Paths</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-persona-blue/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-persona-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Adaptable & Dynamic</h3>
              <p className="text-gray-700">
                Learning paths evolve as your child grows, adjusting to new interests, 
                completed activities, and your feedback. We continually update recommendations 
                based on your child's progress.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-persona-green/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-persona-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-World Connected</h3>
              <p className="text-gray-700">
                We connect learning objectives with real opportunities in the Geneva area, 
                from workshops to courses to community events that match your child's 
                developmental needs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-persona-purple/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-persona-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Holistically Balanced</h3>
              <p className="text-gray-700">
                Our paths ensure balanced development across cognitive, social, emotional, 
                and practical domains, preparing your child for future challenges in a 
                comprehensive way.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading mb-6">Create Your Child's Path</h2>
          <p className="text-lg text-gray-700 mb-8">
            Ready to start your child on their personalized learning journey? Create an account 
            to build their profile and receive a custom-tailored learning path.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/auth">
              <Button className="bg-persona-blue hover:bg-persona-blue/90">
                Get Started
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" className="border-persona-blue text-persona-blue hover:bg-persona-blue/10">
                Learn More
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

export default LearningPaths;
