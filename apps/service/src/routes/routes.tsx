import type { ReactNode } from 'react';

interface Route {
  path: string;
  element: ReactNode;
}

const routes: Route[] = [];

export { routes };
