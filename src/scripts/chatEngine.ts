import { portfolioData, type ProjectItem } from '../data/portfolioData';
import { matchInterviewQA, type MatchResult } from './qaMatcher';
import { classifyIntent } from '../lib/ai/intent';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  thinking?: string;
  thinkingTime?: number;
  suggestions?: string[];
  isStreaming?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
  model: string;
  contextTopic?: string;
}

export interface ModelOption {
  id: string;
  name: string;
  badge: string;
  icon: string;
  description: string;
  deepReasoning: boolean;
  /** The real OpenRouter model ID sent to /api/chat (server-validated) */
  openRouterId: string;
}

/**
 * AVAILABLE_MODELS — UI model list for SujoyGPT
 * All openRouterId values MUST be free (`:free` suffix or `openrouter/auto`).
 * These IDs are validated server-side against src/lib/ai/models.ts allowlist.
 */
export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'sujoy-gpt-4o',
    name: 'Auto Free',
    badge: 'Auto',
    icon: '⚡',
    description: 'Automatically selects the best available free AI model',
    deepReasoning: false,
    openRouterId: 'openrouter/auto',
  },
  {
    id: 'sujoy-general',
    name: 'Gemma 4 31B',
    badge: 'General',
    icon: '🤖',
    description: 'Google\'s open model — fast, versatile for all portfolio questions',
    deepReasoning: false,
    openRouterId: 'google/gemma-4-31b-it:free',
  },
  {
    id: 'sujoy-o3-mini',
    name: 'Nemotron Reasoning',
    badge: 'Reasoning',
    icon: '🧠',
    description: 'NVIDIA\'s reasoning model for complex architectural analysis',
    deepReasoning: true,
    openRouterId: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  },
  {
    id: 'sujoy-canvas',
    name: 'Cohere Code',
    badge: 'Coding',
    icon: '💻',
    description: 'Cohere\'s code model — specialized for programming and tech questions',
    deepReasoning: false,
    openRouterId: 'cohere/north-mini-code:free',
  },
  {
    id: 'sujoy-fast',
    name: 'Nemotron Lightning',
    badge: 'Fast',
    icon: '🚀',
    description: 'NVIDIA\'s ultra-fast model for quick, high-quality responses',
    deepReasoning: false,
    openRouterId: 'nvidia/nemotron-3.5-lightning:free',
  },
];

export function getInitialChats(): ChatSession[] {
  const now = Date.now();
  return [
    {
      id: 'welcome-chat',
      title: 'Welcome & Overview',
      createdAt: now - 3600000 * 2,
      updatedAt: now - 3600000 * 2,
      model: 'sujoy-gpt-4o',
      contextTopic: 'introduction',
      messages: [
        {
          id: 'msg-welcome-1',
          role: 'assistant',
          content: `### Welcome to Sujoy's Interactive AI Portfolio

I am **SujoyGPT**, an AI assistant with comprehensive knowledge of **${portfolioData.name}**'s background, education at UEM Jaipur, flagship software products, published browser extensions, client demos, verified certifications, and technical writing.

---

### Key Highlights
- **Headline:** ${portfolioData.headline}
- **Status:** ${portfolioData.status}
- **Location:** ${portfolioData.location}
- **GitHub:** [github.com/Sujoymoulick](${portfolioData.github})
- **Summary:** ${portfolioData.summary}

---

### What you can ask me:
1. *"Tell me about yourself"* or *"Why should we hire you?"*
2. *"What are your flagship projects like FreePDFLY, VlogToBlog, and Resume Generators?"*
3. *"What live browser extensions and tools have you built?"*
4. *"What is your technical stack and strongest skills?"*
5. *"Tell me about your 10 verified certifications"*
6. *"How do I get in touch with Sujoy directly?"*

Feel free to ask any question or select one of the suggestions below!`,
          timestamp: now - 3600000 * 2,
          suggestions: [
            'Why should I hire you?',
            'Tell me about yourself',
            'What makes you different from other freshers?',
            'Show flagship projects',
            'What are your strongest technical skills?',
            'Can I see your resume?',
          ],
        },
      ],
    },
    {
      id: 'projects-chat',
      title: 'Flagship & AI Projects',
      createdAt: now - 3600000 * 24,
      updatedAt: now - 3600000 * 24,
      model: 'sujoy-gpt-4o',
      contextTopic: 'projects',
      messages: [
        {
          id: 'msg-p-1',
          role: 'user',
          content: 'Can you show me your flagship software products and AI applications?',
          timestamp: now - 3600000 * 24,
        },
        {
          id: 'msg-p-2',
          role: 'assistant',
          content: generateProjectsResponse(),
          timestamp: now - 3600000 * 24,
          suggestions: [
            'Tell me about FreePDFLY',
            'Tell me about VlogToBlog',
            'Which project are you most proud of?',
            'What is your tech stack?',
          ],
        },
      ],
    },
    {
      id: 'skills-chat',
      title: 'Technical Stack & Skills',
      createdAt: now - 3600000 * 48,
      updatedAt: now - 3600000 * 48,
      model: 'sujoy-gpt-4o',
      contextTopic: 'skills',
      messages: [
        {
          id: 'msg-s-1',
          role: 'user',
          content: 'What are your core technical skills across languages, frontend, backend, AI/ML, and Web3?',
          timestamp: now - 3600000 * 48,
        },
        {
          id: 'msg-s-2',
          role: 'assistant',
          content: generateSkillsResponse(),
          timestamp: now - 3600000 * 48,
          suggestions: [
            'Which programming language are you most comfortable with?',
            'Explain your knowledge of JavaScript',
            'View 10 verified certifications',
            'Why should I hire you?',
          ],
        },
      ],
    },
  ];
}

export function generateProjectsResponse(): string {
  let md = `## Flagship Software Products & Applications\n\nHere are the independent software products, AI tools, and full-stack systems engineered by Sujoy:\n\n`;

  portfolioData.projects.forEach((p, idx) => {
    md += `### ${idx + 1}. ${p.title} \`[${p.category}]\`\n`;
    if (p.website) md += `**Live / Demo:** [${p.website}](${p.website})\n`;
    if (p.github) md += `**Repository:** [${p.github}](${p.github})\n\n`;
    md += `> **${p.shortDesc}**\n\n`;
    md += `${p.description}\n\n`;
    md += `**Technologies:** ${p.technologies.map((t) => `\`${t}\``).join(' ')}\n\n`;
    md += `**Key Contributions:**\n`;
    p.contributions.forEach((c) => (md += `- ${c}\n`));
    md += `\n---\n\n`;
  });

  md += `*Would you like a deeper architectural breakdown of any specific project like FreePDFLY, VlogToBlog, or Resume Generators?*`;
  return md;
}

export function generateLiveProjectsResponse(): string {
  let md = `## Live Tools, Extensions & Utilities\n\nSujoy has engineered and published several live developer utilities, automation scripts, and browser extensions:\n\n`;

  portfolioData.liveProjects.forEach((lp, idx) => {
    md += `### ${idx + 1}. ${lp.badge}\n`;
    md += `**Live App / Extension:** [Launch Application](${lp.link})\n\n`;
    md += `${lp.description}\n\n`;
    md += `**Tech Stack:** ${lp.tags.map((t) => `\`${t}\``).join(' ')}\n\n`;
    md += `\n`;
  });

  md += `---\n\n### Direct Actions\n<div class="chat-action-banner">\n  <a href="${portfolioData.github}" target="_blank" rel="noopener" class="action-btn-primary">\n    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>\n    <span>Explore Repos on GitHub</span>\n  </a>\n</div>`;

  return md;
}

export function generateClientDemosResponse(): string {
  let md = `## Client Demos & Business Showcase Solutions\n\nCustom web solutions tailored for business owners, hair salons, and wellness boutiques:\n\n`;

  portfolioData.clientDemos.forEach((cd, idx) => {
    md += `### ${idx + 1}. ${cd.badge}\n`;
    md += `**Live Demo:** [${cd.link}](${cd.link})\n\n`;
    md += `${cd.description}\n\n`;
    md += `**Specialized Business Features:**\n`;
    cd.features.forEach((f) => (md += `- ${f}\n`));
    md += `\n**Tags:** ${cd.tags.map((t) => `\`${t}\``).join(' ')}\n\n`;
  });

  return md;
}

export function generateBlogsResponse(): string {
  let md = `## Technical Articles & Engineering Notes\n\nSujoy authors comprehensive deep dives into autonomous AI agents, LLM architectures, Web3, and systems engineering:\n\n`;

  portfolioData.blogs.forEach((b, idx) => {
    md += `### ${idx + 1}. ${b.title}\n`;
    md += `**Category:** \`${b.category}\` | **Reading Time:** \`${b.readingTime}\` | **Published:** *${b.date}*\n\n`;
    md += `> ${b.description}\n\n`;
    md += `**Tags:** ${b.tags.map((t) => `\`${t}\``).join(', ')}\n\n`;
  });

  md += `---\n\n*Ask me for a summary or detailed breakdown of any specific article!*`;
  return md;
}

export function generateSkillsResponse(): string {
  let md = `## Technical Stack & Core Competencies\n\nSujoy has hands-on proficiency across modern full-stack development, AI/ML systems, databases, and DevOps:\n\n`;

  portfolioData.skills.forEach((cat) => {
    md += `### [${cat.code}] ${cat.category}\n`;
    md += `${cat.skills.map((s) => `\`${s}\``).join(', ')}\n\n`;
  });

  md += `### Core Focus Areas\n`;
  md += `- **Full-Stack & UI:** React 19, Next.js 16, Astro, Tailwind CSS, Three.js, Node.js.\n`;
  md += `- **AI & Autonomous Agents:** Generative AI, LLMs, MCP (Model Context Protocol), Prompt Engineering, LangChain, Gemini API.\n`;
  md += `- **Databases & Systems:** MongoDB Atlas, MySQL, Vector DBs, RESTful APIs, WebSockets.\n`;
  md += `- **Web3 & Blockchain:** Solidity, Smart Contracts, Ethers.js, Decentralized dApps.\n`;
  md += `- **Growth & SEO:** Technical SEO, Google Discover, Google Search Console audits.\n`;

  return md;
}

export function generateExperienceResponse(): string {
  let md = `## Professional Experience\n\n`;

  portfolioData.experience.forEach((exp) => {
    md += `### ${exp.role} @ **${exp.company}**\n`;
    md += `Duration: \`${exp.duration}\` | Location: *${exp.location}*\n\n`;
    md += `**Key Responsibilities & Contributions:**\n`;
    exp.responsibilities.forEach((r) => (md += `- ${r}\n`));
    md += `\n---\n\n`;
  });

  return md;
}

export function generateEducationResponse(): string {
  let md = `## Academic Background\n\n`;

  portfolioData.education.forEach((edu) => {
    md += `### ${edu.institution}\n`;
    md += `**Degree:** ${edu.degree}\n`;
    md += `**Duration:** \`${edu.duration}\` | **Location:** *${edu.location}*\n\n`;
    md += `**Relevant Coursework:**\n`;
    edu.coursework.forEach((c) => (md += `- ${c}\n`));
  });

  return md;
}

export function generateCertificatesResponse(): string {
  let md = `## 10 Verified Professional Certifications\n\nSujoy holds 10 professional credentials across AI, Cloud, Cybersecurity, Software Engineering, Databases, and Web Development:\n\n`;

  portfolioData.certifications.forEach((c, idx) => {
    md += `### ${idx + 1}. ${c.title} \`[${c.category}]\`\n`;
    md += `- **ID:** \`${c.id}\` | **Issuer:** ${c.issuer}\n`;
    md += `- **Key Skills:** ${c.skills.map((s) => `\`${s}\``).join(', ')}\n`;
    md += `\n`;
  });

  return md;
}

export function generateContactResponse(): string {
  return `## Contact & Direct Channels

Sujoy is currently **${portfolioData.status}**.

---

### Direct Channels

| Channel | Address / Link | Action |
| :--- | :--- | :--- |
| **GitHub** | \`${portfolioData.github}\` | [Visit GitHub Profile](${portfolioData.github}) |
| **LinkedIn** | \`${portfolioData.linkedin}\` | [Connect on LinkedIn](${portfolioData.linkedin}) |
| **Email** | \`${portfolioData.email}\` | [Send Direct Email](mailto:${portfolioData.email}) |
| **Phone** | \`${portfolioData.phone}\` | [Call or WhatsApp](tel:${portfolioData.phone}) |
| **Website** | \`${portfolioData.website}\` | [Visit Personal Website](${portfolioData.website}) |
| **Location** | \`${portfolioData.location}\` | Jaipur, Rajasthan, India |

---

### Direct Profile Links
<div class="chat-action-banner">
  <a href="${portfolioData.github}" target="_blank" rel="noopener" class="action-btn-primary">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    <span>GitHub Profile</span>
  </a>
  <a href="${portfolioData.linkedin}" target="_blank" rel="noopener" class="action-btn-secondary">
    LinkedIn
  </a>
  <button class="action-btn-secondary preview-resume-btn" data-action="preview-resume">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    <span>Preview Resume</span>
  </button>
</div>`;
}

export function generateGitHubResponse(): string {
  return `## GitHub Profile & Repositories

Sujoy's open-source repositories and codebases are hosted on GitHub at [**github.com/Sujoymoulick**](${portfolioData.github}).

---

### Profile Summary
- **GitHub Handle:** [@Sujoymoulick](https://github.com/Sujoymoulick)
- **Profile URL:** [${portfolioData.github}](${portfolioData.github})
- **Role:** Full-Stack, Backend & Agentic AI Developer | Computer Science (AI & ML) Undergraduate

---

### Core Focus Areas & Repositories

1. **Frontend & Full-Stack Web Products**
   - **FreePDFLY:** 100% browser-based client-side PDF manipulation SaaS built with Astro, modern JavaScript, and zero server storage.
   - **VlogToBlog:** AI video-to-blog conversion application using Gemini 1.5 Flash, React, and Node.js.
   - **Resume Generators (TEXTORA):** AI-powered ATS resume builder using Next.js and Gemini API.
   - **Kinetic Luminary:** 3D portfolio template built with Next.js 16, React 19, and Three.js.
   - **FCForge:** Gaming utilities platform and content hub optimized for performance and Google Search discoverability.
   - **SendVirtualGift:** Interactive virtual gift customizer & delivery platform built with React.js, Node.js, and modern CSS3.

2. **Published Browser Extensions & Tools**
   - **FuncPilot:** Automated code testing and reporting platform.
   - **README Smith:** Smart GitHub profile & repo README generator.
   - **Listing Expert:** Chrome Web Store listing optimizer.
   - **EchoToDo:** Productivity Chrome extension published on Chrome Web Store.
   - **ChangeOrbit:** Visual GitHub commit log transformer.
   - **Weblixio:** Website color palette & design PDF report extractor.

3. **Backend & System Architectures**
   - Freelancer workspace backend with MongoDB Atlas, Express REST API, automated invoice generator, and real-time server latency monitors.
   - CodeAlpha backend internship APIs and MongoDB schemas.

4. **Engineering Standards**
   - Git branch workflows, atomic commits, modular TypeScript/JavaScript architecture, and CI/CD automated deployments with Vercel and Netlify.

---

### Explore GitHub
<div class="chat-action-banner">
  <a href="${portfolioData.github}" target="_blank" rel="noopener" class="action-btn-primary">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    <span>Open GitHub (@Sujoymoulick)</span>
  </a>
  <a href="${portfolioData.website}" target="_blank" rel="noopener" class="action-btn-secondary">
    Personal Website
  </a>
  <a href="${portfolioData.linkedin}" target="_blank" rel="noopener" class="action-btn-secondary">
    LinkedIn
  </a>
</div>`;
}

export function generateDeepProjectBreakdown(projectId: string): string {
  const p = portfolioData.projects.find(
    (item) => item.id === projectId || item.title.toLowerCase().includes(projectId.toLowerCase())
  );
  if (!p) return generateProjectsResponse();

  let md = `## Project Breakdown: ${p.title} \`[${p.category}]\`\n\n`;
  if (p.website) md += `**Live URL:** [${p.website}](${p.website})\n`;
  if (p.github) md += `**GitHub:** [${p.github}](${p.github})\n\n`;
  md += `### 1. Overview\n${p.description}\n\n`;
  md += `### 2. Technologies Used\n${p.technologies.map((t) => `\`${t}\``).join(', ')}\n\n`;
  md += `### 3. Key Architectural Contributions\n`;
  p.contributions.forEach((c, idx) => {
    md += `${idx + 1}. **${c}**\n`;
  });

  return md;
}

export function generateAIAnswer(
  query: string,
  options: {
    model?: string;
    deepReasoning?: boolean;
    webSearch?: boolean;
    lastContextTopic?: string;
  }
): {
  content: string;
  thinking?: string;
  thinkingTime?: number;
  suggestions: string[];
  matchedTopic?: string;
  /** true = no local match found, caller should query OpenRouter */
  isFallback: boolean;
} {
  const q = query.toLowerCase().trim();
  const intent = classifyIntent(query);

  // 0. MODEL_IDENTITY, TECHNICAL, GENERAL, GREETING, AI_CAPABILITIES bypass local static FAQ to query server AI route
  if (
    intent === 'MODEL_IDENTITY' ||
    intent === 'TECHNICAL' ||
    intent === 'GENERAL' ||
    intent === 'GREETING' ||
    intent === 'AI_CAPABILITIES'
  ) {
    return {
      content: '',
      suggestions: [
        'Why should I hire you?',
        'Tell me about yourself',
        'Show flagship projects',
        'What are your strongest technical skills?',
        'Can I see your resume?',
      ],
      isFallback: true,
    };
  }

  const isReasoning = options.deepReasoning || options.model === 'sujoy-o3-mini';

  let thinking: string | undefined = undefined;
  let thinkingTime: number | undefined = undefined;

  if (isReasoning) {
    thinkingTime = Math.floor(Math.random() * 2) + 1;
    thinking = `Thinking Process:
1. Analyzed query intent: "${query}"
2. Cross-referenced verified interview Q&A knowledge ontology and portfolio database.
3. Evaluated question matching confidence, semantic intent, and context.
4. Formatted structured first-person response adhering strictly to verified resume facts.`;
  }

  // 1. Primary: Run hidden Q&A intelligent matching
  const matchResult: MatchResult = matchInterviewQA(query, options.lastContextTopic);

  if (matchResult.matchedItem && matchResult.confidence >= 0.45) {
    return {
      content: matchResult.matchedItem.answer,
      thinking,
      thinkingTime,
      suggestions: matchResult.matchedItem.suggestions || [
        'Why should I hire you?',
        'Tell me about your projects',
        'What are your strongest technical skills?',
        'Can I see your resume?',
      ],
      matchedTopic: matchResult.matchedItem.topic || matchResult.matchedItem.id,
      isFallback: false,
    };
  }

  // 2. Secondary: Detailed Topic & Generator Handlers
  if (
    q.includes('vlogtoblog') ||
    q.includes('vlog to blog') ||
    q.includes('youtube to blog')
  ) {
    return {
      content: generateDeepProjectBreakdown('vlogtoblog'),
      thinking,
      thinkingTime,
      suggestions: ['Tell me about Resume Generators', 'Tell me about FreePDFLY', 'Show all AI projects'],
      matchedTopic: 'vlogtoblog',
      isFallback: false,
    };
  }

  if (
    q.includes('resume generator') ||
    q.includes('resumegenerators') ||
    q.includes('textora')
  ) {
    return {
      content: generateDeepProjectBreakdown('resumegenerators'),
      thinking,
      thinkingTime,
      suggestions: ['Tell me about VlogToBlog', 'Tell me about FreePDFLY', 'Show tech stack'],
      matchedTopic: 'resumegenerators',
      isFallback: false,
    };
  }

  if (
    q.includes('live project') ||
    q.includes('extension') ||
    q.includes('chrome') ||
    q.includes('funcpilot') ||
    q.includes('readme smith') ||
    q.includes('listing expert') ||
    q.includes('echotodo') ||
    q.includes('changeorbit') ||
    q.includes('weblixio')
  ) {
    return {
      content: generateLiveProjectsResponse(),
      thinking,
      thinkingTime,
      suggestions: ['Show flagship SaaS projects', 'Show client demos', 'GitHub profile & code'],
      matchedTopic: 'live-tools',
      isFallback: false,
    };
  }

  if (
    q.includes('client demo') ||
    q.includes('salon') ||
    q.includes('estilo') ||
    q.includes('mayuri') ||
    q.includes('perfect look') ||
    q.includes('chokhi') ||
    q.includes('spa') ||
    q.includes('freelance') ||
    q.includes('admin') ||
    q.includes('invoice') ||
    q.includes('billing')
  ) {
    return {
      content: generateClientDemosResponse(),
      thinking,
      thinkingTime,
      suggestions: ['Show flagship projects', 'Contact Sujoy for a freelance project', 'View full work experience'],
      matchedTopic: 'client-demos',
      isFallback: false,
    };
  }

  if (
    q.includes('blog') ||
    q.includes('article') ||
    q.includes('writing') ||
    q.includes('agentic') ||
    q.includes('autonomous agent') ||
    q.includes('mcp') ||
    q.includes('model context protocol') ||
    q.includes('local llm') ||
    q.includes('ollama') ||
    q.includes('junior developer') ||
    q.includes('trading')
  ) {
    return {
      content: generateBlogsResponse(),
      thinking,
      thinkingTime,
      suggestions: ['Show AI / ML projects', 'View all 10 certifications', 'What is your tech stack?'],
      matchedTopic: 'blogs',
      isFallback: false,
    };
  }

  if (
    q.includes('cert') ||
    q.includes('credential') ||
    q.includes('marketing') ||
    q.includes('responsible ai') ||
    q.includes('generative ai') ||
    q.includes('cloud') ||
    q.includes('cyber') ||
    q.includes('security')
  ) {
    return {
      content: generateCertificatesResponse(),
      thinking,
      thinkingTime,
      suggestions: ['What is your tech stack?', 'Show GitHub repositories', 'Show projects', 'How to contact Sujoy?'],
      matchedTopic: 'certifications',
      isFallback: false,
    };
  }

  if (
    q.includes('experience') ||
    q.includes('career') ||
    q.includes('timeline') ||
    q.includes('job') ||
    q.includes('work history') ||
    q.includes('speech society') ||
    q.includes('tss') ||
    q.includes('codealpha') ||
    q.includes('intern')
  ) {
    return {
      content: generateExperienceResponse(),
      thinking,
      thinkingTime,
      suggestions: ['What are your top projects?', 'Show GitHub repositories', 'What is your college & education?'],
      matchedTopic: 'experience',
      isFallback: false,
    };
  }

  if (
    q.includes('education') ||
    q.includes('college') ||
    q.includes('university') ||
    q.includes('uem') ||
    q.includes('degree') ||
    q.includes('btech') ||
    q.includes('coursework')
  ) {
    return {
      content: generateEducationResponse(),
      thinking,
      thinkingTime,
      suggestions: ['What are your technical skills?', 'Show GitHub repositories', 'Show Flagship Projects'],
      matchedTopic: 'education',
      isFallback: false,
    };
  }

  // 3. No local match — signal chatApp to call OpenRouter
  return {
    content: '',
    thinking,
    thinkingTime,
    suggestions: [
      'Why should I hire you?',
      'Tell me about yourself',
      'What makes you different from other freshers?',
      'Show flagship projects',
      'What are your strongest technical skills?',
      'Can I see your resume?',
    ],
    isFallback: true,
  };
}
