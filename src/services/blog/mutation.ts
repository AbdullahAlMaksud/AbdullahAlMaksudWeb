import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlogApi, deleteBlogApi, updateBlogApi } from "./api";
import { blogKeys } from "./query-key";
import type { BlogMutationInput, BlogSingleResponse } from "./type";

export function useCreateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation<BlogSingleResponse, Error, BlogMutationInput>({
    mutationFn: createBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

export function useUpdateBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation<BlogSingleResponse, Error, { id: string; data: Partial<BlogMutationInput> }>({
    mutationFn: ({ id, data }) => updateBlogApi(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      if (result?.data?.slug) {
        queryClient.invalidateQueries({ queryKey: blogKeys.detail(result.data.slug) });
      }
    },
  });
}

export function useDeleteBlogMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteBlogApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}
