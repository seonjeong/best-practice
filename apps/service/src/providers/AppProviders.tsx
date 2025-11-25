import type { ReactNode } from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ReactQueryProvider } from '@/providers';
import { AuthProvider } from '@/contexts';

type Props = {
  children: ReactNode;
};

const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <Router>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </Router>
    </AuthProvider>
  );
};

export { AppProviders };
