
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Map, Calendar, ArrowRight } from "lucide-react";

interface RecommendationProps {
  title: string;
  description: string;
  type: string;
  location: string;
  date?: string;
  skills: string[];
  image?: string;
}

const RecommendationCard: React.FC<RecommendationProps> = ({
  title,
  description,
  type,
  location,
  date,
  skills,
  image
}) => {
  return (
    <Card className="card-hover overflow-hidden">
      {image && (
        <div className="h-40 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover" 
          />
        </div>
      )}
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-heading font-semibold text-lg">{title}</h3>
          <Badge className="bg-persona-blue text-white">{type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="text-xs text-gray-500 space-y-1 mb-3">
          <div className="flex items-center">
            <Map className="h-3 w-3 mr-1.5" />
            <span>{location}</span>
          </div>
          {date && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1.5" />
              <span>{date}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-persona-soft-bg">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" size="sm" className="w-full text-persona-blue hover:text-persona-blue hover:bg-persona-blue/10">
          Learn More <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
