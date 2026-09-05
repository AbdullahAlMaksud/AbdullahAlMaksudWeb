import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { blogKeys } from "./query-key";
import { getBlogs, getBlogBySlug, getBlogById, type BlogFilterParams } from "./api";
import type { PaginatedApiResponse, ApiResponse } from "../axios-client";
import type { BlogPost } from "@/types/blog";

/**
 * Hook to query paginated blogs list with filtering
 */
export function useBlogsQuery(
  filters?: BlogFilterParams,
  options?: Omit<
    UseQueryOptions<
      PaginatedApiResponse<BlogPost>,
      Error,
      PaginatedApiResponse<BlogPost>,
      ReturnType<typeof blogKeys.list>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<PaginatedApiResponse<BlogPost>, Error> {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => getBlogs(filters),
    staleTime: 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single blog by slug
 */
export function useBlogBySlugQuery(
  slug: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<BlogPost>,
      Error,
      ApiResponse<BlogPost>,
      ReturnType<typeof blogKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<BlogPost>, Error> {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single blog by ID
 */
export function useBlogByIdQuery(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<BlogPost>,
      Error,
      ApiResponse<BlogPost>,
      ReturnType<typeof blogKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<BlogPost>, Error> {
  return useQuery({
    queryKey: blogKeys.detail(id),
    queryFn: () => getBlogById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
