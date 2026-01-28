import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-nojekyll',
      closeBundle() {
        writeFileSync('../docs/.nojekyll', '');
      },
    },
  ],
  base: '/a11y-react/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
});
