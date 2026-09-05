import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { caseStudyKeys } from "./query-key";
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getCaseStudyById,
  type CaseStudyFilterParams,
  type CaseStudy,
} from "./api";
import type { PaginatedApiResponse, ApiResponse } from "../axios-client";

/**
 * Hook to query paginated case studies with filtering
 */
export function useCaseStudiesQuery(
  filters?: CaseStudyFilterParams,
  options?: Omit<
    UseQueryOptions<
      PaginatedApiResponse<CaseStudy>,
      Error,
      PaginatedApiResponse<CaseStudy>,
      ReturnType<typeof caseStudyKeys.list>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<PaginatedApiResponse<CaseStudy>, Error> {
  return useQuery({
    queryKey: caseStudyKeys.list(filters),
    queryFn: () => getCaseStudies(filters),
    staleTime: 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single case study by slug
 */
export function useCaseStudyBySlugQuery(
  slug: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<CaseStudy>,
      Error,
      ApiResponse<CaseStudy>,
      ReturnType<typeof caseStudyKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<CaseStudy>, Error> {
  return useQuery({
    queryKey: caseStudyKeys.detail(slug),
    queryFn: () => getCaseStudyBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single case study by ID
 */
export function useCaseStudyByIdQuery(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<CaseStudy>,
      Error,
      ApiResponse<CaseStudy>,
      ReturnType<typeof caseStudyKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<CaseStudy>, Error> {
  return useQuery({
    queryKey: caseStudyKeys.detail(id),
    queryFn: () => getCaseStudyById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
