export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; style: "ordered" | "unordered"; items: string[] }
  | { type: "table"; caption?: string; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; filename?: string; code: string }
  | { type: "divider" };

export interface BlogAuthor {
  name: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  content: BlogBlock[] | string;
  excerpt?: string;
  coverImage?: string;
  cover?: string;
  author?: BlogAuthor | string;
  tags?: string[];
  category?: string;
  readingTime?: string;
  featured?: boolean;
  featuredType?: "large" | "small" | string;
  isPublished?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  pagination: PaginationMeta;
}

export interface BlogSingleResponse {
  success: boolean;
  data: BlogPost;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  published?: boolean;
  category?: string;
  featured?: boolean;
}

export interface BlogMutationInput {
  title: string;
  slug: string;
  content: BlogBlock[] | string;
  excerpt?: string;
  coverImage?: string;
  author?: BlogAuthor | string;
  tags?: string[];
  category?: string;
  isPublished?: boolean;
  readingTime?: string;
  featured?: boolean;
}
