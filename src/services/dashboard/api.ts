import { getRequest } from "../api-client";
import type { LocaleParam } from "../data/type";
import type { AdminNotification, ContactMessage, DashboardData } from "./type";

/**
 * Fetch dashboard overview statistics and metrics (Admin Only)
 */
export async function getDashboardApi(locale: LocaleParam = "en"): Promise<DashboardData> {
  return getRequest<DashboardData>("/api/v1/dashboard", { params: { locale } });
}

/**
 * Fetch contact inquiry messages (Admin Only)
 */
export async function getMessagesApi(locale: LocaleParam = "en"): Promise<ContactMessage[]> {
  return getRequest<ContactMessage[]>("/api/v1/messages", { params: { locale } });
}

/**
 * Fetch admin notifications (Admin Only)
 */
export async function getNotificationsApi(
  locale: LocaleParam = "en"
): Promise<AdminNotification[]> {
  return getRequest<AdminNotification[]>("/api/v1/notifications", { params: { locale } });
}
