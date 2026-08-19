import { getRequest, postRequest, putRequest, deleteRequest } from "../api-client";
import type {
  BookListResponse,
  BookMutationInput,
  BookQueryParams,
  BookSingleResponse,
} from "./type";

/**
 * Fetch paginated list of books / reading list
 */
export async function getBooksApi(params?: BookQueryParams): Promise<BookListResponse> {
  return getRequest<BookListResponse>("/api/v1/books", { params });
}

/**
 * Fetch a single book by its slug
 */
export async function getBookBySlugApi(slug: string): Promise<BookSingleResponse> {
  return getRequest<BookSingleResponse>(`/api/v1/books/${slug}`);
}

/**
 * Create a new book entry (Admin Only)
 */
export async function createBookApi(data: BookMutationInput): Promise<BookSingleResponse> {
  return postRequest<BookSingleResponse>("/api/v1/books", data);
}

/**
 * Update an existing book by ID (Admin Only)
 */
export async function updateBookApi(
  id: string,
  data: Partial<BookMutationInput>
): Promise<BookSingleResponse> {
  return putRequest<BookSingleResponse>(`/api/v1/books/${id}`, data);
}

/**
 * Delete a book by ID (Admin Only)
 */
export async function deleteBookApi(id: string): Promise<{ success: boolean; message: string }> {
  return deleteRequest<{ success: boolean; message: string }>(`/api/v1/books/${id}`);
}
