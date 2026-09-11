// ============================================================
// src/lib/ai/intent.ts
// Lightweight intent detection for SujoyGPT queries
// ============================================================

export type UserIntent =
  | 'MODEL_IDENTITY'
  | 'AI_CAPABILITIES'
  | 'GREETING'
  | 'PORTFOLIO'
  | 'PROJECT'
  | 'EDUCATION'
  | 'EXPERIENCE'
  | 'FAQ'
  | 'CONTACT'
  | 'TECHNICAL'
  | 'GENERAL';

const MODEL_IDENTITY_PATTERNS = [
  'which model',
  'what model',
  'what ai are you using',
  'which ai model',
  'what ai model',
  'what model is running',
  'who is answering me',
  'what model is this',
  'which model is this',
  'tell me your model',
  'what model do you use',
  'which model are u',
  'what model r u',
  'who are you powered by',
  'what model is active',
  'what llm is this',
  'which llm are you',
  'which model you are',
  'what model you are',
  'which model are you',
  'what model are you',
  'which model r u',
  'what model r u',
  'are you gemma',
  'are you llama',
  'are you gpt',
  'are you gemini',
  'what is your model',
  'what underlying model',
];

const AI_CAPABILITIES_PATTERNS = [
  'what can you do',
  'what are your capabilities',
  'what do you do',
  'how can you help',
  'what can u do',
  'capabilities of sujoygpt',
  'what features do you have',
];

const GREETING_PATTERNS = [
  'hello',
  'hi',
  'hey',
  'greetings',
  'namaste',
  'good morning',
  'good afternoon',
  'good evening',
  'howdy',
  'sup',
  'whats up',
  'what up',
  'yo',
  'wsp',
];

const PORTFOLIO_PATTERNS = [
  'tell me about sujoy',
  'who is sujoy',
  'about sujoy',
  'summary of sujoy',
  'sujoy moulick',
  'tell me about yourself',
  'introduce yourself',
  'who are you',
];

const PROJECT_PATTERNS = [
  'project',
  'projects',
  'freepdfly',
  'vlogtoblog',
  'textora',
  'resumegenerators',
  'funcpilot',
  'readme smith',
  'echotodo',
  'changeorbit',
  'weblixio',
  'what has he built',
  'what did he build',
];

const EDUCATION_PATTERNS = [
  'education',
  'college',
  'university',
  'uem',
  'degree',
  'btech',
  'coursework',
  'study',
  'studies',
];

const EXPERIENCE_PATTERNS = [
  'experience',
  'work experience',
  'career',
  'job',
  'internship',
  'intern',
  'interned',
  'work',
  'worked',
  'codealpha',
  'speech society',
  'tss',
];

const FAQ_PATTERNS = [
  'why should i hire',
  'why hire',
  'why choose',
  'why select',
  'strengths',
  'differentiator',
  'what makes you different',
];

const CONTACT_PATTERNS = [
  'contact',
  'email',
  'phone',
  'reach',
  'linkedin',
  'github',
  'website',
  'get in touch',
];

const TECHNICAL_PATTERNS = [
  'what is react',
  'what is astro',
  'what is openrouter',
  'what is nextjs',
  'what is tailwind',
  'what is mcp',
  'what is node',
  'explain react',
  'explain astro',
  'explain openrouter',
  'how does openrouter work',
  'how does mcp work',
];

/**
 * Classifies query into a primary intent category for routing and prompt customization.
 */
export function classifyIntent(query: string): UserIntent {
  const q = query.toLowerCase().trim();
  if (!q) return 'GENERAL';

  // 1. Model Identity Check (Highest Priority for AI Metadata)
  for (const pattern of MODEL_IDENTITY_PATTERNS) {
    if (q.includes(pattern)) return 'MODEL_IDENTITY';
  }

  // 2. AI Capabilities Check
  for (const pattern of AI_CAPABILITIES_PATTERNS) {
    if (q.includes(pattern)) return 'AI_CAPABILITIES';
  }

  // 3. Greeting Check
  for (const pattern of GREETING_PATTERNS) {
    if (q === pattern || q.startsWith(`${pattern} `) || q.endsWith(` ${pattern}`)) {
      return 'GREETING';
    }
  }

  // 4. Technical / General Explainers
  for (const pattern of TECHNICAL_PATTERNS) {
    if (q.includes(pattern)) return 'TECHNICAL';
  }

  // 5. Portfolio Specific Intents
  for (const pattern of PROJECT_PATTERNS) {
    if (q.includes(pattern)) return 'PROJECT';
  }
  for (const pattern of EDUCATION_PATTERNS) {
    if (q.includes(pattern)) return 'EDUCATION';
  }
  for (const pattern of EXPERIENCE_PATTERNS) {
    if (q.includes(pattern)) return 'EXPERIENCE';
  }
  for (const pattern of FAQ_PATTERNS) {
    if (q.includes(pattern)) return 'FAQ';
  }
  for (const pattern of CONTACT_PATTERNS) {
    if (q.includes(pattern)) return 'CONTACT';
  }
  for (const pattern of PORTFOLIO_PATTERNS) {
    if (q.includes(pattern)) return 'PORTFOLIO';
  }

  // 6. Check if query mentions Sujoy specifically
  if (q.includes('sujoy') || q.includes('he ') || q.includes('his ')) {
    return 'PORTFOLIO';
  }

  return 'GENERAL';
}
