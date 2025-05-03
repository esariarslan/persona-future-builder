
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, ThumbsUp, Share, User, MessageSquare, Copy, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommentSection from '@/components/comments/CommentSection';
import { generateShareableUrl, shareContent, shareToWhatsApp } from '@/utils/shareUtils';
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
  const [sharePopoverOpen, setSharePopoverOpen] = useState(false);
  
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
      setSharePopoverOpen(false);
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
    setSharePopoverOpen(false);
  };

  // Handle email share
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Persona Parent Community: ${discussion.title}`);
    const body = encodeURIComponent(`Check out this discussion in the Persona Parent Community: "${discussion.title}"\n\n${shareableUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    setSharePopoverOpen(false);
  };

  // Social media sharing
  const handleSocialShare = (platform: string) => {
    let url = '';
    const title = encodeURIComponent(`Persona Parent Community: ${discussion.title}`);
    const shareUrl = encodeURIComponent(shareableUrl);
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${title}&url=${shareUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
    setSharePopoverOpen(false);
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
          <Popover open={sharePopoverOpen} onOpenChange={setSharePopoverOpen}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                Share this discussion
              </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-72 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-medium text-sm">Share this discussion</h4>
                <p className="text-xs text-gray-500 mt-1">Choose how you want to share this discussion</p>
              </div>
              
              <div className="p-2">
                <div className="grid grid-cols-1 gap-1">
                  <Button 
                    onClick={handleCopyLink} 
                    variant="ghost" 
                    className="w-full justify-start gap-2 rounded-md p-2 h-auto text-sm"
                  >
                    <Copy className="h-4 w-4" />
                    Copy link
                  </Button>
                  
                  <Button 
                    onClick={handleWhatsAppShare} 
                    variant="ghost" 
                    className="w-full justify-start gap-2 rounded-md p-2 h-auto text-sm text-green-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Share via WhatsApp
                  </Button>
                  
                  <Button 
                    onClick={handleEmailShare} 
                    variant="ghost" 
                    className="w-full justify-start gap-2 rounded-md p-2 h-auto text-sm text-blue-700"
                  >
                    <Mail className="h-4 w-4" />
                    Share via Email
                  </Button>
                </div>
              </div>
              
              <div className="p-2 pt-0">
                <p className="text-xs text-gray-500 px-2 pt-1 pb-2">Share to social media</p>
                <div className="flex gap-2 justify-around px-2">
                  <Button 
                    onClick={() => handleSocialShare('facebook')} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-9 w-9 bg-blue-50 border-blue-200 hover:bg-blue-100"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button 
                    onClick={() => handleSocialShare('twitter')} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-9 w-9 bg-sky-50 border-sky-200 hover:bg-sky-100"
                  >
                    <Twitter className="h-4 w-4 text-sky-500" />
                  </Button>
                  <Button 
                    onClick={() => handleSocialShare('linkedin')} 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-9 w-9 bg-blue-50 border-blue-200 hover:bg-blue-100"
                  >
                    <Linkedin className="h-4 w-4 text-blue-700" />
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
