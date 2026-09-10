import { INTERVIEW_QA_DATABASE, type InterviewQAItem } from '../data/interviewQA';

// Common chat shortcuts, typos, and multilingual slang mappings
const SLANG_AND_TYPO_MAP: Record<string, string> = {
  'u': 'you',
  'ur': 'your',
  'urs': 'yours',
  'urself': 'yourself',
  'shud': 'should',
  'shld': 'should',
  'abt': 'about',
  'wat': 'what',
  'wht': 'what',
  'wats': 'what is',
  'whats': 'what is',
  'r': 'are',
  'plz': 'please',
  'pls': 'please',
  'bcoz': 'because',
  'cuz': 'because',
  'bcuz': 'because',
  'diff': 'different',
  'fresher': 'fresher',
  'freshers': 'freshers',
  'skil': 'skill',
  'skils': 'skills',
  'proj': 'project',
  'projs': 'projects',
  'exp': 'experience',
  'expr': 'experience',
  'inturn': 'intern',
  'internshp': 'internship',
  'internshps': 'internships',
  'intrest': 'interest',
  'intrested': 'interested',
  'resum': 'resume',
  'resme': 'resume',
  'git': 'git',
  'githb': 'github',
  'linkdin': 'linkedin',
  'linkdn': 'linkedin',
  'freepdf': 'freepdfly',
  'pdfly': 'freepdfly',
  'vlog2blog': 'vlogtoblog',
  'textora': 'resumegenerators',
};

// Hindi / Hinglish colloquial phrases to standard intents
const HINGLISH_MAP: Record<string, string> = {
  'kya hai': 'what is',
  'kya he': 'what is',
  'kya h': 'what is',
  'batao': 'tell me about',
  'btau': 'tell me about',
  'btao': 'tell me about',
  'kaise banaya': 'how did you build',
  'kyu hire kare': 'why should we hire you',
  'kyun hire kare': 'why should we hire you',
  'kaun ho': 'who are you',
  'kon ho': 'who are you',
};

/**
 * Normalizes user input string:
 * 1. Lowercase
 * 2. Replace hinglish phrases
 * 3. Replace chat slang & abbreviations
 * 4. Remove extraneous punctuation
 * 5. Collapse whitespace
 */
export function normalizeQuery(raw: string): string {
  if (!raw) return '';
  let str = raw.toLowerCase().trim();

  // Replace common hinglish patterns
  Object.keys(HINGLISH_MAP).forEach((phrase) => {
    str = str.replace(new RegExp(`\\b${phrase}\\b`, 'gi'), HINGLISH_MAP[phrase]);
  });

  // Remove punctuation except alphanumeric and spaces
  str = str.replace(/[^a-z0-9\s]/g, ' ');

  // Split tokens and normalize slang/typos
  const tokens = str.split(/\s+/).filter(Boolean);
  const normalizedTokens = tokens.map((t) => SLANG_AND_TYPO_MAP[t] || t);

  return normalizedTokens.join(' ').trim();
}

/**
 * Calculates Levenshtein Distance for fuzzy typo matching
 */
function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

/**
 * String similarity ratio based on Levenshtein (0.0 to 1.0)
 */
function fuzzySimilarity(s1: string, s2: string): number {
  const maxLen = Math.max(s1.length, s2.length);
  if (maxLen === 0) return 1.0;
  const dist = levenshteinDistance(s1, s2);
  return 1.0 - dist / maxLen;
}

/**
 * Token overlap / Jaccard similarity between two normalized strings
 */
function tokenJaccardSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.split(/\s+/).filter(Boolean));
  const set2 = new Set(str2.split(/\s+/).filter(Boolean));
  if (set1.size === 0 || set2.size === 0) return 0;

  let intersection = 0;
  set1.forEach((token) => {
    if (set2.has(token)) {
      intersection++;
    } else {
      // Check partial fuzzy token match
      for (const t2 of set2) {
        if (fuzzySimilarity(token, t2) >= 0.82) {
          intersection += 0.8;
          break;
        }
      }
    }
  });

  const union = set1.size + set2.size - intersection;
  return union > 0 ? intersection / union : 0;
}

export interface MatchResult {
  matchedItem: InterviewQAItem | null;
  confidence: number;
  matchedVia: 'exact' | 'keyword-exact' | 'phrase' | 'token-jaccard' | 'fuzzy' | 'none';
}

/**
 * Finds the most relevant question and answer from the hidden Q&A database.
 * @param query The raw user query
 * @param lastContextTopic Optional previous topic context for follow-up questions (e.g. 'freepdfly', 'adhyayan')
 */
export function matchInterviewQA(
  query: string,
  lastContextTopic?: string
): MatchResult {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return { matchedItem: null, confidence: 0, matchedVia: 'none' };
  }

  // 1. Contextual Follow-Up resolution
  // If user says "how did you build it?", "what technologies did you use for it?", "what problem does it solve?"
  const isGenericFollowUp =
    (normalized.includes('for it') ||
      normalized.includes('use for it') ||
      normalized.includes('build it') ||
      normalized.includes('does it solve') ||
      normalized.includes('about it') ||
      normalized.includes('tech stack for it')) &&
    Boolean(lastContextTopic);

  if (isGenericFollowUp && lastContextTopic) {
    if (lastContextTopic.includes('freepdfly')) {
      if (normalized.includes('tech') || normalized.includes('build') || normalized.includes('how')) {
        const item = INTERVIEW_QA_DATABASE.find((q) => q.id === 'how-built-freepdfly');
        if (item) return { matchedItem: item, confidence: 0.95, matchedVia: 'phrase' };
      }
      if (normalized.includes('problem') || normalized.includes('solve')) {
        const item = INTERVIEW_QA_DATABASE.find((q) => q.id === 'freepdfly-problem-solved');
        if (item) return { matchedItem: item, confidence: 0.95, matchedVia: 'phrase' };
      }
    }
  }

  let bestMatch: InterviewQAItem | null = null;
  let highestScore = 0;
  let bestMatchVia: MatchResult['matchedVia'] = 'none';

  for (const item of INTERVIEW_QA_DATABASE) {
    const itemQNormalized = normalizeQuery(item.question);

    // Tier 1: Exact question match
    if (normalized === itemQNormalized) {
      return { matchedItem: item, confidence: 1.0, matchedVia: 'exact' };
    }

    // Tier 2: Check keyword exact matches
    for (const kw of item.keywords) {
      const kwNormalized = normalizeQuery(kw);

      if (normalized === kwNormalized) {
        return { matchedItem: item, confidence: 0.98, matchedVia: 'keyword-exact' };
      }

      // Strong phrase inclusion (query includes full keyword or keyword includes query)
      if (normalized.length >= 8 && kwNormalized.length >= 8) {
        if (normalized.includes(kwNormalized)) {
          const score = 0.90 + (kwNormalized.length / normalized.length) * 0.08;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
            bestMatchVia = 'phrase';
          }
        } else if (kwNormalized.includes(normalized)) {
          const score = 0.85 + (normalized.length / kwNormalized.length) * 0.10;
          if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
            bestMatchVia = 'phrase';
          }
        }
      }
    }

    // Tier 3: Token Jaccard & Semantic Keyword scoring
    let maxKwSimilarity = 0;
    for (const kw of item.keywords) {
      const kwNorm = normalizeQuery(kw);
      const jaccard = tokenJaccardSimilarity(normalized, kwNorm);
      if (jaccard > maxKwSimilarity) {
        maxKwSimilarity = jaccard;
      }
    }

    const questionJaccard = tokenJaccardSimilarity(normalized, itemQNormalized);
    const combinedScore = Math.max(maxKwSimilarity, questionJaccard);

    if (combinedScore > highestScore) {
      highestScore = combinedScore;
      bestMatch = item;
      bestMatchVia = 'token-jaccard';
    }

    // Tier 4: Fuzzy Levenshtein overall string comparison
    const qFuzzy = fuzzySimilarity(normalized, itemQNormalized);
    if (qFuzzy >= 0.85 && qFuzzy > highestScore) {
      highestScore = qFuzzy;
      bestMatch = item;
      bestMatchVia = 'fuzzy';
    }
  }

  return {
    matchedItem: bestMatch,
    confidence: highestScore,
    matchedVia: bestMatchVia,
  };
}
