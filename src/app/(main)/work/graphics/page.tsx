import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Palette } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import designsData from "@/data/designs.json";

export const metadata: Metadata = {
  title: "Graphic Design — Abdullah Al Maksud",
  description: "Brand identities, posters, and visual communication design by Abdullah Al Maksud.",
};

export default function GraphicDesignsPage() {
  const { designs } = designsData;

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

        {/* Header */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Visual Communication
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Graphic &amp; <span className="text-gold">Brand Design</span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Visual identities, logo systems, and typographic posters crafted to communicate clearly and inspire emotionally.
          </p>
        </header>

        {/* Designs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((design) => (
            <div
              key={design.id}
              className="group rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-4 space-y-4 card-hover-glow transition-all duration-300"
            >
              {/* Artwork Showcase */}
              <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden bg-slate-950 shadow-md">
                <Image
                  src={design.coverImage || "/images/designs/byou.jpg"}
                  alt={design.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="space-y-2 px-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {design.title}
                  </h3>
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">
                    {design.year}
                  </span>
                </div>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {design.subtitle}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {design.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {design.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] text-slate-600 dark:text-slate-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
