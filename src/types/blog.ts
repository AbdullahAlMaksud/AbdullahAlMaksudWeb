import type { ContentPayload } from "./block";

export interface BlogPost {
  slug: string;
  id?: string;
  title: string;
  category: string;
  tag: string;
  type: "Essay" | "Article" | "Monograph" | "Publication" | string;
  date: string;
  readTime: string;
  excerpt: string;
  content: ContentPayload;
  contentType?: "blocks" | "lexical" | "markdown" | "html" | "json";
  cover?: string;
  coverImage?: string;
  language?: "en" | "bn";
  isPublished?: boolean;
}
