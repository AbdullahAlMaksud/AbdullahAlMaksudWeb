import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getBlogBySlugApi, getBlogsApi } from "./api";
import { blogKeys } from "./query-key";
import type { BlogListResponse, BlogQueryParams, BlogSingleResponse } from "./type";

/**
 * Hook to query paginated blogs with caching and filters
 */
export function useBlogsQuery(
  params?: BlogQueryParams,
  options?: Omit<UseQueryOptions<BlogListResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<BlogListResponse, Error>({
    queryKey: blogKeys.list(params),
    queryFn: () => getBlogsApi(params),
    ...options,
  });
}

/**
 * Hook to query a single blog by slug
 */
export function useBlogBySlugQuery(
  slug: string,
  options?: Omit<UseQueryOptions<BlogSingleResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<BlogSingleResponse, Error>({
    queryKey: blogKeys.detail(slug),
    queryFn: () => getBlogBySlugApi(slug),
    enabled: Boolean(slug),
    ...options,
  });
}
