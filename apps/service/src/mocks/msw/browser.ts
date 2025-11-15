import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

export async function enableMocking() {
  if (!import.meta.env.DEV) return;

  const worker = setupWorker(...handlers);
  return worker.start();
}
