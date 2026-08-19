"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { BlogCard, FeaturedBlogCard } from "@/components/cards/BlogCard";
import { useBlogsQuery } from "@/services";

const CATEGORIES = ["All", "Mindset", "Productivity", "Life", "Product", "Engineering"];

export function BlogsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: serverBlogsData } = useBlogsQuery({
    published: true,
  });

  const rawBlogs = Array.isArray(serverBlogsData?.data) ? serverBlogsData.data : [];

  const blogs = rawBlogs
    .map((b: any) => ({
      id: b._id || b.id || b.slug,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt || "",
      cover: b.coverImage || b.cover || "/images/blogs/blog-0.jpg",
      category: b.category || "Engineering",
      publishedAt: b.publishedAt || "Recently",
      readingTime: b.readingTime || "5 min read",
    }))
    .filter((b) => {
      if (selectedCategory === "All") return true;
      return b.category?.toLowerCase() === selectedCategory.toLowerCase();
    });

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <main className="min-h-screen bg-light-bg text-slate-900 transition-colors duration-300 dark:bg-dark-bg dark:text-white">
      <NavBar />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
        >
          <ArrowLeft size={14} />
          <span>HOME</span>
        </Link>

        {/* Header */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Articles &amp; Essays
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Thoughts &amp; <span className="text-gold">Writings</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Essays on software craftsmanship, engineering mindset, product strategy, and lessons
            learned from building and writing.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gold font-bold text-slate-950 shadow-md"
                    : "border border-slate-300 bg-light-surface text-slate-600 hover:border-gold hover:text-gold dark:border-white/10 dark:bg-[#0C1018] dark:text-slate-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        {/* Featured Hero Blog */}
        {featuredBlog && (
          <div className="mb-16">
            <FeaturedBlogCard {...featuredBlog} />
          </div>
        )}

        {/* Recent Articles Grid */}
        {otherBlogs.length > 0 && (
          <div className="space-y-6">
            <h3 className="border-b border-slate-200 pb-3 text-xl font-bold text-slate-900 dark:border-white/10 dark:text-white">
              {selectedCategory === "All" ? "Recent Articles" : `${selectedCategory} Articles`}
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
