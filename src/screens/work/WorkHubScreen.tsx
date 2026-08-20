"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Code2, Palette, BookOpen } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { AppProjectCard } from "@/components/cards/AppProjectCard";
import { GraphicDesignCard } from "@/components/cards/GraphicDesignCard";
import { BookShowcaseCard } from "@/components/cards/BookShowcaseCard";
import { ProjectCardSkeleton, GraphicCardSkeleton } from "@/components/skeletons/CardSkeletons";
import { useProjectsQuery, useBooksQuery, useDesignsQuery } from "@/services";

const DEFAULT_BOOK = {
  titleBn: "এমন যদি হতো",
  titleEn: "Emon Jodi Hoto",
  author: "আব্দুল্লাহ আল মাকসুদ",
  publisher: "জ্ঞানকোষ প্রকাশনী",
  category: "বিজ্ঞান ও প্রযুক্তি",
  price: 344,
  year: 2025,
  rokomariUrl: "https://www.rokomari.com",
  cover: "/images/portrait.png",
  descriptionBn: "কল্পনা আর বিজ্ঞান-এই দুইয়ের মিশেলে জ্ঞান অর্জনের পথ খুলে যায়।",
  descriptionEn:
    "A blend of imagination and physics unlocking curious inquiries about our universe.",
};

export function WorkHubScreen() {
  const { data: serverProjects, isLoading: isProjectsLoading } = useProjectsQuery();
  const { data: serverBooksData, isLoading: isBooksLoading } = useBooksQuery();
  const { data: serverDesigns, isLoading: isDesignsLoading } = useDesignsQuery();

  const rawProjects = Array.isArray(serverProjects) ? serverProjects : [];

  const projects = rawProjects.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    image: p.coverImage || p.image || "/images/portrait.png",
    tags: p.stack || p.tags || [],
    year: p.year || "2025",
    link: p.liveLink || p.link,
    github: p.gitRepo || p.github,
    category: p.tag || p.category || "Web Application",
    featured: p.isFeatured || p.featured,
  }));

  const designs = Array.isArray(serverDesigns) ? serverDesigns : [];

  const rawBookPayload = serverBooksData?.data as any;
  const serverBook =
    rawBookPayload?.book || (Array.isArray(rawBookPayload) ? rawBookPayload[0] : undefined);

  const book = serverBook
    ? {
        titleBn: serverBook.titleBn || serverBook.title || DEFAULT_BOOK.titleBn,
        titleEn: serverBook.titleEn || serverBook.title || DEFAULT_BOOK.titleEn,
        author: serverBook.author || DEFAULT_BOOK.author,
        publisher: serverBook.publisher || DEFAULT_BOOK.publisher,
        category: serverBook.category || serverBook.genre || DEFAULT_BOOK.category,
        price: serverBook.price || DEFAULT_BOOK.price,
        year: serverBook.year || DEFAULT_BOOK.year,
        rokomariUrl: serverBook.rokomariUrl || serverBook.purchaseLink || DEFAULT_BOOK.rokomariUrl,
        cover: serverBook.coverImage || serverBook.cover || DEFAULT_BOOK.cover,
        descriptionBn:
          serverBook.descriptionBn || serverBook.description || DEFAULT_BOOK.descriptionBn,
        descriptionEn:
          serverBook.descriptionEn || serverBook.description || DEFAULT_BOOK.descriptionEn,
      }
    : DEFAULT_BOOK;

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

        {/* Page Header */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Portfolio
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Works &amp; <span className="text-gold">Creations</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A curated showcase of software applications, brand identities, and published literary
            works crafted with precision and purpose.
          </p>

          {/* Quick Sub-navigation Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-light-surface px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-[#0C1018] dark:hover:border-gold"
            >
              <Code2 size={14} className="text-gold" />
              <span>Applications ({projects.length})</span>
            </a>

            <a
              href="#designs"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-light-surface px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-[#0C1018] dark:hover:border-gold"
            >
              <Palette size={14} className="text-gold" />
              <span>Graphic Design ({designs.length})</span>
            </a>

            <a
              href="#books"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-light-surface px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-[#0C1018] dark:hover:border-gold"
            >
              <BookOpen size={14} className="text-gold" />
              <span>Books &amp; Publications</span>
            </a>
          </div>
        </header>

        {/* 1. Applications Section */}
        <section id="projects" className="mb-24 scroll-mt-28 space-y-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-white/10 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Section 01
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                Web &amp; Mobile Applications
              </h2>
            </div>

            <Link
              href="/work/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
            >
              <span>EXPLORE ALL APPLICATIONS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {isProjectsLoading && projects.length === 0
              ? Array.from({ length: 2 }).map((_, i) => <ProjectCardSkeleton key={i} />)
              : projects.map((project) => <AppProjectCard key={project.slug} {...project} />)}
          </div>
        </section>

        {/* 2. Graphic Design Section */}
        <section id="designs" className="mb-24 scroll-mt-28 space-y-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-white/10 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Section 02
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                Visual &amp; Brand Identities
              </h2>
            </div>

            <Link
              href="/work/graphics"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
            >
              <span>EXPLORE ALL DESIGNS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {isDesignsLoading && designs.length === 0
              ? Array.from({ length: 3 }).map((_, i) => <GraphicCardSkeleton key={i} />)
              : designs.map((design: any) => <GraphicDesignCard key={design.id} {...design} />)}
          </div>
        </section>

        {/* 3. Books Section */}
        <section id="books" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-white/10 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Section 03
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                Books &amp; Publications
              </h2>
            </div>

            <Link
              href="/work/books"
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
            >
              <span>VIEW FULL BOOK DETAILS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <BookShowcaseCard {...book} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
