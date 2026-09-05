export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  tag: string;
  type: "Essay" | "Article" | "Monograph" | "Publication";
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  language?: "en" | "bn";
}
