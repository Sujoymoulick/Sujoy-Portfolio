export interface Project {
  id: string;
  name: string;
  description: string;
  badge: string;
  badgeType?: "badge" | "revenue" | "metric";
  url?: string;
  icon: string;
  yMin: string;
  yMax: string;
  dataPoints: number[];
  months?: string[];
}

export const projectsData: Project[] = [
  {
    id: "freepdfly",
    name: "FreePDFly",
    description: "Free browser-based PDF tools with zero server upload dependencies.",
    badge: "Free SaaS",
    badgeType: "metric",
    url: "https://www.freepdfly.com",
    icon: "/logos/freepdfly.png",
    yMin: "100%",
    yMax: "Browser-Side",
    dataPoints: [45, 52, 60, 58, 65, 72, 78, 85, 82, 88, 92, 96],
  },
  {
    id: "sendvirtualgift",
    name: "SendVirtualGift",
    description: "Personalized virtual gift cards and interactive digital gift experiences.",
    badge: "Live App",
    badgeType: "metric",
    url: "https://sendvirtualgift.com",
    icon: "/logos/sendvirtualgift.png",
    yMin: "Interactive",
    yMax: "3D Flow",
    dataPoints: [30, 42, 55, 62, 58, 70, 75, 82, 80, 89, 91, 95],
  },
  {
    id: "fcforge",
    name: "FCForge",
    description: "Football gaming-related tool and EA FC content platform.",
    badge: "Gaming & SEO",
    badgeType: "metric",
    url: "https://fcforge.com/",
    icon: "/logos/fcforge.png",
    yMin: "Discover",
    yMax: "High Index",
    dataPoints: [20, 35, 48, 60, 72, 68, 79, 85, 82, 90, 88, 94],
  },
  {
    id: "clickfornothing",
    name: "ClickForNothing",
    description: "A fun discovery experience for useless and hilarious websites.",
    badge: "Fun Utility",
    badgeType: "metric",
    url: "https://clickfornothing.com",
    icon: "/logos/clickfornothing.png",
    yMin: "Random",
    yMax: "Discovery",
    dataPoints: [60, 65, 58, 72, 80, 75, 85, 82, 88, 92, 89, 95],
  },
];
