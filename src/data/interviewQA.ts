export interface InterviewQAItem {
  id: string;
  question: string;
  topic?: string;
  keywords: string[];
  answer: string;
  suggestions?: string[];
}

export const INTERVIEW_QA_DATABASE: InterviewQAItem[] = [
  // 1. Tell me about yourself.
  {
    id: 'tell-me-about-yourself',
    question: 'Tell me about yourself.',
    topic: 'introduction',
    keywords: [
      'tell me about yourself',
      'introduce yourself',
      'who are you',
      'who is sujoy',
      'give me your introduction',
      'give me a brief introduction',
      'brief introduction',
      'tell me about u',
      'tell me abt urself',
      'intro',
      'about you',
      'walk me through your background',
      'summary of your background',
      'tell me your story',
    ],
    answer: `I am **Sujoy Moulick**, a Computer Science undergraduate specializing in **Artificial Intelligence & Machine Learning** at the **University of Engineering & Management (UEM), Jaipur** (Class of 2028).

I am a passionate full-stack developer, backend engineer, and AI enthusiast who loves turning ideas into high-performance, real-world products. Over the past few years, I have engineered and shipped several independent products, including:
- **FreePDFLY:** A 100% client-side, zero-server-upload PDF SaaS built with Astro.
- **VlogToBlog:** An AI platform converting YouTube videos into SEO-optimized structured blogs using Gemini 1.5 Flash and Node.js.
- **Resume Generators (TEXTORA):** An AI-powered ATS resume builder.
- **Published Chrome Extensions & Dev Tools:** Including FuncPilot, EchoToDo, and README Smith.

Professionally, I serve as the **Technical Head & Web Developer** at *The Speech Society (TSS)* in Jaipur and previously completed a **Back End Developer Internship** at *CodeAlpha*. I am always driven by curiosity, clean software architecture, and delivering products that solve real problems.`,
    suggestions: [
      'Why should I hire you?',
      'Tell me about your projects',
      'What are your strongest skills?',
      'Can I see your resume?',
    ],
  },

  // 2. Why should I hire you?
  {
    id: 'why-hire-you',
    question: 'Why should I hire you?',
    topic: 'recruitment',
    keywords: [
      'why should i hire you',
      'why should we hire you',
      'why hire you',
      'why select you',
      'why choose you',
      'why should i select you',
      'why should we choose you',
      'what makes you worth hiring',
      'why are you a good candidate',
      'why hire sujoy',
      'why choose sujoy',
      'why select sujoy',
      'why should company hire you',
      'why should company choose you',
      'why shud i hire u',
      'why hire u',
      'reasons to hire you',
      'why should we recruit you',
    ],
    answer: `You should hire me because I combine a solid computer science foundation in **AI/ML and backend systems** with a proven track record of **actually shipping production software**.

Here is what I bring to your engineering team:
1. **End-to-End Ownership:** I don't just write code; I design architectures, build backend APIs, optimize client-side performance, configure SEO, and deploy scalable web apps (like FreePDFLY and VlogToBlog).
2. **Speed & Adaptability:** As a fast learner, I rapidly absorb new frameworks, libraries, and design patterns, whether it's React 19, Next.js 16, Astro, Node.js, or LLM Model Context Protocol (MCP).
3. **Problem-Solving Mindset:** Through my backend internship at CodeAlpha and university coursework in DSA, I approach software challenges methodically with a focus on clean, maintainable, and modular code.
4. **Strong Work Ethic:** As a fresher, I bring genuine enthusiasm, curiosity, humility, and dedication to contribute meaningful value from day one.`,
    suggestions: [
      'What makes you different from other freshers?',
      'What are your strengths?',
      'Tell me about your projects',
      'Can I see your resume?',
    ],
  },

  // 3. What are your strengths?
  {
    id: 'strengths',
    question: 'What are your strengths?',
    topic: 'personality',
    keywords: [
      'what are your strengths',
      'what is your strength',
      'tell me your strengths',
      'your key strengths',
      'what are you good at',
      'strong points',
      'greatest strengths',
      'what makes you strong',
      'what are your core strengths',
      'wat r ur strengths',
    ],
    answer: `My core strengths lie in both technical execution and personal mindset:

1. **Practical Product Building:** I have the ability to take an abstract concept and translate it into a fast, functional, and deployed web application with a modern user experience.
2. **Rapid Learning & Curiosity:** The tech landscape evolves constantly. I quickly learn and implement cutting-edge technologies—from Astro and WebGPU to Agentic AI and MCP.
3. **Full-Stack Versatility:** I am comfortable across the entire web stack—from crafting responsive UI components in React/Tailwind to designing database schemas in MongoDB/MySQL and writing RESTful APIs in Node.js/Express.
4. **Attention to Performance & SEO:** I build with user latency, accessibility, clean DOM structures, and organic discoverability in mind.
5. **Ownership & Accountability:** I take responsibility for my code, testing, and edge cases to ensure reliable software delivery.`,
    suggestions: [
      'What is your weakness?',
      'What are your strongest technical skills?',
      'How do you solve difficult programming problems?',
    ],
  },

  // 4. What is your weakness?
  {
    id: 'weaknesses',
    question: 'What is your weakness?',
    topic: 'personality',
    keywords: [
      'what is your weakness',
      'what are your weaknesses',
      'tell me your weakness',
      'areas of improvement',
      'what are your flaws',
      'greatest weakness',
      'biggest weakness',
      'what do you struggle with',
    ],
    answer: `One area I have been actively working on is **perfectionism in early prototypes**. Sometimes I spend extra time fine-tuning micro-animations, styling edge cases, or optimizing code before validating the core Minimum Viable Product (MVP).

To overcome this, I now adopt a strict **milestone-driven workflow**:
- First build a functional, test-covered MVP to validate the logic.
- Then prioritize subsequent iterations for UI polish, performance benchmarking, and progressive enhancements based on actual feedback.

Additionally, because I am genuinely excited about new technologies, I occasionally want to explore too many tools at once. I manage this by keeping a structured learning backlog and focusing deeply on one core technology stack at a time.`,
    suggestions: [
      'What are your strengths?',
      'How do you handle deadlines?',
      'What are you currently learning?',
    ],
  },

  // 5. What makes you different from other freshers?
  {
    id: 'what-makes-you-different',
    question: 'What makes you different from other freshers?',
    topic: 'recruitment',
    keywords: [
      'what makes you different from other freshers',
      'what makes you better than other freshers',
      'how are you different from other freshers',
      'what sets you apart',
      'why choose you over other candidates',
      'why should we pick you over others',
      'how do you stand out',
      'what makes sujoy unique',
      'what differentiates you',
    ],
    answer: `What sets me apart from many freshers is my **proven bias for shipping real-world products**:

1. **Production Track Record:** While many students stick strictly to classroom assignments, I have built and deployed live platforms like **FreePDFLY** (a browser-based PDF SaaS), **VlogToBlog** (AI video-to-blog converter), **Resume Generators**, and **published Chrome extensions on the Chrome Web Store**.
2. **Real-World Experience:** I've applied my skills as **Technical Head** at *The Speech Society* and as a **Back End Developer Intern** at *CodeAlpha*, engineering production REST APIs and database models.
3. **Multidisciplinary Knowledge:** I blend **Full-Stack Engineering** (React, Node, Astro, MongoDB) with **AI/ML systems** and **Technical SEO**, ensuring that software is not only well-engineered but also discoverable and user-friendly.
4. **Self-Driven Initiative:** I build tools that solve problems for developers and users, write in-depth technical articles on modern tech, and continuously upgrade my engineering standards.`,
    suggestions: [
      'Tell me about your projects',
      'What are your strongest technical skills?',
      'Why should I hire you?',
    ],
  },

  // 6. What are your strongest technical skills?
  {
    id: 'strongest-technical-skills',
    question: 'What are your strongest technical skills?',
    topic: 'skills',
    keywords: [
      'what are your strongest technical skills',
      'what are your core skills',
      'what is your main skill',
      'top technical skills',
      'what are you best at',
      'what tech are you best at',
      'primary skillset',
      'key skills',
      'core competencies',
    ],
    answer: `My strongest technical competencies include:

- **Frontend & Modern Web:** JavaScript (ES6+), TypeScript, React 19, Next.js 16, Astro, Tailwind CSS, HTML5/CSS3, and Framer Motion.
- **Backend Architecture:** Node.js, Express.js, RESTful API design, CRUD services, authentication flows (JWT/OAuth), and server-side logic.
- **Databases & Data Modeling:** MongoDB (Atlas), MySQL, schema design, and vector databases.
- **AI & Machine Learning:** Generative AI integration, Prompt Engineering, OpenAI/Gemini APIs, Model Context Protocol (MCP), LangChain, and ML fundamentals.
- **Developer Tools & Deployment:** Git, GitHub version control, VS Code, Postman API testing, Vercel, Netlify, and Chrome Extension APIs.
- **Performance & SEO:** Technical SEO, Core Web Vitals optimization, client-side caching, and search console analytics.`,
    suggestions: [
      'Which programming language are you most comfortable with?',
      'Tell me about your projects',
      'View 10 verified certifications',
    ],
  },

  // 7. Why did you choose Computer Science?
  {
    id: 'why-choose-cs',
    question: 'Why did you choose Computer Science?',
    topic: 'academics',
    keywords: [
      'why did you choose computer science',
      'why computer science',
      'why cs',
      'why did you pick cse',
      'reason for choosing computer science',
      'how did you get into coding',
      'why engineering',
    ],
    answer: `I chose Computer Science because it offers the unique ability to **turn pure logic and imagination into software that people around the world can use instantly**.

From my earliest interactions with computers, I was fascinated by what happened under the hood—how data traveled across networks, how algorithms organized chaos, and how simple lines of code could create interactive tools. Computer Science empowers you to be both an architect and a builder, solving tangible human problems with scalable technology.`,
    suggestions: [
      'Why did you choose AI & ML?',
      'What is your college & education?',
      'Tell me about your projects',
    ],
  },

  // 8. Why did you choose AI & ML?
  {
    id: 'why-choose-ai-ml',
    question: 'Why did you choose AI & ML?',
    topic: 'academics',
    keywords: [
      'why did you choose ai & ml',
      'why ai and ml',
      'why artificial intelligence',
      'why machine learning',
      'why ai ml specialization',
      'interest in ai',
      'why ai',
    ],
    answer: `I chose to specialize in **Artificial Intelligence & Machine Learning** at UEM Jaipur because AI represents the most profound shift in computing in our generation.

Traditional software relies on hardcoded rules for every scenario, but AI allows systems to generalize, reason over unstructured data, and automate cognitive workflows. I am particularly excited about **Agentic AI systems, LLMs, and intelligent developer tooling**—where AI acts not just as a text generator, but as an active agent capable of planning, utilizing external tools via MCP, and solving multi-step engineering tasks.`,
    suggestions: [
      'What are your AI/ML projects?',
      'Read technical articles on AI Agents',
      'What is your college & education?',
    ],
  },

  // 9. What technologies do you know?
  {
    id: 'what-technologies-do-you-know',
    question: 'What technologies do you know?',
    topic: 'skills',
    keywords: [
      'what technologies do you know',
      'what technologies are you familiar with',
      'tech stack',
      'what is your tech stack',
      'technologies you work with',
      'list your technologies',
      'all technologies',
      'wat r ur skills',
    ],
    answer: `Here is a comprehensive breakdown of the technologies I work with:

- **Languages:** Java, Python, JavaScript, TypeScript, C, SQL, Dart, Solidity.
- **Frontend:** React.js, Next.js, Astro, Tailwind CSS, Framer Motion, Three.js, GSAP, HTML5, CSS3.
- **Backend:** Node.js, Express.js, FastAPI, REST APIs, Supabase, Firebase, WebSockets.
- **Databases:** MongoDB (Atlas), MySQL, ChromaDB (Vector DB).
- **AI / ML & Agents:** Generative AI, Large Language Models (LLMs), Model Context Protocol (MCP), Prompt Engineering, LangChain, Gemini API, OpenAI API, TensorFlow, OpenCV.
- **DevOps & Tools:** Git, GitHub, VS Code, Postman, Vercel, Netlify, Chrome Extension APIs, Ollama.
- **Web3:** Solidity, Smart Contracts, Ethers.js, IPFS.
- **SEO & Growth:** Technical SEO, Google Search Console, Google Discover optimization.`,
    suggestions: [
      'Which programming language are you most comfortable with?',
      'Tell me about your projects',
      'View certifications',
    ],
  },

  // 10. Which programming language are you most comfortable with?
  {
    id: 'comfortable-programming-language',
    question: 'Which programming language are you most comfortable with?',
    topic: 'skills',
    keywords: [
      'which programming language are you most comfortable with',
      'what is your preferred programming language',
      'favorite programming language',
      'best language',
      'which language do you prefer',
      'primary language',
      'main programming language',
    ],
    answer: `I am most comfortable with **JavaScript and TypeScript**.

Because of their ubiquity across the full stack (React/Next.js/Astro on the frontend, and Node.js/Express on the backend), I use JavaScript and TypeScript daily to build scalable web apps, browser extensions, and server APIs.

Additionally, I am highly proficient in:
- **Python:** For AI/ML workflows, data manipulation, LangChain scripts, and backend tasks.
- **Java & C:** For core Data Structures & Algorithms, Object-Oriented design, and academic foundations at UEM Jaipur.`,
    suggestions: [
      'Explain your knowledge of JavaScript',
      'How strong are you in DSA?',
      'What are your strongest skills?',
    ],
  },

  // 11. Tell me about your projects.
  {
    id: 'tell-me-about-projects',
    question: 'Tell me about your projects.',
    topic: 'projects',
    keywords: [
      'tell me about your projects',
      'what projects have you built',
      'show me your projects',
      'list your projects',
      'projects overview',
      'what have you made',
      'show projects',
      'portfolio projects',
    ],
    answer: `I have engineered a wide range of production web products, AI applications, and developer utilities:

### 1. Flagship SaaS & AI Products
- **FreePDFLY:** 100% client-side browser-based PDF utility SaaS built in Astro ([freepdfly.com](https://freepdfly.com)).
- **VlogToBlog:** AI app converting YouTube videos into SEO-optimized structured articles using Gemini 1.5 Flash and Node.js.
- **Resume Generators (TEXTORA):** AI-powered ATS resume builder.
- **FCForge:** High-performance soccer & gaming analytics tool suite ([fcforge.com](https://fcforge.com)).
- **SendVirtualGift:** Interactive gift creator and sharing platform ([sendvirtualgift.com](https://sendvirtualgift.com)).
- **Kinetic Luminary:** Immersive 3D portfolio template built in Next.js 16 and Three.js.

### 2. Published Live Extensions & Tools
- **FuncPilot:** Automated code testing and reporting platform.
- **README Smith:** Smart GitHub profile/repo README generator.
- **EchoToDo:** Productivity Chrome extension published on the Chrome Web Store.
- **Listing Expert:** Chrome Web Store listing & SEO optimization toolkit.
- **Weblixio:** Color palette & design asset extractor with PDF reporting.

### 3. Web3 & Experimental AI
- **P2P Ticket:** Decentralized Web3 anti-scalping ticket resale marketplace using Solidity.
- **SustainaBot:** RAG-based AI carbon audit agent using LangChain.
- **NeuroPath:** Computer-vision motor tremor diagnostic tool using TensorFlow.`,
    suggestions: [
      'Which project are you most proud of?',
      'What is FreePDFly?',
      'Tell me about VlogToBlog',
      'Can I see your GitHub?',
    ],
  },

  // 12. Which project are you most proud of?
  {
    id: 'most-proud-project',
    question: 'Which project are you most proud of?',
    topic: 'projects',
    keywords: [
      'which project are you most proud of',
      'what is your best project',
      'your favorite project',
      'project you are most proud of',
      'greatest project',
      'flagship project',
      'best work',
    ],
    answer: `The project I am most proud of is **FreePDFLY** ([freepdfly.com](https://freepdfly.com)).

### Why I'm proud of it:
1. **Architectural Elegance:** Unlike traditional PDF tools that upload sensitive user documents to remote servers (causing latency, privacy risks, and high server costs), FreePDFLY processes 100% of PDF tasks **entirely in the user's browser** via client-side Web APIs and WebAssembly.
2. **Speed & Zero Server Overhead:** By offloading computation to the client, operations like merging, splitting, compressing, and converting files happen with zero network lag and zero server hosting expenses.
3. **End-to-End Execution:** I built it from ground up using **Astro**, designed an accessible and responsive UI, and optimized its technical SEO for organic search discoverability.`,
    suggestions: [
      'What problem does FreePDFly solve?',
      'How did you build FreePDFly?',
      'Tell me about VlogToBlog',
    ],
  },

  // 13. What is FreePDFly?
  {
    id: 'what-is-freepdfly',
    question: 'What is FreePDFly?',
    topic: 'projects',
    keywords: [
      'what is freepdfly',
      'what is free pdfly',
      'tell me about freepdfly',
      'freepdfly overview',
      'freepdfly kya hai',
      'explain freepdfly',
      'about freepdfly',
    ],
    answer: `**FreePDFLY** ([freepdfly.com](https://freepdfly.com)) is a **100% client-side, browser-based PDF utility SaaS** built with Astro.

It provides users with essential PDF tools—such as PDF to Word/Excel conversion, PDF Merge, PDF Split, and PDF Compression—without ever uploading the files to a remote server. Everything is executed directly in the browser using client-side JavaScript APIs, offering unmatched speed, zero-latency processing, and complete data privacy.`,
    suggestions: [
      'What problem does FreePDFly solve?',
      'How did you build FreePDFly?',
      'Tell me about other projects',
    ],
  },

  // 14. What problem does FreePDFly solve?
  {
    id: 'freepdfly-problem-solved',
    question: 'What problem does FreePDFly solve?',
    topic: 'projects',
    keywords: [
      'what problem does freepdfly solve',
      'why did you build freepdfly',
      'purpose of freepdfly',
      'problem solved by freepdfly',
      'why freepdfly',
    ],
    answer: `FreePDFLY solves three major pain points found in traditional online PDF converters:

1. **Privacy & Security Risks:** Most online PDF tools force users to upload confidential resumes, contracts, and financial statements to third-party servers. FreePDFLY guarantees **100% privacy** because files never leave the user's browser.
2. **Slow Upload / Download Latency:** Heavy documents take minutes to upload and download on traditional sites. FreePDFLY performs all computations locally with zero network bottlenecks.
3. **High Infrastructure Costs:** By utilizing client-side processing, the service can scale to thousands of users without incurring expensive backend CPU or server storage bills.`,
    suggestions: [
      'How did you build FreePDFly?',
      'Which project are you most proud of?',
      'Tell me about your tech stack',
    ],
  },

  // 15. How did you build FreePDFly?
  {
    id: 'how-built-freepdfly',
    question: 'How did you build FreePDFly?',
    topic: 'projects',
    keywords: [
      'how did you build freepdfly',
      'technologies used in freepdfly',
      'freepdfly architecture',
      'freepdfly tech stack',
      'how does freepdfly work under the hood',
      'what technologies did you use for it',
    ],
    answer: `I built **FreePDFLY** using:

- **Framework:** **Astro** for lightning-fast, zero-JS baseline page loads and optimal static site generation.
- **Processing Engine:** Modern client-side JavaScript Web APIs, ArrayBuffers, and Web Workers to process PDF streams asynchronously without locking the UI thread.
- **Frontend & Styling:** Responsive, lightweight HTML5 and modern CSS3 for high accessibility and cross-device compatibility.
- **Technical SEO:** Optimized meta tags, structured schema data, fast Core Web Vitals, and keyword architecture for high search engine discoverability.`,
    suggestions: [
      'What problem does FreePDFly solve?',
      'Tell me about VlogToBlog',
      'What is your tech stack?',
    ],
  },

  // 16. What is Adhyayan?
  {
    id: 'what-is-adhyayan',
    question: 'What is Adhyayan?',
    topic: 'projects',
    keywords: [
      'what is adhyayan',
      'tell me about adhyayan',
      'adhyayan project',
      'explain adhyayan',
      'adhyayan edtech',
    ],
    answer: `**Adhyayan** is a gamified educational platform engineered to increase student engagement in self-paced learning.

Built with **React.js, Supabase, Tailwind CSS, and Framer Motion**, it features:
- Real-time leaderboard synchronization and progress tracking via Supabase subscriptions.
- Interactive quiz modules with dynamic XP and streak scoring.
- Modular course chapter navigation with intuitive animations.`,
    suggestions: [
      'Tell me about all projects',
      'What is FCForge?',
      'What backend databases do you use?',
    ],
  },

  // 17. What is FCForge?
  {
    id: 'what-is-fcforge',
    question: 'What is FCForge?',
    topic: 'projects',
    keywords: [
      'what is fcforge',
      'tell me about fcforge',
      'fcforge overview',
      'fcforge website',
      'fcforge gaming',
    ],
    answer: `**FCForge** ([fcforge.com](https://fcforge.com)) is a soccer and EA FC gaming utility platform and content hub.

I built it with a heavy focus on:
- **Ultra-low latency web performance** for fast stat lookups and gaming guides.
- **Technical SEO Strategy:** Diagnosing Google Search Console indexation issues, crafting structured content models, and optimizing for Google Discover traffic growth.`,
    suggestions: [
      'How do you approach SEO?',
      'Tell me about FreePDFLY',
      'What is your tech stack?',
    ],
  },

  // 18. What is your most challenging project?
  {
    id: 'most-challenging-project',
    question: 'What is your most challenging project?',
    topic: 'projects',
    keywords: [
      'what is your most challenging project',
      'hardest project you built',
      'most difficult project',
      'toughest project',
      'complex project',
    ],
    answer: `My most challenging project was **VlogToBlog**, an AI system that ingests YouTube video URLs, extracts transcripts, and produces comprehensive, SEO-optimized blog posts with markdown formatting.

### Why it was challenging:
1. **Handling Varied Audio & Transcript Quality:** Many YouTube videos have auto-generated transcripts with missing punctuation and timestamps. I had to design pre-processing pipelines to clean the raw transcript text.
2. **Context Window & Prompt Engineering:** Long videos generate huge token counts. I structured the prompt workflow using Gemini 1.5 Flash to synthesize headings, actionable takeaways, and code snippets without hallucinations or token overflow.
3. **Responsive Full-Stack Integration:** Connecting the Node.js backend with real-time markdown streaming in the React frontend while maintaining low latency.`,
    suggestions: [
      'What technical challenge did you face?',
      'How do you solve difficult programming problems?',
      'Tell me about FreePDFLY',
    ],
  },

  // 19. What technical challenge did you face?
  {
    id: 'technical-challenge-faced',
    question: 'What technical challenge did you face?',
    topic: 'experience',
    keywords: [
      'what technical challenge did you face',
      'tell me about a technical hurdle',
      'technical difficulty in projects',
      'challenging bug you fixed',
      'difficult technical obstacle',
    ],
    answer: `When building **FreePDFLY**, a major technical challenge was handling **large PDF files (50MB+) on mobile browsers without crashing the tab's memory**.

### How I resolved it:
- Initially, synchronous parsing on the main JavaScript thread caused UI freezing and browser memory threshold terminations.
- I refactored the file pipeline to use **Web Workers** and **ArrayBuffer streaming chunks**, ensuring that CPU-intensive PDF parsing occurred in a background thread.
- I implemented progressive memory garbage collection routines to release typed arrays immediately after rendering each page. This resulted in silky-smooth performance across desktop and mobile.`,
    suggestions: [
      'How do you solve difficult programming problems?',
      'Explain your knowledge of JavaScript',
      'What is FreePDFly?',
    ],
  },

  // 20. How do you solve difficult programming problems?
  {
    id: 'how-do-you-solve-problems',
    question: 'How do you solve difficult programming problems?',
    topic: 'methodology',
    keywords: [
      'how do you solve difficult programming problems',
      'problem solving approach',
      'how do you debug code',
      'how do you solve problems',
      'debugging strategy',
      'approach to coding challenges',
    ],
    answer: `My problem-solving methodology follows a systematic 5-step process:

1. **Understand & Define the Problem:** I write down the exact inputs, outputs, edge cases, and constraints before touching the keyboard.
2. **Deconstruct into Subproblems:** I break complex tasks into smaller, isolated modules (e.g., separating data parsing, business logic, and UI rendering).
3. **Isolate with Minimal Reproducible Examples:** When debugging, I isolate the faulty behavior in a standalone test or reproduction script.
4. **Log & Trace:** I inspect state transitions, network payloads in DevTools, and server logs rather than making blind guesses.
5. **Refactor & Document:** Once fixed, I ensure the solution is modular, clean, and well-commented to prevent regression.`,
    suggestions: [
      'How strong are you in DSA?',
      'What technical challenge did you face?',
      'What are your strengths?',
    ],
  },

  // 21. How strong are you in DSA?
  {
    id: 'dsa-knowledge',
    question: 'How strong are you in DSA?',
    topic: 'skills',
    keywords: [
      'how strong are you in dsa',
      'data structures and algorithms',
      'dsa knowledge',
      'are you good at dsa',
      'dsa proficiency',
      'tell me about your dsa skills',
      'algorithms and data structures',
    ],
    answer: `I have a strong, disciplined foundation in **Data Structures and Algorithms** through rigorous university coursework at UEM Jaipur and regular problem-solving practice:

- **Core Data Structures:** Arrays, Strings, Linked Lists, Stacks, Queues, Hash Tables, Trees (Binary Trees, BSTs), and Graphs.
- **Algorithms:** Sorting & Searching, Recursion, Two Pointers, Sliding Window, Greedy Algorithms, Graph Traversals (BFS/DFS), and Dynamic Programming fundamentals.
- **Complexity Analysis:** I always evaluate time complexity ($O(n)$) and space complexity to ensure efficient algorithm selection.

I author articles on DSA (such as *"Mastering Data Structures: The Key to Technical Interviews"*) and believe that a solid grasp of fundamental abstractions is essential for building scalable software.`,
    suggestions: [
      'Which programming language are you most comfortable with?',
      'Why did you choose Computer Science?',
      'What are your strongest technical skills?',
    ],
  },

  // 22. Explain your knowledge of JavaScript.
  {
    id: 'javascript-knowledge',
    question: 'Explain your knowledge of JavaScript.',
    topic: 'skills',
    keywords: [
      'explain your knowledge of javascript',
      'javascript knowledge',
      'how well do you know javascript',
      'js skills',
      'javascript concepts',
      'tell me about javascript',
    ],
    answer: `JavaScript is my primary language, and I understand its internal mechanisms deeply:

- **Core Engine Concepts:** The Event Loop, Call Stack, Microtask queue (Promises) vs. Macrotask queue (setTimeout), and Execution Contexts.
- **ES6+ Features:** Arrow functions, Destructuring, Spread/Rest operators, Optional chaining, Modules (ESM), and Template literals.
- **Asynchronous JS:** Promises, \`async/await\`, Fetch API, and error handling.
- **DOM & Web APIs:** Event Delegation, Web Workers, Canvas, LocalStorage, Web Speech API, and Web Streams.
- **TypeScript:** Strong typing, interfaces, generics, utility types, and strict type safety.`,
    suggestions: [
      'What is React?',
      'What is Node.js?',
      'What are your strongest technical skills?',
    ],
  },

  // 23. What is React?
  {
    id: 'what-is-react',
    question: 'What is React?',
    topic: 'tech-concepts',
    keywords: [
      'what is react',
      'explain react',
      'react js knowledge',
      'tell me about react',
      'react framework',
      'react concepts',
    ],
    answer: `**React** is a popular open-source JavaScript library developed by Meta for building dynamic, declarative user interfaces based on reusable components.

### Key concepts I utilize:
- **Component-Driven Architecture:** Breaking complex UIs into independent, reusable pieces.
- **Virtual DOM & Reconciliation:** Efficiently computing state diffs to batch DOM updates for optimal 60fps rendering.
- **React Hooks:** \`useState\`, \`useEffect\`, \`useMemo\`, \`useCallback\`, \`useRef\`, and custom hooks for business logic separation.
- **Modern Ecosystem:** React 19 features, Next.js App Router, server/client components, and state management.`,
    suggestions: [
      'What is Node.js?',
      'What is the MERN stack?',
      'What is Next.js?',
    ],
  },

  // 24. What is Node.js?
  {
    id: 'what-is-nodejs',
    question: 'What is Node.js?',
    topic: 'tech-concepts',
    keywords: [
      'what is node js',
      'what is nodejs',
      'explain node.js',
      'tell me about node.js',
      'node js knowledge',
    ],
    answer: `**Node.js** is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 engine that executes JavaScript code outside a web browser.

### Why it is powerful:
- **Non-blocking, Event-Driven I/O:** Uses an asynchronous event loop to handle thousands of concurrent client connections with low memory footprint.
- **Unified Language Stack:** Allows developers to use JavaScript across both client and server, simplifying data serialization and code reuse.
- I use Node.js to engineer backend REST APIs, WebSocket servers, automated CLI scripts, and AI middleware pipelines.`,
    suggestions: [
      'What is Express.js?',
      'What is MongoDB?',
      'Tell me about your internship experience',
    ],
  },

  // 25. What is Express.js?
  {
    id: 'what-is-expressjs',
    question: 'What is Express.js?',
    topic: 'tech-concepts',
    keywords: [
      'what is express js',
      'what is expressjs',
      'explain express.js',
      'tell me about express',
      'express framework',
    ],
    answer: `**Express.js** is a minimalist and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Key features I implement in Express:
- **Middleware Pipeline:** Logging, authentication (JWT), CORS headers, rate-limiting, and error-handling interceptors.
- **RESTful Routing:** Structuring clean modular API endpoints with route controllers and parameter validation.
- **Database Integration:** Connecting with MongoDB via native drivers or Mongoose to serve high-throughput JSON endpoints.`,
    suggestions: [
      'What is MongoDB?',
      'What is the MERN stack?',
      'Tell me about your internship experience',
    ],
  },

  // 26. What is MongoDB?
  {
    id: 'what-is-mongodb',
    question: 'What is MongoDB?',
    topic: 'tech-concepts',
    keywords: [
      'what is mongodb',
      'explain mongodb',
      'tell me about mongodb',
      'mongodb database',
      'nosql database',
    ],
    answer: `**MongoDB** is a leading source-available, document-oriented NoSQL database that stores data in flexible, JSON-like BSON documents.

### What I leverage in MongoDB:
- **Flexible Schema Design:** Dynamic schemas that adapt to changing product requirements without rigid migrations.
- **Aggregation Pipelines:** Multi-stage filtering, grouping, sorting, and transforming large datasets directly on the database engine.
- **Indexing & Performance:** Compound indexes and TTL indexes for sub-millisecond query execution.
- I hold a certified credential in **MongoDB Database Engineering** and use it across my full-stack projects.`,
    suggestions: [
      'What is the MERN stack?',
      'What backend databases do you use?',
      'View certifications',
    ],
  },

  // 27. What is the MERN stack?
  {
    id: 'what-is-mern-stack',
    question: 'What is the MERN stack?',
    topic: 'tech-concepts',
    keywords: [
      'what is the mern stack',
      'what is mern',
      'explain mern stack',
      'tell me about mern',
      'mern stack developer',
    ],
    answer: `The **MERN stack** is a collection of four JavaScript-based technologies used to build full-stack web applications:

1. **MongoDB:** Document-oriented NoSQL database for data persistence.
2. **Express.js:** Lightweight server framework for handling backend routing and middleware.
3. **React.js:** Component-based library for building dynamic, reactive frontends.
4. **Node.js:** JavaScript runtime environment executing server-side logic.

By using JavaScript end-to-end, the MERN stack allows for rapid full-stack prototyping, clean JSON data flow, and highly maintainable software architecture.`,
    suggestions: [
      'What are your strongest technical skills?',
      'Tell me about your projects',
      'Do you prefer frontend or backend?',
    ],
  },

  // 28. What is Git/GitHub?
  {
    id: 'what-is-git-github',
    question: 'What is Git/GitHub?',
    topic: 'tools',
    keywords: [
      'what is git',
      'what is github',
      'git and github',
      'explain git',
      'how do you use git',
      'version control',
    ],
    answer: `**Git** is a distributed version control system that tracks changes in source code during software development, allowing developers to collaborate, revert mistakes, and branch features.

**GitHub** is a cloud-based hosting platform for Git repositories offering pull request code reviews, issue tracking, GitHub Actions CI/CD, and open-source collaboration.

### My Git workflow:
- Feature branch workflows (\`feature/...\`, \`fix/...\`), atomic commit messages, branch rebasing, and automated deployments linked with Vercel and Netlify.
- You can inspect my active repositories at [github.com/Sujoymoulick](https://github.com/Sujoymoulick).`,
    suggestions: [
      'Can I see your GitHub?',
      'How do you deploy your projects?',
      'What is your development philosophy?',
    ],
  },

  // 29. How do you deploy your projects?
  {
    id: 'how-deploy-projects',
    question: 'How do you deploy your projects?',
    topic: 'devops',
    keywords: [
      'how do you deploy your projects',
      'deployment process',
      'how do you host projects',
      'hosting platforms',
      'ci/cd pipeline',
      'where do you deploy',
    ],
    answer: `I follow a modern CI/CD deployment pipeline:

- **Frontend & Static Sites:** Deployed to **Vercel** or **Netlify** with automated GitHub branch triggers, instant preview builds, and global Edge CDN distribution.
- **Backend Services:** Hosted on platforms like **Render**, **Railway**, or containerized environments with environment variable secrets management.
- **Databases:** Cloud-managed instances such as **MongoDB Atlas** and **Supabase**.
- **Browser Extensions:** Packaged and published through the **Chrome Developer Dashboard** for the Chrome Web Store.`,
    suggestions: [
      'How do you optimize websites?',
      'Tell me about your projects',
      'Can I see your GitHub?',
    ],
  },

  // 30. How do you optimize websites?
  {
    id: 'how-optimize-websites',
    question: 'How do you optimize websites?',
    topic: 'performance',
    keywords: [
      'how do you optimize websites',
      'web performance optimization',
      'how to make website fast',
      'performance optimization',
      'core web vitals',
      'speed up website',
    ],
    answer: `I optimize web applications across four critical layers:

1. **Asset Optimization:** Next-gen image formats (WebP/AVIF), vector SVGs, font-subsetting, and CSS minification.
2. **Code Splitting & Lazy Loading:** Dynamic imports for routes/modals, offloading non-critical scripts, and tree-shaking unused libraries.
3. **Core Web Vitals:** Minimizing Largest Contentful Paint (LCP), eliminating Cumulative Layout Shift (CLS) with aspect-ratio containers, and optimizing Interaction to Next Paint (INP).
4. **Client-Side Caching & Workers:** Leveraging browser cache headers, Service Workers, and Web Workers for background computations (as implemented in FreePDFLY).`,
    suggestions: [
      'How do you approach SEO?',
      'What is FreePDFly?',
      'What are your strongest technical skills?',
    ],
  },

  // 31. How do you approach SEO?
  {
    id: 'how-approach-seo',
    question: 'How do you approach SEO?',
    topic: 'growth',
    keywords: [
      'how do you approach seo',
      'seo strategy',
      'technical seo',
      'search engine optimization',
      'how do you do seo',
      'seo knowledge',
    ],
    answer: `I take a **Technical + Content-first approach to SEO**:

- **Semantic HTML & Metadata:** Using proper semantic hierarchy (\`<header>\`, \`<main>\`, \`<article>\`, \`<h1>-<h6>\`), OpenGraph cards, Twitter cards, and canonical links.
- **JSON-LD Structured Data:** Embedding Schema.org schemas (Person, WebSite, SoftwareApplication) to help Google understand site context.
- **Crawlability & Indexation:** Generating automated \`sitemap.xml\` and \`robots.txt\` files, resolving crawl errors in Google Search Console.
- **Content Optimization:** Target keyword research, user intent alignment, and fast mobile loading speeds to qualify for Google Discover and top SERP rankings (as demonstrated on FCForge).`,
    suggestions: [
      'Tell me about FCForge',
      'How do you optimize websites?',
      'View certifications',
    ],
  },

  // 32. How do you learn new technologies?
  {
    id: 'how-learn-new-technologies',
    question: 'How do you learn new technologies?',
    topic: 'learning',
    keywords: [
      'how do you learn new technologies',
      'how do you learn',
      'learning process',
      'how do you pick up new tools',
      'how fast do you learn',
      'learning methodology',
    ],
    answer: `I learn new technologies by **building working products immediately**:

1. **Read Official Documentation:** I always start with official docs and quickstarts rather than passively watching 20-hour video tutorials.
2. **Build a Practical Project:** As soon as I understand the basic syntax, I build a tangible project (e.g., when learning Astro, I built FreePDFLY; when learning Gemini API, I built VlogToBlog).
3. **Inspect Open-Source Code:** I read codebases of mature libraries on GitHub to learn idiomatic patterns and best practices.
4. **Document & Write:** I reinforce my understanding by writing technical articles—teaching a concept is the ultimate test of mastery.`,
    suggestions: [
      'What are you currently learning?',
      'What motivates you?',
      'Tell me about your projects',
    ],
  },

  // 33. Do you prefer frontend or backend?
  {
    id: 'frontend-or-backend',
    question: 'Do you prefer frontend or backend?',
    topic: 'career',
    keywords: [
      'do you prefer frontend or backend',
      'frontend or backend',
      'are you frontend or backend',
      'which do you prefer frontend or backend',
      'fullstack or backend',
      'frontend vs backend',
    ],
    answer: `I genuinely enjoy **both ends of the stack**, but I have a deep passion for **Backend Engineering & System Architecture**.

- **Why I love Backend:** Designing clean database schemas, building secure RESTful APIs, optimizing query latency, and structuring AI agent workflows is intellectually satisfying.
- **Why I value Frontend:** A great backend is only as useful as the interface that delivers it. Being skilled in React, Next.js, and Astro allows me to build complete, polished products independently.

Ultimately, I consider myself a **Full-Stack Developer with strong Backend & AI capabilities**.`,
    suggestions: [
      'Tell me about your internship experience',
      'What is your tech stack?',
      'What kind of role are you looking for?',
    ],
  },

  // 34. Are you interested in AI/ML?
  {
    id: 'interested-in-ai-ml',
    question: 'Are you interested in AI/ML?',
    topic: 'ai',
    keywords: [
      'are you interested in ai/ml',
      'are you interested in ai',
      'ai interest',
      'machine learning interest',
      'what do you think about ai',
      'future of ai',
    ],
    answer: `Yes, deeply. AI/ML is my university specialization and my primary area of technical research.

I am particularly focused on **applied AI systems and Agentic Workflows**:
- Integrating LLMs via **Model Context Protocol (MCP)** and structured tool calling.
- Building Retrieval-Augmented Generation (**RAG**) pipelines.
- Running **Local LLMs** (DeepSeek, Llama) using Ollama and browser-based WebGPU.
- Developing AI-assisted web apps like **VlogToBlog** and **Resume Generators**.`,
    suggestions: [
      'Read technical articles on AI Agents',
      'What are your AI/ML projects?',
      'View certifications',
    ],
  },

  // 35. What practical experience do you have?
  {
    id: 'practical-experience',
    question: 'What practical experience do you have?',
    topic: 'experience',
    keywords: [
      'what practical experience do you have',
      'practical experience',
      'real world experience',
      'hands-on experience',
      'work experience',
      'tell me about your background',
    ],
    answer: `My practical experience includes:

1. **Technical Head & Web Developer @ The Speech Society (TSS):** Leading web initiatives, maintaining responsive sites, and planning technical infrastructure for college events.
2. **Back End Developer Intern @ CodeAlpha:** Engineering scalable REST APIs, database schemas, and backend logic in Node.js, Express, and MongoDB.
3. **Freelance & Independent Product Engineering:** Delivering custom client web applications (salon management, booking systems), building admin dashboards with automated invoice generation, and deploying 11+ live products.`,
    suggestions: [
      'Tell me about your internship experience',
      'Tell me about your projects',
      'Can I see your resume?',
    ],
  },

  // 36. Tell me about your internship experience.
  {
    id: 'internship-experience',
    question: 'Tell me about your internship experience.',
    topic: 'experience',
    keywords: [
      'tell me about your internship experience',
      'internship experience',
      'codealpha internship',
      'what did you do in your internship',
      'internship details',
      'tell me about codealpha',
    ],
    answer: `During my **Back End Developer Internship at CodeAlpha** (June 2026), I worked on real-world server-side systems:

- **API Engineering:** Designed and built RESTful endpoints with input validation, modular routing, and error-handling middleware.
- **Database Architecture:** Modeled NoSQL schemas in MongoDB, writing optimized queries and indexes.
- **Team Collaboration:** Participated in code reviews, followed Git branching protocols, and delivered milestone deliverables on schedule.`,
    suggestions: [
      'What did you learn from your internships?',
      'Tell me about your projects',
      'Can I see your resume?',
    ],
  },

  // 37. What did you learn from your internships?
  {
    id: 'what-learned-from-internship',
    question: 'What did you learn from your internships?',
    topic: 'experience',
    keywords: [
      'what did you learn from your internships',
      'learnings from internship',
      'key takeaways from internship',
      'internship learnings',
      'what skills did you gain',
    ],
    answer: `My internship taught me critical lessons that go beyond writing code:

1. **Writing Maintainable Code:** Code is read far more often than it is written. Clean variable naming, modular architecture, and thorough error handling are essential for team productivity.
2. **Database Edge Cases:** I learned how to anticipate concurrent requests, data validation, and index optimization in MongoDB.
3. **Professional Communication:** Collaborating effectively in a team, understanding technical specifications, and communicating blockers early.`,
    suggestions: [
      'Tell me about your internship experience',
      'How do you work in a team?',
      'What are your strengths?',
    ],
  },

  // 38. Why are you looking for an internship?
  {
    id: 'why-looking-for-internship',
    question: 'Why are you looking for an internship?',
    topic: 'career',
    keywords: [
      'why are you looking for an internship',
      'why do you want an internship',
      'internship objective',
      'reason for applying for internship',
      'why intern',
    ],
    answer: `I am looking for an internship to **apply my software engineering skills within a high-performing engineering team and learn from experienced mentors**.

While I have built and shipped several independent products, working on large-scale codebases with real users, continuous integration pipelines, and team code reviews provides invaluable professional growth. I want to contribute directly to product goals while sharpening my architectural standards.`,
    suggestions: [
      'What kind of role are you looking for?',
      'Are you available for internships?',
      'Why should I hire you?',
    ],
  },

  // 39. What kind of role are you looking for?
  {
    id: 'kind-of-role',
    question: 'What kind of role are you looking for?',
    topic: 'career',
    keywords: [
      'what kind of role are you looking for',
      'what roles are you open to',
      'target roles',
      'desired position',
      'what job are you looking for',
      'job preference',
    ],
    answer: `I am actively looking for **Software Engineering Internship and Junior Developer roles** in:

- **Backend Developer / Node.js Engineer**
- **Full-Stack Developer (React / Next.js / Node.js)**
- **AI / Machine Learning Engineer (Applied LLMs / Agentic Systems)**
- **Frontend / Modern Web Developer**

I am open to on-site, hybrid, and remote opportunities where I can solve meaningful problems and grow with a forward-thinking engineering team.`,
    suggestions: [
      'Are you available for internships?',
      'Why should I hire you?',
      'How can I contact you?',
    ],
  },

  // 40. Are you available for freelance work?
  {
    id: 'available-for-freelance',
    question: 'Are you available for freelance work?',
    topic: 'availability',
    keywords: [
      'are you available for freelance work',
      'do you do freelance',
      'freelance availability',
      'can i hire you for a project',
      'freelance developer',
      'open for freelance',
    ],
    answer: `Yes, I am **available for select freelance projects and technical consulting**.

I specialize in:
- Full-stack web application development (React, Next.js, Astro, Node.js).
- AI tool and API integration (Gemini, OpenAI, LangChain).
- Custom business portals, admin dashboards, and automated billing engines.
- Technical SEO and web performance optimization audits.

You can reach out directly at **sujoymoulick05@gmail.com** or phone **8942841651** to discuss your project.`,
    suggestions: [
      'How can I contact you?',
      'Tell me about your projects',
      'Can I see your resume?',
    ],
  },

  // 41. Are you available for internships?
  {
    id: 'available-for-internships',
    question: 'Are you available for internships?',
    topic: 'availability',
    keywords: [
      'are you available for internships',
      'are you available for work',
      'are you looking for internship',
      'internship availability',
      'can you join immediately',
      'when can you start',
      'are you open for hiring',
    ],
    answer: `Yes, I am **actively available for Software Developer and AI/ML Internship opportunities**.

- **Current Status:** Available for immediate onboarding / semester internships.
- **Location Preference:** Remote, Hybrid, or On-site (Jaipur, Bangalore, Delhi NCR, and other tech hubs).
- **Contact:** [sujoymoulick05@gmail.com](mailto:sujoymoulick05@gmail.com) | +91 8942841651.`,
    suggestions: [
      'Can I see your resume?',
      'Why should I hire you?',
      'How can I contact you?',
    ],
  },

  // 42. What are your career goals?
  {
    id: 'career-goals',
    question: 'What are your career goals?',
    topic: 'career',
    keywords: [
      'what are your career goals',
      'career objectives',
      'what do you want to achieve',
      'future aspirations',
      'career plans',
      'long term goals',
    ],
    answer: `My career goal is to become a **Staff-level Systems & AI Architect** who designs reliable, high-impact software used by millions of people.

- **Short-Term (1-2 years):** Excel in an engineering team, contribute to production codebases, master distributed backend systems, and deploy robust AI-powered applications.
- **Medium-Term (3-5 years):** Take technical lead on major product modules, mentor junior developers, and pioneer agentic workflows and developer tooling.
- **Long-Term:** Build or lead high-scale technical platforms that advance computing accessibility and efficiency.`,
    suggestions: [
      'Where do you see yourself in 3–5 years?',
      'What kind of developer do you want to become?',
      'What are your strengths?',
    ],
  },

  // 43. Where do you see yourself in 3–5 years?
  {
    id: 'where-see-yourself-3-5-years',
    question: 'Where do you see yourself in 3–5 years?',
    topic: 'career',
    keywords: [
      'where do you see yourself in 3 5 years',
      'where do you see yourself in 5 years',
      'where do you see yourself in 3 years',
      '5 years plan',
      '3 years from now',
    ],
    answer: `In 3 to 5 years, I see myself as a **Senior Full-Stack / Backend Engineer** with deep expertise in autonomous AI systems and cloud architecture.

I aim to be someone who:
- Owns complex system architectures from inception to scale.
- Bridges the gap between cutting-edge AI research and practical, user-facing production software.
- Mentors incoming engineers and fosters high engineering standards in clean code, testing, and system resilience.`,
    suggestions: [
      'What are your career goals?',
      'What kind of developer do you want to become?',
      'Why should I hire you?',
    ],
  },

  // 44. What kind of developer do you want to become?
  {
    id: 'kind-of-developer-want-to-become',
    question: 'What kind of developer do you want to become?',
    topic: 'career',
    keywords: [
      'what kind of developer do you want to become',
      'what type of developer are you',
      'developer vision',
      'aspirational developer profile',
    ],
    answer: `I want to become an **Empathetic, Product-Minded Systems Engineer**.

To me, a great developer is not just someone who writes fast algorithms, but someone who:
1. **Understands the User:** Builds software that solves real pain points intuitively.
2. **Prioritizes Team Velocity:** Writes readable, documented, and well-tested code that makes teammates more productive.
3. **Embraces Continuous Evolution:** Stays humble, curious, and on the frontier of emerging paradigms like Agentic AI.`,
    suggestions: [
      'What is your development philosophy?',
      'What motivates you?',
      'What are your strengths?',
    ],
  },

  // 45. How do you handle deadlines?
  {
    id: 'handle-deadlines',
    question: 'How do you handle deadlines?',
    topic: 'work-style',
    keywords: [
      'how do you handle deadlines',
      'dealing with tight deadlines',
      'working under pressure',
      'time management',
      'meeting deadlines',
    ],
    answer: `I handle deadlines through **proactive planning, task prioritization, and transparent communication**:

1. **Breakdown & Time Estimation:** I decompose deliverables into small sub-tasks with estimated hours and buffer room for unexpected bugs.
2. **MoSCoW Prioritization:** I focus on the *Must-Haves* first to guarantee a functional core before tackling aesthetic enhancements.
3. **Daily Tracking:** I monitor my progress against the milestone. If an unforeseen blocker arises, I flag it early so the team can adjust scope or strategy collaboratively.`,
    suggestions: [
      'How do you handle failure?',
      'How do you work in a team?',
      'What are your strengths?',
    ],
  },

  // 46. How do you handle failure?
  {
    id: 'handle-failure',
    question: 'How do you handle failure?',
    topic: 'work-style',
    keywords: [
      'how do you handle failure',
      'dealing with failure',
      'tell me about a mistake you made',
      'how do you handle mistakes',
      'failure response',
    ],
    answer: `I view failure as an **essential feedback mechanism for growth**.

When something doesn't go as planned:
1. **Own It Immediately:** I take accountability without making excuses.
2. **Root Cause Analysis (Post-Mortem):** I diagnose exactly why the failure happened—whether it was an unhandled edge case, poor assumption, or missed requirement.
3. **Implement Preventative Safeguards:** I write a regression test or update the documentation to ensure that the same mistake never happens twice.`,
    suggestions: [
      'How do you handle criticism?',
      'How do you handle deadlines?',
      'What are your strengths?',
    ],
  },

  // 47. How do you handle criticism?
  {
    id: 'handle-criticism',
    question: 'How do you handle criticism?',
    topic: 'work-style',
    keywords: [
      'how do you handle criticism',
      'handling feedback',
      'code review feedback',
      'how do you take negative feedback',
      'dealing with criticism',
    ],
    answer: `I welcome constructive criticism, especially in **code reviews and architectural discussions**.

I separate my ego from my code. When a mentor or peer points out a vulnerability, performance inefficiency, or readability issue in my pull request, I see it as an opportunity to learn a better pattern. I ask clarifying questions, apply the feedback, and incorporate that learning into future projects.`,
    suggestions: [
      'How do you work in a team?',
      'What are your strengths?',
      'What is your development philosophy?',
    ],
  },

  // 48. How do you work in a team?
  {
    id: 'work-in-a-team',
    question: 'How do you work in a team?',
    topic: 'work-style',
    keywords: [
      'how do you work in a team',
      'teamwork skills',
      'collaboration in teams',
      'are you a team player',
      'working with others',
    ],
    answer: `I thrive in collaborative team environments through:

- **Active Listening & Clear Communication:** Ensuring everyone is aligned on specifications, API contracts, and milestones.
- **Git & Code Review Discipline:** Writing clear PR descriptions, adhering to linting standards, and reviewing teammates' code constructively.
- **Empathy & Support:** Helping peers debug issues and sharing documentation when introducing new libraries.
- As **Technical Head** at *The Speech Society*, I lead collaborative technical planning for events with designers, content leads, and developers.`,
    suggestions: [
      'Tell me about your internship experience',
      'What are your strengths?',
      'What is your development philosophy?',
    ],
  },

  // 49. Tell me about a time you solved a difficult problem.
  {
    id: 'solved-difficult-problem',
    question: 'Tell me about a time you solved a difficult problem.',
    topic: 'experience',
    keywords: [
      'tell me about a time you solved a difficult problem',
      'difficult problem you solved',
      'complex challenge overcome',
      'problem solving example',
      'star method problem',
    ],
    answer: `When building **FreePDFLY**, I faced an issue where converting multi-page PDFs to images was causing the mobile browser tab to crash due to out-of-memory errors.

- **Situation:** Users on smartphones were experiencing tab crashes when uploading documents larger than 30 pages.
- **Task:** Make the PDF rendering engine memory-efficient without sacrificing client-side privacy.
- **Action:** I replaced the naive full-document canvas buffer with a **virtualized page renderer powered by Web Workers**. Instead of holding all rendered canvases in RAM, pages were rendered on-demand and garbage-collected sequentially using \`OffscreenCanvas\` and \`Blob\` streaming.
- **Result:** Memory usage dropped by **75%**, and users could seamlessly convert 100+ page documents on mobile devices without a single crash.`,
    suggestions: [
      'What technical challenge did you face?',
      'What is FreePDFly?',
      'How do you solve difficult programming problems?',
    ],
  },

  // 50. What motivates you?
  {
    id: 'what-motivates-you',
    question: 'What motivates you?',
    topic: 'personality',
    keywords: [
      'what motivates you',
      'what drives you',
      'source of motivation',
      'why do you love coding',
      'what makes you tick',
    ],
    answer: `What motivates me is the **tangible impact of building software that real people use**.

There is an incredible sense of fulfillment in taking an empty code file, designing an architecture, solving hard algorithmic and UI challenges, and deploying a product that someone finds helpful—whether it's a student creating a resume with TEXTORA or someone converting a PDF securely on FreePDFLY. Knowing that my code can make someone's workflow faster and easier drives me to continuously improve.`,
    suggestions: [
      'Why do you build so many projects?',
      'What is your development philosophy?',
      'Tell me about your projects',
    ],
  },

  // 51. Why do you build so many projects?
  {
    id: 'why-build-so-many-projects',
    question: 'Why do you build so many projects?',
    topic: 'personality',
    keywords: [
      'why do you build so many projects',
      'why so many projects',
      'reason for building projects',
      'why build side projects',
      'why do you code so much',
    ],
    answer: `I build projects because **building is the most effective way to truly master software engineering**.

Tutorials give you the illusion of competence, but you only learn how to handle real-world challenges—such as state synchronization, API rate limits, memory leaks, SEO indexation, and UX edge cases—when you build and ship complete software. Every project in my portfolio was built to explore a new technology or solve a practical problem.`,
    suggestions: [
      'Tell me about your projects',
      'Which project are you most proud of?',
      'What is your development philosophy?',
    ],
  },

  // 52. What is your development philosophy?
  {
    id: 'development-philosophy',
    question: 'What is your development philosophy?',
    topic: 'methodology',
    keywords: [
      'what is your development philosophy',
      'engineering philosophy',
      'coding philosophy',
      'development principles',
      'how do you write software',
    ],
    answer: `My development philosophy rests on four pillars:

1. **Simplicity Over Cleverness:** Write clear, self-documenting code that any engineer on the team can understand and maintain.
2. **User-Centric Performance:** Performance is a core feature. Eliminate unnecessary server hops, minimize bundle sizes, and prioritize sub-second interactions.
3. **Fail Fast & Iterate:** Build a solid minimal version, test assumptions against real usage, and refine systematically.
4. **Zero Compromise on Privacy & Security:** Protect user data by default, as demonstrated in my client-side architectures.`,
    suggestions: [
      'What are your strengths?',
      'What is your tech stack?',
      'What kind of developer do you want to become?',
    ],
  },

  // 53. What are you currently learning?
  {
    id: 'what-are-you-currently-learning',
    question: 'What are you currently learning?',
    topic: 'learning',
    keywords: [
      'what are you currently learning',
      'what are you learning right now',
      'current learning',
      'what tech are you studying',
      'what are you exploring',
      'latest learning',
    ],
    answer: `Currently, I am diving deep into:

1. **Agentic AI & Multi-Agent Protocols:** Building multi-step autonomous workflows with **Anthropic's Model Context Protocol (MCP)** and structured tool-calling loops.
2. **Local LLM Inference & WebGPU:** Running quantized models directly inside client web browsers using WebLLM and Transformers.js.
3. **Advanced System Design:** Distributed caching (Redis), message queues (Kafka/RabbitMQ), and database sharding patterns.`,
    suggestions: [
      'Read technical articles on AI Agents',
      'Are you interested in AI/ML?',
      'Tell me about your projects',
    ],
  },

  // 54. What would you improve in your existing projects?
  {
    id: 'what-would-you-improve',
    question: 'What would you improve in your existing projects?',
    topic: 'projects',
    keywords: [
      'what would you improve in your existing projects',
      'improvements in projects',
      'how would you improve your projects',
      'future updates to projects',
      'project roadmap',
    ],
    answer: `Looking back at my projects, here is how I plan to enhance them:

- **FreePDFLY:** Add OCR (Optical Character Recognition) using WebAssembly-compiled Tesseract.js so scanned image PDFs can be converted to editable text client-side.
- **VlogToBlog:** Add multi-language translation pipelines and automated social media carousel generators from blog outputs.
- **Resume Generators (TEXTORA):** Add real-time job description matching with semantic ATS score breakdowns.`,
    suggestions: [
      'Which project are you most proud of?',
      'What is FreePDFly?',
      'Tell me about your projects',
    ],
  },

  // 55. How can I contact you?
  {
    id: 'how-can-i-contact-you',
    question: 'How can I contact you?',
    topic: 'contact',
    keywords: [
      'how can i contact you',
      'how to reach you',
      'contact information',
      'contact details',
      'email address',
      'phone number',
      'how to get in touch',
      'contact sujoy',
    ],
    answer: `You can reach me directly through any of these channels:

- **Email:** [sujoymoulick05@gmail.com](mailto:sujoymoulick05@gmail.com)
- **Phone / WhatsApp:** [+91 8942841651](tel:8942841651)
- **LinkedIn:** [linkedin.com/in/sujoymoulick](https://linkedin.com/in/sujoymoulick)
- **GitHub:** [github.com/Sujoymoulick](https://github.com/Sujoymoulick)
- **Website:** [sujoymoulick.online](http://www.sujoymoulick.online)
- **Location:** Jaipur, Rajasthan, India (Open to Remote & Relocation)`,
    suggestions: [
      'Can I see your resume?',
      'Can I see your GitHub?',
      'Can I see your LinkedIn?',
    ],
  },

  // 56. Where are you based?
  {
    id: 'where-are-you-based',
    question: 'Where are you based?',
    topic: 'contact',
    keywords: [
      'where are you based',
      'where do you live',
      'current location',
      'your location',
      'which city',
      'are you open to relocate',
      'where is sujoy located',
    ],
    answer: `I am currently based in **Jaipur, Rajasthan, India**, where I study at the *University of Engineering & Management (UEM), Jaipur*.

I am fully available for:
- **Remote opportunities** worldwide.
- **On-site / Hybrid roles** in major tech hubs (Bangalore, Hyderabad, Delhi NCR, Pune, Mumbai, etc.) and open to relocation.`,
    suggestions: [
      'How can I contact you?',
      'Are you available for internships?',
      'What is your college & education?',
    ],
  },

  // 57. Can I see your resume?
  {
    id: 'can-i-see-your-resume',
    question: 'Can I see your resume?',
    topic: 'resume',
    keywords: [
      'can i see your resume',
      'view resume',
      'download resume',
      'show resume',
      'cv',
      'curriculum vitae',
      'resume pdf',
      'send me your resume',
      'where is your resume',
    ],
    answer: `Certainly! You can preview and download my official curriculum vitae directly:

- **Degree:** B.Tech, Computer Science & Engineering (AI & ML), UEM Jaipur (2024–2028).
- **Experience:** Technical Head at The Speech Society | Backend Intern at CodeAlpha.
- **Flagship Products:** FreePDFLY, VlogToBlog, Resume Generators, FCForge, SendVirtualGift.
- **Certifications:** 10 Verified credentials in AI, Cloud, Cybersecurity, Software Engineering, MongoDB, and Web Development.

<div class="chat-action-banner">
  <button class="action-btn-primary preview-resume-btn" data-action="preview-resume">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    <span>Preview & Download Resume</span>
  </button>
  <a href="/Resume.pdf" download="Sujoy_Moulick_Resume.pdf" class="action-btn-secondary download-direct-btn">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
    <span>Download PDF</span>
  </a>
</div>`,
    suggestions: [
      'Why should I hire you?',
      'Can I see your GitHub?',
      'How can I contact you?',
    ],
  },

  // 58. Can I see your GitHub?
  {
    id: 'can-i-see-your-github',
    question: 'Can I see your GitHub?',
    topic: 'github',
    keywords: [
      'can i see your github',
      'where can i find your github',
      'github profile',
      'show github',
      'github link',
      'source code repositories',
      'github repos',
    ],
    answer: `You can explore all my open-source codebases, side projects, and repositories on GitHub at:

### [github.com/Sujoymoulick](https://github.com/Sujoymoulick)

Key repositories include:
- **FreePDFLY:** 100% client-side PDF SaaS in Astro.
- **VlogToBlog:** YouTube to SEO blog converter using Gemini 1.5 Flash.
- **TEXTORA (Resume Generators):** AI ATS-optimized resume builder.
- **Kinetic Luminary (SUNBWMOUNTAINPORTFOLIO):** 3D portfolio template in Next.js 16 and Three.js.
- **EchoToDo, FuncPilot, and README Smith:** Published tools & extensions.

<div class="chat-action-banner">
  <a href="${portfolioData.github}" target="_blank" rel="noopener" class="action-btn-primary">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    <span>Open GitHub (@Sujoymoulick)</span>
  </a>
</div>`,
    suggestions: [
      'Can I see your resume?',
      'Can I see your LinkedIn?',
      'Tell me about your projects',
    ],
  },

  // 59. Can I see your LinkedIn?
  {
    id: 'can-i-see-your-linkedin',
    question: 'Can I see your LinkedIn?',
    topic: 'linkedin',
    keywords: [
      'can i see your linkedin',
      'where can i find your linkedin',
      'linkedin profile',
      'show linkedin',
      'linkedin link',
      'connect on linkedin',
    ],
    answer: `You can connect with me on LinkedIn at:

### [linkedin.com/in/sujoymoulick](https://linkedin.com/in/sujoymoulick)

I regularly share updates on my software projects, technical articles on AI agents and MCP, and engineering milestones.

<div class="chat-action-banner">
  <a href="https://linkedin.com/in/sujoymoulick" target="_blank" rel="noopener" class="action-btn-primary">
    <span>Connect on LinkedIn</span>
  </a>
  <a href="mailto:sujoymoulick05@gmail.com" class="action-btn-secondary">
    Send Direct Email
  </a>
</div>`,
    suggestions: [
      'Can I see your GitHub?',
      'Can I see your resume?',
      'How can I contact you?',
    ],
  },

  // 60. Give me a quick summary of Sujoy's profile.
  {
    id: 'quick-summary-profile',
    question: "Give me a quick summary of Sujoy's profile.",
    topic: 'summary',
    keywords: [
      "give me a quick summary of sujoy's profile",
      'quick summary',
      'profile summary',
      'executive summary',
      'short bio',
      'summary of sujoy',
      'who is sujoy in short',
    ],
    answer: `### Sujoy Moulick — Quick Profile Summary

- **Education:** B.Tech, Computer Science & Engineering (AI & ML) at *UEM Jaipur* (2024–2028).
- **Roles:** Full-Stack & Backend Developer, Technical Head @ The Speech Society, Ex-Backend Intern @ CodeAlpha.
- **Core Skills:** React 19, Next.js 16, Astro, Node.js, Express, MongoDB, Python, Generative AI, MCP, DSA, and Technical SEO.
- **Shipped Products:** FreePDFLY (100% client-side PDF SaaS), VlogToBlog (AI Video-to-Blog converter), Resume Generators (TEXTORA), and published Chrome extensions (EchoToDo, FuncPilot).
- **Credentials:** 10 Verified professional certifications & 11 published technical deep dives.
- **Availability:** Actively available for Software Developer / AI Internships and freelance projects.`,
    suggestions: [
      'Why should I hire you?',
      'Tell me about your projects',
      'Can I see your resume?',
      'How can I contact you?',
    ],
  },
];
import { portfolioData } from './portfolioData';
