import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getBookBySlugApi, getBooksApi } from "./api";
import { bookKeys } from "./query-key";
import type { BookListResponse, BookQueryParams, BookSingleResponse } from "./type";

/**
 * Hook to query books / reading list with caching and filters
 */
export function useBooksQuery(
  params?: BookQueryParams,
  options?: Omit<UseQueryOptions<BookListResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<BookListResponse, Error>({
    queryKey: bookKeys.list(params),
    queryFn: () => getBooksApi(params),
    ...options,
  });
}

/**
 * Hook to query a single book by slug
 */
export function useBookBySlugQuery(
  slug: string,
  options?: Omit<UseQueryOptions<BookSingleResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery<BookSingleResponse, Error>({
    queryKey: bookKeys.detail(slug),
    queryFn: () => getBookBySlugApi(slug),
    enabled: Boolean(slug),
    ...options,
  });
}
