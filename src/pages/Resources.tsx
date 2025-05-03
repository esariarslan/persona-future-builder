
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import RecommendationCard from '@/components/RecommendationCard';
import { recommendedActivities } from '@/data/futureSkills';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Get unique activity types for filter
  const activityTypes = Array.from(new Set(recommendedActivities.map(activity => activity.type)));

  // Filter activities based on search term and filter type
  const filteredActivities = recommendedActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          activity.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !filterType || activity.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleFilterClick = (type: string) => {
    if (filterType === type) {
      setFilterType(null);
    } else {
      setFilterType(type);
    }
  };

  return (
    <div className="min-h-screen bg-persona-soft-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading text-persona-blue">Resources & Activities</h1>
          <p className="text-gray-600">Discover local opportunities to support your child's development</p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, skill, or description..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>
          
          {/* Activity Type Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-500 self-center mr-2">Activity Type:</span>
            {activityTypes.map((type) => (
              <Badge
                key={type}
                onClick={() => handleFilterClick(type)}
                className={`cursor-pointer ${filterType === type 
                  ? 'bg-persona-blue text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-medium mb-2">No resources match your search</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
