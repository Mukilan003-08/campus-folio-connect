
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Unauthorized = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToHomepage = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="mb-8">
          <div className="inline-block p-4 rounded-full bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2">Unauthorized Access</h1>
        <p className="text-muted-foreground mb-6">
          {user ? (
            <>
              You don't have permission to access this page. This area requires higher privileges than your current role ({user.role}).
            </>
          ) : (
            <>
              You need to be logged in to access this page. Please log in with your account credentials.
            </>
          )}
        </p>
        <Button onClick={goToHomepage}>Return to Dashboard</Button>
      </div>
    </div>
  );
};

export default Unauthorized;
