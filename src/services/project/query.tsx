import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { projectKeys } from "./query-key";
import {
  getProjects,
  getProjectBySlug,
  getProjectById,
  type ProjectFilterParams,
  type Project,
} from "./api";
import type { ApiResponse, PaginatedApiResponse } from "../axios-client";

/**
 * Hook to query projects list with filtering
 */
export function useProjectsQuery(
  filters?: ProjectFilterParams,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<Project[]> | PaginatedApiResponse<Project>,
      Error,
      ApiResponse<Project[]> | PaginatedApiResponse<Project>,
      ReturnType<typeof projectKeys.list>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<Project[]> | PaginatedApiResponse<Project>, Error> {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: () => getProjects(filters),
    staleTime: 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single project by slug
 */
export function useProjectBySlugQuery(
  slug: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<Project>,
      Error,
      ApiResponse<Project>,
      ReturnType<typeof projectKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<Project>, Error> {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: () => getProjectBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single project by ID
 */
export function useProjectByIdQuery(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<Project>,
      Error,
      ApiResponse<Project>,
      ReturnType<typeof projectKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<Project>, Error> {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => getProjectById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
