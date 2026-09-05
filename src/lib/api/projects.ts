import { apiClient, safeGet, ApiResponse, PaginatedApiResponse } from "./client";

export interface ApiProjectMetric {
  label: string;
  value: string;
}

export interface ApiProject {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  client?: string;
  role?: string;
  year?: string;
  category: string;
  status: "Completed" | "In Progress" | "Concept" | "Archived";
  featured: boolean;
  coverImage?: string;
  galleryImages?: string[];
  tags: string[];
  stack: string[];
  metrics?: ApiProjectMetric[];
  link?: string;
  github?: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  status?: string;
  search?: string;
}

/**
 * Fetch projects with optional filtering
 */
export async function fetchProjects(
  params: ProjectQueryParams = {}
): Promise<PaginatedApiResponse<ApiProject> | { success: boolean; data: ApiProject[] }> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set("page", String(params.page));
  if (params.limit) queryParams.set("limit", String(params.limit));
  if (params.category) queryParams.set("category", params.category);
  if (params.featured !== undefined) queryParams.set("featured", String(params.featured));
  if (params.status) queryParams.set("status", params.status);
  if (params.search) queryParams.set("search", params.search);

  const queryString = queryParams.toString();
  const url = `/api/projects${queryString ? `?${queryString}` : ""}`;

  const res = await apiClient.get(url);
  return res.data;
}

/**
 * Fetch a single project by slug or ID
 */
export async function fetchProjectBySlug(slug: string): Promise<ApiProject | null> {
  const res = await safeGet<ApiResponse<ApiProject>>(`/api/projects/${slug}`);
  return res?.data || null;
}

/**
 * Fetch featured projects
 */
export async function fetchFeaturedProjects(): Promise<ApiProject[]> {
  const res = await safeGet<ApiResponse<ApiProject[]>>("/api/projects/featured");
  return res?.data || [];
}

/**
 * Fetch unique project categories
 */
export async function fetchProjectCategories(): Promise<string[]> {
  const res = await safeGet<ApiResponse<string[]>>("/api/projects/categories");
  return res?.data || [];
}
