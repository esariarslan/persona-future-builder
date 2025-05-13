
import React from 'react';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { futureSkills } from '@/data/futureSkills';

const FutureSkills = () => {
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
          <h1 className="text-4xl font-bold font-heading text-white">Future Skills</h1>
          <p className="text-xl text-white/90 mt-4">
            The skills that will prepare children for the jobs and challenges of tomorrow's world
          </p>
        </div>
      </div>
      
      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-6">Preparing Children for an Evolving World</h2>
            <p className="text-lg text-gray-700">
              Based on extensive research into future job markets and societal trends, 
              we've identified key skill categories that will be essential for children to thrive 
              in the rapidly changing landscape of the future workforce.
            </p>
          </div>
          
          {/* Skills Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {futureSkills.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`h-2 ${
                  index === 0 ? 'bg-persona-purple' : 
                  index === 1 ? 'bg-persona-blue' : 
                  index === 2 ? 'bg-persona-green' :
                  'bg-persona-orange'
                }`}></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">{category.category} Skills</h3>
                  <ul className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-start">
                        <span className={`h-5 w-5 ${
                          index === 0 ? 'text-persona-purple' : 
                          index === 1 ? 'text-persona-blue' : 
                          index === 2 ? 'text-persona-green' :
                          'text-persona-orange'
                        } flex-shrink-0 mr-3 font-bold`}>•</span>
                        <div>
                          <p className="font-medium text-gray-900">{skill}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Explanations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-16">Why These Skills Matter</h2>
          
          <div className="space-y-16">
            {/* Cognitive */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-persona-purple/10 p-6 rounded-lg border border-persona-purple/20">
                  <h3 className="text-2xl font-semibold mb-4 text-persona-purple">Cognitive Skills</h3>
                  <p className="text-gray-700">
                    In a world of increasing complexity and automation, the ability to think deeply, 
                    solve problems creatively, and analyze information critically will be more valuable than ever.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-4">Applications in Future Careers</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Complex Problem Solving</h5>
                    <p className="text-gray-700 mb-4">
                      As routine tasks become automated, professionals will need to tackle increasingly 
                      complex challenges that require integrated approaches and innovative solutions.
                    </p>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Systems Thinking</h5>
                    <p className="text-gray-700">
                      Understanding how different components interact within complex systems will be 
                      crucial for addressing global challenges like climate change and public health.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Critical & Analytical Thinking</h5>
                    <p className="text-gray-700 mb-4">
                      In an age of information overload and misinformation, the ability to evaluate 
                      sources, analyze evidence, and make reasoned judgments will be essential.
                    </p>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Creative Innovation</h5>
                    <p className="text-gray-700">
                      With AI handling routine tasks, human creativity will become even more valuable, 
                      driving innovation and addressing problems that require lateral thinking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interpersonal */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-persona-blue/10 p-6 rounded-lg border border-persona-blue/20">
                  <h3 className="text-2xl font-semibold mb-4 text-persona-blue">Interpersonal Skills</h3>
                  <p className="text-gray-700">
                    Human connection, collaboration, and communication remain irreplaceable in a 
                    technology-driven world, making social skills more valuable than technical ones alone.
                  </p>
                </div>
              </div>
              <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold text-lg mb-4">The Human Advantage</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Emotional Intelligence</h5>
                    <p className="text-gray-700 mb-4">
                      Understanding emotions—both your own and others'—enables effective teamwork,
                      leadership, and conflict resolution in complex work environments.
                    </p>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Communication</h5>
                    <p className="text-gray-700">
                      The ability to express ideas clearly and persuasively across diverse audiences 
                      and platforms will remain essential in virtually every profession.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Collaboration</h5>
                    <p className="text-gray-700 mb-4">
                      Complex challenges require diverse perspectives and collaborative approaches,
                      making teamwork across cultures and disciplines increasingly important.
                    </p>
                    
                    <h5 className="font-medium text-gray-900 mb-2">Leadership & Influence</h5>
                    <p className="text-gray-700">
                      The ability to inspire others, build consensus, and lead through complexity 
                      and change will be highly valued in organizations of the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* More skill categories would follow the same pattern */}
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

export default FutureSkills;
