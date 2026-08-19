"use client";

import { useEffect, useRef, useState } from "react";
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
  // Refs for Interactive Golden Curve scroll tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [orbPos, setOrbPos] = useState({ x: 740, y: 310 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Measure path and track scroll smoothly across the entire single canvas
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    setPathLength(totalLength);

    let animationFrameId: number;
    let currentLerp = 0;
    let targetProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Track scroll with responsive lead-in so the line fills ahead of the viewport
      const currentScroll = Math.max(-rect.top, 0);

      // Calculate progress with viewport center bias so line is always filled up to where the user is looking
      const rawProgress = (currentScroll + viewportHeight * 0.35) / rect.height;
      targetProgress = Math.min(Math.max(rawProgress, 0), 1);
    };

    const updateOrb = () => {
      currentLerp += (targetProgress - currentLerp) * 0.28;
      setScrollProgress(currentLerp);

      if (path) {
        const distance = currentLerp * totalLength;
        const point = path.getPointAtLength(distance);
        setOrbPos({ x: point.x, y: point.y });

        // Node proximity detection thresholds
        if (currentLerp > 0.08 && currentLerp < 0.18) {
          setActiveNode(1); // Hero right node
        } else if (currentLerp > 0.28 && currentLerp < 0.4) {
          setActiveNode(2); // Quote bottom node
        } else if (currentLerp > 0.5 && currentLerp < 0.65) {
          setActiveNode(3); // Code badge node
        } else if (currentLerp > 0.75 && currentLerp < 0.88) {
          setActiveNode(4); // Book badge node
        } else {
          setActiveNode(null);
        }
      }

      animationFrameId = requestAnimationFrame(updateOrb);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    animationFrameId = requestAnimationFrame(updateOrb);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
      <BackgroundSpline
        pathRef={pathRef}
        pathLength={pathLength}
        scrollProgress={scrollProgress}
        activeNode={activeNode}
        orbPos={orbPos}
        scrollToSection={scrollToSection}
      />

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
