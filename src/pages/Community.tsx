
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import DiscussionCard from '@/components/discussions/DiscussionCard';

// Temporary mock data for discussions
const initialDiscussions = [
  {
    id: '1',
    title: 'What activities help develop critical thinking in 5-year-olds?',
    content: 'I\'m looking for activities that can help my 5-year-old develop critical thinking skills. What has worked for your children?',
    author: 'Sarah Johnson',
    date: '2 days ago',
    comments: [
      { id: '1-1', author: 'Michael Chen', date: '1 day ago', content: 'Puzzle games worked really well for my daughter. We started with simple jigsaw puzzles and gradually increased difficulty.' },
      { id: '1-2', author: 'Emma Williams', date: '10 hours ago', content: 'We play "spot the difference" games and ask open-ended questions during story time. This has helped my son develop comparative thinking skills.' }
    ],
    likes: 24,
    liked: false,
    tags: ['Critical Thinking', 'Activities', 'Early Development']
  },
  {
    id: '2',
    title: 'Recommendations for handling tantrums positively',
    content: 'My 3-year-old has been having frequent tantrums lately. I\'m looking for positive discipline strategies that have worked for other parents.',
    author: 'Michael Chen',
    date: '5 days ago',
    comments: [
      { id: '2-1', author: 'Sarah Johnson', date: '4 days ago', content: 'Acknowledging their feelings helped us a lot. "I can see you\'re upset" validates their emotions while staying calm yourself.' }
    ],
    likes: 42,
    liked: false,
    tags: ['Discipline', 'Emotional Development', 'Toddlers']
  },
  {
    id: '3',
    title: 'Best local playgroups for shy children?',
    content: 'My daughter is quite shy and I\'d like to find a supportive playgroup environment where she can gradually build confidence. Any recommendations?',
    author: 'Emma Williams',
    date: '1 week ago',
    comments: [],
    likes: 15,
    liked: false,
    tags: ['Social Skills', 'Playgroups', 'Shy Children']
  }
];

const Community = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [showNewDiscussionForm, setShowNewDiscussionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedComments, setExpandedComments] = useState({});
  const { toast } = useToast();

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
      comments: [],
      likes: 0,
      liked: false,
      tags: ['New Discussion']
    };

    setDiscussions([newDiscussion, ...discussions]);
    setNewDiscussionTitle('');
    setNewDiscussionContent('');
    setShowNewDiscussionForm(false);
  };

  const toggleComments = (discussionId) => {
    setExpandedComments(prev => ({
      ...prev,
      [discussionId]: !prev[discussionId]
    }));
  };

  const handleAddComment = (discussionId, commentText) => {
    if (!commentText.trim()) return;
    
    setDiscussions(currentDiscussions => 
      currentDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          const newComment = {
            id: `${discussionId}-${Date.now()}`,
            author: 'You', // In a real app, this would be the authenticated user
            date: 'Just now',
            content: commentText
          };
          return {
            ...discussion,
            comments: [...discussion.comments, newComment]
          };
        }
        return discussion;
      })
    );

    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully",
    });
  };

  const handleLike = (discussionId) => {
    setDiscussions(currentDiscussions => 
      currentDiscussions.map(discussion => {
        if (discussion.id === discussionId) {
          const isLiked = discussion.liked;
          return {
            ...discussion,
            likes: isLiked ? discussion.likes - 1 : discussion.likes + 1,
            liked: !isLiked
          };
        }
        return discussion;
      })
    );
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
                  <DiscussionCard 
                    key={discussion.id} 
                    discussion={discussion} 
                    onToggleComments={toggleComments}
                    isCommentsExpanded={!!expandedComments[discussion.id]}
                    onAddComment={handleAddComment}
                    onLike={handleLike}
                  />
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
                <DiscussionCard 
                  key={discussion.id} 
                  discussion={discussion} 
                  onToggleComments={toggleComments}
                  isCommentsExpanded={!!expandedComments[discussion.id]}
                  onAddComment={handleAddComment}
                  onLike={handleLike}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="newest">
            <div className="space-y-6">
              {/* In a real app, you'd sort by actual dates */}
              {filteredDiscussions.map((discussion) => (
                <DiscussionCard 
                  key={discussion.id} 
                  discussion={discussion} 
                  onToggleComments={toggleComments}
                  isCommentsExpanded={!!expandedComments[discussion.id]}
                  onAddComment={handleAddComment}
                  onLike={handleLike}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="unanswered">
            <div className="space-y-6">
              {filteredDiscussions.filter(d => d.comments.length === 0).map((discussion) => (
                <DiscussionCard 
                  key={discussion.id} 
                  discussion={discussion} 
                  onToggleComments={toggleComments}
                  isCommentsExpanded={!!expandedComments[discussion.id]}
                  onAddComment={handleAddComment}
                  onLike={handleLike}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
