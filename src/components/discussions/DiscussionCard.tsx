
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ThumbsUp, Share, User, MessageSquare, Copy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import CommentSection from '@/components/comments/CommentSection';
import { generateShareableUrl, shareToWhatsApp } from '@/utils/shareUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  const [shareOptionsVisible, setShareOptionsVisible] = useState(false);
  
  // Create shareable URL for this discussion
  const shareableUrl = generateShareableUrl(discussion.id);
  
  // Handle copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      
      toast({
        title: "Link copied!",
        description: "Discussion link copied to your clipboard",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the link manually",
        variant: "destructive",
      });
    }
  };
  
  // Handle direct share to WhatsApp
  const handleWhatsAppShare = () => {
    shareToWhatsApp(
      `Persona Parent Community: ${discussion.title}`,
      shareableUrl
    );
  };

  const toggleShareOptions = () => {
    setShareOptionsVisible(!shareOptionsVisible);
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-gray-600"
                  onClick={() => onToggleComments(discussion.id)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{discussion.comments.length}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isCommentsExpanded ? 'Hide comments' : 'Show comments'}
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 ${discussion.liked ? 'text-persona-blue' : 'text-gray-600'}`}
                  onClick={() => onLike(discussion.id)}
                >
                  <ThumbsUp className={`h-4 w-4 ${discussion.liked ? 'fill-persona-blue' : ''}`} />
                  <span>{discussion.likes}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {discussion.liked ? 'Unlike' : 'Like this discussion'}
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={shareOptionsVisible ? "secondary" : "ghost"}
                  size="sm" 
                  className="flex items-center gap-1 text-gray-600"
                  onClick={toggleShareOptions}
                >
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Share this discussion
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {shareOptionsVisible && (
          <div className="w-full mt-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium mb-3">Share this discussion</p>
              
              <div className="grid gap-2">
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={handleCopyLink} 
                    variant="outline" 
                    size="sm"
                    className="gap-1.5 text-gray-700"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy link
                  </Button>
                  
                  <Button 
                    onClick={handleWhatsAppShare} 
                    variant="outline" 
                    size="sm"
                    className="gap-1.5 text-green-700 border-green-200 bg-green-50 hover:bg-green-100"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
