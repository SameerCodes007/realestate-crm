import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { user, loading, isInitialized, error } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !user && isInitialized && !isRedirecting) {
      setIsRedirecting(true);
      // Add a small delay to prevent potential redirect loops
        navigate('/login');
      
    }
  }, [user, loading, isInitialized, navigate, isRedirecting]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Show error state if there's an auth error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">
          Session expired. Redirecting to login...
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : null;
};

export default AuthGuard;