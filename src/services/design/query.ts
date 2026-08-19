import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getDesignByIdApi, getDesignsApi } from "./api";
import { designQueryKeys } from "./query-key";
import type { DesignQueryParams, GraphicDesign } from "./type";

export function useDesignsQuery(
  params?: DesignQueryParams,
  options?: Omit<UseQueryOptions<GraphicDesign[], Error, GraphicDesign[]>, "queryKey" | "queryFn">
) {
  return useQuery<GraphicDesign[], Error>({
    queryKey: designQueryKeys.list(params),
    queryFn: () => getDesignsApi(params),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}

export function useDesignDetailQuery(
  id: string,
  options?: Omit<UseQueryOptions<GraphicDesign, Error, GraphicDesign>, "queryKey" | "queryFn">
) {
  return useQuery<GraphicDesign, Error>({
    queryKey: designQueryKeys.detail(id),
    queryFn: () => getDesignByIdApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options,
  });
}
