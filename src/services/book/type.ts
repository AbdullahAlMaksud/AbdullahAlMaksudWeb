import type { PaginationMeta } from "../blog/type";

export interface FeaturedBook {
  titleBn: string;
  titleEn: string;
  title?: string;
  author: string;
  publisher: string;
  category: string;
  ageGroup: string;
  cover: string;
  coverImage?: string;
  price: number;
  rokomariUrl: string;
  purchaseLink?: string;
  descriptionBn: string;
  descriptionEn: string;
  description?: string;
  year: number;
}

export interface BookStat {
  value: string;
  label: string;
  icon: string;
}

export interface ShelfBook {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  textColor: string;
  accentColor: string;
  tag: string;
  year: number;
  coverImage?: string;
}

export interface BookBundleData {
  book: FeaturedBook;
  stats: BookStat[];
  books: ShelfBook[];
}

export interface BookBundleResponse {
  success: boolean;
  data: BookBundleData;
}

export interface Book {
  _id?: string;
  id?: string;
  title: string;
  titleBn?: string;
  titleEn?: string;
  slug?: string;
  author: string;
  coverImage?: string;
  cover?: string;
  coverColor?: string;
  textColor?: string;
  accentColor?: string;
  description?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  genre?: string;
  category?: string;
  ageGroup?: string;
  rating?: number;
  readDate?: string;
  year?: number;
  price?: number;
  reviewText?: string;
  tags?: string[];
  tag?: string;
  isRecommended?: boolean;
  purchaseLink?: string;
  rokomariUrl?: string;
  publisher?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookListResponse {
  success: boolean;
  data: BookBundleData | Book[];
  pagination?: PaginationMeta;
}

export interface BookSingleResponse {
  success: boolean;
  data: Book;
}

export interface BookQueryParams {
  page?: number;
  limit?: number;
  recommended?: boolean;
}

export interface BookMutationInput {
  title: string;
  slug: string;
  author: string;
  coverImage?: string;
  description: string;
  genre?: string;
  rating?: number;
  readDate?: string;
  reviewText?: string;
  tags?: string[];
  isRecommended?: boolean;
  purchaseLink?: string;
}
