export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location: string;
  coursework: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  website?: string;
  github?: string;
  category: string;
  technologies: string[];
  contributions: string[];
}

export interface LiveUtilityItem {
  id: string;
  title: string;
  badge: string;
  link: string;
  description: string;
  tags: string[];
}

export interface ClientDemoItem {
  id: string;
  title: string;
  badge: string;
  link: string;
  description: string;
  tags: string[];
  features: string[];
}

export interface BlogPostItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  description: string;
}

export interface SkillCategoryItem {
  category: string;
  code: string;
  skills: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  category: string;
  issuer: string;
  skills: string[];
  imageSrc?: string;
  url?: string;
}

export interface SuggestedPrompt {
  title: string;
  prompt: string;
  category: string;
}

export const portfolioData = {
  name: 'Sujoy Moulick',
  phone: '8942841651',
  email: 'sujoymoulick05@gmail.com',
  website: 'http://www.sujoymoulick.online',
  linkedin: 'https://linkedin.com/in/sujoymoulick',
  github: 'https://github.com/Sujoymoulick',
  location: 'Jaipur, Rajasthan, India',
  headline: 'Computer Science Undergraduate (AI & ML) | Full-Stack, Backend & Agentic AI Developer',
  status: 'Available for internship, developer, and freelance roles',
  summary:
    'Computer Science undergraduate specializing in AI & ML at UEM Jaipur with extensive experience building and shipping full-stack web products, autonomous agentic workflows, browser extensions, SaaS tools, and high-performance backend systems. Proficient across the React/Next.js/Astro ecosystem, Node.js/Express backends, MongoDB/MySQL databases, AI model integrations (Gemini, MCP, LangChain), and technical SEO-driven product growth.',

  education: [
    {
      id: 'uem-jaipur',
      institution: 'University of Engineering & Management (UEM), Jaipur',
      degree: 'B.Tech, Computer Science & Engineering (AI & ML)',
      duration: 'Jul 2024 – Apr 2028',
      location: 'Jaipur, Rajasthan, India',
      coursework: [
        'Data Structures & Algorithms',
        'Database Management Systems (DBMS)',
        'Object-Oriented Programming (OOP)',
        'Operating Systems',
        'Computer Networks',
        'Artificial Intelligence',
        'Machine Learning & Neural Networks',
        'System Design & Software Engineering',
      ],
    },
  ] as EducationItem[],

  experience: [
    {
      id: 'tss-jaipur',
      company: 'The Speech Society (TSS)',
      role: 'Technical Head & Web Developer',
      duration: 'Aug 2026 – Present',
      location: 'Jaipur, Rajasthan',
      responsibilities: [
        'Leading technical operations, digital platforms, and web development initiatives for the society.',
        'Developing and maintaining responsive, accessible web pages using modern HTML, CSS, JavaScript, and React.',
        'Collaborating with leadership to plan and execute technical strategy for large-scale events and student outreach.',
      ],
    },
    {
      id: 'codealpha-intern',
      company: 'CodeAlpha',
      role: 'Back End Developer Intern',
      duration: 'Jun 2026',
      location: 'Remote',
      responsibilities: [
        'Engineered backend APIs, database schemas, and server-side logic for scalable web applications.',
        'Implemented secure authentication, CRUD endpoints, and optimized database queries in MongoDB and Express.',
        'Contributed hands-on across the full backend development lifecycle in a fast-paced collaborative environment.',
      ],
    },
    {
      id: 'freelance-dev',
      company: 'Freelance & Independent Product Engineering',
      role: 'Full-Stack Developer & Technical Consultant',
      duration: '2024 – Present',
      location: 'Remote / Jaipur',
      responsibilities: [
        'Architected and delivered custom client solutions, including business showcase platforms and salon booking engines.',
        'Built full-stack administrative management portals featuring client records, automated invoice generation, payment tracking, and real-time server latency diagnostic monitors.',
        'Executed technical SEO strategies, Google Search Console audits, and web performance optimizations resulting in high discoverability.',
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'freepdfly',
      title: 'FreePDFLY',
      category: 'SaaS / Web Tools',
      shortDesc: '100% client-side, browser-based PDF tools SaaS built with Astro.',
      description:
        'Built a 100% client-side, browser-based PDF tools SaaS using Astro. Tools include PDF to Word/Excel, Merge PDF, Split PDF, and Compress PDF with zero server upload dependencies and client-side processing.',
      website: 'https://freepdfly.com',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['Astro', 'JavaScript', 'HTML5', 'CSS3', 'Client-Side Web APIs'],
      contributions: [
        'End-to-end product development and architecture',
        'High-performance client-side PDF manipulation engine without server uploads',
        'UI/UX design and zero-latency browser workflows',
        'Technical SEO and search-engine discoverability optimizations',
      ],
    },
    {
      id: 'vlogtoblog',
      title: 'VlogToBlog',
      category: 'AI / Full-Stack',
      shortDesc: 'AI-powered web app converting YouTube videos into SEO-optimized structured blogs.',
      description:
        'Premium full-stack web application converting YouTube videos into SEO-optimized, highly structured blog posts with timestamps, key takeaways, and markdown exports using Gemini 1.5 Flash, Node.js, and React.',
      website: 'https://github.com/Sujoymoulick/VlogToBlog',
      github: 'https://github.com/Sujoymoulick/VlogToBlog',
      technologies: ['React.js', 'Node.js', 'Google Gemini 1.5 Flash API', 'Firebase', 'Express'],
      contributions: [
        'Engineered YouTube transcript extraction and AI processing pipeline',
        'Integrated Gemini 1.5 Flash structured prompting for blog generation',
        'Built responsive markdown preview, formatting, and export workflows',
      ],
    },
    {
      id: 'resumegenerators',
      title: 'Resume Generators (TEXTORA)',
      category: 'AI / SaaS',
      shortDesc: 'AI-powered ATS-friendly resume generation suite using Google Gemini API.',
      description:
        'AI-powered resume generation suite utilizing Google Gemini API to craft professional, ATS-optimized resumes in minutes with live previews, multi-section customizers, and PDF export.',
      website: 'https://www.resumegenerators.in/',
      github: 'https://github.com/Sujoymoulick/TEXTORA',
      technologies: ['Next.js', 'React', 'Gemini AI API', 'TypeScript', 'Tailwind CSS'],
      contributions: [
        'Designed AI prompt engineering pipelines for ATS score maximization',
        'Built modular multi-step resume builder with dynamic PDF export',
        'Deployed to production with custom domain and SEO configurations',
      ],
    },
    {
      id: 'fcforge',
      title: 'FCForge',
      category: 'Gaming / Content',
      shortDesc: 'Soccer and EA FC gaming tools and content platform.',
      description:
        'Soccer and EA FC gaming tools website engineered for high search discoverability, low latency, and Google Discover growth.',
      website: 'https://fcforge.com',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['Web Development', 'Technical SEO', 'Search Console', 'Content Strategy'],
      contributions: [
        'Engineered SEO-optimized architecture and site structure',
        'Google Search Console analysis and indexing issue diagnosis',
        'Google Discover ranking strategy and organic traffic growth',
      ],
    },
    {
      id: 'sendvirtualgift',
      title: 'SendVirtualGift',
      category: 'Interactive Web',
      shortDesc: 'Personalized online virtual gift creation and sharing web platform.',
      description:
        'Web platform that allows users to create and send personalized virtual gifts online with interactive flows, animations, and seamless delivery.',
      website: 'https://sendvirtualgift.com',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['React.js', 'JavaScript', 'Node.js', 'CSS3', 'Frontend Deployment'],
      contributions: [
        'Built interactive gift customizer and real-time card animation preview',
        'Developed responsive interfaces and streamlined delivery links',
        'Frontend deployment and high-availability maintenance',
      ],
    },
    {
      id: 'kinetic-luminary',
      title: 'Kinetic Luminary',
      category: 'Creative / 3D',
      shortDesc: 'Immersive 3D portfolio template built with Next.js 16, React 19, and Three.js.',
      description:
        'A high-performance, immersive 3D portfolio template built with Next.js 16, React 19, Three.js, and Tailwind CSS featuring fluid physics animations and interactive lighting.',
      website: 'https://github.com/Sujoymoulick/SUNBWMOUNTAINPORTFOLIO',
      github: 'https://github.com/Sujoymoulick/SUNBWMOUNTAINPORTFOLIO',
      technologies: ['Next.js 16', 'React 19', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
      contributions: [
        'Implemented WebGL shaders, camera controls, and 3D scene physics',
        'Optimized bundle size and render loop for smooth 60fps across mobile and desktop',
      ],
    },
    {
      id: 'adhyayan',
      title: 'Adhyayan',
      category: 'EdTech',
      shortDesc: 'Gamified learning platform with real-time tracking and competitive leaderboards.',
      description:
        'Gamified learning platform leveraging Supabase for real-time progress tracking, competitive leaderboards, quiz engines, and interactive lesson modules.',
      website: 'https://github.com/Sujoymoulick',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['React.js', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
      contributions: [
        'Implemented real-time subscription synchronization with Supabase',
        'Created interactive gamified quiz engine with XP points and leaderboard rankings',
      ],
    },
    {
      id: 'p2p-ticket',
      title: 'P2P Ticket',
      category: 'Blockchain / Web3',
      shortDesc: 'Decentralized ticket resale marketplace on Web3 preventing scalping.',
      description:
        'Decentralized ticket resale marketplace built on Ethereum smart contracts to ensure verifiable authenticity and prevent scalping through programmed price caps.',
      website: 'https://github.com/Sujoymoulick',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['Solidity', 'Web3.js', 'Ethers.js', 'React.js', 'IPFS'],
      contributions: [
        'Authored ERC-721 based ticket NFT smart contracts with max royalty & cap rules',
        'Connected MetaMask wallet authentication and decentralized IPFS metadata hosting',
      ],
    },
    {
      id: 'sustainabot',
      title: 'SustainaBot',
      category: 'AI / EcoTech',
      shortDesc: 'RAG-based AI agent for carbon footprint audits and sustainability recommendations.',
      description:
        'Retrieval-Augmented Generation (RAG) AI assistant helping households and small businesses analyze energy consumption patterns and receive personalized decarbonization steps.',
      website: 'https://github.com/Sujoymoulick',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['Python', 'LangChain', 'OpenAI API', 'ChromaDB', 'FastAPI'],
      contributions: [
        'Constructed vector embeddings pipeline over eco-guidelines and utility rate cards',
        'Designed multi-step conversation chains with verifiable source citations',
      ],
    },
    {
      id: 'neuropath',
      title: 'NeuroPath',
      category: 'AI / HealthTech',
      shortDesc: 'Computer-vision diagnostic tool for early detection of neurological tremors.',
      description:
        'Vision-based diagnostic tool utilizing TensorFlow and OpenCV for fine-grained hand tracking and early detection of neurological tremors and motor instability.',
      website: 'https://github.com/Sujoymoulick',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'NumPy', 'Matplotlib'],
      contributions: [
        'Built landmark tracking algorithms extracting micro-oscillation frequencies',
        'Trained classification models benchmarked against clinical motion datasets',
      ],
    },
    {
      id: 'mobile-wallet',
      title: 'Mobile Wallet',
      category: 'Fintech / Mobile',
      shortDesc: 'Cross-platform financial application with biometric security and real-time history.',
      description:
        'Cross-platform mobile wallet built with Flutter and Dart featuring biometric authentication, real-time transaction ledgers, currency conversions, and offline transaction logging.',
      website: 'https://github.com/Sujoymoulick',
      github: 'https://github.com/Sujoymoulick',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Local Auth', 'REST APIs'],
      contributions: [
        'Built biometric face/fingerprint authentication flows and encrypted local storage',
        'Integrated real-time Cloud Firestore listeners for instant balance updates',
      ],
    },
  ] as ProjectItem[],

  liveProjects: [
    {
      id: 'funcpilot',
      title: 'FuncPilot',
      badge: '🚀 FuncPilot',
      link: 'https://sujoymoulick.github.io/FuncPilot/',
      description:
        'Automated code testing and reporting platform designed to help developers validate functions efficiently. Scans source code files, identifies available functions, executes test cases, detects errors, and generates clean reports.',
      tags: ['TypeScript', 'JavaScript', 'Testing Frameworks', 'Node.js'],
    },
    {
      id: 'readmesmith',
      title: 'README Smith',
      badge: '📘 README Smith',
      link: 'https://readmesmith-beta.vercel.app/',
      description:
        'Smart README generator that helps developers create professional GitHub profile and repository READMEs with customizable templates, dynamic badges, and markdown generation tools.',
      tags: ['Next.js', 'React', 'TypeScript', 'Markdown Generation'],
    },
    {
      id: 'listing-expert',
      title: 'Listing Expert',
      badge: '🧩 Listing Expert',
      link: 'https://sujoymoulick.github.io/Chrome-Extension-Listing-Expert/',
      description:
        'Chrome Web Store optimization toolkit built to simplify the extension publishing process. Generates listing content, formats descriptions, prepares store assets, and checks guideline compliance.',
      tags: ['JavaScript', 'Chrome Extensions API', 'SEO Utilities', 'HTML5'],
    },
    {
      id: 'echotodo',
      title: 'EchoToDo',
      badge: '🎤 EchoToDo',
      link: 'https://sujoymoulick.github.io/EchoToDo-documentation/',
      description:
        'Productivity-focused Chrome extension published on the Chrome Web Store. Features customizable timers, task tracking, and tab-based activity management to keep users focused during deep work.',
      tags: ['JavaScript', 'Chrome Extensions API', 'Local Storage', 'Web Store'],
    },
    {
      id: 'changeorbit',
      title: 'ChangeOrbit',
      badge: '🪐 ChangeOrbit',
      link: 'https://sujoymoulick.github.io/ChangeOrbit/',
      description:
        'GitHub commit log management tool that transforms raw commit histories into a clean, visual, and easy-to-read changelog format for project progress review.',
      tags: ['JavaScript', 'GitHub API', 'HTML5', 'CSS3'],
    },
    {
      id: 'weblixio',
      title: 'Weblixio',
      badge: '🌐 Weblixio',
      link: 'https://sujoymoulick.github.io/weblixio/',
      description:
        'Browser utility extension that extracts website design assets, theme colors, and color palettes, exporting them into a structured PDF design report.',
      tags: ['JavaScript', 'WebExtensions API', 'PDF Generation', 'Color Theory'],
    },
  ] as LiveUtilityItem[],

  clientDemos: [
    {
      id: 'estilo-salon',
      title: 'Estilo Salon',
      badge: '✨ Estilo Salon',
      link: 'https://estilo-salon.netlify.app/',
      description:
        'Premium, dark-themed salon showcase designed for upscale hair boutiques and professional stylists. Includes interactive service lookbooks, stylist portfolios, and booking hooks.',
      tags: ['Elegance Design', 'Hair Care', 'Premium Branding', 'Responsive Layout'],
      features: [
        'Visual high-resolution Hair Lookbook',
        'Stylist profiles with specialization tags',
        'Services menu with dynamic category filters',
        'Prominent "Book Now" integration hooks',
      ],
    },
    {
      id: 'mayuris-beauty',
      title: "Mayuri's Beauty Parlour",
      badge: "🌸 Mayuri's Beauty",
      link: 'https://mayurisbeauty.netlify.app/',
      description:
        'Soft, inviting beauty parlour site designed to highlight skincare treatments, pre-bridal packages, and facial cosmetics with customer consultation forms.',
      tags: ['Beauty Parlour', 'Skincare Catalog', 'Bridal Packages', 'Clean UI'],
      features: [
        'Bridal makeup packages & timelines',
        'Aromatherapy & facial service menu',
        'Customer consultation intake form',
        'Location finder and contact directory',
      ],
    },
    {
      id: 'perfect-look',
      title: 'Perfect Look Salon',
      badge: '✂️ Perfect Look',
      link: 'https://parfectlook.netlify.app/',
      description:
        'Vibrant and modern hair salon website showcasing bold typography, interactive styling pricing calculators, and before-and-after conversion carousels.',
      tags: ['Trendy Cuts', 'Pricing Cards', 'Responsive UI', 'Interactive CSS'],
      features: [
        'Interactive service pricing calculator',
        'Stylist shift scheduler template',
        'Before & After look carousel support',
        'One-tap mobile booking buttons',
      ],
    },
    {
      id: 'chokhi-binani',
      title: 'Chokhi Binani Beauty Hub',
      badge: '👸 Chokhi Binani',
      link: 'https://chokhibinanibeautyhub.netlify.app/',
      description:
        'Boutique salon landing page tailored for traditional ethnic wear, bridal makeup, and intricate mehndi (henna) artists with rich detailing galleries.',
      tags: ['Traditional Styling', 'Mehndi Art', 'Wedding Special', 'Rich Galleries'],
      features: [
        'Traditional henna/mehndi pattern catalog',
        'Bridal makeover transformation diaries',
        'Festival-specific service discounts display',
        'WhatsApp-based instant booking link',
      ],
    },
    {
      id: 'universal-spa',
      title: 'Universal Spa & Salon',
      badge: '💫 Demo Universal',
      link: 'https://demouniversal.netlify.app/',
      description:
        'Multi-branch wellness spa and hair treatment demo featuring relaxing colors, duration-based pricing listings, aromatherapy packages, and standard service hours lookup.',
      tags: ['Wellness Spa', 'Aromatherapy', 'Duration Listings', 'Multi-branch'],
      features: [
        'Aromatherapy & massage duration breakdown',
        'Wellness package gift vouchers selector',
        'Business hours and walk-in policies listing',
        'Integrated map and multi-branch details',
      ],
    },
  ] as ClientDemoItem[],

  blogs: [
    {
      slug: 'rise-of-autonomous-ai-agents',
      title: 'The Rise of Autonomous AI Agents: From Chatbots to Agentic Workflows',
      date: 'June 17, 2026',
      category: 'AI/ML',
      tags: ['AI Agents', 'Agentic AI', 'Software Engineering', 'Automation'],
      readingTime: '9 min read',
      description:
        'How Agentic AI is transforming software engineering, automated coding, and multi-agent collaboration frameworks from static prompts to iterative loops.',
    },
    {
      slug: 'model-context-protocol-mcp-llm-tools',
      title: 'Model Context Protocol (MCP): The Unified Bridge Between LLMs and Tools',
      date: 'June 15, 2026',
      category: 'Engineering Notes',
      tags: ['MCP', 'Anthropic', 'API', 'LLM Tools'],
      readingTime: '7 min read',
      description:
        "An in-depth look at Anthropic's Model Context Protocol (MCP) and how it standardizes LLM integrations with databases, local environments, and APIs.",
    },
    {
      slug: 'prompt-engineering-vs-agentic-workflows',
      title: 'Prompt Engineering vs. Agentic Workflows: Why the Future Belongs to Iterative Loops',
      date: 'June 12, 2026',
      category: 'Tutorials',
      tags: ['Prompt Engineering', 'Agentic AI', 'AI Design Patterns', 'LLMs'],
      readingTime: '8 min read',
      description:
        'Why writing the perfect prompt is becoming obsolete, and how multi-step agent loops (reflection, planning, execution) achieve 10x better benchmark results.',
    },
    {
      slug: 'local-llms-deepseek-llama-consumer-hardware',
      title: 'Local LLMs in 2026: Running DeepSeek and Llama on Consumer Hardware',
      date: 'June 9, 2026',
      category: 'AI/ML',
      tags: ['Local LLMs', 'Ollama', 'DeepSeek', 'Llama', 'WebGPU'],
      readingTime: '10 min read',
      description:
        'A developer guide to self-hosting powerful open-source language models locally using Ollama, llama.cpp, and WebGPU in the browser.',
    },
    {
      slug: 'ai-agents-redefining-entry-level-coding',
      title: 'The Death of the Junior Developer? How AI Agents are Redefining Entry-Level Coding',
      date: 'June 5, 2026',
      category: 'Programming',
      tags: ['Careers', 'Software Engineering', 'AI Coding', 'Junior Developers'],
      readingTime: '8 min read',
      description:
        'An honest analysis of how autonomous coding agents are reshaping entry-level software development and how junior devs can thrive as agent orchestrators.',
    },
    {
      slug: 'future-of-generative-ai',
      title: 'The Future of Generative AI: Beyond Text and Images',
      date: 'May 10, 2026',
      category: 'AI/ML',
      tags: ['AI', 'Machine Learning', 'Future Tech', 'Video Generation'],
      readingTime: '8 min read',
      description:
        'Deep dive into how Generative AI is advancing into real-time high-fidelity video, 3D world creation, and Large Action Models (LAMs).',
    },
    {
      slug: 'understanding-web3-decentralized-internet',
      title: 'Understanding Web3: The Decentralized Internet',
      date: 'May 8, 2026',
      category: 'Web3',
      tags: ['Web3', 'Blockchain', 'Decentralization', 'Solidity'],
      readingTime: '6 min read',
      description:
        'What exactly is Web3? A comprehensive guide for developers transitioning from Web2 to decentralized smart contract architectures.',
    },
    {
      slug: 'mastering-data-structures-dsa-guide',
      title: 'Mastering Data Structures: The Key to Technical Interviews',
      date: 'May 5, 2026',
      category: 'DSA',
      tags: ['DSA', 'Interview Prep', 'Algorithms', 'Computer Science'],
      readingTime: '10 min read',
      description:
        'An essential roadmap to mastering linear and non-linear data structures, trees, graphs, and dynamic programming for top-tier engineering roles.',
    },
    {
      slug: 'bitcoin-vs-ethereum-blockchain-comparison',
      title: 'Bitcoin vs Ethereum: The Ultimate Blockchain Comparison',
      date: 'May 1, 2026',
      category: 'Blockchain',
      tags: ['Bitcoin', 'Ethereum', 'Crypto', 'Smart Contracts'],
      readingTime: '7 min read',
      description:
        "Comparing digital gold with the world's decentralized computer: scarcity vs smart contracts, scripting vs Solidity.",
    },
    {
      slug: 'trading-basics-for-developers',
      title: 'Trading Basics for Developers: Why You Should Understand Markets',
      date: 'April 28, 2026',
      category: 'Trading Basics',
      tags: ['Finance', 'Trading', 'Algorithms', 'CCXT'],
      readingTime: '9 min read',
      description:
        'An introduction to financial markets, technical analysis, and how developers can build algorithmic trading tools using CCXT and Alpaca.',
    },
    {
      slug: 'top-10-mistakes-beginners-make-in-web-development',
      title: 'Top 10 Mistakes Beginners Make in Web Development',
      date: 'May 3, 2026',
      category: 'Programming',
      tags: ['Web Dev', 'Beginners', 'Learning', 'Tutorial Hell'],
      readingTime: '5 min read',
      description:
        'Avoiding common traps like tutorial hell, skipping HTML/CSS fundamentals, and framework-hopping too early.',
    },
  ] as BlogPostItem[],

  certifications: [
    {
      id: 'CERT-GENAI',
      title: 'Generative AI',
      category: 'AI/ML',
      issuer: 'AI Foundations & Research',
      skills: ['Generative Models', 'AI Applications', 'Transformer Architectures'],
      imageSrc: '/certificates/Generative AI.png',
      url: '',
    },
    {
      id: 'CERT-LLM',
      title: 'Large Language Models (LLM)',
      category: 'AI/ML',
      issuer: 'AI Certification Authority',
      skills: ['LLMs', 'Prompt Engineering', 'Model Fine-Tuning', 'Embeddings'],
      imageSrc: '/certificates/LLM.png',
      url: '',
    },
    {
      id: 'CERT-RESP-AI',
      title: 'Responsible AI',
      category: 'AI Ethics',
      issuer: 'AI Foundations',
      skills: ['AI Ethics', 'Bias Mitigation', 'Model Transparency', 'Safety Protocols'],
      imageSrc: '/certificates/ResponsibleAI.png',
      url: '',
    },
    {
      id: 'CERT-DM',
      title: 'Foundations of Digital Marketing and E-commerce',
      category: 'Marketing & SEO',
      issuer: 'Google / Professional Certification',
      skills: ['Technical SEO', 'Content Strategy', 'Google Search Console', 'Growth Analytics'],
      imageSrc: '/certificates/DM.png',
      url: '',
    },
    {
      id: 'CERT-CLOUD',
      title: 'Cloud Computing',
      category: 'Cloud',
      issuer: 'Cloud Certification Board',
      skills: ['Cloud Architecture', 'IaaS', 'PaaS', 'Microservices'],
      imageSrc: '/certificates/cloud computing.png',
      url: '',
    },
    {
      id: 'CERT-CYBER',
      title: 'Cyber Security',
      category: 'Security',
      issuer: 'Security Authority',
      skills: ['Network Security', 'Threat Modeling', 'Defensive Protocols', 'Authentication'],
      imageSrc: '/certificates/cyber-sequrity.png',
      url: '',
    },
    {
      id: 'CERT-SE',
      title: 'Software Engineering',
      category: 'Engineering',
      issuer: 'Professional Software Board',
      skills: ['SDLC', 'Design Patterns', 'Clean Code', 'Modular Architecture'],
      imageSrc: '/certificates/Software engineering.png',
      url: '',
    },
    {
      id: 'CERT-MONGO',
      title: 'MongoDB',
      category: 'Database',
      issuer: 'Database Authority',
      skills: ['NoSQL', 'Database Design', 'CRUD Operations', 'Aggregation Pipeline'],
      imageSrc: '/certificates/mongodb.png',
      url: '',
    },
    {
      id: 'CERT-WEB',
      title: 'HTML, CSS & JavaScript',
      category: 'Web Dev',
      issuer: 'Web Standards Board',
      skills: ['HTML5 Semantic Layout', 'CSS3 Modern Styling', 'ES6+ JavaScript', 'DOM Manipulation'],
      imageSrc: '/certificates/HTML-CSS-JS.png',
      url: '',
    },
    {
      id: 'CERT-GRAPHIC',
      title: 'Graphic Design',
      category: 'Design',
      issuer: 'Visual Arts Institute',
      skills: ['Visual Communication', 'Layout & Typography', 'Color Theory', 'UI/UX Basics'],
      imageSrc: '/certificates/Graphic-design.png',
      url: '',
    },
  ] as CertificationItem[],

  skills: [
    {
      category: 'Programming Languages',
      code: 'LANG',
      skills: ['Java', 'Python', 'JavaScript (ES6+)', 'TypeScript', 'C', 'Dart', 'Solidity', 'SQL'],
    },
    {
      category: 'Frontend & UI Engineering',
      code: 'FRONTEND',
      skills: ['React 19', 'Next.js 16', 'Astro', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP', 'HTML5/CSS3'],
    },
    {
      category: 'Backend & Systems Architecture',
      code: 'BACKEND',
      skills: ['Node.js', 'Express.js', 'FastAPI', 'RESTful APIs', 'Supabase', 'Firebase', 'JWT Auth', 'WebSockets'],
    },
    {
      category: 'Databases & Storage',
      code: 'DATABASES',
      skills: ['MongoDB (Atlas)', 'MySQL', 'ChromaDB (Vector DB)', 'NoSQL Schema Design', 'BSON EJSON Utilities'],
    },
    {
      category: 'AI / ML & Agentic Systems',
      code: 'AI/ML',
      skills: ['Generative AI', 'Large Language Models (LLMs)', 'Model Context Protocol (MCP)', 'Prompt Engineering', 'LangChain', 'OpenAI & Gemini 1.5 APIs', 'TensorFlow', 'OpenCV'],
    },
    {
      category: 'Web3 & Blockchain',
      code: 'WEB3',
      skills: ['Smart Contracts', 'Solidity', 'Ethers.js', 'Web3.js', 'IPFS', 'MetaMask Integration'],
    },
    {
      category: 'Developer Tools & Cloud',
      code: 'TOOLS',
      skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Netlify', 'Chrome Extension APIs', 'Ollama (Local LLMs)'],
    },
    {
      category: 'SEO & Growth Marketing',
      code: 'GROWTH',
      skills: ['Technical SEO', 'Google Search Console', 'Content Strategy', 'Discover Optimization', 'Performance Auditing'],
    },
    {
      category: 'Core Computer Science',
      code: 'CORE',
      skills: ['Data Structures & Algorithms (DSA)', 'Object-Oriented Programming (OOP)', 'DBMS', 'Operating Systems', 'System Design'],
    },
  ] as SkillCategoryItem[],

  suggestedPrompts: [
    {
      title: 'Showcase Featured Projects',
      prompt: 'Can you show me Sujoy\'s flagship projects including FreePDFLY, VlogToBlog, and Resume Generators?',
      category: 'Projects',
    },
    {
      title: 'Explore Live Web Tools & Extensions',
      prompt: 'What live apps, browser extensions, and developer utilities has Sujoy published?',
      category: 'Live Apps',
    },
    {
      title: 'Technical Stack & AI Skills',
      prompt: 'What are Sujoy\'s core skills across AI/ML, React, Node.js, MCP, and Web3?',
      category: 'Skills',
    },
    {
      title: 'Read Technical Blog Articles',
      prompt: 'Tell me about Sujoy\'s technical articles on Autonomous AI Agents, MCP, and Local LLMs.',
      category: 'Blog',
    },
  ] as SuggestedPrompt[],

  seo: {
    title: 'SujoyGPT — Sujoy Moulick Developer Portfolio',
    description:
      'Computer Science undergraduate specializing in AI & ML with experience building full-stack web products, SaaS tools, AI agents, and backend systems.',
    canonicalUrl: 'http://www.sujoymoulick.online',
  },
};
