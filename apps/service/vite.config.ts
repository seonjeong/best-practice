import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: {
        tsconfigPath: './tsconfig.app.json',
      },
    }),
  ],
  resolve: {
    alias: {
      '@design-system': path.resolve(__dirname, '../../packages/design-system/src'),
    },
  },
});
