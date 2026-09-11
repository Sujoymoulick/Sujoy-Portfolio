// ============================================================
// src/lib/ai/openrouter.ts
// Reusable server-side OpenRouter chat service
// Called exclusively from API routes — NEVER from client code
// ============================================================

import { buildFallbackChain, FREE_MODELS } from './models';

// ── Types ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterChatOptions {
  model: string;
  messages: ChatMessage[];
  /** Timeout in milliseconds. Default: 25_000 */
  timeoutMs?: number;
  /** Explicit API key if available from Cloudflare locals */
  apiKey?: string;
}

export interface OpenRouterChatResult {
  content: string;
  modelUsed: string;
  error?: string;
}

// ── Internal helpers ─────────────────────────────────────────────────────────

interface OpenRouterChoice {
  message: { content: string };
  finish_reason?: string;
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  model?: string;
  error?: { message?: string; code?: number };
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const SITE_URL = 'https://sujoymoulick.online';
const SITE_TITLE = 'Sujoy Moulick Portfolio';

/**
 * Make a single chat request to OpenRouter with the given models array.
 * The first model is tried, OpenRouter falls back through the rest automatically.
 */
async function callOpenRouter(
  apiKey: string,
  modelChain: string[],
  messages: ChatMessage[],
  timeoutMs: number
): Promise<{ content: string; modelUsed: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const body: Record<string, unknown> = {
      models: modelChain, // OpenRouter native multi-model fallback
      messages,
      max_tokens: 1024,
      temperature: 0.7,
    };

    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': SITE_URL,
        'X-Title': SITE_TITLE,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const status = response.status;
      const errorText = await response.text().catch(() => '');
      console.error(`[OpenRouter] HTTP ${status} failure: ${errorText}`);
      return null;
    }

    const data = (await response.json()) as OpenRouterResponse;

    if (data.error) {
      console.error('[OpenRouter] API error:', data.error.message);
      return null;
    }

    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;

    const modelUsed = data.model || modelChain[0];
    return { content, modelUsed };
  } catch (err: unknown) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[OpenRouter] Request timed out');
    } else {
      console.error('[OpenRouter] Fetch error:', err);
    }
    return null;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Main entry point for calling OpenRouter from server-side API routes.
 * Automatically builds a fallback chain of all free models so if the
 * primary model is unavailable, OpenRouter tries the next ones.
 *
 * @param options - model, messages, and optional timeout
 * @returns Promise<OpenRouterChatResult>
 */
export async function openRouterChat(options: OpenRouterChatOptions): Promise<OpenRouterChatResult> {
  const { model, messages, timeoutMs = 25_000 } = options;

  // Read API key from options, import.meta.env, or process.env safely
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

  const apiKey = options.apiKey || envKey || '';

  if (!apiKey || apiKey.trim() === '') {
    return {
      content: 'AI service is not configured yet.',
      modelUsed: model,
      error: 'MISSING_API_KEY',
    };
  }

  // Build the full fallback chain
  const modelChain = buildFallbackChain(model);

  const result = await callOpenRouter(apiKey, modelChain, messages, timeoutMs);

  if (result) {
    return { content: result.content, modelUsed: result.modelUsed };
  }

  // All models failed — return safe user-facing message
  return {
    content: 'SujoyGPT is temporarily unavailable. Please try again later.',
    modelUsed: model,
    error: 'ALL_MODELS_FAILED',
  };
}

/**
 * Formats the user display name for a given model ID.
 * Falls back gracefully to the raw ID if not found.
 */
export function getModelDisplayName(modelId: string): string {
  const found = FREE_MODELS.find((m) => m.id === modelId);
  return found ? found.name : (modelId.split('/').pop() || modelId);
}
