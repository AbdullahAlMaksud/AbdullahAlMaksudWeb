import { getRequest, postRequest, putRequest, deleteRequest } from "../api-client";
import type {
  BlogListResponse,
  BlogMutationInput,
  BlogQueryParams,
  BlogSingleResponse,
  BlogPost,
} from "./type";

/**
 * Fetch paginated list of blog posts
 */
export async function getBlogsApi(params?: BlogQueryParams): Promise<BlogListResponse> {
  return getRequest<BlogListResponse>("/api/v1/blogs", { params });
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogBySlugApi(slug: string): Promise<BlogSingleResponse> {
  return getRequest<BlogSingleResponse>(`/api/v1/blogs/${slug}`);
}

/**
 * Create a new blog post (Admin Only)
 */
export async function createBlogApi(data: BlogMutationInput): Promise<BlogSingleResponse> {
  return postRequest<BlogSingleResponse>("/api/v1/blogs", data);
}

/**
 * Update an existing blog post by ID (Admin Only)
 */
export async function updateBlogApi(
  id: string,
  data: Partial<BlogMutationInput>
): Promise<BlogSingleResponse> {
  return putRequest<BlogSingleResponse>(`/api/v1/blogs/${id}`, data);
}

/**
 * Delete a blog post by ID (Admin Only)
 */
export async function deleteBlogApi(id: string): Promise<{ success: boolean; message: string }> {
  return deleteRequest<{ success: boolean; message: string }>(`/api/v1/blogs/${id}`);
}
