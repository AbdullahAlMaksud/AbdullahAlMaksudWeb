import { useQuery, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { bookKeys } from "./query-key";
import { getBookBundle, getAllBooks, getBookBySlug, getBookById, type BookBundleData } from "./api";
import type { ApiResponse } from "../axios-client";
import type { BookPublication } from "@/types/book";

/**
 * Hook to query the featured book bundle
 */
export function useBookBundleQuery(
  options?: Omit<
    UseQueryOptions<
      ApiResponse<BookBundleData>,
      Error,
      ApiResponse<BookBundleData>,
      ReturnType<typeof bookKeys.bundle>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<BookBundleData>, Error> {
  return useQuery({
    queryKey: bookKeys.bundle(),
    queryFn: () => getBookBundle(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query all standalone books
 */
export function useBooksQuery(
  options?: Omit<
    UseQueryOptions<
      ApiResponse<BookPublication[]>,
      Error,
      ApiResponse<BookPublication[]>,
      ReturnType<typeof bookKeys.lists>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<BookPublication[]>, Error> {
  return useQuery({
    queryKey: bookKeys.lists(),
    queryFn: () => getAllBooks(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single book by slug
 */
export function useBookBySlugQuery(
  slug: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<BookPublication>,
      Error,
      ApiResponse<BookPublication>,
      ReturnType<typeof bookKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<BookPublication>, Error> {
  return useQuery({
    queryKey: bookKeys.detail(slug),
    queryFn: () => getBookBySlug(slug),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}

/**
 * Hook to query a single book by ID
 */
export function useBookByIdQuery(
  id: string,
  options?: Omit<
    UseQueryOptions<
      ApiResponse<BookPublication>,
      Error,
      ApiResponse<BookPublication>,
      ReturnType<typeof bookKeys.detail>
    >,
    "queryKey" | "queryFn"
  >
): UseQueryResult<ApiResponse<BookPublication>, Error> {
  return useQuery({
    queryKey: bookKeys.detail(id),
    queryFn: () => getBookById(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
