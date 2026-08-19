import { getRequest, postRequest, putRequest, deleteRequest } from "../api-client";
import type { Project, ProjectMutationInput, ProjectQueryParams } from "./type";

/**
 * Fetch all projects from the backend
 */
export async function getProjectsApi(params?: ProjectQueryParams): Promise<Project[]> {
  return getRequest<Project[]>("/api/v1/projects", { params });
}

/**
 * Fetch a single project by its unique slug
 */
export async function getProjectBySlugApi(slug: string): Promise<Project> {
  return getRequest<Project>(`/api/v1/projects/${slug}`);
}

/**
 * Create a new project (Admin Only)
 */
export async function createProjectApi(
  data: ProjectMutationInput
): Promise<{ success: boolean; data: Project }> {
  return postRequest<{ success: boolean; data: Project }>("/api/v1/projects", data);
}

/**
 * Update an existing project by ID (Admin Only)
 */
export async function updateProjectApi(
  id: string,
  data: Partial<ProjectMutationInput>
): Promise<{ success: boolean; data: Project }> {
  return putRequest<{ success: boolean; data: Project }>(`/api/v1/projects/${id}`, data);
}

/**
 * Delete a project by ID (Admin Only)
 */
export async function deleteProjectApi(id: string): Promise<{ success: boolean; message: string }> {
  return deleteRequest<{ success: boolean; message: string }>(`/api/v1/projects/${id}`);
}
