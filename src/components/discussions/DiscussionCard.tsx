
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ThumbsUp, Share, User, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommentSection from '@/components/comments/CommentSection';
import { generateShareableUrl, shareContent, shareToWhatsApp } from '@/utils/shareUtils';

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: Comment[];
  likes: number;
  liked: boolean;
  tags: string[];
}

interface DiscussionCardProps {
  discussion: Discussion;
  onToggleComments: (discussionId: string) => void;
  isCommentsExpanded: boolean;
  onAddComment: (discussionId: string, commentText: string) => void;
  onLike: (discussionId: string) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ 
  discussion, 
  onToggleComments, 
  isCommentsExpanded, 
  onAddComment, 
  onLike 
}) => {
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

export default DiscussionCard;
