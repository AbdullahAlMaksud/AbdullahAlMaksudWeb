import { apiClient, safeGet, ApiResponse, PaginatedApiResponse } from "./client";
import { BlogPost } from "@/types/blog";
import { BLOG_POSTS } from "@/data/blog-data";

export interface ApiBlog {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  readTime: string;
  type: "essay" | "monograph" | "paper" | "article";
  featured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  search?: string;
  published?: boolean;
  includeContent?: boolean;
}

/**
 * Fetch all blogs from the server with pagination and filtering.
 */
export async function fetchBlogs(
  params: BlogQueryParams = {}
): Promise<PaginatedApiResponse<ApiBlog>> {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.set("page", String(params.page));
  if (params.limit) queryParams.set("limit", String(params.limit));
  if (params.category) queryParams.set("category", params.category);
  if (params.featured !== undefined) queryParams.set("featured", String(params.featured));
  if (params.search) queryParams.set("search", params.search);
  if (params.published !== undefined) {
    queryParams.set("published", String(params.published));
  } else {
    queryParams.set("published", "true"); // default to published on web
  }
  if (params.includeContent) queryParams.set("includeContent", "true");

  const queryString = queryParams.toString();
  const url = `/api/blogs${queryString ? `?${queryString}` : ""}`;

  const res = await apiClient.get<PaginatedApiResponse<ApiBlog>>(url);
  return res.data;
}

/**
 * Fetch a single blog post by its slug.
 */
export async function fetchBlogBySlug(slug: string): Promise<ApiBlog | null> {
  const res = await safeGet<ApiResponse<ApiBlog>>(`/api/blogs/${slug}`);
  return res?.data || null;
}

/**
 * Fetch blog categories.
 */
export async function fetchBlogCategories(): Promise<string[]> {
  const res = await safeGet<ApiResponse<string[]>>("/api/blogs/categories");
  return res?.data || [];
}

/**
 * Convert backend ApiBlog to frontend BlogPost model
 */
export function mapApiBlogToBlogPost(blog: ApiBlog): BlogPost {
  let cleanContent = "";

  // Handle block-by-block array structure from Lexical editor
  if (Array.isArray(blog.content)) {
    cleanContent = blog.content
      .map((block: any) => {
        if (!block) return "";
        if (block.data?.markdown) return block.data.markdown;
        switch (block.type) {
          case "heading": {
            const level = block.data?.level || 2;
            return `${"#".repeat(level)} ${block.data?.text || ""}`;
          }
          case "quote":
            return `> ${block.data?.text || ""}`;
          case "code":
            return `\`\`\`${block.data?.language || "typescript"}\n${block.data?.code || block.data?.text || ""}\n\`\`\``;
          case "list": {
            const isNum = block.data?.listType === "number";
            const items = block.data?.items || [];
            return items
              .map((it: string, i: number) => (isNum ? `${i + 1}. ${it}` : `- ${it}`))
              .join("\n");
          }
          case "divider":
            return "---";
          case "paragraph":
          default:
            return block.data?.text || "";
        }
      })
      .filter(Boolean)
      .join("\n\n");
  } else if (typeof blog.content === "string") {
    cleanContent = blog.content;
    // If content is Lexical JSON, extract plain text/markdown or return as string
    if (cleanContent.startsWith("{") && cleanContent.includes('"root"')) {
      try {
        const parsed = JSON.parse(cleanContent);
        // Simple extractor from lexical root nodes
        const extractText = (node: any): string => {
          if (!node) return "";
          if (node.text) return node.text;
          if (node.children && Array.isArray(node.children)) {
            return node.children.map(extractText).join(node.type === "paragraph" ? "\n" : "");
          }
          return "";
        };
        cleanContent = extractText(parsed.root);
      } catch {
        // keep original string if parse fails
      }
    }
  }

  const tag = blog.tags && blog.tags.length > 0 ? blog.tags[0] : blog.category.toUpperCase();

  const typeMap: Record<string, "Essay" | "Article" | "Monograph" | "Publication"> = {
    essay: "Essay",
    article: "Article",
    monograph: "Monograph",
    paper: "Publication",
    publication: "Publication",
  };
  const mappedType = typeMap[blog.type?.toLowerCase()] || "Essay";

  return {
    slug: blog.slug,
    title: blog.title,
    category: blog.category || "ENGINEERING",
    excerpt: blog.excerpt,
    date: new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    readTime: blog.readTime || "5 MIN READ",
    tag: tag.startsWith("0") ? tag : `MONOGRAPH // ${tag}`,
    type: mappedType,
    content: cleanContent,
  };
}

/**
 * Merges API blogs with static fallback data.
 * If backend has live blogs, uses them; if not or empty, uses the static catalog.
 */
export function mergeBlogsWithStatic(apiBlogs: ApiBlog[]): BlogPost[] {
  if (!apiBlogs || apiBlogs.length === 0) {
    return BLOG_POSTS;
  }

  const mappedApi = apiBlogs.map(mapApiBlogToBlogPost);
  // Avoid duplicates by slug
  const apiSlugs = new Set(mappedApi.map((b) => b.slug));
  const remainingStatic = BLOG_POSTS.filter((b) => !apiSlugs.has(b.slug));

  return [...mappedApi, ...remainingStatic];
}
