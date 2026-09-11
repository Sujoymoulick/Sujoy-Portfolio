// ============================================================
// src/pages/api/models.ts
// GET /api/models — returns safe public model metadata
// Never returns API keys or internal configuration
// ============================================================

import type { APIRoute } from 'astro';
import { getPublicModelData } from '../../lib/ai/models';

export const GET: APIRoute = () => {
  const models = getPublicModelData();
  return new Response(JSON.stringify(models), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600', // cache for 1 hour
    },
  });
};

export const POST: APIRoute = () => {
  return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' },
  });
};
