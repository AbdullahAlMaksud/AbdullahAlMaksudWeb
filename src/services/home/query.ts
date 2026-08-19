import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getHomeApi } from "./api";
import { homeQueryKeys } from "./query-key";
import type { HomeData } from "./type";

export function useHomeQuery(
  options?: Omit<UseQueryOptions<HomeData, Error, HomeData>, "queryKey" | "queryFn">
) {
  return useQuery<HomeData, Error>({
    queryKey: homeQueryKeys.details(),
    queryFn: () => getHomeApi(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    ...options,
  });
}
