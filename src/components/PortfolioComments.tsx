
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

const PortfolioComments = () => {
  const { user } = useAuth();
  const [comment, setComment] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [comments, setComments] = React.useState([
    { id: 1, text: 'Great portfolio!', reactions: { thumbsUp: 0, thumbsDown: 0 } }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically save to backend
    setComments([...comments, { 
      id: comments.length + 1, 
      text: comment,
      reactions: { thumbsUp: 0, thumbsDown: 0 }
    }]);
    
    setComment('');
    setIsSubmitting(false);
  };

  const handleReaction = (commentId: number, type: 'thumbsUp' | 'thumbsDown') => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          reactions: {
            ...comment.reactions,
            [type]: comment.reactions[type] + 1
          }
        };
      }
      return comment;
    }));
  };

  if (!user) return null;

  const canComment = ['admin', 'superadmin'].includes(user.role);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Portfolio Comments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {canComment && (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <Textarea
              placeholder="Write your review comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </Button>
          </form>
        )}

        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-muted p-4 rounded-lg space-y-2">
              <p>{comment.text}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleReaction(comment.id, 'thumbsUp')}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.reactions.thumbsUp}</span>
                </button>
                <button
                  onClick={() => handleReaction(comment.id, 'thumbsDown')}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>{comment.reactions.thumbsDown}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioComments;
