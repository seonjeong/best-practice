import type { ReactNode } from 'react';

import { ROUTES } from '@/constants/routes';

import { Login, Home } from '@/pages';

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
];

export { routes };
