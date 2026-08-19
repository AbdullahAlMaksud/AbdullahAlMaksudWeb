import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getCurrentUserApi, getSessionApi } from "./api";
import { authKeys } from "./query-key";
import type { AuthSession, CurrentUserResponse } from "./type";

/**
 * Hook to query current user profile, role, and authentication status
 */
export function useCurrentUserQuery(
  options?: Omit<UseQueryOptions<CurrentUserResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<CurrentUserResponse, Error>({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUserApi,
    retry: false, // Don't retry on 401 unauthenticated
    ...options,
  });
}

/**
 * Hook to query raw Better Auth session
 */
export function useSessionQuery(
  options?: Omit<UseQueryOptions<AuthSession | null, Error>, "queryKey" | "queryFn">
) {
  return useQuery<AuthSession | null, Error>({
    queryKey: authKeys.session(),
    queryFn: getSessionApi,
    retry: false,
    ...options,
  });
}
