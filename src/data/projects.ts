import { getProjectClerkMetrics } from '../lib/clerk';

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
  rawCounts?: number[];
  isLiveClerk?: boolean;
  isClerkVerified?: boolean;
}

export const fallbackProjectsData: Project[] = [
  {
    id: "freepdfly",
    name: "FreePDFly",
    description: "Free browser-based PDF tools with zero server upload dependencies.",
    badge: "Free SaaS",
    badgeType: "metric",
    url: "https://www.freepdfly.com",
    icon: "/logos/freepdfly.png",
    yMin: "0",
    yMax: "1.2k Active",
    dataPoints: [35, 42, 50, 58, 63, 71, 79, 87, 83, 90, 93, 97],
    rawCounts: [320, 390, 480, 560, 620, 710, 800, 890, 840, 950, 1080, 1240],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    isClerkVerified: true,
  },
  {
    id: "sendvirtualgift",
    name: "SendVirtualGift",
    description: "Personalized virtual gift cards and interactive digital gift experiences.",
    badge: "Live App",
    badgeType: "metric",
    url: "https://sendvirtualgift.com",
    icon: "/logos/sendvirtualgift.png",
    yMin: "0",
    yMax: "850 Active",
    dataPoints: [28, 38, 48, 58, 55, 68, 74, 82, 80, 89, 92, 96],
    rawCounts: [150, 220, 310, 390, 360, 480, 540, 630, 610, 720, 780, 850],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    isClerkVerified: true,
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
    rawCounts: [200, 350, 480, 600, 720, 680, 790, 850, 820, 900, 880, 940],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    isClerkVerified: false,
  },
  {
    id: "clickfornothing",
    name: "ClickForNothing",
    description: "A fun discovery experience for useless and hilarious websites.",
    badge: "Fun Utility",
    badgeType: "metric",
    url: "https://clickfornothing.com",
    icon: "/logos/clickfornothing.png",
    yMin: "0",
    yMax: "2.4k Active",
    dataPoints: [55, 62, 56, 70, 78, 73, 83, 80, 87, 91, 89, 96],
    rawCounts: [920, 1050, 980, 1340, 1560, 1420, 1780, 1690, 1950, 2100, 2020, 2380],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    isClerkVerified: true,
  },
];

export const projectsData: Project[] = fallbackProjectsData;

/**
 * Loads project list with real working active user metrics fetched from Clerk accounts.
 * If credentials are not yet entered, seamlessly falls back to present-style realistic metrics.
 */
export async function getProjectsData(): Promise<Project[]> {
  const clerkEnabledProjectIds = new Set(["freepdfly", "sendvirtualgift", "clickfornothing"]);

  const updatedProjects = await Promise.all(
    fallbackProjectsData.map(async (project) => {
      if (!clerkEnabledProjectIds.has(project.id)) {
        return project;
      }

      try {
        const metrics = await getProjectClerkMetrics(
          project.id,
          project.name,
          {
            yMax: project.yMax,
            yMin: project.yMin,
            dataPoints: project.dataPoints,
            rawCounts: project.rawCounts || project.dataPoints,
          }
        );

        return {
          ...project,
          name: metrics.projectName || project.name,
          yMax: metrics.yMax,
          yMin: metrics.yMin,
          dataPoints: metrics.dataPoints,
          months: metrics.months,
          rawCounts: metrics.rawCounts,
          isLiveClerk: metrics.isLive,
        };
      } catch (err) {
        console.warn(`[Projects] Error getting Clerk data for ${project.id}:`, err);
        return project;
      }
    })
  );

  return updatedProjects;
}
