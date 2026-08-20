"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, BookOpen, ShoppingBag } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { useBooksQuery } from "@/services";
import { BookDetailSkeleton } from "@/components/skeletons/SectionSkeletons";
import { getImageUrl } from "@/lib/image";

const DEFAULT_BOOK = {
  titleBn: "এমন যদি হতো",
  titleEn: "Emon Jodi Hoto",
  author: "আব্দুল্লাহ আল মাকসুদ",
  publisher: "জ্ঞানকোষ প্রকাশনী",
  category: "বিজ্ঞান ও প্রযুক্তি",
  ageGroup: "বয়স ১২-১৭",
  price: 344,
  year: 2025,
  rokomariUrl: "https://www.rokomari.com",
  cover: "/images/portrait.png",
  descriptionBn: "কল্পনা আর বিজ্ঞান-এই দুইয়ের মিশেলে জ্ঞান অর্জনের পথ খুলে যায়।",
  descriptionEn:
    "A blend of imagination and physics unlocking curious inquiries about our universe.",
};

export function BookScreen() {
  const { data: serverBooksData, isLoading } = useBooksQuery();

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
        ageGroup: serverBook.ageGroup || DEFAULT_BOOK.ageGroup,
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

  const bookFacts = [
    { label: "CATEGORY", value: book.category },
    { label: "AGE GROUP", value: book.ageGroup },
    { label: "PUBLISHED YEAR", value: String(book.year) },
    { label: "PUBLISHER", value: book.publisher },
  ];

  return (
    <main className="min-h-screen bg-light-bg text-slate-900 transition-colors duration-300 dark:bg-dark-bg dark:text-white">
      <NavBar />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb */}
        <Link
          href="/work"
          className="mb-12 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
        >
          <ArrowLeft size={14} />
          <span>BACK TO WORKS</span>
        </Link>

        {isLoading && !rawBookPayload ? (
          <BookDetailSkeleton />
        ) : (
          <>
            {/* Hero */}
            <div className="mb-20 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="flex justify-center lg:col-span-5">
                <div className="group/book relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-gold/35 via-gold/10 to-transparent opacity-70 blur-2xl transition-opacity group-hover/book:opacity-100" />

                  <div className="relative aspect-[2/3] w-[270px] overflow-hidden rounded-3xl border border-amber-500/25 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.5)] sm:w-[320px]">
                    <Image
                      src={getImageUrl(book.cover)}
                      alt={book.titleBn}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover/book:scale-105"
                      sizes="320px"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">
                    Author &bull; Science &amp; Curiosity
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {book.titleBn}
                </h1>

                <p className="text-sm font-semibold tracking-wider text-gold">{book.titleEn}</p>

                <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {book.descriptionEn || book.descriptionBn}
                </p>

                <div className="flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-light-surface p-4 shadow-sm dark:border-white/10 dark:bg-[#0C1018]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      WRITTEN BY
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {book.author}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={book.rokomariUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-xs font-bold tracking-widest text-slate-950 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gold-light"
                  >
                    <ShoppingBag size={15} />
                    <span>BUY ON ROKOMARI</span>
                    <ArrowUpRight size={15} />
                  </a>

                  <div className="rounded-full border border-slate-300 bg-light-surface px-6 py-4 text-xs font-bold text-slate-800 dark:border-white/15 dark:bg-[#131824] dark:text-slate-200">
                    ৳ {book.price} BDT
                  </div>
                </div>
              </div>
            </div>

            {/* Facts */}
            <div className="mb-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {bookFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="space-y-1 rounded-2xl border border-slate-200 bg-light-surface p-5 shadow-sm dark:border-white/10 dark:bg-[#0C1018]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {fact.label}
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-light-surface via-light-card to-light-surface p-8 shadow-xl dark:border-white/10 dark:from-[#0E131E] dark:via-[#121826] dark:to-[#0A0E17] sm:p-12">
              <span className="select-none font-serif text-4xl text-gold">“</span>
              <blockquote className="max-w-3xl text-xl font-bold leading-relaxed text-slate-900 dark:text-white sm:text-2xl">
                {book.descriptionBn}
              </blockquote>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                — {book.author}
              </p>
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
