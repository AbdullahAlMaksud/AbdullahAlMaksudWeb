import type { LocaleParam } from "../data/type";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  date?: string;
  isRead?: boolean;
}

export interface AdminNotification {
  id?: string;
  title: string;
  message: string;
  type?: "info" | "success" | "warning" | "error" | string;
  date?: string;
  read?: boolean;
}

export interface DashboardOverviewStats {
  projectsCount?: number;
  blogsCount?: number;
  booksCount?: number;
  messagesCount?: number;
  [key: string]: any;
}

export interface DashboardData {
  stats?: DashboardOverviewStats;
  recentActivity?: unknown[];
  messages?: ContactMessage[];
  notifications?: AdminNotification[];
  [key: string]: any;
}
