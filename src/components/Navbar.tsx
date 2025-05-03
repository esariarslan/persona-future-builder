
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, BarChart, Home, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-persona-blue text-2xl font-heading font-bold">Persona<span className="text-persona-green">Learn</span></span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-persona-blue">
              <Home className="mr-1.5 h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-persona-blue">
              <BarChart className="mr-1.5 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/resources" className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-persona-blue">
              <BookOpen className="mr-1.5 h-4 w-4" />
              <span>Resources</span>
            </Link>
            <Button variant="outline" size="sm" className="ml-4">
              <User className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
