import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

import { AppProviders } from '@/providers';

import { tokenStorage } from '@/auth/tokenStorage';
import { enableMocking } from './mocks/msw/browser';

async function bootstrap() {
  tokenStorage.load();

  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
}

bootstrap();
