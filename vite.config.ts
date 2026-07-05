import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  // tanstackRouter must run before react() so route files are generated first
  plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
});
