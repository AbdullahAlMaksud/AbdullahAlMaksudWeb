"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchCaseStudies,
  fetchCaseStudyBySlug,
  fetchFeaturedCaseStudies,
  CaseStudyQueryParams,
  ApiCaseStudy,
} from "@/lib/api/case-studies";

/**
 * Hook to fetch case studies using TanStack Query
 */
export function useCaseStudies(params: CaseStudyQueryParams = {}) {
  return useQuery({
    queryKey: ["caseStudies", params],
    queryFn: async () => {
      const response = await fetchCaseStudies(params);
      return response.data || ([] as ApiCaseStudy[]);
    },
  });
}

/**
 * Hook to fetch a single case study by slug
 */
export function useCaseStudy(slug: string) {
  return useQuery({
    queryKey: ["caseStudy", slug],
    queryFn: () => fetchCaseStudyBySlug(slug),
    enabled: Boolean(slug),
  });
}

/**
 * Hook to fetch featured case studies
 */
export function useFeaturedCaseStudies() {
  return useQuery({
    queryKey: ["caseStudies", "featured"],
    queryFn: fetchFeaturedCaseStudies,
  });
}
