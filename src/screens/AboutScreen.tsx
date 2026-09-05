import Link from "next/link";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ArrowUpRight, Mail, Layers, BookMarked, Code } from "lucide-react";

export const AboutScreen = () => {
  return (
    <main className="flex min-h-screen w-full justify-center bg-neutral-100 px-0 py-0 sm:px-4 sm:py-6 md:px-8 lg:py-10">
      <div className="flex w-full max-w-[1240px] flex-col justify-between overflow-hidden border-0 bg-white shadow-2xl sm:border sm:border-black">
        <div>
          {/* Top Folio Strip */}
          <TopHeader badge="PORTFOLIO // BIOGRAPHY" issue="ISSUE 01" folio="FOLIO 004" />

          {/* Navigation Bar */}
          <div className="flex items-center justify-between border-b border-black px-4 py-5 sm:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-black uppercase transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              BACK TO HOME
            </Link>

            <nav className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
              <Link href="/about" className="border-b border-black pb-0.5 font-bold text-black">
                ABOUT
              </Link>
              <Link href="/blog" className="transition-opacity hover:opacity-60">
                BLOG
              </Link>
              <Link href="/contact" className="transition-opacity hover:opacity-60">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* About Hero Profile Section */}
          <section className="border-b border-black px-4 py-10 sm:px-8 sm:py-16">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left Column: Big Headline & Role */}
              <div className="space-y-4 lg:col-span-6">
                <div className="flex items-center space-x-2 font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-600 uppercase">
                  <span className="inline-block h-2 w-2 rounded-full bg-black" />
                  <span>BIOGRAPHY & CURRICULUM VITAE</span>
                </div>

                <h1 className="font-sans text-3xl leading-[0.95] font-extrabold tracking-tight text-black uppercase sm:text-4xl lg:text-5xl">
                  ABDULLAH
                  <br />
                  AL MAKSUD
                </h1>

                <p className="pt-1 font-mono text-xs font-semibold tracking-[0.2em] text-neutral-800 uppercase sm:text-sm">
                  FRONTEND ENGINEER // WRITING · TRANSLATION · DESIGN
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a href="/CV-of-Abdullah-Al-Maksud.pdf" download="CV-of-Abdullah-Al-Maksud.pdf">
                    <Button
                      variant="default"
                      className="flex items-center gap-2 font-mono text-xs uppercase"
                    >
                      <Download className="h-3.5 w-3.5" />
                      DOWNLOAD RESUME / CV (PDF)
                    </Button>
                  </a>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 font-mono text-xs uppercase"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      CONNECT
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Narrative Biography */}
              <div className="space-y-4 pt-1 lg:col-span-6">
                <p className="font-editorial-body border-l-2 border-black bg-neutral-50/70 py-1 pl-5 text-base leading-relaxed text-neutral-800 sm:text-lg">
                  I am a frontend engineer focused on building robust, high-performance web systems
                  with React, Next.js, and TypeScript. Alongside engineering, I actively pursue
                  literary translation, essay writing, and interface design — exploring each craft
                  with curiosity and care.
                </p>
                <p className="font-editorial-body text-sm leading-relaxed text-neutral-700 sm:text-base">
                  Whether architecting complex frontend state, translating books between English and
                  Bengali, or designing clean typography, I value clarity, precision, and
                  simplicity.
                </p>
              </div>
            </div>
          </section>

          {/* 3 Core Disciplines */}
          <section className="border-b border-black px-4 py-12 sm:px-8 sm:py-16">
            <div className="mb-10 space-y-3">
              <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase">
                DISCIPLINES & INTERESTS
              </span>
              <h2 className="font-sans text-2xl font-extrabold tracking-tight text-black uppercase sm:text-3xl">
                CORE PURSUITS & PRACTICE
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
              {/* Pillar 1 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 font-mono text-xs font-bold text-black">
                  <Code className="h-4 w-4" />
                  <span>// 01 FRONTEND ENGINEERING</span>
                </div>
                <h3 className="font-sans text-base font-bold text-black">
                  Web Systems & Architecture
                </h3>
                <p className="font-editorial-body text-sm leading-relaxed text-neutral-700">
                  Developing fast, deterministic user interfaces and resilient client-side
                  architecture using React, Next.js, and modern TypeScript toolchains.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 font-mono text-xs font-bold text-black">
                  <BookMarked className="h-4 w-4" />
                  <span>// 02 WRITING & TRANSLATION</span>
                </div>
                <h3 className="font-sans text-base font-bold text-black">
                  Literary & Technical Translation
                </h3>
                <p className="font-editorial-body text-sm leading-relaxed text-neutral-700">
                  Translating philosophy, literature, and technical monographs between English and
                  Bengali, preserving nuances, tone, and contextual depth.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 font-mono text-xs font-bold text-black">
                  <Layers className="h-4 w-4" />
                  <span>// 03 INTERFACE & TYPOGRAPHY</span>
                </div>
                <h3 className="font-sans text-base font-bold text-black">
                  Editorial Design Systems
                </h3>
                <p className="font-editorial-body text-sm leading-relaxed text-neutral-700">
                  Designing minimalist layouts, balanced typography, and structured design token
                  hierarchies inspired by classic print monographs.
                </p>
              </div>
            </div>
          </section>

          {/* Principles / Manifesto */}
          <section className="px-4 py-12 sm:px-8 sm:py-16">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="space-y-2 lg:col-span-4">
                <span className="font-mono text-[11px] font-semibold tracking-widest text-neutral-500 uppercase">
                  PERSPECTIVE
                </span>
                <h2 className="font-sans text-2xl font-extrabold tracking-tight text-black uppercase sm:text-3xl">
                  CORE PRINCIPLES
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
                <div className="space-y-1.5">
                  <h4 className="font-sans text-sm font-bold text-black uppercase">
                    1. Deterministic Code
                  </h4>
                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-700 sm:text-sm">
                    Emphasizing unidirectional data flow, predictable states, and clear boundaries
                    across UI components.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-sans text-sm font-bold text-black uppercase">
                    2. Editorial Restraint
                  </h4>
                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-700 sm:text-sm">
                    Prioritizing clarity, typography, and purposeful whitespace over superficial
                    ornament.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-sans text-sm font-bold text-black uppercase">
                    3. Performance & Craft
                  </h4>
                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-700 sm:text-sm">
                    Crafting smooth, responsive experiences with minimal runtime overhead and fast
                    load times.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-sans text-sm font-bold text-black uppercase">
                    4. Linguistic Care
                  </h4>
                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-700 sm:text-sm">
                    Treating language and translation with rigor, honoring the music and structure
                    of every sentence.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <Footer
          copyright={PORTFOLIO_DATA.footer.copyright}
          rights={PORTFOLIO_DATA.footer.rights}
          socials={PORTFOLIO_DATA.footer.socials}
        />
      </div>
    </main>
  );
};
