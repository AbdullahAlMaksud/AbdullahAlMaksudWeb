import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query";
import { bookKeys } from "./query-key";
import {
  updateBookBundle,
  createBook,
  updateBook,
  deleteBook,
  type BookBundleData,
  type BookPayload,
} from "./api";
import type { ApiResponse } from "../axios-client";
import type { BookPublication } from "@/types/book";

/**
 * Mutation hook to update the featured book bundle
 */
export function useUpdateBookBundleMutation(
  options?: UseMutationOptions<ApiResponse<BookBundleData>, Error, Partial<BookBundleData>>
): UseMutationResult<ApiResponse<BookBundleData>, Error, Partial<BookBundleData>> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<BookBundleData>) => updateBookBundle(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.bundle() });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to create a new book
 */
export function useCreateBookMutation(
  options?: UseMutationOptions<ApiResponse<BookPublication>, Error, BookPayload>
): UseMutationResult<ApiResponse<BookPublication>, Error, BookPayload> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BookPayload) => createBook(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to update an existing book
 */
export function useUpdateBookMutation(
  options?: UseMutationOptions<
    ApiResponse<BookPublication>,
    Error,
    { id: string; payload: Partial<BookPayload> }
  >
): UseMutationResult<
  ApiResponse<BookPublication>,
  Error,
  { id: string; payload: Partial<BookPayload> }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<BookPayload> }) =>
      updateBook(id, payload),
    onSuccess: (...args) => {
      const [data, variables] = args;
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookKeys.detail(variables.id),
      });
      if (data?.data?.slug) {
        queryClient.invalidateQueries({
          queryKey: bookKeys.detail(data.data.slug),
        });
      }
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}

/**
 * Mutation hook to delete a book
 */
export function useDeleteBookMutation(
  options?: UseMutationOptions<ApiResponse<{ message: string }>, Error, string>
): UseMutationResult<ApiResponse<{ message: string }>, Error, string> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBook(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.all });
      (options?.onSuccess as any)?.(...args);
    },
    ...options,
  });
}
