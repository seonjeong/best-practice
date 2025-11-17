import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  return {
    plugins: [
      react(),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.app.json',
        },
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@design-system': isDev
          ? path.resolve(__dirname, '../../packages/design-system/src')
          : '@design-system/ui',
        '@api-docs': isDev
          ? path.resolve(__dirname, '../../packages/api-docs/src')
          : '@api-docs/spec',
      },
    },
  };
});
