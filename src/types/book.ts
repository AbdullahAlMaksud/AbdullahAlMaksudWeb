import type { ContentPayload } from "./block";

export interface BookChapter {
  number: string;
  title: string;
  description: string;
}

export interface BookReview {
  quote: string;
  source: string;
}

export interface BookPublication {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  coverImage: string;
  category: string;
  genre: string;
  language: string;
  publicationYear: string;
  edition: string;
  pages: number;
  publisher?: string;
  isbn?: string;
  synopsis: string;
  content?: ContentPayload;
  contentType?: string;
  themes: string[];
  chapters?: BookChapter[];
  authorNote?: string;
  quotes?: string[];
  purchaseLinks?: {
    label: string;
    url: string;
    isPrimary?: boolean;
  }[];
}
