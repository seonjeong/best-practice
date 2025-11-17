import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

import { ReactQueryProvider } from '@/providers';

import { enableMocking } from './mocks/msw/browser';

async function bootstrap() {
  await enableMocking();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Router>
        <ReactQueryProvider>
          <App />
        </ReactQueryProvider>
      </Router>
    </StrictMode>,
  );
}

bootstrap();
