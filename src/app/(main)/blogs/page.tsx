import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Tag } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import blogsData from "@/data/blogs.json";

export const metadata: Metadata = {
  title: "Writing & Blogs — Abdullah Al Maksud",
  description:
    "Thoughts on programming, software craft, mindset, productivity, and life.",
};

const CATEGORIES = ["All", "Mindset", "Productivity", "Life", "Product", "Engineering"];

export default function BlogsPage() {
  const { blogs } = blogsData;
  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          <span>HOME</span>
        </Link>

        {/* Header */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Articles &amp; Essays
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Thoughts &amp; <span className="text-gold">Writings</span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Notes on software engineering, product strategy, continuous learning, and life perspectives.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2 pt-4">
            {CATEGORIES.map((category, idx) => (
              <span
                key={category}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  idx === 0
                    ? "bg-gold text-slate-950 shadow-md font-bold"
                    : "border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] text-slate-600 dark:text-slate-400 hover:border-gold hover:text-gold"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </header>

        {/* ========================================================
            FEATURED HERO POST
        ======================================================== */}
        {featuredBlog && (
          <div className="mb-16">
            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className="group block rounded-3xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 sm:p-10 card-hover-glow transition-all duration-300 shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="px-3 py-1 rounded-full bg-gold/10 text-gold font-bold text-[11px]">
                      {featuredBlog.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {featuredBlog.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {featuredBlog.readingTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white group-hover:text-gold transition-colors leading-tight">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-gold pt-2 group-hover:translate-x-1 transition-transform">
                    <span>READ FULL ESSAY</span>
                    <ArrowRight size={14} />
                  </div>
                </div>

                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
                    <Image
                      src={featuredBlog.cover || "/images/blogs/blog-0.jpg"}
                      alt={featuredBlog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ========================================================
            ALL ARTICLES GRID
        ======================================================== */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-dark-border pb-3">
            Recent Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-5 space-y-4 card-hover-glow transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-44 w-full rounded-xl overflow-hidden bg-slate-950 shadow-md">
                    <Image
                      src={blog.cover || "/images/blogs/blog-0.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-semibold text-[10px]">
                      {blog.category}
                    </span>
                    <span>{blog.readingTime}</span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-gold transition-colors leading-snug">
                    {blog.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-dark-border text-xs">
                  <span className="text-slate-400">{blog.publishedAt}</span>
                  <div className="w-8 h-8 rounded-full border border-slate-200 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                    <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}