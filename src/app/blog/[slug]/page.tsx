import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog-data";
import { BlogPostScreen } from "@/screens/BlogPostScreen";
import { fetchBlogBySlug, mapApiBlogToBlogPost } from "@/lib/api/blogs";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const generateStaticParams = () => {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    const apiBlog = await fetchBlogBySlug(slug);
    if (apiBlog) {
      post = mapApiBlogToBlogPost(apiBlog);
    }
  }

  if (!post) {
    return {
      title: "Monograph Not Found — Abdullah Al Maksud",
    };
  }

  return {
    title: `${post.title} — Abdullah Al Maksud`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Abdullah Al Maksud`,
      description: post.excerpt,
      type: "article",
    },
  };
}

const Page = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  // 1. Try fetching from live backend first
  let post = null;
  const apiBlog = await fetchBlogBySlug(slug);
  if (apiBlog) {
    post = mapApiBlogToBlogPost(apiBlog);
  }

  // 2. Fallback to static catalogue
  if (!post) {
    post = BLOG_POSTS.find((p) => p.slug === slug) || null;
  }

  if (!post) {
    notFound();
  }

  return <BlogPostScreen post={post} />;
};

export default Page;
