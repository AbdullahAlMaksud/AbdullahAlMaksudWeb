"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import bookData from "@/data/book.json";

export function BooksSection() {
  const books = bookData.books;

  return (
    <section id="books" className="relative py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ========================================================
              LEFT COLUMN: SECTION TITLE & CTA
          ======================================================== */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
                BOOKS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Books shape
              <br />
              mindset and
              <br />
              change lives.
            </h2>

            <div className="pt-2">
              <Link
                href="/work/books"
                className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-slate-700 dark:text-slate-300 hover:text-gold dark:hover:text-gold transition-colors duration-300 group"
              >
                <span>MY BOOK SHELF</span>
                <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: 3 STANDING BOOK COVERS SHOWCASE
          ======================================================== */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            
            {/* 1. Atomic Habits */}
            <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 card-hover-glow space-y-4">
              <div className="relative h-64 w-full rounded-xl bg-[#F6F4EE] border border-amber-200/50 shadow-md p-5 flex flex-col justify-between text-slate-800 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Tiny Changes, Remarkable Results
                  </span>
                  <h4 className="text-2xl font-black tracking-tight text-slate-900 leading-none pt-2">
                    Atomic
                    <br />
                    <span className="text-amber-700">Habits</span>
                  </h4>
                </div>

                <div className="pt-4 border-t border-slate-300/40">
                  <p className="text-xs font-semibold text-slate-700">
                    James Clear
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Atomic Habits
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Habits &amp; Systems
                </p>
              </div>
            </div>

            {/* 2. DEEP WORK */}
            <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 card-hover-glow space-y-4">
              <div className="relative h-64 w-full rounded-xl bg-[#F59E0B] border border-amber-600/30 shadow-md p-5 flex flex-col justify-between text-slate-950 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900/80">
                    Rules for Focused Success
                  </span>
                  <h4 className="text-2xl font-black tracking-tighter text-slate-950 leading-tight pt-2">
                    DEEP
                    <br />
                    WORK
                  </h4>
                </div>

                <div className="pt-4 border-t border-slate-950/20">
                  <p className="text-xs font-extrabold text-slate-950">
                    Cal Newport
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Deep Work
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Focus &amp; Flow
                </p>
              </div>
            </div>

            {/* 3. The Almanack of Naval Ravikant */}
            <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 card-hover-glow space-y-4">
              <div className="relative h-64 w-full rounded-xl bg-[#FAFAFC] border border-slate-200 shadow-md p-5 flex flex-col justify-between text-slate-800 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    A Guide to Wealth &amp; Happiness
                  </span>
                  <h4 className="text-sm font-bold tracking-wider text-slate-500 pt-1">
                    THE
                  </h4>
                  <h4 className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                    ALMANACK
                    <br />
                    OF NAVAL
                    <br />
                    RAVIKANT
                  </h4>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-600">
                    Eric Jorgenson
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Naval Ravikant
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Wealth &amp; Wisdom
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
