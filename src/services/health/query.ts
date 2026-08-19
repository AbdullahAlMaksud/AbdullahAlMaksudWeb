import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getHealthApi, getRootStatusApi } from "./api";
import { healthKeys } from "./query-key";
import type { HealthResponse, RootStatusResponse } from "./type";

/**
 * Hook to query backend server health and DB status
 */
export function useHealthQuery(
  options?: Omit<UseQueryOptions<HealthResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<HealthResponse, Error>({
    queryKey: healthKeys.status(),
    queryFn: getHealthApi,
    staleTime: 1000 * 30, // 30 seconds
    ...options,
  });
}

/**
 * Hook to query backend root API status
 */
export function useRootStatusQuery(
  options?: Omit<UseQueryOptions<RootStatusResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<RootStatusResponse, Error>({
    queryKey: healthKeys.root(),
    queryFn: getRootStatusApi,
    ...options,
  });
}
