import { axiosClient, ApiResponse } from "../axios-client";
import type { BookPublication } from "@/types/book";

export interface BookBundleData {
  book: {
    titleBn: string;
    titleEn: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
    ageGroup: string;
    cover: string;
    coverImage: string;
    price: number;
    rokomariUrl: string;
    purchaseLink: string;
    descriptionBn: string;
    descriptionEn: string;
    description: string;
    year: number;
  };
  stats: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  books: Array<{
    id: string;
    slug?: string;
    title: string;
    author: string;
    coverColor?: string;
    textColor?: string;
    accentColor?: string;
    coverImage?: string;
    tag?: string;
    genre?: string;
    year?: number;
  }>;
}

export type BookPayload = Partial<BookPublication> & {
  title: string;
  slug: string;
  author: string;
};

/**
 * Fetch the featured book bundle
 */
export async function getBookBundle(): Promise<ApiResponse<BookBundleData>> {
  const res = await axiosClient.get<ApiResponse<BookBundleData>>("/api/v1/books");
  return res.data;
}

/**
 * Fetch all standalone books
 */
export async function getAllBooks(): Promise<ApiResponse<BookPublication[]>> {
  const res = await axiosClient.get<ApiResponse<BookPublication[]>>("/api/v1/books/all");
  return res.data;
}

/**
 * Fetch a single book by slug
 */
export async function getBookBySlug(slug: string): Promise<ApiResponse<BookPublication>> {
  const res = await axiosClient.get<ApiResponse<BookPublication>>(
    `/api/v1/books/${encodeURIComponent(slug)}`
  );
  return res.data;
}

/**
 * Fetch a single book by ID
 */
export async function getBookById(id: string): Promise<ApiResponse<BookPublication>> {
  const res = await axiosClient.get<ApiResponse<BookPublication>>(
    `/api/v1/books/id/${encodeURIComponent(id)}`
  );
  return res.data;
}

/**
 * Update the featured book bundle
 */
export async function updateBookBundle(
  payload: Partial<BookBundleData>
): Promise<ApiResponse<BookBundleData>> {
  const res = await axiosClient.put<ApiResponse<BookBundleData>>("/api/v1/books/bundle", payload);
  return res.data;
}

/**
 * Create a new standalone book
 */
export async function createBook(payload: BookPayload): Promise<ApiResponse<BookPublication>> {
  const res = await axiosClient.post<ApiResponse<BookPublication>>("/api/v1/books", payload);
  return res.data;
}

/**
 * Update an existing book by ID
 */
export async function updateBook(
  id: string,
  payload: Partial<BookPayload>
): Promise<ApiResponse<BookPublication>> {
  const res = await axiosClient.patch<ApiResponse<BookPublication>>(
    `/api/v1/books/${encodeURIComponent(id)}`,
    payload
  );
  return res.data;
}

/**
 * Delete a book by ID
 */
export async function deleteBook(id: string): Promise<ApiResponse<{ message: string }>> {
  const res = await axiosClient.delete<ApiResponse<{ message: string }>>(
    `/api/v1/books/${encodeURIComponent(id)}`
  );
  return res.data;
}
