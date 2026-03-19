import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        '.next/',
        'scripts/',
        '*.config.*',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        'vitest.config.ts',
        'vitest.setup.ts',
      ],
      thresholds: {
        lines: 50,
        functions: 75,
        branches: 30,
        statements: 50,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
