import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Code2, Palette, BookOpen } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import projectsData from "@/data/projects.json";
import designsData from "@/data/designs.json";
import bookData from "@/data/book.json";

export const metadata: Metadata = {
  title: "Works — Abdullah Al Maksud",
  description:
    "Explore projects, web applications, graphic designs, and books created by Abdullah Al Maksud.",
};

export default function WorkHubPage() {
  const { projects } = projectsData;
  const { designs } = designsData;
  const { book } = bookData;

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

        {/* ========================================================
            PAGE HEADER
        ======================================================== */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Portfolio
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Works &amp; <span className="text-gold">Creations</span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            A curated showcase of software engineering projects, UI/UX systems, brand identities, and published books.
          </p>

          {/* Quick Sub-navigation Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] hover:border-gold dark:hover:border-gold hover:text-gold text-xs font-semibold transition-colors"
            >
              <Code2 size={14} className="text-gold" />
              <span>Projects ({projects.length})</span>
            </a>

            <a
              href="#designs"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] hover:border-gold dark:hover:border-gold hover:text-gold text-xs font-semibold transition-colors"
            >
              <Palette size={14} className="text-gold" />
              <span>Graphic Design ({designs.length})</span>
            </a>

            <a
              href="#books"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] hover:border-gold dark:hover:border-gold hover:text-gold text-xs font-semibold transition-colors"
            >
              <BookOpen size={14} className="text-gold" />
              <span>Books &amp; Publications</span>
            </a>
          </div>
        </header>

        {/* ========================================================
            1. WEB & MOBILE PROJECTS
        ======================================================== */}
        <section id="projects" className="mb-24 space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-dark-border pb-4">
            <div>
              <span className="text-xs font-bold text-gold tracking-widest uppercase">
                Section 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Web &amp; Mobile Applications
              </h2>
            </div>

            <Link
              href="/work/projects"
              className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <span>EXPLORE ALL PROJECTS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="group rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 space-y-5 card-hover-glow transition-all duration-300"
              >
                {/* Image Preview */}
                <div className="relative h-56 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-dark-border">
                  <Image
                    src={project.image || "/images/projects/devtools.jpg"}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-dark-border">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors"
                      >
                        <Github size={14} />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:underline"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            2. GRAPHIC & BRAND DESIGN
        ======================================================== */}
        <section id="designs" className="mb-24 space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-dark-border pb-4">
            <div>
              <span className="text-xs font-bold text-gold tracking-widest uppercase">
                Section 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Visual &amp; Brand Identities
              </h2>
            </div>

            <Link
              href="/work/graphics"
              className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <span>EXPLORE ALL DESIGNS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {designs.map((design) => (
              <div
                key={design.id}
                className="group rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-4 space-y-4 card-hover-glow transition-all duration-300"
              >
                <div className="relative h-72 w-full rounded-xl overflow-hidden bg-slate-950 shadow-md">
                  <Image
                    src={design.coverImage || "/images/designs/byou.jpg"}
                    alt={design.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {design.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                      {design.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {design.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug pt-1">
                    {design.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            3. BOOKS & PUBLICATIONS
        ======================================================== */}
        <section id="books" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-dark-border pb-4">
            <div>
              <span className="text-xs font-bold text-gold tracking-widest uppercase">
                Section 03
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
                Books &amp; Publications
              </h2>
            </div>

            <Link
              href="/work/books"
              className="text-xs font-bold tracking-wider text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors inline-flex items-center gap-1"
            >
              <span>VIEW BOOK DETAILS</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-8 sm:p-12 card-hover-glow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-52 sm:w-60 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-amber-500/20">
                  <Image
                    src={book.cover || "/images/books/emon-jodi-hoto.webp"}
                    alt={book.titleBn}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <span className="text-xs font-bold text-gold tracking-widest uppercase">
                  Published Author • {book.year}
                </span>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {book.titleBn} ({book.titleEn})
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {book.descriptionBn}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2">
                  <span>প্রকাশনী: {book.publisher}</span>
                  <span>•</span>
                  <span>বিভাগ: {book.category}</span>
                  <span>•</span>
                  <span>মূল্য: ৳ {book.price}</span>
                </div>

                <div className="pt-4">
                  <a
                    href={book.rokomariUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-bold text-xs tracking-wider transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <span>BUY ON ROKOMARI</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
