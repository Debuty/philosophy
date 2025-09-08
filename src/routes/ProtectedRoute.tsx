import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Loading from '../shared/loading/Loading';

interface ProtectedRouteProps {
  redirectPath: string;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath,
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to get session from Supabase
  const getSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(!!session);
      }
    } catch (error) {
      console.error('Error in getSession:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setIsAuthenticated(!!session);
        setIsLoading(false);
      }
    );

  
    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <Loading message="Checking authentication..." />;
  }


  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to:', redirectPath);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
