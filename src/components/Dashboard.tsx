
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillArea {
  name: string;
  progress: number;
  future: boolean;
}

const Dashboard: React.FC = () => {
  const skillAreas: SkillArea[] = [
    { name: "Creativity & Interpersonal Skills", progress: 75, future: true },
    { name: "Analytical Thinking", progress: 45, future: true },
    { name: "Theatre & Performance", progress: 60, future: false },
    { name: "Leadership", progress: 40, future: true },
    { name: "Medical Knowledge & Science", progress: 30, future: false },
    { name: "Technology Literacy", progress: 25, future: true },
    { name: "Emotional Intelligence", progress: 65, future: true },
  ];

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-persona-blue">Skills Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skillAreas.map((skill, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="font-medium text-sm">{skill.name}</span>
                  {skill.future && (
                    <span className="ml-2 px-1.5 py-0.5 bg-persona-light-purple text-persona-purple text-xs rounded-full">
                      Future Skill
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{skill.progress}%</span>
              </div>
              <div className="skill-progress">
                <div 
                  className="skill-progress-bar" 
                  style={{ '--progress-value': `${skill.progress}%` } as React.CSSProperties} 
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
