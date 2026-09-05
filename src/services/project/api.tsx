import { axiosClient, ApiResponse, PaginatedApiResponse } from "../axios-client";

export interface CoreFeature {
  icon?: string;
  text: string;
  desc: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description?: string;
  longDescription?: string;
  content?: any;
  contentType?: "blocks" | "lexical" | "markdown" | "html" | "json";
  fullContent?: any;
  coverImage?: string;
  image?: string;
  logo?: string;
  screenshots?: string[];
  tags?: string[];
  stack?: string[];
  category?: string;
  categories?: string[];
  github?: string;
  gitRepo?: string;
  repo?: string;
  liveLink?: string;
  link?: string;
  demo?: string;
  year?: string;
  status?: "live" | "case-study" | "prototype" | "archived" | "building";
  featured?: boolean;
  isFeatured?: boolean;
  sortOrder?: number;
  coreFeatures?: CoreFeature[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface ProjectFilterParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean | string;
  status?: string;
  search?: string;
}

export type ProjectPayload = Partial<Project> & {
  title: string;
  slug: string;
};

/**
 * Fetch projects (paginated or list)
 */
export async function getProjects(
  params?: ProjectFilterParams
): Promise<ApiResponse<Project[]> | PaginatedApiResponse<Project>> {
  const res = await axiosClient.get<ApiResponse<Project[]> | PaginatedApiResponse<Project>>(
    "/api/v1/projects",
    { params }
  );
  return res.data;
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<ApiResponse<Project>> {
  const res = await axiosClient.get<ApiResponse<Project>>(
    `/api/v1/projects/${encodeURIComponent(slug)}`
  );
  return res.data;
}

/**
 * Fetch a single project by ID
 */
export async function getProjectById(id: string): Promise<ApiResponse<Project>> {
  const res = await axiosClient.get<ApiResponse<Project>>(
    `/api/v1/projects/id/${encodeURIComponent(id)}`
  );
  return res.data;
}

/**
 * Create a new project
 */
export async function createProject(payload: ProjectPayload): Promise<ApiResponse<Project>> {
  const res = await axiosClient.post<ApiResponse<Project>>("/api/v1/projects", payload);
  return res.data;
}

/**
 * Update an existing project by ID
 */
export async function updateProject(
  id: string,
  payload: Partial<ProjectPayload>
): Promise<ApiResponse<Project>> {
  const res = await axiosClient.patch<ApiResponse<Project>>(
    `/api/v1/projects/${encodeURIComponent(id)}`,
    payload
  );
  return res.data;
}

/**
 * Delete a project by ID
 */
export async function deleteProject(id: string): Promise<ApiResponse<{ id: string }>> {
  const res = await axiosClient.delete<ApiResponse<{ id: string }>>(
    `/api/v1/projects/${encodeURIComponent(id)}`
  );
  return res.data;
}
