"use client";

import { useQuery } from "@tanstack/react-query";
import {
  fetchBlogs,
  fetchBlogBySlug,
  fetchBlogCategories,
  BlogQueryParams,
  mergeBlogsWithStatic,
  ApiBlog,
} from "@/lib/api/blogs";
import { BlogPost } from "@/types/blog";
import { BLOG_POSTS } from "@/data/blog-data";

/**
 * Hook to fetch paginated/filtered blogs using TanStack Query.
 * Automatically merges with static monograph fallback if backend has no records yet.
 */
export function useBlogs(params: BlogQueryParams = {}) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: async () => {
      try {
        const response = await fetchBlogs(params);
        return response.data || [];
      } catch (err) {
        console.warn("[useBlogs] Fallback to local catalog due to:", err);
        return [] as ApiBlog[];
      }
    },
    select: (apiBlogs): BlogPost[] => {
      return mergeBlogsWithStatic(apiBlogs);
    },
  });
}

/**
 * Hook to fetch a single blog post by slug
 */
export function useBlog(slug: string, initialFallback?: BlogPost) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const apiBlog = await fetchBlogBySlug(slug);
      return apiBlog;
    },
    placeholderData: () => {
      if (initialFallback) return undefined;
      return undefined;
    },
  });
}

/**
 * Hook to fetch blog categories
 */
export function useBlogCategories() {
  return useQuery({
    queryKey: ["blog-categories"],
    queryFn: fetchBlogCategories,
  });
}
