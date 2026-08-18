"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import blogsData from "@/data/blogs.json";

export function WritingSection() {
  const blogs = blogsData.blogs;

  return (
    <section id="writing" className="relative py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================
              LEFT COLUMN: SECTION TITLE & CTA
          ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
                WRITING
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Thoughts that
              <br />
              inspire and
              <br />
              create impact.
            </h2>

            <div className="pt-2">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 hover:text-gold dark:hover:text-gold transition-colors duration-300 group"
              >
                <span>READ WRITINGS</span>
                <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: 3 BENGALI BLOG POST ROWS
          ======================================================== */}
          <div className="lg:col-span-8 space-y-4">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group relative block rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 sm:p-6 transition-all duration-300 hover:border-gold/60 hover:shadow-lg card-hover-glow"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-gold transition-colors font-sans">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {blog.publishedAt}
                    </p>
                  </div>

                  {/* Right Arrow Icon */}
                  <div className="w-9 h-9 rounded-full border border-slate-200 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all duration-300 shrink-0">
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
