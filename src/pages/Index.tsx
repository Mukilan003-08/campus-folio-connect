
import { Navigate } from 'react-router-dom';

// Redirect to the main dashboard
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
