
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const AuthLinks: React.FC = () => {
  const { user } = useAuth();
  
  if (user) {
    return (
      <Link to="/dashboard">
        <Button className="bg-persona-blue text-white hover:bg-persona-blue/90">
          Go to Dashboard
        </Button>
      </Link>
    );
  }
  
  return (
    <Link to="/auth">
      <Button className="bg-persona-blue text-white hover:bg-persona-blue/90">
        Get Started
      </Button>
    </Link>
  );
};

export default AuthLinks;
