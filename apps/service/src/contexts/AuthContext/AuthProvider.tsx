import { useState, useMemo, useCallback } from 'react';
import type { ReactNode } from 'react';

import { tokenStorage } from '@/auth/tokenStorage';

import { authContext } from './AuthContext';

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = useCallback(({ accessToken }: { accessToken: string }) => {
    tokenStorage.set(accessToken);

    setIsAuthenticated(true);
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login }), [isAuthenticated, login]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
