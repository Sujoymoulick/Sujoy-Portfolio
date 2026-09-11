import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  // 'server' mode enables server-side API routes (required for /api/chat)
  // The Cloudflare adapter handles this at the edge — no infrastructure change needed
  // (wrangler.toml already configures Cloudflare Pages deployment)
  output: 'server',
  adapter: cloudflare(),
  integrations: [react()],
  server: { port: 3000 },
  vite: {
    css: {
      preprocessorOptions: {}
    },
  },
});
