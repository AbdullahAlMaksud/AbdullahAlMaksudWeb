import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { getBlogBySlugApi, getBlogsApi } from "@/services/blog/api";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await getBlogBySlugApi(slug);
    if (res?.data) {
      return {
        title: `${res.data.title} — Abdullah Al Maksud`,
        description: res.data.excerpt || "",
      };
    }
  } catch (e) {
    // Return fallback metadata
  }

  return {
    title: "Article — Abdullah Al Maksud",
    description:
      "Read insightful articles on software engineering, design, and continuous learning.",
  };
}

function RenderBlock({ block }: { block: BlockType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
          {block.text}
        </p>
      );

    case "heading":
      if (block.level === 2) {
        return (
          <h2 className="border-b border-slate-200 pb-2 pt-6 text-2xl font-extrabold text-slate-900 dark:border-dark-border dark:text-white sm:text-3xl">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 className="pt-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
          {block.text}
        </h3>
      );

    case "image":
      return (
        <figure className="my-6 space-y-2">
          <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-950 shadow-lg dark:border-dark-border sm:h-96">
            <Image src={block.src} alt={block.alt} fill className="object-cover" />
          </div>
          {block.caption && (
            <figcaption className="text-center text-xs italic text-slate-500">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="relative my-6 space-y-2 rounded-r-2xl border-l-4 border-gold bg-gold/5 py-3 pl-6">
          <p className="text-lg font-medium italic text-slate-800 dark:text-slate-200">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.author && (
            <cite className="block text-xs font-bold uppercase not-italic tracking-wider text-gold">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );

    case "list":
      if (block.style === "ordered") {
        return (
          <ol className="my-4 space-y-3">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-base leading-relaxed text-slate-700 dark:text-slate-300"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="my-4 space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base leading-relaxed text-slate-700 dark:text-slate-300"
            >
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "code":
      return (
        <div className="my-6 overflow-hidden rounded-2xl border border-slate-300 bg-[#0B0E14] shadow-xl dark:border-dark-border">
          <div className="flex items-center justify-between border-b border-dark-border bg-[#10141D] px-5 py-3 text-xs text-slate-400">
            <span className="font-mono text-gold">{block.filename}</span>
            <span className="text-[10px] uppercase tracking-wider">{block.language}</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-slate-200 sm:text-sm">
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

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: any = null;
  try {
    const res = await getBlogBySlugApi(slug);
    if (res?.data) {
      post = res.data;
    }
  } catch (e) {
    // API error
  }

  if (!post) {
    notFound();
  }

  let relatedPosts: any[] = [];
  try {
    const resList = await getBlogsApi({ limit: 4 });
    if (Array.isArray(resList?.data)) {
      relatedPosts = resList.data.filter((b: any) => b.slug !== slug).slice(0, 3);
    }
  } catch (e) {
    // Optional related blogs
  }

  const title = post.title || "Article";
  const excerpt = post.excerpt || "";
  const category = post.category || "General";
  const publishedAt = post.publishedAt || "Recently";
  const readingTime = post.readingTime || "5 min read";
  const cover = post.coverImage || post.cover || "/images/portrait.png";
  const author = post.author || {
    name: "Abdullah Al Maksud",
    avatar: "/images/portrait.png",
    bio: "Developer, designer, writer.",
  };
  const tags = post.tags || [category];
  const content = post.content || [];

  return (
    <main className="min-h-screen bg-light-bg text-slate-900 transition-colors duration-300 dark:bg-dark-bg dark:text-white">
      <NavBar />

      <article className="mx-auto max-w-4xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb */}
        <Link
          href="/blogs"
          className="mb-10 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
        >
          <ArrowLeft size={14} />
          <span>BACK TO WRITINGS</span>
        </Link>

        {/* Post Header */}
        <header className="mb-10 space-y-5">
          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="rounded-full bg-gold/10 px-3 py-1 text-[11px] font-bold text-gold">
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

          <h1 className="text-3xl font-extrabold leading-[1.2] text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
            {excerpt}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Tag size={13} className="text-gold" />
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-light-card px-3 py-0.5 text-xs font-medium text-slate-600 dark:border-dark-border dark:bg-[#131824] dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Cover Image */}
        <div className="relative mb-12 h-72 w-full overflow-hidden rounded-3xl border border-slate-300 bg-slate-950 shadow-2xl dark:border-dark-border sm:h-[420px]">
          <Image src={cover} alt={title} fill priority className="object-cover" />
        </div>

        {/* Post Content */}
        {Array.isArray(content) && content.length > 0 ? (
          <div className="space-y-6">
            {content.map((block: any, i: number) => (
              <RenderBlock key={i} block={block} />
            ))}
          </div>
        ) : typeof content === "string" && content ? (
          <div className="space-y-6 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:text-lg">
            <p>{content}</p>
          </div>
        ) : (
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-light-surface p-8 text-center dark:border-dark-border dark:bg-[#0C1018] sm:p-12">
            <p className="text-base text-slate-700 dark:text-slate-300 sm:text-lg">{excerpt}</p>
            <p className="text-xs text-slate-500">
              সম্পূর্ণ আর্টিকেলটি শীঘ্রই প্রকাশিত হতে যাচ্ছে।
            </p>
          </div>
        )}

        {/* Author Card */}
        <div className="mt-16 flex flex-col items-center gap-6 rounded-3xl border border-slate-300 bg-light-surface p-6 shadow-md dark:border-dark-border dark:bg-[#0C1018] sm:flex-row sm:p-8">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-gold/40 bg-slate-950">
            <Image
              src={author.avatar || "/images/portrait.png"}
              alt={author.name || "Abdullah Al Maksud"}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
              WRITTEN BY
            </span>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {author.name || "Abdullah Al Maksud"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {author.bio ||
                "Full-Stack Developer, UI/UX Designer, and Author based in Bangladesh."}
            </p>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 space-y-8 border-t border-slate-200 pt-12 dark:border-dark-border">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">More Writings</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((rPost: any) => (
                <Link
                  key={rPost._id || rPost.id || rPost.slug}
                  href={`/blogs/${rPost.slug}`}
                  className="card-hover-glow group flex flex-col justify-between space-y-3 rounded-2xl border border-slate-200 bg-light-surface p-4 transition-all duration-300 dark:border-dark-border dark:bg-[#0C1018]"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-gold">
                      {rPost.category}
                    </span>
                    <h4 className="text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-gold dark:text-white">
                      {rPost.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2 text-[11px] text-slate-500 dark:border-dark-border dark:text-slate-400">
                    <span>{rPost.publishedAt || "Recently"}</span>
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
