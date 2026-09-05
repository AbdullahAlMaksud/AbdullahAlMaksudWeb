import { apiClient, safeGet, ApiResponse, PaginatedApiResponse } from "./client";

export interface CaseStudyResult {
  metric: string;
  value: string;
}

export interface ApiCaseStudy {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  client: string;
  industry?: string;
  timeline?: string;
  category: string;
  excerpt: string;
  challenge: string;
  solution: string;
  results?: CaseStudyResult[];
  content?: string;
  coverImage?: string;
  featured: boolean;
  tags: string[];
  stack: string[];
  projectSlug?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudyQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  industry?: string;
  featured?: boolean;
  search?: string;
  projectSlug?: string;
  published?: boolean;
  includeContent?: boolean;
}

/**
 * Fetch case studies with optional filters
 */
export async function fetchCaseStudies(
  params: CaseStudyQueryParams = {}
): Promise<PaginatedApiResponse<ApiCaseStudy>> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set("page", String(params.page));
  if (params.limit) queryParams.set("limit", String(params.limit));
  if (params.category) queryParams.set("category", params.category);
  if (params.industry) queryParams.set("industry", params.industry);
  if (params.featured !== undefined) queryParams.set("featured", String(params.featured));
  if (params.projectSlug) queryParams.set("projectSlug", params.projectSlug);
  if (params.search) queryParams.set("search", params.search);
  if (params.published !== undefined) {
    queryParams.set("published", String(params.published));
  } else {
    queryParams.set("published", "true");
  }
  if (params.includeContent) queryParams.set("includeContent", "true");

  const queryString = queryParams.toString();
  const url = `/api/case-studies${queryString ? `?${queryString}` : ""}`;

  const res = await apiClient.get<PaginatedApiResponse<ApiCaseStudy>>(url);
  return res.data;
}

/**
 * Fetch a single case study by slug
 */
export async function fetchCaseStudyBySlug(slug: string): Promise<ApiCaseStudy | null> {
  const res = await safeGet<ApiResponse<ApiCaseStudy>>(`/api/case-studies/${slug}`);
  return res?.data || null;
}

/**
 * Fetch featured case studies
 */
export async function fetchFeaturedCaseStudies(): Promise<ApiCaseStudy[]> {
  const res = await safeGet<ApiResponse<ApiCaseStudy[]>>("/api/case-studies/featured");
  return res?.data || [];
}
