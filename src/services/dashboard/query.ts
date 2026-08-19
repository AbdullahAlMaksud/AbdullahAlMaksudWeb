import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getDashboardApi, getMessagesApi, getNotificationsApi } from "./api";
import { dashboardKeys } from "./query-key";
import type { LocaleParam } from "../data/type";
import type { AdminNotification, ContactMessage, DashboardData } from "./type";

/**
 * Hook to query admin dashboard overview metrics
 */
export function useDashboardQuery(
  locale: LocaleParam = "en",
  options?: Omit<UseQueryOptions<DashboardData, Error>, "queryKey" | "queryFn">
) {
  return useQuery<DashboardData, Error>({
    queryKey: dashboardKeys.overview(locale),
    queryFn: () => getDashboardApi(locale),
    ...options,
  });
}

/**
 * Hook to query contact messages
 */
export function useMessagesQuery(
  locale: LocaleParam = "en",
  options?: Omit<UseQueryOptions<ContactMessage[], Error>, "queryKey" | "queryFn">
) {
  return useQuery<ContactMessage[], Error>({
    queryKey: dashboardKeys.messages(locale),
    queryFn: () => getMessagesApi(locale),
    ...options,
  });
}

/**
 * Hook to query admin notifications
 */
export function useNotificationsQuery(
  locale: LocaleParam = "en",
  options?: Omit<UseQueryOptions<AdminNotification[], Error>, "queryKey" | "queryFn">
) {
  return useQuery<AdminNotification[], Error>({
    queryKey: dashboardKeys.notifications(locale),
    queryFn: () => getNotificationsApi(locale),
    ...options,
  });
}
