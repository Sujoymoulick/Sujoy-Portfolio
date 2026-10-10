export interface ProfileData {
  name: string;
  avatar: string;
  role: string;
  education: string;
  location: string;
  origin: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  skills: string[];
  links: { label: string; url: string; icon?: string }[];
  summaryItems: string[];
}

export const profileData: ProfileData = {
  name: "Sujoy Moulick",
  avatar: "/sujoy-profile-square.jpg",
  role: "Full-Stack Developer · Indie Hacker · CSE (AI & ML) Student",
  education: "B.Tech in Computer Science and Engineering (AI & ML), University of Engineering and Management, Jaipur",
  location: "Jaipur, Rajasthan",
  origin: "Ranaghat, West Bengal, India",
  bio: "I build web applications, useful online tools, SaaS products, and AI-powered experiments.",
  email: "sujoymoulick05@gmail.com",
  github: "https://github.com/Sujoymoulick",
  linkedin: "https://www.linkedin.com/in/sujoymoulick/",
  resumeUrl: "/Resume.pdf",
  skills: [
    "HTML", "CSS", "JavaScript", "Tailwind CSS", "React", "Astro",
    "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL",
    "Solidity", "AI/ML Technologies"
  ],
  links: [
    { label: "FreePDFly SaaS", url: "https://www.freepdfly.com" },
    { label: "SendVirtualGift", url: "https://sendvirtualgift.com" },
    { label: "My GitHub", url: "https://github.com/Sujoymoulick" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sujoymoulick/" },
    { label: "Download Resume", url: "/Resume.pdf" }
  ],
  summaryItems: [
    "Browser-based client-side PDF tools",
    "Personalized virtual gift experiences",
    "Football & gaming analytics platforms",
    "Instagram & code test automation tools",
    "Gamified learning & fintech web applications"
  ]
};
