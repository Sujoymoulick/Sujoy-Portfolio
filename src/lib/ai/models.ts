// ============================================================
// src/lib/ai/models.ts
// Centralized AI model configuration for SujoyGPT
// All model IDs in one place — never scatter them elsewhere
// ============================================================

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  category: 'auto' | 'general' | 'coding' | 'reasoning' | 'fast';
  description: string;
  icon: string;
  badge: string;
  free: true;
  enabled: boolean;
}

export interface ModelMetadata {
  id: string;
  name: string;
  provider: string;
  category: string;
  icon: string;
  badge: string;
  free: boolean;
}

/**
 * All selectable free models for SujoyGPT.
 *
 * IMPORTANT: Every model here MUST be free (`:free` suffix or `openrouter/auto`).
 * Never add paid models. Update model IDs here when OpenRouter catalog changes.
 *
 * Current free models verified from OpenRouter catalog:
 *   https://openrouter.ai/models?supported_parameters=free
 */
export const FREE_MODELS: AIModel[] = [
  {
    id: 'openrouter/auto',
    name: 'Auto Free',
    provider: 'OpenRouter',
    category: 'auto',
    description: 'Automatically selects the best available free AI model',
    icon: '⚡',
    badge: 'Auto',
    free: true,
    enabled: true,
  },
  {
    id: 'google/gemma-4-31b-it:free',
    name: 'Gemma 4 31B',
    provider: 'Google',
    category: 'general',
    description: 'Google\'s open model — fast, intelligent, general-purpose reasoning',
    icon: '🤖',
    badge: 'General',
    free: true,
    enabled: true,
  },
  {
    id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
    name: 'Nemotron Reasoning',
    provider: 'NVIDIA',
    category: 'reasoning',
    description: 'NVIDIA\'s reasoning model for complex architectural analysis',
    icon: '🧠',
    badge: 'Reasoning',
    free: true,
    enabled: true,
  },
  {
    id: 'cohere/north-mini-code:free',
    name: 'Cohere Code',
    provider: 'Cohere',
    category: 'coding',
    description: 'Cohere\'s code model — specialized for programming and tech questions',
    icon: '💻',
    badge: 'Coding',
    free: true,
    enabled: true,
  },
  {
    id: 'nvidia/nemotron-3.5-lightning:free',
    name: 'Nemotron Lightning',
    provider: 'NVIDIA',
    category: 'fast',
    description: 'NVIDIA\'s ultra-fast model for quick, high-quality responses',
    icon: '🚀',
    badge: 'Fast',
    free: true,
    enabled: true,
  },
];

/** The default model ID used when the user hasn't made a selection */
export const DEFAULT_MODEL_ID = 'openrouter/auto';

/** Returns only enabled models (safe to send to the frontend) */
export function getEnabledModels(): AIModel[] {
  return FREE_MODELS.filter((m) => m.enabled);
}

/** Returns only the safe metadata fields for the frontend (no secrets) */
export function getPublicModelData() {
  return getEnabledModels().map(({ id, name, provider, category, description, icon, badge, free }) => ({
    id,
    name,
    provider,
    category,
    description,
    icon,
    badge,
    free,
  }));
}

/**
 * Validates that a model ID or alias is in our allowed list and is enabled.
 */
export function isValidModel(modelId: string): boolean {
  if (!modelId || typeof modelId !== 'string') return false;
  const clean = modelId.trim().toLowerCase().replace(':free', '');
  const isAlias = ['sujoy-gpt-4o', 'sujoy-general', 'sujoy-o3-mini', 'sujoy-canvas', 'sujoy-fast'].includes(modelId);
  return isAlias || FREE_MODELS.some((m) => {
    const mIdNoFree = m.id.toLowerCase().replace(':free', '');
    return (m.id.toLowerCase() === modelId.toLowerCase() || mIdNoFree === clean) && m.enabled;
  });
}

/**
 * Resolves any incoming model ID or alias to a canonical valid model ID.
 */
export function resolveModelId(rawModelId: unknown): string {
  if (typeof rawModelId !== 'string' || !rawModelId.trim()) {
    return DEFAULT_MODEL_ID;
  }
  const clean = rawModelId.trim().toLowerCase();
  
  if (clean === 'sujoy-gpt-4o' || clean === 'auto' || clean === 'openrouter/auto') {
    return 'openrouter/auto';
  }
  if (clean === 'sujoy-general' || clean.includes('gemma')) {
    return 'google/gemma-4-31b-it:free';
  }
  if (clean === 'sujoy-o3-mini' || clean.includes('nano-omni') || clean.includes('nemotron-3-nano')) {
    return 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free';
  }
  if (clean === 'sujoy-canvas' || clean.includes('north-mini-code') || clean.includes('cohere')) {
    return 'cohere/north-mini-code:free';
  }
  if (clean === 'sujoy-fast' || clean.includes('nemotron-3.5-lightning')) {
    return 'nvidia/nemotron-3.5-lightning:free';
  }

  const cleanNoFree = clean.replace(':free', '');
  const match = FREE_MODELS.find((m) => {
    const mIdNoFree = m.id.toLowerCase().replace(':free', '');
    return m.id.toLowerCase() === clean || mIdNoFree === cleanNoFree;
  });

  return match?.id ?? DEFAULT_MODEL_ID;
}

/**
 * Resolves comprehensive metadata for any given model ID.
 * If the raw OpenRouter model ID is not in FREE_MODELS (e.g. returned during automatic fallback),
 * it safely derives the provider and clean display name.
 */
export function getModelMetadata(rawModelId: string): ModelMetadata {
  if (!rawModelId) {
    return {
      id: DEFAULT_MODEL_ID,
      name: 'Auto Free',
      provider: 'OpenRouter',
      category: 'auto',
      icon: '⚡',
      badge: 'Auto',
      free: true,
    };
  }

  const normalizedRaw = rawModelId.toLowerCase().trim();
  const rawNoFree = normalizedRaw.replace(':free', '');

  // 1. Direct match in FREE_MODELS catalog (exact or ignoring :free suffix)
  const found = FREE_MODELS.find((m) => {
    const mId = m.id.toLowerCase();
    const mIdNoFree = mId.replace(':free', '');
    return mId === normalizedRaw || mIdNoFree === rawNoFree;
  });

  if (found) {
    return {
      id: found.id,
      name: found.name,
      provider: found.provider,
      category: found.category,
      icon: found.icon,
      badge: found.badge,
      free: found.free,
    };
  }

  // 2. Fallback resolution for raw OpenRouter model IDs (e.g., 'google/gemma-4-31b-it')
  const cleanId = rawModelId.replace(':free', '');
  const parts = cleanId.split('/');
  let provider = 'OpenRouter';
  let name = cleanId;

  if (parts.length >= 2) {
    const rawProvider = parts[0];
    provider = rawProvider.charAt(0).toUpperCase() + rawProvider.slice(1);
    const rawName = parts.slice(1).join('/');
    name = rawName
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return {
    id: rawModelId,
    name,
    provider,
    category: 'general',
    icon: '🤖',
    badge: provider,
    free: true,
  };
}

/**
 * Builds a fallback chain from all enabled models except the selected one,
 * always ending with openrouter/auto as the final safety net.
 * Removes duplicates.
 */
export function buildFallbackChain(selectedModelId: string): string[] {
  const enabledIds = getEnabledModels().map((m) => m.id);

  const chain = [
    selectedModelId,
    ...enabledIds.filter((id) => id !== selectedModelId && id !== 'openrouter/auto'),
    'openrouter/auto',
  ];

  // Deduplicate while preserving order and cap at max 3 items (OpenRouter API limit)
  return [...new Set(chain)].slice(0, 3);
}
