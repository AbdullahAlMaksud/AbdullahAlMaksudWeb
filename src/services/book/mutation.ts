import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookApi, deleteBookApi, updateBookApi } from "./api";
import { bookKeys } from "./query-key";
import type { BookMutationInput, BookSingleResponse } from "./type";

export function useCreateBookMutation() {
  const queryClient = useQueryClient();

  return useMutation<BookSingleResponse, Error, BookMutationInput>({
    mutationFn: createBookApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}

export function useUpdateBookMutation() {
  const queryClient = useQueryClient();

  return useMutation<BookSingleResponse, Error, { id: string; data: Partial<BookMutationInput> }>({
    mutationFn: ({ id, data }) => updateBookApi(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      if (result?.data?.slug) {
        queryClient.invalidateQueries({ queryKey: bookKeys.detail(result.data.slug) });
      }
    },
  });
}

export function useDeleteBookMutation() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: deleteBookApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
    },
  });
}
