"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-data";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, X, LayoutGrid, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogGridCard } from "@/screens/blog/BlogGridCard";
import { BlogListCard } from "@/screens/blog/BlogListCard";
import { useBlogs } from "@/lib/hooks/useBlogs";

export const BlogScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: posts = BLOG_POSTS, isLoading } = useBlogs();

  // Filtering & Sorting Logic
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q) ||
          post.tag.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return posts.indexOf(a) - posts.indexOf(b);
      }
      if (sortBy === "oldest") {
        return posts.indexOf(b) - posts.indexOf(a);
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "readTime") {
        const getMins = (str: string) => parseInt(str.replace(/\D/g, "") || "0", 10);
        return getMins(a.readTime) - getMins(b.readTime);
      }
      return 0;
    });

    return result;
  }, [posts, searchQuery, sortBy]);

  return (
    <main className="flex min-h-screen w-full justify-center bg-neutral-100 px-0 py-0 sm:px-4 sm:py-6 md:px-8 lg:py-10">
      <div className="flex w-full max-w-[1240px] flex-col justify-between overflow-hidden border-0 bg-white shadow-2xl sm:border sm:border-black">
        <div>
          {/* Top Folio Strip */}
          <TopHeader badge="PORTFOLIO // MONOGRAPHS" issue="ISSUE 01" folio="FOLIO 002" />

          {/* Minimal Navigation Bar */}
          <div className="flex items-center justify-between border-b border-black px-4 py-5 sm:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-black uppercase transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO HOME
            </Link>

            <nav className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
              <Link href="/about" className="transition-opacity hover:opacity-60">
                ABOUT
              </Link>
              <Link href="/blog" className="border-b border-black pb-0.5 font-bold text-black">
                BLOG
              </Link>
              <Link href="/contact" className="transition-opacity hover:opacity-60">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Centered Broadsheet Masthead Header */}
          <section className="border-b border-neutral-200 px-4 py-10 text-center sm:px-8 sm:py-12">
            <div className="mx-auto max-w-2xl space-y-2">
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-black uppercase sm:text-4xl lg:text-5xl">
                Writings & Monographs
              </h1>
              <p className="font-editorial-body text-base leading-relaxed text-neutral-600">
                Essays on frontend systems, state machines, typography, and literary translation.
              </p>
            </div>
          </section>

          {/* Single-Row Unified Toolbar: Search + Sort + View Toggle + Count */}
          <section className="border-b border-neutral-200 bg-neutral-50/60 px-4 py-3.5 sm:px-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              {/* Left: Clean Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search monographs..."
                  className="h-9 w-full border border-neutral-300 bg-white pr-8 pl-9 font-sans text-xs transition-colors focus:border-black"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-black"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Right: Sort + View Toggle (Grid / List) + Counter */}
              <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="hidden font-mono text-[10px] font-semibold tracking-widest text-neutral-500 uppercase md:inline-block">
                    SORT:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-9 w-36 border-neutral-300 bg-white">
                      <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent align="end">
                      <SelectItem value="newest">LATEST FIRST</SelectItem>
                      <SelectItem value="oldest">OLDEST FIRST</SelectItem>
                      <SelectItem value="readTime">READ TIME</SelectItem>
                      <SelectItem value="title">TITLE (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle (Grid vs List) */}
                <div className="flex h-9 items-center border border-neutral-300 bg-white p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="4-Column Grid View"
                    className={`flex h-full cursor-pointer items-center justify-center px-2.5 transition-colors ${
                      viewMode === "grid"
                        ? "bg-black text-white"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    title="Full-Width List View"
                    className={`flex h-full cursor-pointer items-center justify-center px-2.5 transition-colors ${
                      viewMode === "list"
                        ? "bg-black text-white"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Counter */}
                <div className="hidden border-l border-neutral-300 pl-3 font-mono text-[10px] font-semibold tracking-widest text-neutral-400 uppercase lg:block">
                  {isLoading
                    ? "SYNCING..."
                    : `${filteredAndSortedPosts.length} ${filteredAndSortedPosts.length === 1 ? "ESSAY" : "ESSAYS"}`}
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Content Display */}
          <section className="min-h-[350px] px-4 py-10 sm:px-8 sm:py-14">
            {filteredAndSortedPosts.length === 0 ? (
              <div className="space-y-3 py-16 text-center">
                <p className="font-sans text-base font-bold tracking-tight text-black uppercase">
                  No Monographs Found
                </p>
                <p className="font-editorial-body text-sm text-neutral-600">
                  No results matching &ldquo;{searchQuery}&rdquo;. Try another search term.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSearchQuery("")}
                    className="cursor-pointer font-mono text-xs font-semibold text-black uppercase underline"
                  >
                    CLEAR SEARCH
                  </button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {filteredAndSortedPosts.map((post, index) => (
                  <BlogGridCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readTime={post.readTime}
                    type={post.type}
                    isLead={index === 0 && !searchQuery}
                    isSecondary={index === 1 && !searchQuery}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full space-y-8 divide-y divide-neutral-200">
                {filteredAndSortedPosts.map((post) => (
                  <BlogListCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readTime={post.readTime}
                    type={post.type}
                  />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Minimal Footer */}
        <Footer
          copyright={PORTFOLIO_DATA.footer.copyright}
          rights={PORTFOLIO_DATA.footer.rights}
          socials={PORTFOLIO_DATA.footer.socials}
        />
      </div>
    </main>
  );
};
