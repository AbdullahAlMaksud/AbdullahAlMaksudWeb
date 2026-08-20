"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useBlogsQuery, useHomeQuery } from "@/services";
import { WritingSectionSkeleton } from "@/components/skeletons/SectionSkeletons";

const DEFAULT_WRITING = {
  badge: "WRITING",
  headlineLines: ["Thoughts that", "inspire and", "create impact."],
  exploreText: "READ WRITINGS",
  exploreLink: "/blogs",
};

export function WritingSection() {
  const { data: serverHomeData } = useHomeQuery();
  const { data: serverBlogsData, isLoading: isBlogsLoading } = useBlogsQuery({ published: true });

  const writing = serverHomeData?.writing || DEFAULT_WRITING;

  const rawBlogs = Array.isArray(serverBlogsData?.data) ? serverBlogsData.data : [];

  const blogs = rawBlogs.slice(0, 3).map((b: any) => ({
    id: b.id || b._id || b.slug,
    slug: b.slug,
    title: b.title,
    publishedAt: b.publishedAt || "Recently",
  }));

  if (isBlogsLoading && blogs.length === 0) {
    return <WritingSectionSkeleton />;
  }

  return (
    <div id="writing" className="scroll-mt-28 space-y-6 pt-4 [perspective:1200px]">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {writing.badge}
            </span>
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {writing.headlineLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx !== writing.headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <Link
          href={writing.exploreLink || "/blogs"}
          className="group inline-flex shrink-0 items-center gap-2.5 text-xs font-bold tracking-widest text-slate-600 transition-colors duration-300 hover:text-gold dark:text-slate-300"
        >
          <span>{writing.exploreText}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-gold shadow-[0_0_12px_rgba(229,169,60,0.2)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950">
            <ArrowUpRight size={14} />
          </div>
        </Link>
      </div>

      {/* Unified 3-Row Dark Glass Writing Card */}
      <div className="transform divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-transform duration-500 hover:[transform:rotateY(0deg)_rotateX(0deg)] dark:divide-white/[0.06] dark:border-white/10 dark:bg-[#0C1018]/90 dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] sm:p-7 lg:[transform:rotateY(-6deg)_rotateX(3deg)]">
        {blogs.map((blog: any) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group/item flex items-center justify-between gap-4 py-4 transition-colors duration-200 first:pt-1 last:pb-1"
          >
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 transition-colors group-hover/item:text-gold dark:text-white sm:text-lg">
                {blog.title}
              </h3>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {blog.publishedAt}
              </p>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center text-slate-500 transition-all duration-300 group-hover/item:translate-x-1.5 group-hover/item:text-gold dark:text-slate-400">
              <ArrowRight size={18} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
