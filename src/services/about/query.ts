import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAboutApi } from "./api";
import { aboutQueryKeys } from "./query-key";
import type { AboutData } from "./type";

export function useAboutQuery(
  options?: Omit<UseQueryOptions<AboutData, Error, AboutData>, "queryKey" | "queryFn">
) {
  return useQuery<AboutData, Error>({
    queryKey: aboutQueryKeys.details(),
    queryFn: () => getAboutApi(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    ...options,
  });
}
