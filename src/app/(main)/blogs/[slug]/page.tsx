import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Tag,
  Share2,
  Bookmark,
} from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import blogsData from "@/data/blogs.json";
import blogDetailsData from "@/data/blog-details.json";

type BlockType =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | { type: "quote"; text: string; author?: string }
  | { type: "list"; style: "ordered" | "unordered"; items: string[] }
  | {
      type: "table";
      caption: string;
      headers: string[];
      rows: string[][];
    }
  | { type: "code"; language: string; filename: string; code: string }
  | { type: "divider" };

type BlogDetail = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  cover: string;
  author: { name: string; avatar: string; bio: string };
  tags: string[];
  content: BlockType[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (blogDetailsData.blogDetails as BlogDetail[]).find(
    (b) => b.slug === slug
  );

  const listPost = blogsData.blogs.find((b) => b.slug === slug);

  if (!post && !listPost) {
    return { title: "Post Not Found — Abdullah Al Maksud" };
  }

  const title = post?.title || listPost?.title || "Article";
  const description = post?.excerpt || listPost?.excerpt || "";

  return {
    title: `${title} — Abdullah Al Maksud`,
    description,
  };
}

export function generateStaticParams() {
  return blogsData.blogs.map((blog) => ({ slug: blog.slug }));
}

function RenderBlock({ block }: { block: BlockType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {block.text}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-6 pb-2 border-b border-slate-200 dark:border-dark-border">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
          {block.text}
        </h3>
      );

    case "image":
      return (
        <figure className="my-6 space-y-2">
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 dark:border-dark-border shadow-lg">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
            />
          </div>
          {block.caption && (
            <figcaption className="text-xs text-slate-500 text-center italic">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="relative pl-6 py-3 my-6 border-l-4 border-gold bg-gold/5 rounded-r-2xl space-y-2">
          <p className="text-lg italic text-slate-800 dark:text-slate-200 font-medium">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <cite className="block text-xs font-bold text-gold not-italic uppercase tracking-wider">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "list":
      if (block.style === "ordered") {
        return (
          <ol className="space-y-3 my-4">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300 leading-relaxed"
              >
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2.5 my-4">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base text-slate-700 dark:text-slate-300 leading-relaxed"
            >
              <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <div className="my-6 rounded-2xl overflow-hidden border border-slate-300 dark:border-dark-border bg-[#0B0E14] shadow-xl">
          <div className="px-5 py-3 border-b border-dark-border bg-[#10141D] flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-gold">{block.filename}</span>
            <span className="uppercase text-[10px] tracking-wider">{block.language}</span>
          </div>
          <pre className="p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">
            <code>{block.code}</code>
          </pre>
        </div>
      );

    case "divider":
      return <div className="my-8 h-px bg-slate-200 dark:border-dark-border" />;

    default:
      return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = (blogDetailsData.blogDetails as BlogDetail[]).find(
    (b) => b.slug === slug
  );

  const listPost = blogsData.blogs.find((b) => b.slug === slug);

  if (!listPost && !post) notFound();

  const title = post?.title || listPost?.title || "Article";
  const excerpt = post?.excerpt || listPost?.excerpt || "";
  const category = post?.category || listPost?.category || "General";
  const publishedAt = post?.publishedAt || listPost?.publishedAt || "";
  const readingTime = post?.readingTime || listPost?.readingTime || "5 min read";
  const cover = post?.cover || listPost?.cover || "/images/blogs/blog-0.jpg";

  const relatedPosts = blogsData.blogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300">
      <NavBar />

      <article className="max-w-4xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          <span>BACK TO WRITINGS</span>
        </Link>

        {/* Post Header */}
        <header className="mb-10 space-y-5">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold font-bold text-[11px]">
              {category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.2]">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {excerpt}
          </p>

          {/* Tags */}
          {post?.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Tag size={13} className="text-gold" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-0.5 rounded-full text-xs font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Cover Image */}
        <div className="relative h-72 sm:h-[420px] w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-300 dark:border-dark-border shadow-2xl mb-12">
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Post Content */}
        {post?.content ? (
          <div className="space-y-6">
            {post.content.map((block, i) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] text-center space-y-4">
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300">
              {excerpt}
            </p>
            <p className="text-xs text-slate-500">
              সম্পূর্ণ আর্টিকেলটি শীঘ্রই প্রকাশিত হতে যাচ্ছে।
            </p>
          </div>
        )}

        {/* Author Card */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] flex flex-col sm:flex-row items-center gap-6 shadow-md">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-950 border border-gold/40 shrink-0">
            <Image
              src="/images/portrait.png"
              alt="Abdullah Al Maksud"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
              WRITTEN BY
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Abdullah Al Maksud
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Full-Stack Developer, UI/UX Designer, and Author based in Bangladesh.
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 space-y-8 border-t border-slate-200 dark:border-dark-border pt-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              More Writings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`/blogs/${rPost.slug}`}
                  className="group rounded-2xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-4 space-y-3 card-hover-glow transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gold uppercase">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-gold transition-colors leading-snug">
                      {rPost.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-dark-border">
                    <span>{rPost.publishedAt}</span>
                    <ArrowUpRight size={13} className="group-hover:text-gold" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}
