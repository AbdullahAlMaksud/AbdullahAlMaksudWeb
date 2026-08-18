import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, BookOpen, Calendar, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import bookData from "@/data/book.json";

export const metadata: Metadata = {
  title: "Books — Abdullah Al Maksud",
  description: "Books and publications by author Abdullah Al Maksud.",
};

export default function BookPage() {
  const { book } = bookData;

  const bookFacts = [
    { label: "CATEGORY", value: book.category },
    { label: "AGE GROUP", value: book.ageGroup },
    { label: "PUBLISHED", value: String(book.year) },
    { label: "PUBLISHER", value: book.publisher },
  ];

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          <span>BACK TO WORKS</span>
        </Link>

        {/* ========================================================
            HERO: 3D BOOK & INFORMATION
        ======================================================== */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: Book Cover */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold/30 via-transparent to-gold/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="relative w-[260px] sm:w-[300px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-300 dark:border-dark-border bg-slate-950">
                <Image
                  src={book.cover || "/images/books/emon-jodi-hoto.webp"}
                  alt={book.titleBn}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="300px"
                />
              </div>
            </div>
          </div>

          {/* Right: Book Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                Author &bull; Science &amp; Curiosity
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {book.titleBn}
            </h1>

            <p className="text-sm font-semibold tracking-wider text-gold">
              {book.titleEn}
            </p>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {book.descriptionBn}
            </p>

            {/* Author Credit */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] max-w-md">
              <div className="w-10 h-10 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0">
                <BookOpen size={18} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  WRITTEN BY
                </p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {book.author}
                </p>
              </div>
            </div>

            {/* Price & Buy CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={book.rokomariUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-bold text-xs tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
              >
                <span>BUY ON ROKOMARI</span>
                <ArrowUpRight size={16} />
              </a>

              <div className="px-6 py-3.5 rounded-full border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#131824] text-xs font-bold text-slate-800 dark:text-slate-200">
                ৳ {book.price} BDT
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            FACTS STRIP
        ======================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {bookFacts.map((fact) => (
            <div
              key={fact.label}
              className="p-5 rounded-2xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] space-y-1"
            >
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                {fact.label}
              </p>
              <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {fact.value}
              </p>
            </div>
          ))}
        </div>

        {/* ========================================================
            AUTHOR QUOTE
        ======================================================== */}
        <div className="rounded-3xl border border-slate-300 dark:border-dark-border bg-gradient-to-br from-light-surface via-light-card to-light-surface dark:from-[#0E131E] dark:via-[#121826] dark:to-[#0A0E17] p-8 sm:p-12 shadow-xl space-y-6">
          <span className="text-4xl text-gold font-serif select-none">“</span>
          <blockquote className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed max-w-3xl">
            প্রশ্ন করতে শেখা, আর সেই প্রশ্নের উত্তর খুঁজতে চাওয়াই হয়তো জ্ঞান অর্জনের সবচেয়ে সুন্দর পথ।
          </blockquote>
          <p className="text-xs font-semibold tracking-widest text-gold uppercase">
            — {book.author}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}