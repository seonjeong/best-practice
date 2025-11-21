import { createContext } from 'react';

type ContextValue = {
  isAuthenticated: boolean;
  login: ({ accessToken }: { accessToken: string }) => void;
};

export const authContext = createContext<ContextValue | undefined>(undefined);
