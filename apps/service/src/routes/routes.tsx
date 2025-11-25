import type { ReactNode } from 'react';

import { ProtectedRoute } from '@/auth/ProtectedRoute';
import { GuestRoute } from '@/auth/GuestRoute';

import { ROUTES } from '@/constants/routes';

import { Login, Home, Posts } from '@/pages';

interface Route {
  path: string;
  element: ReactNode;
}

const routes: Route[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: ROUTES.POSTS,
    element: (
      <ProtectedRoute>
        <Posts />
      </ProtectedRoute>
    ),
  },
];

export { routes };
