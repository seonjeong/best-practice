import type { ReactNode } from 'react';

import { ProtectedRoute } from '@/auth/ProtectedRoute';

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
    element: <Login />,
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
