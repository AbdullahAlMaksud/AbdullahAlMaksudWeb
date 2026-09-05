import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { blogKeys } from "./query-key";
import { createBlog, updateBlog, deleteBlog, type BlogPayload } from "./api";
import type { ApiResponse } from "../axios-client";
import type { BlogPost } from "@/types/blog";

/**
 * Mutation hook to create a new blog post
 */
export function useCreateBlogMutation(
  options?: UseMutationOptions<ApiResponse<BlogPost>, Error, BlogPayload>
): UseMutationResult<ApiResponse<BlogPost>, Error, BlogPayload> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BlogPayload) => createBlog(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to update an existing blog post
 */
export function useUpdateBlogMutation(
  options?: UseMutationOptions<
    ApiResponse<BlogPost>,
    Error,
    { id: string; payload: Partial<BlogPayload> }
  >
): UseMutationResult<ApiResponse<BlogPost>, Error, { id: string; payload: Partial<BlogPayload> }> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BlogPayload> }) =>
      updateBlog(id, payload),
    onSuccess: (...args) => {
      const [data, variables] = args;
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: blogKeys.detail(variables.id),
      });
      if (data?.data?.slug) {
        queryClient.invalidateQueries({
          queryKey: blogKeys.detail(data.data.slug),
        });
      }
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to delete a blog post
 */
export function useDeleteBlogMutation(
  options?: UseMutationOptions<ApiResponse<{ id: string }>, Error, string>
): UseMutationResult<ApiResponse<{ id: string }>, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}
