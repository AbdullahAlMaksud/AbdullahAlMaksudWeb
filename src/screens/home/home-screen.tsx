"use client";

import { useRef } from "react";
import { NavBar } from "./components/NavBar";

// Extracted Components
import { BackgroundSpline } from "./components/BackgroundSpline";
import { HeroSection } from "./components/HeroSection";
import { FeaturedProjects } from "./components/FeaturedProjects";
import { BooksSection } from "./components/BooksSection";
import { WritingSection } from "./components/WritingSection";
import { FloatingQuote } from "./components/FloatingQuote";
import { GraphicDesignSection } from "./components/GraphicDesignSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function HomeScreen() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 selection:bg-gold selection:text-black dark:bg-[#07090D] dark:text-white"
    >
      {/* Top Fixed Navigation Bar */}
      <NavBar />

      {/* =========================================================================
          BACKGROUND AMBIENT GLOWS & UNIFIED CONTINUOUS GOLDEN SPLINE
      ========================================================================= */}
      <BackgroundSpline containerRef={containerRef} scrollToSection={scrollToSection} />

      {/* =========================================================================
          PAGE CONTENT: SEAMLESS RESPONSIVE CONTAINER
      ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-7xl space-y-20 px-6 pb-16 pt-28 sm:space-y-28 sm:px-10 sm:pt-32 lg:px-16">
        {/* =======================================================================
            SECTION 1: HERO (LEFT INTRO + CENTER PORTRAIT + RIGHT ABOUT ME)
        ======================================================================= */}
        <HeroSection />

        {/* =======================================================================
            SECTION 2: WORKS GALLERY (HEADER + 2-COLUMN GRID)
        ======================================================================= */}
        <section className="space-y-8 sm:space-y-10">
          {/* WORK GALLERY HEADER */}
          <div className="flex flex-col items-end text-right">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                WORK GALLERY
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Selected <span className="text-gold">Works</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
            {/* -------------------------------------------------------------------
              LEFT COLUMN: 1. FEATURED PROJECT (SWIPER CARDS) -> 2. WRITING -> 3. BOOKS
          ------------------------------------------------------------------- */}
            <div className="space-y-16 lg:col-span-6 lg:space-y-24">
              <FeaturedProjects />
              <WritingSection />
              <BooksSection />
            </div>

            {/* -------------------------------------------------------------------
              RIGHT COLUMN: 1. FLOATING QUOTE -> 2. GRAPHIC DESIGN (3D TILT) -> 3. CONTACT
          ------------------------------------------------------------------- */}
            <div className="space-y-16 lg:col-span-6 lg:space-y-24 lg:pt-32">
              <FloatingQuote />
              <GraphicDesignSection />
              <ContactSection />
            </div>
          </div>
        </section>

        {/* =======================================================================
            SECTION 3: FOOTER (LET'S CONNECT & COPYRIGHT)
        ======================================================================= */}
        <Footer />
      </div>
    </main>
  );
}
