
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2 } from 'lucide-react';

const PortfolioLink = () => {
  const { user } = useAuth();
  const [portfolioUrl, setPortfolioUrl] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically save to backend
    console.log('Portfolio URL submitted:', portfolioUrl);
    
    setIsSubmitting(false);
    setIsEditing(false);
  };

  if (!user || user.role !== 'student') {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Portfolio Link
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isEditing && portfolioUrl ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex-1 truncate">
                {portfolioUrl}
              </a>
              <Button onClick={() => setIsEditing(true)}>Edit Link</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="Enter your portfolio website URL"
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {portfolioUrl && (
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : portfolioUrl ? 'Update Link' : 'Submit Link'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default PortfolioLink;
