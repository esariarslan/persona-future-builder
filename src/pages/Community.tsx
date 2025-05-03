
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, ThumbsUp, Share, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Temporary mock data for discussions
const initialDiscussions = [
  {
    id: '1',
    title: 'What activities help develop critical thinking in 5-year-olds?',
    content: 'I\'m looking for activities that can help my 5-year-old develop critical thinking skills. What has worked for your children?',
    author: 'Sarah Johnson',
    date: '2 days ago',
    comments: 12,
    likes: 24,
    tags: ['Critical Thinking', 'Activities', 'Early Development']
  },
  {
    id: '2',
    title: 'Recommendations for handling tantrums positively',
    content: 'My 3-year-old has been having frequent tantrums lately. I\'m looking for positive discipline strategies that have worked for other parents.',
    author: 'Michael Chen',
    date: '5 days ago',
    comments: 28,
    likes: 42,
    tags: ['Discipline', 'Emotional Development', 'Toddlers']
  },
  {
    id: '3',
    title: 'Best local playgroups for shy children?',
    content: 'My daughter is quite shy and I\'d like to find a supportive playgroup environment where she can gradually build confidence. Any recommendations?',
    author: 'Emma Williams',
    date: '1 week ago',
    comments: 8,
    likes: 15,
    tags: ['Social Skills', 'Playgroups', 'Shy Children']
  }
];

const Community = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateDiscussion = () => {
    if (newDiscussionTitle.trim() === '' || newDiscussionContent.trim() === '') {
      return;
    }

    const newDiscussion = {
      id: Date.now().toString(),
      title: newDiscussionTitle,
      content: newDiscussionContent,
      author: 'You', // In a real app, this would come from the authenticated user
      date: 'Just now',
      comments: 0,
      likes: 0,
      tags: ['New Discussion']
    };

    setDiscussions([newDiscussion, ...discussions]);
    setNewDiscussionTitle('');
    setNewDiscussionContent('');
    setShowNewDiscussionForm(false);
  };

  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-persona-soft-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold font-heading text-persona-blue">Parent Community</h1>
              <p className="text-gray-600">Connect, share, and learn with other parents</p>
            </div>
            <Button 
              className="bg-persona-green hover:bg-persona-green/90"
              onClick={() => setShowNewDiscussionForm(true)}
            >
              Start a Discussion
            </Button>
          </div>
          
          {/* Search bar */}
          <div className="mt-6">
            <Input
              placeholder="Search discussions..."
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* New Discussion Form */}
        {showNewDiscussionForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Start a New Discussion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Discussion Title"
                  value={newDiscussionTitle}
                  onChange={(e) => setNewDiscussionTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Share your question or thoughts..."
                  className="min-h-[150px]"
                  value={newDiscussionContent}
                  onChange={(e) => setNewDiscussionContent(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNewDiscussionForm(false)}>Cancel</Button>
              <Button 
                className="bg-persona-blue hover:bg-persona-blue/90"
                onClick={handleCreateDiscussion}
                disabled={!newDiscussionTitle || !newDiscussionContent}
              >
                Post Discussion
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Tabs for filtering content */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Discussions</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {/* Discussion feed will be shown for all tabs in this demo */}
            {filteredDiscussions.length > 0 ? (
              <div className="space-y-6">
                {filteredDiscussions.map((discussion) => (
                  <DiscussionCard key={discussion.id} discussion={discussion} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No discussions match your search</h3>
                <p className="text-gray-600">Try using different keywords or start a new discussion</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="popular">
            <div className="space-y-6">
              {filteredDiscussions.sort((a, b) => b.likes - a.likes).map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="newest">
            <div className="space-y-6">
              {/* In a real app, you'd sort by actual dates */}
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="unanswered">
            <div className="space-y-6">
              {filteredDiscussions.filter(d => d.comments === 0).map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Discussion Card Component
const DiscussionCard = ({ discussion }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-persona-blue hover:text-persona-blue/80 cursor-pointer">
              {discussion.title}
            </CardTitle>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{discussion.author}</span>
              </div>
              <span className="mx-2">•</span>
              <span>{discussion.date}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{discussion.content}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {discussion.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-persona-soft-gray text-gray-700">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <div className="flex gap-6">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
            <MessageCircle className="h-4 w-4" />
            <span>{discussion.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
            <ThumbsUp className="h-4 w-4" />
            <span>{discussion.likes}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
          <Share className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Community;
