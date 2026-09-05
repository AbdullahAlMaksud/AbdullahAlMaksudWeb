"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { Book3DCard } from "@/components/interactive/Book3DCard";
import { getBookBySlug } from "@/data/book-data";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, BookOpen, Quote } from "lucide-react";

interface BookDetailScreenProps {
  slug: string;
}

export const BookDetailScreen: React.FC<BookDetailScreenProps> = ({ slug }) => {
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-black">
      <TopHeader />

      <main className="w-full">
        {/* Editorial Sub-Header Breadcrumb Bar */}
        <div className="border-b border-black/10 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8">
            <Link
              href="/#books"
              className="group flex items-center space-x-2 font-mono text-xs text-neutral-600 transition-colors hover:text-black"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
              <span>RETURN TO OVERVIEW</span>
            </Link>
            <div className="font-mono text-[11px] tracking-widest text-neutral-500 uppercase">
              PUBLICATION // MONOGRAPH SPEC
            </div>
          </div>
        </div>

        {/* Hero Section: 3D Book Showcase & Metadata */}
        <section className="border-b border-black/10 bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Left Column: 3D Interactive Model & Purchase Options */}
              <div className="space-y-6 lg:col-span-5">
                <div className="overflow-hidden border border-neutral-800 shadow-lg">
                  <Book3DCard
                    imageUrl={book.coverImage}
                    imageAlt={book.title}
                    spineTitle={book.title}
                    authorName={book.author}
                    publisherName={book.publisher || "ঐতিহ্য প্রকাশনী"}
                    isbn={book.isbn || "978-984-776-120-4"}
                    className="h-80 sm:h-96 lg:h-[420px]"
                  />
                </div>

                {/* Purchase / Store Buttons */}
                {book.purchaseLinks && book.purchaseLinks.length > 0 && (
                  <div className="space-y-2.5">
                    {book.purchaseLinks.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full"
                      >
                        <Button
                          className={`w-full justify-between py-6 font-mono text-xs font-semibold tracking-wider uppercase ${
                            link.isPrimary
                              ? "bg-black text-white hover:bg-neutral-800"
                              : "border border-black bg-white text-black hover:bg-neutral-100"
                          }`}
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Button>
                      </a>
                    ))}
                  </div>
                )}

                {/* Technical Publication Metadata Grid */}
                <div className="border border-black/10 bg-neutral-50 p-4 font-mono text-xs">
                  <div className="mb-3 border-b border-black/10 pb-2 text-[10px] font-bold tracking-widest text-neutral-500 uppercase">
                    SPECIFICATION // METRICS
                  </div>
                  <dl className="grid grid-cols-2 gap-y-2.5 text-[11px]">
                    <dt className="text-neutral-500">AUTHOR:</dt>
                    <dd className="font-medium text-black">{book.author}</dd>

                    <dt className="text-neutral-500">PUBLISHER:</dt>
                    <dd className="font-medium text-black">{book.publisher || "N/A"}</dd>

                    <dt className="text-neutral-500">YEAR / EDITION:</dt>
                    <dd className="font-medium text-black">
                      {book.publicationYear} ({book.edition})
                    </dd>

                    <dt className="text-neutral-500">LANGUAGE:</dt>
                    <dd className="font-medium text-black">{book.language}</dd>

                    <dt className="text-neutral-500">PAGES:</dt>
                    <dd className="font-medium text-black">{book.pages}</dd>

                    {book.isbn && (
                      <>
                        <dt className="text-neutral-500">ISBN:</dt>
                        <dd className="font-medium text-black">{book.isbn}</dd>
                      </>
                    )}
                  </dl>
                </div>
              </div>

              {/* Right Column: Title, Synopsis, & Themes */}
              <div className="flex flex-col justify-between space-y-8 lg:col-span-7">
                <div className="space-y-6">
                  {/* Category Pill */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="border border-black bg-black px-2.5 py-1 font-mono text-[10px] font-semibold tracking-widest text-white uppercase">
                      {book.category}
                    </span>
                    <span className="border border-neutral-300 bg-neutral-100 px-2.5 py-1 font-mono text-[10px] font-medium tracking-widest text-neutral-700 uppercase">
                      {book.genre}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-3">
                    <h1 className="font-editorial-body text-4xl leading-tight font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl">
                      {book.title}
                    </h1>
                    {book.subtitle && (
                      <p className="font-editorial-body text-lg text-neutral-600 sm:text-xl">
                        {book.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Synopsis */}
                  <div className="space-y-3">
                    <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase">
                      // গ্রন্থ সংক্ষেপ (SYNOPSIS)
                    </h2>
                    <div className="font-editorial-body text-base leading-relaxed whitespace-pre-line text-neutral-800 sm:text-lg">
                      {book.synopsis.trim()}
                    </div>
                  </div>

                  {/* Key Themes List */}
                  {book.themes && book.themes.length > 0 && (
                    <div className="space-y-3 border-t border-black/10 pt-6">
                      <h2 className="font-mono text-xs font-bold tracking-[0.2em] text-neutral-500 uppercase">
                        // মূল থিম ও বিষয়বস্তু (THEMATIC FOUNDATIONS)
                      </h2>
                      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {book.themes.map((theme, index) => (
                          <li
                            key={index}
                            className="font-editorial-body flex items-start space-x-2 border border-black/5 bg-neutral-50 p-2.5 text-sm text-neutral-800"
                          >
                            <span className="font-mono text-xs font-bold text-neutral-400">
                              0{index + 1}.
                            </span>
                            <span>{theme}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quotes & Critical Insights Section */}
        {book.quotes && book.quotes.length > 0 && (
          <section className="border-b border-black/10 bg-neutral-950 py-12 text-white sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
              <div className="mb-8 space-y-2">
                <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
                  EXCERPTS & DIALOGUE
                </span>
                <h2 className="font-editorial-body text-2xl font-bold tracking-tight text-white uppercase sm:text-3xl">
                  বইয়ের বিশেষ পংক্তি ও ভাবনা
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {book.quotes.map((quote, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between border border-white/10 bg-neutral-900/80 p-6"
                  >
                    <Quote className="mb-4 h-6 w-6 text-neutral-500" />
                    <p className="font-editorial-body text-base leading-relaxed text-neutral-200 italic sm:text-lg">
                      &ldquo;{quote}&rdquo;
                    </p>
                    <div className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      — {book.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Narrative Chapters Section */}
        {book.chapters && book.chapters.length > 0 && (
          <section className="border-b border-black/10 bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-8">
              <div className="mb-8 space-y-2">
                <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-500 uppercase">
                  NARRATIVE STRUCTURE
                </span>
                <h2 className="font-editorial-body text-2xl font-bold tracking-tight text-black uppercase sm:text-3xl">
                  গ্রন্থের অধ্যায় ও বিষয়সূচি
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {book.chapters.map((ch) => (
                  <div
                    key={ch.number}
                    className="border border-black/10 bg-neutral-50/70 p-5 transition-colors hover:bg-white"
                  >
                    <div className="mb-2 flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-neutral-400">অধ্যায় {ch.number}</span>
                      <BookOpen className="h-3.5 w-3.5 text-neutral-400" />
                    </div>
                    <h3 className="font-editorial-body mb-2 text-lg font-bold text-black sm:text-xl">
                      {ch.title}
                    </h3>
                    <p className="font-editorial-body text-sm leading-relaxed text-neutral-700">
                      {ch.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Author's Note Section */}
        {book.authorNote && (
          <section className="border-b border-black/10 bg-neutral-100 py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-8">
              <div className="space-y-4 border-l-2 border-black pl-6 sm:pl-8">
                <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                  PREFACE // AUTHOR&apos;S NOTE
                </span>
                <h2 className="font-editorial-body text-2xl font-bold tracking-tight text-black sm:text-3xl">
                  লেখকের কথা
                </h2>
                <div className="font-editorial-body text-base leading-relaxed whitespace-pre-line text-neutral-800 italic sm:text-lg">
                  {book.authorNote.trim()}
                </div>
                <div className="font-mono text-xs font-bold text-black uppercase">
                  — {book.author}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer
        copyright={PORTFOLIO_DATA.footer.copyright}
        rights={PORTFOLIO_DATA.footer.rights}
        socials={PORTFOLIO_DATA.footer.socials}
      />
    </div>
  );
};
