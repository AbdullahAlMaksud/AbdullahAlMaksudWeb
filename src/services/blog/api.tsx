import { axiosClient, PaginatedApiResponse, ApiResponse } from "../axios-client";
import type { BlogPost } from "@/types/blog";

export interface BlogFilterParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean | string;
  published?: boolean | string;
  search?: string;
  includeContent?: boolean;
}

export interface BlogPayload {
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  contentType?: "blocks" | "lexical" | "markdown" | "html" | "json";
  cover?: string;
  coverImage?: string;
  author?: {
    name?: string;
    avatar?: string;
    bio?: string;
  };
  tags?: string[];
  category?: string;
  readingTime?: string;
  featured?: boolean;
  featuredType?: "large" | "small" | "standard" | "";
  isPublished?: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Fetch paginated blogs list with optional filters
 */
export async function getBlogs(params?: BlogFilterParams): Promise<PaginatedApiResponse<BlogPost>> {
  const res = await axiosClient.get<PaginatedApiResponse<BlogPost>>("/api/v1/blogs", { params });
  return res.data;
}

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
  const res = await axiosClient.get<ApiResponse<BlogPost>>(
    `/api/v1/blogs/${encodeURIComponent(slug)}`
  );
  return res.data;
}

/**
 * Fetch a single blog by ID
 */
export async function getBlogById(id: string): Promise<ApiResponse<BlogPost>> {
  const res = await axiosClient.get<ApiResponse<BlogPost>>(
    `/api/v1/blogs/id/${encodeURIComponent(id)}`
  );
  return res.data;
}

/**
 * Create a new blog post
 */
export async function createBlog(payload: BlogPayload): Promise<ApiResponse<BlogPost>> {
  const res = await axiosClient.post<ApiResponse<BlogPost>>("/api/v1/blogs", payload);
  return res.data;
}

/**
 * Update an existing blog post by ID
 */
export async function updateBlog(
  id: string,
  payload: Partial<BlogPayload>
): Promise<ApiResponse<BlogPost>> {
  const res = await axiosClient.put<ApiResponse<BlogPost>>(
    `/api/v1/blogs/${encodeURIComponent(id)}`,
    payload
  );
  return res.data;
}

/**
 * Delete a blog post by ID
 */
export async function deleteBlog(id: string): Promise<ApiResponse<{ id: string }>> {
  const res = await axiosClient.delete<ApiResponse<{ id: string }>>(
    `/api/v1/blogs/${encodeURIComponent(id)}`
  );
  return res.data;
}
