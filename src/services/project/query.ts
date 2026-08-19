import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProjectBySlugApi, getProjectsApi } from "./api";
import { projectKeys } from "./query-key";
import type { Project, ProjectQueryParams } from "./type";

/**
 * Hook to query all projects with caching and optional filters
 */
export function useProjectsQuery(
  params?: ProjectQueryParams,
  options?: Omit<UseQueryOptions<Project[], Error>, "queryKey" | "queryFn">
) {
  return useQuery<Project[], Error>({
    queryKey: projectKeys.list(params),
    queryFn: () => getProjectsApi(params),
    ...options,
  });
}

/**
 * Hook to query a single project by slug
 */
export function useProjectBySlugQuery(
  slug: string,
  options?: Omit<UseQueryOptions<Project, Error>, "queryKey" | "queryFn">
) {
  return useQuery<Project, Error>({
    queryKey: projectKeys.detail(slug),
    queryFn: () => getProjectBySlugApi(slug),
    enabled: Boolean(slug),
    ...options,
  });
}
