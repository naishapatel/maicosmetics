
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to save the current path to localStorage when redirecting to auth
 * This is used to redirect back to the original path after login
 */
export const useAuthRedirect = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Save the current path to localStorage if not already on /auth
    if (!location.pathname.includes('/auth')) {
      localStorage.setItem('returnPath', location.pathname);
    }
  }, [location]);
};
