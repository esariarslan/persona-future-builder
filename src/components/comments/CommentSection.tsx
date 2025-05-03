
import React from 'react';
import { useForm } from 'react-hook-form';
import { User, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
}

interface CommentSectionProps {
  discussionId: string;
  comments: Comment[];
  onAddComment: (discussionId: string, commentText: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ discussionId, comments, onAddComment }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const submitComment = (data: { comment: string }) => {
    onAddComment(discussionId, data.comment);
    reset();
  };

  return (
    <div className="mt-6 border-t pt-4 w-full">
      <h3 className="font-medium text-lg mb-4">Comments ({comments.length})</h3>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="pb-4 border-b last:border-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-gray-100 rounded-full p-1">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <span className="font-medium">{comment.author}</span>
              <span className="text-xs text-gray-500">· {comment.date}</span>
            </div>
            <p className="text-gray-700 ml-7">{comment.content}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <form onSubmit={handleSubmit(submitComment)} className="flex gap-2">
          <Input 
            placeholder="Add a comment..." 
            className="flex-grow"
            {...register("comment", { required: true })}
          />
          <Button type="submit" size="sm" className="bg-persona-blue hover:bg-persona-blue/90">
            <Send className="h-4 w-4 mr-1" />
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentSection;
