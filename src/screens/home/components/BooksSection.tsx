"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useBooksQuery, useHomeQuery } from "@/services";

const DEFAULT_BOOKS_CONFIG = {
  badge: "BOOKS",
  headlineLines: ["Books shape", "mindset and", "change lives."],
  exploreText: "MY BOOK SHELF",
  exploreLink: "/work/books",
};

export function BooksSection() {
  const { data: serverHomeData } = useHomeQuery();
  const { data: serverBooksData } = useBooksQuery();

  const books = serverHomeData?.books || DEFAULT_BOOKS_CONFIG;

  const rawBooksPayload = serverBooksData?.data as any;
  const shelfBooks = Array.isArray(rawBooksPayload?.books)
    ? rawBooksPayload.books
    : Array.isArray(rawBooksPayload)
      ? rawBooksPayload
      : [];

  return (
    <div id="books" className="scroll-mt-28 space-y-6 pt-4 [perspective:1200px]">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {books.badge}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {books.headlineLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx !== books.headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        <Link
          href={books.exploreLink || "/work/books"}
          className="group inline-flex shrink-0 items-center gap-2.5 text-xs font-bold tracking-widest text-slate-600 transition-colors duration-300 hover:text-gold dark:text-slate-300"
        >
          <span>{books.exploreText}</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-gold shadow-[0_0_12px_rgba(229,169,60,0.2)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950">
            <ArrowUpRight size={15} />
          </div>
        </Link>
      </div>

      {/* 3 Standing 3D Books with Floor Reflection */}
      <div className="grid grid-cols-3 gap-3.5 pt-3 sm:gap-5">
        {/* Book 1: Atomic Habits */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-10 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-[#F6F4EE] shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:-translate-y-2 dark:shadow-[0_15px_35px_rgba(0,0,0,0.85)] sm:h-60 sm:rounded-2xl">
            <Image
              src="/images/books/atomic-habits.jpg"
              alt={shelfBooks[0]?.title || "Atomic Habits"}
              fill
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
          </div>

          <div className="pointer-events-none z-10 -mt-1 h-2.5 w-4/5 rounded-full bg-black/90 blur-[4px]" />

          <div
            className="pointer-events-none relative -mt-1 h-16 w-full scale-y-[-1] overflow-hidden opacity-30 blur-[2.5px] sm:h-24"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
            }}
          >
            <Image src="/images/books/atomic-habits.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#07090D] dark:via-[#07090D]/80" />
          </div>
        </div>

        {/* Book 2: Deep Work */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-10 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-[#F59E0B] shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:-translate-y-2 dark:shadow-[0_15px_35px_rgba(0,0,0,0.85)] sm:h-60 sm:rounded-2xl">
            <Image
              src="/images/books/deep-work.jpg"
              alt={shelfBooks[1]?.title || "Deep Work"}
              fill
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
          </div>

          <div className="pointer-events-none z-10 -mt-1 h-2.5 w-4/5 rounded-full bg-black/90 blur-[4px]" />

          <div
            className="pointer-events-none relative -mt-1 h-16 w-full scale-y-[-1] overflow-hidden opacity-30 blur-[2.5px] sm:h-24"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
            }}
          >
            <Image src="/images/books/deep-work.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#07090D] dark:via-[#07090D]/80" />
          </div>
        </div>

        {/* Book 3: Almanack of Naval Ravikant */}
        <div className="group relative flex flex-col items-center">
          <div className="relative z-10 flex h-44 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/15 bg-[#E8EAEF] p-3 text-slate-800 shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:-translate-y-2 dark:shadow-[0_15px_35px_rgba(0,0,0,0.85)] sm:h-60 sm:rounded-2xl sm:p-4">
            <div className="space-y-1.5">
              <span className="block text-[7px] font-bold uppercase tracking-widest text-slate-400 sm:text-[8px]">
                Timeless Wisdom
              </span>
              <h4 className="pt-0.5 text-[9px] font-bold tracking-wider text-slate-500 sm:text-[10px]">
                THE
              </h4>
              <h4 className="text-xs font-black leading-tight tracking-tight text-slate-900 sm:text-base">
                ALMANACK
                <br />
                OF NAVAL
                <br />
                RAVIKANT
              </h4>
            </div>
            <div className="border-t border-slate-300 pt-2">
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-600 sm:text-[9px]">
                {shelfBooks[2]?.author || "Eric Jorgenson"}
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20" />
          </div>

          <div className="pointer-events-none z-10 -mt-1 h-2.5 w-4/5 rounded-full bg-black/90 blur-[4px]" />

          <div
            className="pointer-events-none relative -mt-1 h-16 w-full scale-y-[-1] overflow-hidden rounded-b-xl bg-[#E8EAEF] p-3 opacity-30 blur-[2.5px] sm:h-24"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
            }}
          >
            <div className="text-[8px] font-bold text-slate-700">THE ALMANACK</div>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-[#07090D] dark:via-[#07090D]/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
