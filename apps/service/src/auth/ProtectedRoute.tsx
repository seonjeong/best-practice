import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/contexts';

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', {
        replace: true,
      });
    }
  }, [navigate, isAuthenticated]);

  if (!isAuthenticated) return null;

  return children;
};

export { ProtectedRoute };
