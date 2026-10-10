import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  server: { port: 3000 },
  vite: {
    css: {
      preprocessorOptions: {}
    },
  },
});
