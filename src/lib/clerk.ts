// ============================================================
// src/lib/clerk.ts
// Clerk Backend Integration for Real Active User Metrics
// ============================================================

export interface ClerkUserRecord {
  id: string;
  created_at: number; // Unix timestamp in ms
  last_active_at?: number | null; // Unix timestamp in ms
  last_sign_in_at?: number | null; // Unix timestamp in ms
  updated_at?: number;
}

export interface MonthSlot {
  name: string; // e.g. "Nov", "Dec", "Jan"
  year: number;
  monthIndex: number; // 0-11
  startMs: number;
  endMs: number;
}

export interface ClerkProjectMetrics {
  projectId: string;
  projectName: string;
  configured: boolean;
  isLive: boolean;
  totalUsers: number;
  activeUsersNow: number;
  months: string[];
  monthlyActiveUsers: number[];
  dataPoints: number[];
  yMax: string;
  yMin: string;
  rawCounts: number[];
}

/**
 * Safely retrieve environment variable across Vite/Astro and Node environments.
 */
export function getEnv(key: string): string {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.[key]) {
      return String((import.meta as any).env[key]).trim();
    }
  } catch {}
  try {
    if (typeof process !== 'undefined' && process?.env?.[key]) {
      return String(process.env[key]).trim();
    }
  } catch {}
  return '';
}

/**
 * Format numbers compactly for chart axis labels (e.g. 1200 -> "1.2k", 15000 -> "15k").
 */
export function formatCount(num: number): string {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

/**
 * Generate 12 month slots ending at the reference month (defaults to current date).
 */
export function getLast12MonthSlots(referenceDate: Date = new Date()): MonthSlot[] {
  const slots: MonthSlot[] = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 11; i >= 0; i--) {
    const d = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - i, 1);
    const year = d.getFullYear();
    const monthIndex = d.getMonth();
    const startMs = new Date(year, monthIndex, 1, 0, 0, 0, 0).getTime();
    const endMs = new Date(year, monthIndex + 1, 0, 23, 59, 59, 999).getTime();
    
    slots.push({
      name: monthNames[monthIndex],
      year,
      monthIndex,
      startMs,
      endMs,
    });
  }
  return slots;
}

/**
 * Fetch user list from Clerk's Backend API using the project's secret key.
 */
export async function fetchClerkUsers(secretKey: string): Promise<ClerkUserRecord[] | null> {
  if (!secretKey || secretKey.length < 10 || secretKey.includes('...')) {
    return null;
  }

  const allUsers: ClerkUserRecord[] = [];
  const limit = 500;
  let offset = 0;
  const maxPages = 4; // Read up to 2000 users max for quick build performance

  for (let page = 0; page < maxPages; page++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    try {
      const url = `https://api.clerk.com/v1/users?limit=${limit}&offset=${offset}&order_by=-created_at`;
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`[Clerk API] Request failed with status ${res.status}: ${res.statusText}`);
        return null;
      }

      const json = await res.json();
      const users: ClerkUserRecord[] = Array.isArray(json) 
        ? json 
        : (Array.isArray(json?.data) ? json.data : []);

      if (users.length === 0) break;
      allUsers.push(...users);

      if (users.length < limit) break;
      offset += limit;
    } catch (err: unknown) {
      clearTimeout(timeout);
      console.warn(`[Clerk API] Network/fetch error:`, err);
      return null;
    }
  }

  return allUsers;
}

/**
 * Compute monthly active users and graph data points from Clerk user records.
 */
export function computeClerkMetrics(
  projectId: string,
  projectName: string,
  users: ClerkUserRecord[],
  monthSlots: MonthSlot[]
): ClerkProjectMetrics {
  const months = monthSlots.map(m => m.name);
  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;

  // Active users in last 30 days
  const activeUsersNow = users.filter(u => {
    const lastActive = u.last_active_at || u.last_sign_in_at || u.created_at;
    return lastActive >= thirtyDaysAgo;
  }).length;

  // Monthly active users for each of the 12 month slots
  const monthlyActiveUsers = monthSlots.map(slot => {
    return users.filter(u => {
      // User created on or before this month ended
      const registered = u.created_at <= slot.endMs;
      // User active on or after this month started
      const lastActive = u.last_active_at || u.last_sign_in_at || u.created_at;
      const activeSince = lastActive >= slot.startMs;
      return registered && activeSince;
    }).length;
  });

  const maxUsers = Math.max(...monthlyActiveUsers, 0);

  // Normalize data points between 18% and 92% to preserve the elegant wave aesthetic
  let dataPoints: number[];
  if (maxUsers === 0) {
    dataPoints = [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15];
  } else {
    dataPoints = monthlyActiveUsers.map(val => {
      if (val === 0) return 15;
      return Math.round(18 + (val / maxUsers) * 74);
    });
  }

  return {
    projectId,
    projectName,
    configured: true,
    isLive: true,
    totalUsers: users.length,
    activeUsersNow,
    months,
    monthlyActiveUsers,
    dataPoints,
    yMax: `${formatCount(maxUsers)} Active`,
    yMin: "0",
    rawCounts: monthlyActiveUsers,
  };
}

/**
 * Fetch or compute project metrics for a specific project.
 */
export async function getProjectClerkMetrics(
  projectId: string,
  projectNameFallback: string,
  fallbackData: {
    yMax: string;
    yMin: string;
    dataPoints: number[];
    rawCounts: number[];
  }
): Promise<ClerkProjectMetrics> {
  const upperId = projectId.toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  // Try several common environment variable naming schemes
  const projectName = 
    getEnv(`CLERK_${upperId}_PROJECT_NAME`) || 
    getEnv(`${upperId}_CLERK_PROJECT_NAME`) || 
    projectNameFallback;

  const secretKey = 
    getEnv(`CLERK_${upperId}_SECRET_KEY`) || 
    getEnv(`${upperId}_CLERK_SECRET_KEY`) ||
    getEnv(`CLERK_SECRET_KEY_${upperId}`) ||
    getEnv('CLERK_SECRET_KEY');

  const monthSlots = getLast12MonthSlots();
  const months = monthSlots.map(m => m.name);

  if (secretKey) {
    const users = await fetchClerkUsers(secretKey);
    if (users && users.length > 0) {
      return computeClerkMetrics(projectId, projectName, users, monthSlots);
    }
  }

  // Graceful fallback with realistic active user data in present style
  return {
    projectId,
    projectName,
    configured: Boolean(secretKey),
    isLive: false,
    totalUsers: fallbackData.rawCounts[fallbackData.rawCounts.length - 1] || 0,
    activeUsersNow: fallbackData.rawCounts[fallbackData.rawCounts.length - 1] || 0,
    months,
    monthlyActiveUsers: fallbackData.rawCounts,
    dataPoints: fallbackData.dataPoints,
    yMax: fallbackData.yMax,
    yMin: fallbackData.yMin,
    rawCounts: fallbackData.rawCounts,
  };
}
