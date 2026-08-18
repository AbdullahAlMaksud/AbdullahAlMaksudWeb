"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Mail, Code2, BookOpen, Sparkles } from "lucide-react";
import projectsData from "@/data/projects.json";
import designsData from "@/data/designs.json";
import blogsData from "@/data/blogs.json";

export function DashboardGrid() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const projects = projectsData.projects;
  const currentProject = projects[activeProjectIndex] || projects[0];

  const designs = designsData.designs;
  const blogs = blogsData.blogs;

  // Refs for Interactive Golden Curve scroll tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [orbPos, setOrbPos] = useState({ x: 860, y: 20 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Measure path and track scroll
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

      // Calculate progress relative to viewport center
      const start = viewportHeight * 0.7;
      const totalScrollable = rect.height + viewportHeight * 0.2;
      const currentScroll = start - rect.top;

      targetProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
    };

    const updateOrb = () => {
      // Smooth linear interpolation (lerp) for organic movement
      currentLerp += (targetProgress - currentLerp) * 0.12;
      setScrollProgress(currentLerp);

      if (path) {
        const distance = currentLerp * totalLength;
        const point = path.getPointAtLength(distance);
        setOrbPos({ x: point.x, y: point.y });

        // Node detection thresholds along path
        if (currentLerp > 0.15 && currentLerp < 0.25) {
          setActiveNode(1);
        } else if (currentLerp > 0.32 && currentLerp < 0.44) {
          setActiveNode(2);
        } else if (currentLerp > 0.50 && currentLerp < 0.62) {
          setActiveNode(3);
        } else if (currentLerp > 0.72 && currentLerp < 0.82) {
          setActiveNode(4);
        } else if (currentLerp > 0.90) {
          setActiveNode(5);
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
    <div ref={containerRef} className="relative py-8 lg:py-16 overflow-hidden">
      {/* =========================================================================
          INTERACTIVE SCROLL-REACTIVE GOLDEN FLOWING LINE & RIDER ORB (MATCHING IMAGE 2)
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 1800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Subtle Gradient */}
            <linearGradient id="goldCurveBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#E5A93C" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C89028" stopOpacity="0.25" />
            </linearGradient>

            {/* Glowing Active Energy Beam Gradient */}
            <linearGradient id="goldCurveActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3BA42" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#E5A93C" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFF" stopOpacity="1" />
            </linearGradient>

            {/* Intense Node Glow */}
            <filter id="superGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <radialGradient id="orbCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="30%" stopColor="#F3BA42" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#E5A93C" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="nodePulseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F3BA42" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#E5A93C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Base Subtle Path Guide */}
          <path
            d="M 860 20
               C 860 140, 720 220, 680 340
               C 640 440, 780 500, 750 630
               C 720 760, 480 840, 440 960
               C 400 1080, 520 1200, 680 1260
               C 820 1320, 940 1400, 920 1560"
            stroke="url(#goldCurveBaseGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60 dark:opacity-80"
          />

          {/* 2. Primary SVG Reference Path (Measured in JS) */}
          <path
            ref={pathRef}
            d="M 860 20
               C 860 140, 720 220, 680 340
               C 640 440, 780 500, 750 630
               C 720 760, 480 840, 440 960
               C 400 1080, 520 1200, 680 1260
               C 820 1320, 940 1400, 920 1560"
            stroke="url(#goldCurveActiveGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#superGlow)"
            style={{
              strokeDasharray: pathLength || 2000,
              strokeDashoffset: (pathLength || 2000) * (1 - scrollProgress),
              transition: "stroke-dashoffset 0.05s linear",
            }}
          />

          {/* =========================================================
              STATIC ANCHOR NODES WITH DYNAMIC GLOW ON PROXIMITY
          ========================================================= */}
          {/* Node 1: Top Origin Near Hero */}
          <circle cx="860" cy="180" r="5" fill="#F3BA42" />
          <circle
            cx="860"
            cy="180"
            r={activeNode === 1 ? 22 : 12}
            fill="url(#nodePulseGrad)"
            className="transition-all duration-300"
          />

          {/* Node 2: Middle Center Near Quote */}
          <circle cx="680" cy="340" r="5" fill="#F3BA42" />
          <circle
            cx="680"
            cy="340"
            r={activeNode === 2 ? 24 : 14}
            fill="url(#nodePulseGrad)"
            className="transition-all duration-300"
          />

          {/* Node 3: Center Badge Node */}
          <circle cx="750" cy="630" r="6" fill="#F3BA42" />
          <circle
            cx="750"
            cy="630"
            r={activeNode === 3 ? 26 : 16}
            fill="url(#nodePulseGrad)"
            className="transition-all duration-300"
          />

          {/* Node 4: Lower Swirl Near Books */}
          <circle cx="440" cy="960" r="5" fill="#F3BA42" />
          <circle
            cx="440"
            cy="960"
            r={activeNode === 4 ? 24 : 14}
            fill="url(#nodePulseGrad)"
            className="transition-all duration-300"
          />

          {/* Node 5: Bottom Loop Near Contact */}
          <circle cx="680" cy="1260" r="6" fill="#F3BA42" />
          <circle
            cx="680"
            cy="1260"
            r={activeNode === 5 ? 26 : 16}
            fill="url(#nodePulseGrad)"
            className="transition-all duration-300"
          />

          {/* =========================================================
              THE SCROLL-RIDER GLOWING ORB (Travels precisely along the curve!)
          ========================================================= */}
          {/* Outer Pulsing Aura */}
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="32"
            fill="url(#orbCoreGlow)"
            opacity="0.85"
            className="animate-pulse"
          />

          {/* Middle Glowing Halo */}
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="16"
            fill="url(#orbCoreGlow)"
            opacity="0.95"
            filter="url(#superGlow)"
          />

          {/* Vibrant Golden Core */}
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="7"
            fill="#F3BA42"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />

          {/* White Hot Center Pixel */}
          <circle cx={orbPos.x} cy={orbPos.y} r="3" fill="#FFFFFF" />
        </svg>

        {/* Floating Interactive Badge: Code icon Node on line */}
        <button
          onClick={() => scrollToSection("works")}
          className={`absolute top-[610px] left-[52%] -translate-x-1/2 w-10 h-10 rounded-full border bg-dark-bg/90 backdrop-blur-md flex items-center justify-center text-gold z-20 pointer-events-auto transition-all duration-300 hover:scale-125 ${
            activeNode === 3
              ? "border-gold shadow-[0_0_25px_rgba(229,169,60,0.8)] scale-110"
              : "border-gold/60 shadow-[0_0_15px_rgba(229,169,60,0.35)]"
          }`}
          title="Explore Code & Works"
          aria-label="Scroll to Works"
        >
          <Code2 size={18} />
        </button>

        {/* Floating Interactive Badge: Book icon Node on line */}
        <button
          onClick={() => scrollToSection("books")}
          className={`absolute top-[1240px] left-[47%] -translate-x-1/2 w-10 h-10 rounded-full border bg-dark-bg/90 backdrop-blur-md flex items-center justify-center text-gold z-20 pointer-events-auto transition-all duration-300 hover:scale-125 ${
            activeNode === 5
              ? "border-gold shadow-[0_0_25px_rgba(229,169,60,0.8)] scale-110"
              : "border-gold/60 shadow-[0_0_15px_rgba(229,169,60,0.35)]"
          }`}
          title="Explore Books & Mindset"
          aria-label="Scroll to Books"
        >
          <BookOpen size={18} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* =========================================================================
            MAIN 2-COLUMN ASYNCHRONOUS DASHBOARD GRID (MATCHING IMAGE 2)
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          {/* =======================================================================
              LEFT COLUMN: 1. FEATURED PROJECT -> 2. WRITING -> 3. BOOKS
          ======================================================================= */}
          <div className="lg:col-span-6 space-y-16 lg:space-y-24">
            
            {/* -------------------------------------------------------------
                1. FEATURED PROJECT (LEFT TOP)
            ------------------------------------------------------------- */}
            <div id="works" className="space-y-5 scroll-mt-28">
              {/* Section Header */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                  Featured Project
                </span>
              </div>

              {/* Project Card */}
              <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-5 sm:p-7 shadow-2xl transition-all duration-300 card-hover-glow space-y-5">
                {/* Project Interface Mockup Screenshot */}
                <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-950 flex items-center justify-center shadow-inner">
                  <Image
                    src={currentProject.image || "/images/projects/devtools.jpg"}
                    alt={currentProject.title}
                    fill
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Project Details */}
                <div className="flex items-start justify-between gap-4 pt-1">
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 max-w-md">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* External Link Arrow Button */}
                  <Link
                    href={currentProject.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-all duration-300 shrink-0 shadow-sm"
                    aria-label={`View ${currentProject.title}`}
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Carousel Pagination Dots & View All Link */}
              <div className="flex items-center justify-between pt-1 px-1">
                <div className="flex items-center gap-2">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveProjectIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === activeProjectIndex
                          ? "w-7 bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]"
                          : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-gold/60"
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <Link
                  href="/work/projects"
                  className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors uppercase"
                >
                  View All Projects
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------------
                2. WRITING (LEFT MIDDLE)
            ------------------------------------------------------------- */}
            <div id="writing" className="space-y-6 pt-4 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                      Writing
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Thoughts that inspire
                    <br />
                    and create impact.
                  </h2>
                </div>

                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 hover:text-gold dark:hover:text-gold transition-colors duration-300 group shrink-0"
                >
                  <span>READ WRITINGS</span>
                  <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>

              {/* 3 Bengali Post Rows */}
              <div className="space-y-3 pt-2">
                {blogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group relative block rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-5 transition-all duration-300 hover:border-gold/60 card-hover-glow"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-gold transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                          {blog.publishedAt}
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-full border border-slate-200 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-all duration-300 shrink-0">
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------
                3. BOOKS (LEFT BOTTOM)
            ------------------------------------------------------------- */}
            <div id="books" className="space-y-6 pt-4 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                      Books
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                    Books shape mindset
                    <br />
                    and change lives.
                  </h2>
                </div>

                <Link
                  href="/work/books"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 hover:text-gold dark:hover:text-gold transition-colors duration-300 group shrink-0"
                >
                  <span>MY BOOK SHELF</span>
                  <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>

              {/* 3 Standing Book Covers */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {/* 1. Atomic Habits */}
                <div className="group relative rounded-xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-3 card-hover-glow flex flex-col justify-between">
                  <div className="relative h-48 sm:h-56 w-full rounded-lg overflow-hidden bg-[#F6F4EE] border border-amber-200/50 shadow-md group-hover:-translate-y-2 transition-transform duration-300">
                    <Image
                      src="/images/books/atomic-habits.jpg"
                      alt="Atomic Habits"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="pt-3 text-center">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      Atomic Habits
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      James Clear
                    </p>
                  </div>
                </div>

                {/* 2. DEEP WORK */}
                <div className="group relative rounded-xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-3 card-hover-glow flex flex-col justify-between">
                  <div className="relative h-48 sm:h-56 w-full rounded-lg overflow-hidden bg-[#F59E0B] border border-amber-600/30 shadow-md group-hover:-translate-y-2 transition-transform duration-300">
                    <Image
                      src="/images/books/deep-work.jpg"
                      alt="Deep Work"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="pt-3 text-center">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      Deep Work
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      Cal Newport
                    </p>
                  </div>
                </div>

                {/* 3. The Almanack of Naval Ravikant */}
                <div className="group relative rounded-xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-3 card-hover-glow flex flex-col justify-between">
                  <div className="relative h-48 sm:h-56 w-full rounded-lg bg-[#FAFAFC] border border-slate-200 shadow-md p-3.5 flex flex-col justify-between text-slate-800 group-hover:-translate-y-2 transition-transform duration-300">
                    <div className="space-y-1">
                      <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400 block">
                        Wealth &amp; Happiness
                      </span>
                      <h4 className="text-[10px] font-bold tracking-wider text-slate-500 pt-0.5">
                        THE
                      </h4>
                      <h4 className="text-xs sm:text-sm font-black tracking-tight text-slate-900 leading-tight">
                        ALMANACK
                        <br />
                        OF NAVAL
                        <br />
                        RAVIKANT
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <p className="text-[9px] font-semibold text-slate-600 truncate">
                        Eric Jorgenson
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 text-center">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      Naval Ravikant
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      Eric Jorgenson
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* =======================================================================
              RIGHT COLUMN: 1. FLOATING QUOTE -> 2. GRAPHIC DESIGN -> 3. CONTACT CARD
          ======================================================================= */}
          <div className="lg:col-span-6 space-y-16 lg:space-y-24">
            
            {/* -------------------------------------------------------------
                1. FLOATING QUOTE (CENTER-RIGHT ACCENT)
            ------------------------------------------------------------- */}
            <div className="relative pl-6 lg:pl-10 space-y-4 max-w-md pt-4">
              <span className="text-4xl sm:text-5xl text-gold font-serif leading-none select-none opacity-80">
                “
              </span>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                I turn
                <br />
                ideas into
                <br />
                <span className="text-gold">impactful</span>
                <br />
                solutions.
              </p>
              <span className="text-4xl sm:text-5xl text-gold font-serif leading-none select-none opacity-80 block text-right max-w-xs">
                ”
              </span>
            </div>

            {/* -------------------------------------------------------------
                2. GRAPHIC DESIGN (RIGHT MIDDLE)
            ------------------------------------------------------------- */}
            <div id="designs" className="space-y-6 scroll-mt-28">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                      Graphic Design
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Visuals that communicate and connect.
                  </h2>
                </div>

                <Link
                  href="/work/graphics"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 hover:text-gold dark:hover:text-gold transition-colors duration-300 group shrink-0"
                >
                  <span>VIEW DESIGNS</span>
                  <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>

              {/* 3 Graphic Design Poster Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. BYOU */}
                <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-3.5 overflow-hidden card-hover-glow space-y-3">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-md">
                    <Image
                      src="/images/designs/byou.jpg"
                      alt="BYOU Visual Identity"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-1 pt-0.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                      BYOU
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Visual Identity
                    </p>
                  </div>
                </div>

                {/* 2. 88 KNOT */}
                <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-3.5 overflow-hidden card-hover-glow space-y-3">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-md">
                    <Image
                      src="/images/designs/88-knot.jpg"
                      alt="88 KNOT Logo Design"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-1 pt-0.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                      88 KNOT
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Logo Design
                    </p>
                  </div>
                </div>

                {/* 3. NATURE */}
                <div className="group relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-3.5 overflow-hidden card-hover-glow space-y-3">
                  <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center shadow-md">
                    <Image
                      src="/images/designs/nature-poster.jpg"
                      alt="NATURE Poster Design"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-1 pt-0.5">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">
                      NATURE
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Poster Design
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                3. CONTACT SECTION CARD (RIGHT BOTTOM)
            ------------------------------------------------------------- */}
            <div id="contact" className="pt-2 scroll-mt-28">
              <div className="relative rounded-3xl border border-slate-300 dark:border-dark-border bg-gradient-to-br from-light-surface via-light-card to-light-surface dark:from-[#0E131E] dark:via-[#121826] dark:to-[#0A0E17] p-8 sm:p-12 overflow-hidden shadow-2xl space-y-8">
                {/* Subtle Ambient Gold Glow */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Mail Icon Badge */}
                <div className="w-14 h-14 rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#151D2C] flex items-center justify-center text-gold shadow-md">
                  <Mail size={24} />
                </div>

                {/* Headline */}
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                    Let&apos;s create
                    <br />
                    something{" "}
                    <span className="text-gold">
                      meaningful
                    </span>
                    <br />
                    together.
                  </h2>
                </div>

                {/* CTA Action Button */}
                <div className="pt-2">
                  <Link
                    href="mailto:contact@abdullahalmaksud.com"
                    className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-slate-400 dark:border-dark-border hover:border-gold dark:hover:border-gold bg-light-surface dark:bg-[#151D2C] hover:bg-gold dark:hover:bg-gold text-slate-900 dark:text-white hover:text-slate-950 dark:hover:text-slate-950 font-bold tracking-widest text-xs transition-all duration-300 shadow-lg hover:scale-105"
                  >
                    <span>GET IN TOUCH</span>
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-dark-border group-hover:bg-slate-950 group-hover:text-gold flex items-center justify-center transition-colors">
                      <ArrowUpRight size={15} />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
