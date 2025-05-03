import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, ThumbsUp, Share, User, Send, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { generateShareableUrl, shareContent, shareToWhatsApp } from '@/utils/shareUtils';

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

// Comment section component
const CommentSection = ({ discussionId, comments, onAddComment }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const submitComment = (data) => {
    onAddComment(discussionId, data.comment);
    reset();
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-medium text-lg mb-2">Comments ({comments.length})</h3>
      
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 pb-4 border-b last:border-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-gray-100 rounded-full p-1">
              <User className="h-4 w-4 text-gray-500" />
            </div>
            <span className="font-medium">{comment.author}</span>
            <span className="text-xs text-gray-500">· {comment.date}</span>
          </div>
          <p className="text-gray-700 pl-7">{comment.content}</p>
        </div>
      ))}
      
      <form onSubmit={handleSubmit(submitComment)} className="mt-4 flex gap-2">
        <Input 
          placeholder="Add a comment..." 
          className="flex-grow"
          {...register("comment", { required: true })}
        />
        <Button type="submit" size="sm" className="bg-persona-blue hover:bg-persona-blue/90 flex gap-1">
          <Send className="h-4 w-4" />
          <span>Post</span>
        </Button>
      </form>
    </div>
  );
};

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

// Discussion Card Component
const DiscussionCard = ({ discussion, onToggleComments, isCommentsExpanded, onAddComment, onLike }) => {
  const { toast } = useToast();
  
  // Create shareable URL for this discussion
  const shareableUrl = generateShareableUrl(discussion.id);
  
  // Handle the share button click
  const handleShare = async () => {
    try {
      await shareContent(
        `Persona Parent Community: ${discussion.title}`,
        `Check out this discussion in the Persona Parent Community: "${discussion.title}"`,
        shareableUrl
      );
      
      toast({
        title: "Link copied to clipboard",
        description: "You can now paste the link anywhere to share this discussion",
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  
  // Handle direct share to WhatsApp
  const handleWhatsAppShare = () => {
    shareToWhatsApp(
      `Persona Parent Community: ${discussion.title}`,
      shareableUrl
    );
  };

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
      <CardFooter className="border-t pt-4 flex flex-col">
        <div className="w-full flex justify-between">
          <div className="flex gap-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-gray-600"
              onClick={() => onToggleComments(discussion.id)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{discussion.comments.length}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`flex items-center gap-1 ${discussion.liked ? 'text-persona-blue' : 'text-gray-600'}`}
              onClick={() => onLike(discussion.id)}
            >
              <ThumbsUp className={`h-4 w-4 ${discussion.liked ? 'fill-persona-blue' : ''}`} />
              <span>{discussion.likes}</span>
            </Button>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="end">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Share this discussion</h4>
                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={handleShare} 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                  >
                    <Share className="h-4 w-4" />
                    Copy link
                  </Button>
                  <Button 
                    onClick={handleWhatsAppShare} 
                    variant="outline" 
                    className="w-full justify-start gap-2 bg-green-50 hover:bg-green-100 text-green-700 border-green-200"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Share via WhatsApp
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {isCommentsExpanded && (
          <CommentSection 
            discussionId={discussion.id} 
            comments={discussion.comments} 
            onAddComment={onAddComment}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default Community;
