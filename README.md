# ⚡ SujoyGPT — Conversational Developer Portfolio

<div align="center">

[![Astro](https://img.shields.io/badge/Astro-5.12.0-%23BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-%2361DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-%233178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue?style=for-the-badge)](./LICENSE)
[![Portfolio](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)](http://www.sujoymoulick.online)

**An intelligent, ChatGPT-style conversational portfolio showcasing full-stack applications, agentic AI workflows, developer tools, and client projects.**

[Explore Live Demo](http://www.sujoymoulick.online) · [Report Bug](https://github.com/Sujoymoulick/Sujoy-Portfolio/issues) · [Request Feature](https://github.com/Sujoymoulick/Sujoy-Portfolio/issues)

</div>

---

## 📖 Overview

**SujoyGPT** is an interactive, conversational portfolio designed in the style of ChatGPT. Instead of navigating static pages, recruiters, engineers, and visitors can directly query the system to explore work experience, technical skills, projects, open-source utilities, and published articles through natural language interaction.

Engineered with **Astro 5**, **React 19**, and **TypeScript**, the application delivers near-instant page loads, zero unnecessary bundle weight, smooth responsive interactions, and custom ambient visual effects.

---

## ✨ Key Features

- 💬 **Conversational AI Q&A Engine**: Type any question about Sujoy's experience, projects, skills, or education, or click suggested prompt chips.
- 🎨 **ChatGPT-Inspired UI**: Faithful dark and light themes, collapsible sidebar, smooth streaming text effect, sound toggles, and ambient orb animations.
- 📑 **Interactive Resume Viewer**: Embedded modal for viewing and downloading the full developer resume in PDF format.
- 🛠️ **Project & Tool Showcases**: Rich interactive response cards with live demo links, GitHub source repositories, tech stacks, and key technical achievements.
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile displays with touch gestures and collapsible navigation.
- ⚡ **Ultra-Fast & SEO Optimized**: Pre-rendered static HTML with hydration only where interactive React components are used.

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Framework** | [Astro v5](https://astro.build/) (Static Site Generation + Islands Architecture) |
| **Frontend UI** | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), Modern Vanilla CSS |
| **Interactive Visuals** | Ambient Orb Lens (`orbs-lens.tsx`), Custom Canvas Animations |
| **Data & Engine** | Structured Knowledge Graph, Fuzzy Matching Q&A Engine (`src/scripts/qaMatcher.ts`) |
| **Deployment** | Vercel / Netlify / Custom Domain (`http://www.sujoymoulick.online`) |

---

## 📂 Project Structure

```bash
portfolio-main/
├── public/                     # Static assets (favicons, certificates, resume PDF)
│   ├── certificates/           # Certification credential images
│   ├── Resume.pdf              # Downloadable resume
│   └── ...                     # Web manifests and icons
├── src/
│   ├── components/             # Astro & React UI components
│   │   ├── ChatArea.astro      # Main chat stream container & message bubbles
│   │   ├── ChatInput.astro     # Prompt input box & action buttons
│   │   ├── Header.astro        # Top navigation & model selector dropdown
│   │   ├── LoadingScreen.astro # App initial load & refresh screen
│   │   ├── ResumeModal.astro   # Embedded PDF resume preview modal
│   │   ├── SettingsModal.astro # Theme, audio, and preference settings
│   │   ├── ShareModal.astro    # Social share dialog
│   │   ├── Sidebar.astro       # Collapsible conversation history & links
│   │   └── ui/                 # React UI islands (e.g., Orbs Lens effect)
│   ├── data/
│   │   ├── interviewQA.ts      # Structured conversational knowledge base
│   │   └── portfolioData.ts    # Centralized portfolio details & projects metadata
│   ├── layouts/
│   │   └── Layout.astro        # Root HTML layout with SEO metadata
│   ├── pages/
│   │   └── index.astro         # Main application entry point
│   ├── scripts/
│   │   ├── chatApp.ts          # Core UI controller & DOM event listeners
│   │   ├── chatEngine.ts       # Message streaming & response generation
│   │   └── qaMatcher.ts        # Intent recognition & semantic response matcher
│   └── styles/
│       └── chatgpt.css         # Complete ChatGPT design system and theme styles
├── astro.config.mjs            # Astro configuration
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler options
└── LICENSE                     # Apache-2.0 License
```

---

## 🚀 Featured Works in Portfolio

### 🌟 Flagship Projects
- **[FreePDFLY](https://freepdfly.com)**: 100% client-side, browser-based PDF utility SaaS with zero server uploads.
- **[VlogToBlog](https://github.com/Sujoymoulick/VlogToBlog)**: AI-powered web app converting YouTube videos into structured, SEO-optimized blog posts using Google Gemini 1.5 Flash.
- **[Resume Generators (TEXTORA)](https://www.resumegenerators.in/)**: AI-driven ATS-friendly resume generation suite with real-time multi-section customizers.
- **[Kinetic Luminary](https://github.com/Sujoymoulick/SUNBWMOUNTAINPORTFOLIO)**: Immersive 3D portfolio experience built with Next.js 16, React 19, and Three.js.

### 🧩 Published Tools & Chrome Extensions
- **[FuncPilot](https://sujoymoulick.github.io/FuncPilot/)**: Automated source code testing and validation platform.
- **[README Smith](https://readmesmith-beta.vercel.app/)**: Smart developer profile and repository README builder.
- **[EchoToDo](https://sujoymoulick.github.io/EchoToDo-documentation/)**: Deep-work productivity Chrome extension with customizable timers.
- **[Listing Expert](https://sujoymoulick.github.io/Chrome-Extension-Listing-Expert/)**: Chrome Web Store optimization toolkit.

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** / **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sujoymoulick/Sujoy-Portfolio.git
   cd Sujoy-Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:4321](http://localhost:4321) in your browser.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Astro development server at `localhost:4321` |
| `npm run build` | Builds the production-ready static assets in `/dist` |
| `npm run preview` | Previews the production build locally before deployment |

---

## 📬 Contact & Connect

- **Portfolio**: [sujoymoulick.online](http://www.sujoymoulick.online)
- **LinkedIn**: [linkedin.com/in/sujoymoulick](https://linkedin.com/in/sujoymoulick)
- **GitHub**: [@Sujoymoulick](https://github.com/Sujoymoulick)
- **Email**: [sujoymoulick05@gmail.com](mailto:sujoymoulick05@gmail.com)

---

## 📄 License

This project is licensed under the **Apache-2.0 License** - see the [LICENSE](./LICENSE) file for details.
