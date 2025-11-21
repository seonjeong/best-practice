import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuthContext } from '@/contexts';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
        state: { from: location },
      });
    }
  }, [navigate, location, isAuthenticated]);

  if (!isAuthenticated) return null;

  return children;
};

export { ProtectedRoute };
