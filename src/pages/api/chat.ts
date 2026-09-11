// ============================================================
// src/pages/api/chat.ts
// SujoyGPT server-side API endpoint
// POST /api/chat
//
// ARCHITECTURE:
//   Browser → POST /api/chat → this endpoint → OpenRouter → response
//   The browser NEVER calls OpenRouter directly.
//   The API key is NEVER sent to the browser.
// ============================================================

import type { APIRoute } from 'astro';
import { isValidModel, DEFAULT_MODEL_ID, getModelMetadata, resolveModelId } from '../../lib/ai/models';
import { SYSTEM_PROMPT } from '../../lib/ai/systemPrompt';
import { PORTFOLIO_CONTEXT } from '../../lib/ai/portfolioContext';
import { openRouterChat, type ChatMessage } from '../../lib/ai/openrouter';
import { classifyIntent } from '../../lib/ai/intent';

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 20; // 10 turns
const MAX_CONTENT_PER_HISTORY_MSG = 3000;
const ALLOWED_ROLES = new Set(['user', 'assistant']);

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;           // max requests per window
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute window

// ── Rate limiter ──────────────────────────────────────────────────────────────

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false; // denied
  }

  entry.count += 1;
  return true; // allowed
}

// ── Request types ─────────────────────────────────────────────────────────────

interface IncomingChatRequest {
  message?: unknown;
  prompt?: unknown;
  query?: unknown;
  text?: unknown;
  model?: unknown;
  history?: unknown;
}

interface ValidatedHistory {
  role: 'user' | 'assistant';
  content: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ success: false, message, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function jsonOk(data: Record<string, unknown>): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getClientIP(request: Request): string {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

// ── Main handler ──────────────────────────────────────────────────────────────

export const POST: APIRoute = async ({ request, locals }) => {
  // 1. Rate limiting
  const ip = getClientIP(request);
  if (!checkRateLimit(ip)) {
    return jsonError('SujoyGPT is temporarily busy. Please try again in a moment.', 429);
  }

  // 2. Parse body
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    return jsonError('Request body must be valid JSON.', 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonError('Request body must be a JSON object.', 400);
  }

  // 3. Extract and validate message
  const rawMessage = body.message ?? body.prompt ?? body.content ?? body.query ?? body.text;
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

  if (!message) {
    return jsonError('Message cannot be empty.', 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return jsonError(`Message exceeds maximum length of ${MAX_MESSAGE_LENGTH} characters.`, 400);
  }

  const model = body.model;
  const history = body.history;

  // 4. Validate & resolve model
  const selectedModel = resolveModelId(model);
  const requestedModelMeta = getModelMetadata(selectedModel);

  // 5. Intent Classification & API Key Extraction
  const intent = classifyIntent(message);

  // Safe server debugging log
  console.log('[SujoyGPT] incoming message:', message);
  console.log('[SujoyGPT] selected model:', selectedModel);
  console.log('[SujoyGPT] history length:', Array.isArray(history) ? history.length : 0);

  const cfRuntimeEnv = (locals as any)?.runtime?.env;
  let envKey = '';
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.OPENROUTER_API_KEY) {
      envKey = (import.meta as any).env.OPENROUTER_API_KEY;
    }
  } catch {}
  try {
    if (!envKey && typeof process !== 'undefined' && process?.env?.OPENROUTER_API_KEY) {
      envKey = process.env.OPENROUTER_API_KEY;
    }
  } catch {}

  const apiKey = cfRuntimeEnv?.OPENROUTER_API_KEY || envKey || '';

  // 6. Validate conversation history
  const safeHistory: ValidatedHistory[] = [];
  if (Array.isArray(history)) {
    for (const item of history.slice(-MAX_HISTORY_MESSAGES)) {
      if (
        item &&
        typeof item === 'object' &&
        (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' &&
        item.content.trim().length > 0
      ) {
        safeHistory.push({
          role: item.role as 'user' | 'assistant',
          content: item.content.trim().slice(0, MAX_CONTENT_PER_HISTORY_MSG),
        });
      }
    }
  }

  // 7. Handle MODEL_IDENTITY intent
  if (intent === 'MODEL_IDENTITY') {
    if (!apiKey) {
      const identityMsg = `I'm currently powered by **${requestedModelMeta.name}** (${requestedModelMeta.provider}) through OpenRouter.`;
      return jsonOk({
        success: true,
        message: identityMsg,
        content: identityMsg,
        intent,
        model: requestedModelMeta,
        requestedModel: requestedModelMeta,
        actualModel: requestedModelMeta,
        isFallback: false,
      });
    }

    const identityMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...safeHistory,
      { role: 'user', content: message },
    ];

    const identityResult = await openRouterChat({
      model: selectedModel,
      messages: identityMessages,
      timeoutMs: 25_000,
      apiKey,
    });

    if (identityResult.error === 'MISSING_API_KEY' || !identityResult.content) {
      const identityMsg = `I'm currently powered by **${requestedModelMeta.name}** (${requestedModelMeta.provider}) through OpenRouter.`;
      return jsonOk({
        success: true,
        message: identityMsg,
        content: identityMsg,
        intent,
        model: requestedModelMeta,
        requestedModel: requestedModelMeta,
        actualModel: requestedModelMeta,
        isFallback: false,
      });
    }

    const actualModelMeta = getModelMetadata(identityResult.modelUsed);
    const isFallback =
      actualModelMeta.id.replace(':free', '').toLowerCase() !==
        requestedModelMeta.id.replace(':free', '').toLowerCase() &&
      requestedModelMeta.id !== 'openrouter/auto';

    return jsonOk({
      success: true,
      message: identityResult.content,
      content: identityResult.content,
      intent,
      model: actualModelMeta,
      requestedModel: requestedModelMeta,
      actualModel: actualModelMeta,
      isFallback,
    });
  }

  // 8. Build the final message array — server controls system prompt & context
  const needsPortfolioContext =
    intent === 'PORTFOLIO' ||
    intent === 'PROJECT' ||
    intent === 'EDUCATION' ||
    intent === 'EXPERIENCE' ||
    intent === 'FAQ' ||
    intent === 'CONTACT';

  const systemContent = needsPortfolioContext
    ? `${SYSTEM_PROMPT}\n\n${PORTFOLIO_CONTEXT}`
    : `${SYSTEM_PROMPT}\n\nNote: For general or technical questions, answer directly without introducing unrelated facts about Sujoy Moulick.`;

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: systemContent,
    },
    ...safeHistory,
    {
      role: 'user',
      content: message,
    },
  ];

  // 9. Call OpenRouter (server-side only)
  const result = await openRouterChat({
    model: selectedModel,
    messages,
    timeoutMs: 25_000,
    apiKey,
  });

  if (result.error === 'MISSING_API_KEY') {
    return jsonOk({
      success: true,
      message: 'AI service is not configured yet. Core FAQ answers still work — try asking about projects, skills, or experience.',
      content: 'AI service is not configured yet. Core FAQ answers still work — try asking about projects, skills, or experience.',
      intent,
      model: requestedModelMeta,
      requestedModel: requestedModelMeta,
      actualModel: requestedModelMeta,
      isFallback: false,
    });
  }

  const actualModelMeta = getModelMetadata(result.modelUsed);
  const isFallback =
    actualModelMeta.id.replace(':free', '').toLowerCase() !==
      requestedModelMeta.id.replace(':free', '').toLowerCase() &&
    requestedModelMeta.id !== 'openrouter/auto';

  // 10. Return standardized response
  return jsonOk({
    success: true,
    message: result.content,
    content: result.content,
    intent,
    model: actualModelMeta,
    requestedModel: requestedModelMeta,
    actualModel: actualModelMeta,
    isFallback,
  });
};

// Reject non-POST requests
export const GET: APIRoute = () => {
  return jsonError('Method not allowed.', 405);
};
