import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

import { ReactQueryProvider } from '@/providers';
import { AuthProvider } from '@/contexts';

import { tokenStorage } from '@/auth/tokenStorage';
import { enableMocking } from './mocks/msw/browser';

async function bootstrap() {
  tokenStorage.load();

  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <Router>
          <ReactQueryProvider>
            <App />
          </ReactQueryProvider>
        </Router>
      </AuthProvider>
    </StrictMode>,
  );
}

bootstrap();
