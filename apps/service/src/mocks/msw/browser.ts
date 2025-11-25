import { setupWorker } from 'msw/browser';

export async function enableMocking() {
  if (!import.meta.env.DEV) return;

  const { handlers } = await import('./handlers');

  const worker = setupWorker(...handlers);

  return worker.start();
}
