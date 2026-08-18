"use client";

import Link from "next/link";
import { ArrowRight, Terminal, CircleDot, PenLine, Pencil, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import bookData from "@/data/book.json";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ICON_MAP: Record<string, React.ElementType> = {
  terminal: Terminal,
  "circle-dot": CircleDot,
  "pen-line": PenLine,
  pencil: Pencil,
};

export function BookStatsSection() {
  const { book, stats } = bookData;

  const { ref: bookRef, isVisible: bookVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="book" className="max-w-6xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-6">
      {/* Book Card */}
      <div
        ref={bookRef}
        className={`win flex gap-6 p-6 items-center ${
          bookVisible ? "anim-slide-left anim-delay-0" : "anim-hidden"
        }`}
      >
        {/* Book Cover */}
        <div className="w-36 h-full shrink-0 relative overflow-hidden" style={{ boxShadow: "4px 4px 0 0 var(--ink)" }}>
          <div className="w-full h-full bg-orange">
            <Image src={book.cover} alt={book.titleBn} width={24} height={36} content="cover" className="object-cover h-full w-full" unoptimized />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] tracking-widest text-ink/60 dark:text-cream/40 mb-2">/ MY BOOK</p>
          <h3 className="font-pixel text-[15px] leading-6 mb-1">{book.titleBn}</h3>
          <p className="text-[10px] text-ink/50 dark:text-cream/40 mb-1 italic">{book.titleEn}</p>
          <p className="text-[11px] text-orange mb-1">{book.publisher} • {book.year}</p>
          <p className="text-[11px] text-ink/50 dark:text-cream/40 mb-3">{book.category} · {book.ageGroup}</p>
          <p className="text-[12px] text-ink/70 dark:text-cream/60 leading-relaxed mb-4 line-clamp-3">
            {book.descriptionBn}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              className="border-ink dark:border-cream/40 text-ink dark:text-cream hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink rounded-none text-[11px] px-3 py-2 h-auto"
            >
              <a href={book.rokomariUrl} target="_blank" rel="noopener noreferrer">
                রকমারিতে দেখুন <ExternalLink size={10} className="ml-1.5" />
              </a>
            </Button>
            <span className="border border-orange text-orange text-[11px] px-3 py-2 flex items-center">
              ৳{book.price}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        ref={statsRef}
        className="win grid grid-cols-2 divide-x divide-y divide-dashed divide-ink/30 dark:divide-cream/20"
      >
        {stats.map(({ value, label, icon }, i) => {
          const Icon = ICON_MAP[icon] || Terminal;
          const delays = ["anim-delay-0", "anim-delay-1", "anim-delay-2", "anim-delay-3"];
          return (
            <div
              key={label}
              className={`p-6 flex gap-3 items-start group hover:bg-cream-2 dark:hover:bg-ink/50 transition-colors ${
                statsVisible ? `anim-fade-up ${delays[i] ?? "anim-delay-0"}` : "anim-hidden"
              }`}
            >
              <Icon size={22} className="text-green shrink-0 mt-1" />
              <div>
                <p className="font-pixel text-[16px]">{value}</p>
                <p className="text-[12px] text-ink/70 dark:text-cream/60 mt-1 leading-snug">{label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
