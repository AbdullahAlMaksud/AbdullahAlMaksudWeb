"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchProjects,
  fetchProjectBySlug,
  fetchFeaturedProjects,
  fetchProjectCategories,
  ProjectQueryParams,
  ApiProject,
} from "@/lib/api/projects";

/**
 * Hook to fetch projects using TanStack Query
 */
export function useProjects(params: ProjectQueryParams = {}) {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: async () => {
      const response = await fetchProjects(params);
      if ("data" in response && Array.isArray(response.data)) {
        return response.data;
      }
      return [] as ApiProject[];
    },
  });
}

/**
 * Hook to fetch a single project by slug
 */
export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchProjectBySlug(slug),
    enabled: Boolean(slug),
  });
}

/**
 * Hook to fetch featured projects
 */
export function useFeaturedProjects() {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: fetchFeaturedProjects,
  });
}

/**
 * Hook to fetch project categories
 */
export function useProjectCategories() {
  return useQuery({
    queryKey: ["projects", "categories"],
    queryFn: fetchProjectCategories,
  });
}
