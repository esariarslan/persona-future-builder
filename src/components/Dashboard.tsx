
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from 'recharts';

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

  // Calculate overall progress
  const overallProgress = Math.round(skillAreas.reduce((sum, skill) => sum + skill.progress, 0) / skillAreas.length);

  // Data for progress pie chart
  const pieData = [
    { name: "Progress", value: overallProgress, color: "#4C8BF5" },
    { name: "Remaining", value: 100 - overallProgress, color: "#E0E0E0" }
  ];

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl text-persona-blue">Skills Dashboard</CardTitle>
        <div className="flex items-center bg-persona-light-blue p-2 rounded-full">
          <div className="h-16 w-16 relative">
            <PieChart width={64} height={64}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={22}
                outerRadius={30}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-persona-blue font-bold">
              {overallProgress}%
            </div>
          </div>
        </div>
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
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-persona-blue to-persona-green rounded-full"
                  style={{ width: `${skill.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
