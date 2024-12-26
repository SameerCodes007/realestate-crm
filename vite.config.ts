import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Change this if deploying to subdirectory
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-icons': ['lucide-react']
        }
      }
    }
  }
});
