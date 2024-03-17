/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/SetupTests.ts',
    include: ['./src/tests/**/*.test.ts', './src/tests/**/*.test.tsx'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@pages': '/src/pages',
      '@context': '/src/context',
      '@service': '/src/service',
      '@hooks': '/src/hooks',
      '@routes': '/src/routes',
      '@layout': '/src/layout',
    },
  },
});
