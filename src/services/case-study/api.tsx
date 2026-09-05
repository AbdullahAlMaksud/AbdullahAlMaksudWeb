import { axiosClient, PaginatedApiResponse, ApiResponse } from "../axios-client";

export interface CaseStudyResult {
  metric: string;
  value: string;
  description?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  contentType?: "blocks" | "lexical" | "markdown" | "html" | "json";
  coverImage?: string;
  screenshots?: string[];
  projectSlug?: string;
  tags?: string[];
  category?: string;
  industry?: string;
  client?: string;
  challenge?: string;
  solution?: string;
  results?: CaseStudyResult[];
  stack?: string[];
  duration?: string;
  readingTime?: string;
  featured?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  sortOrder?: number;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CaseStudyFilterParams {
  page?: number;
  limit?: number;
  category?: string;
  industry?: string;
  featured?: boolean | string;
  published?: boolean | string;
  projectSlug?: string;
  search?: string;
  includeContent?: boolean;
}

export type CaseStudyPayload = Partial<CaseStudy> & {
  title: string;
  slug: string;
};

/**
 * Fetch paginated case studies with optional filtering
 */
export async function getCaseStudies(
  params?: CaseStudyFilterParams
): Promise<PaginatedApiResponse<CaseStudy>> {
  const res = await axiosClient.get<PaginatedApiResponse<CaseStudy>>("/api/v1/case-studies", {
    params,
  });
  return res.data;
}

/**
 * Fetch a single case study by slug
 */
export async function getCaseStudyBySlug(slug: string): Promise<ApiResponse<CaseStudy>> {
  const res = await axiosClient.get<ApiResponse<CaseStudy>>(
    `/api/v1/case-studies/${encodeURIComponent(slug)}`
  );
  return res.data;
}

/**
 * Fetch a single case study by ID
 */
export async function getCaseStudyById(id: string): Promise<ApiResponse<CaseStudy>> {
  const res = await axiosClient.get<ApiResponse<CaseStudy>>(
    `/api/v1/case-studies/id/${encodeURIComponent(id)}`
  );
  return res.data;
}

/**
 * Create a new case study
 */
export async function createCaseStudy(payload: CaseStudyPayload): Promise<ApiResponse<CaseStudy>> {
  const res = await axiosClient.post<ApiResponse<CaseStudy>>("/api/v1/case-studies", payload);
  return res.data;
}

/**
 * Update an existing case study by ID
 */
export async function updateCaseStudy(
  id: string,
  payload: Partial<CaseStudyPayload>
): Promise<ApiResponse<CaseStudy>> {
  const res = await axiosClient.patch<ApiResponse<CaseStudy>>(
    `/api/v1/case-studies/${encodeURIComponent(id)}`,
    payload
  );
  return res.data;
}

/**
 * Delete a case study by ID
 */
export async function deleteCaseStudy(id: string): Promise<ApiResponse<{ id: string }>> {
  const res = await axiosClient.delete<ApiResponse<{ id: string }>>(
    `/api/v1/case-studies/${encodeURIComponent(id)}`
  );
  return res.data;
}
