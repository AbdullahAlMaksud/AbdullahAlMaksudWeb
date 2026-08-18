"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Calendar,
  Code2,
  Coffee,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { NavBar } from "./components/NavBar";
import projectsData from "@/data/projects.json";
import designsData from "@/data/designs.json";
import blogsData from "@/data/blogs.json";

// Swiper.js imports for 3D Cards Effect
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

export default function HomeScreen() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const swiperInstanceRef = useRef<any>(null);

  const projects = projectsData.projects;
  const designs = designsData.designs;
  const blogs = blogsData.blogs;

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
        } else if (currentLerp > 0.28 && currentLerp < 0.40) {
          setActiveNode(2); // Quote bottom node
        } else if (currentLerp > 0.50 && currentLerp < 0.65) {
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

  const handleDotClick = (index: number) => {
    setActiveProjectIndex(index);
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideTo(index);
    }
  };

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#07090D] text-white relative overflow-hidden selection:bg-gold selection:text-black font-sans"
    >
      {/* Top Fixed Navigation Bar */}
      <NavBar />

      {/* =========================================================================
          BACKGROUND AMBIENT GLOWS & UNIFIED CONTINUOUS GOLDEN SPLINE
      ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Radial Ambient Glows */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-gold/[0.045] rounded-full blur-[140px]" />
        <div className="absolute top-[950px] right-1/4 w-[600px] h-[500px] bg-gold/[0.035] rounded-full blur-[130px]" />
        <div className="absolute top-[1700px] left-1/3 w-[650px] h-[550px] bg-gold/[0.04] rounded-full blur-[140px]" />

        {/* Master Continuous SVG Canvas (Connecting Hero to Footer) */}
        <svg
          className="w-full h-full min-h-[2200px]"
          viewBox="0 0 1440 2400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Subtle Gradient */}
            <linearGradient id="goldCurveBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#E5A93C" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#C89028" stopOpacity="0.35" />
            </linearGradient>

            {/* Glowing Active Energy Beam Gradient */}
            <linearGradient id="goldCurveActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3BA42" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#E5A93C" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFF" stopOpacity="1" />
            </linearGradient>

            {/* Super Glow Filter */}
            <filter id="masterSuperGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <radialGradient id="masterOrbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#F3BA42" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#E5A93C" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.0" />
            </radialGradient>

            <radialGradient id="masterNodePulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F3BA42" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#E5A93C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* HERO CONSTELLATION GEOMETRY */}
          <polygon
            points="580,140 760,400 460,400"
            fill="none"
            stroke="rgba(229, 169, 60, 0.25)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            className="hidden lg:block"
          />
          <circle
            cx="580"
            cy="270"
            r="160"
            fill="none"
            stroke="rgba(229, 169, 60, 0.18)"
            strokeWidth="0.8"
            className="hidden lg:block"
          />
          <line
            x1="320"
            y1="270"
            x2="880"
            y2="270"
            stroke="rgba(229, 169, 60, 0.15)"
            strokeWidth="0.8"
            className="hidden lg:block"
          />

          {/* CONTINUOUS GOLDEN CURVE */}
          <path
            d="M 740 310
               C 810 320, 870 340, 868 420
               C 860 560, 680 620, 640 760
               C 600 880, 840 860, 870 980
               C 900 1100, 945 1220, 930 1360
               C 915 1500, 780 1660, 730 1780
               C 680 1900, 460 1980, 260 2020"
            stroke="url(#goldCurveBaseGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="hidden lg:block opacity-85"
          />

          <path
            ref={pathRef}
            d="M 740 310
               C 810 320, 870 340, 868 420
               C 860 560, 680 620, 640 760
               C 600 880, 840 860, 870 980
               C 900 1100, 945 1220, 930 1360
               C 915 1500, 780 1660, 730 1780
               C 680 1900, 460 1980, 260 2020"
            stroke="url(#goldCurveActiveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#masterSuperGlow)"
            className="hidden lg:block"
            style={{
              strokeDasharray: pathLength || 2400,
              strokeDashoffset: (pathLength || 2400) * (1 - scrollProgress),
              transition: "stroke-dashoffset 0.05s linear",
            }}
          />

          {/* Static Glowing Nodes */}
          <circle cx="868" cy="420" r="5" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="868"
            cy="420"
            r={activeNode === 1 ? 22 : 12}
            fill="url(#masterNodePulse)"
            className="hidden lg:block transition-all duration-300"
          />

          <circle cx="870" cy="980" r="5.5" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="870"
            cy="980"
            r={activeNode === 2 ? 24 : 14}
            fill="url(#masterNodePulse)"
            className="hidden lg:block transition-all duration-300"
          />

          <circle cx="930" cy="1360" r="6" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="930"
            cy="1360"
            r={activeNode === 3 ? 28 : 16}
            fill="url(#masterNodePulse)"
            className="hidden lg:block transition-all duration-300"
          />

          <circle cx="730" cy="1780" r="6" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="730"
            cy="1780"
            r={activeNode === 4 ? 28 : 16}
            fill="url(#masterNodePulse)"
            className="hidden lg:block transition-all duration-300"
          />

          {/* Dynamic Scroll Rider Orb */}
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="30"
            fill="url(#masterOrbGlow)"
            opacity="0.85"
            className="hidden lg:block animate-pulse"
          />
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="15"
            fill="url(#masterOrbGlow)"
            filter="url(#masterSuperGlow)"
            className="hidden lg:block"
          />
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="6"
            fill="#F3BA42"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            className="hidden lg:block"
          />
          <circle cx={orbPos.x} cy={orbPos.y} r="2.5" fill="#FFFFFF" className="hidden lg:block" />
        </svg>

        {/* Floating Interactive Badge: Code icon */}
        <button
          onClick={() => scrollToSection("works")}
          className={`absolute top-[1335px] left-[64.5%] -translate-x-1/2 w-10 h-10 rounded-full border bg-[#080A0E]/90 backdrop-blur-md hidden lg:flex items-center justify-center text-gold z-20 pointer-events-auto transition-all duration-300 hover:scale-125 ${
            activeNode === 3
              ? "border-gold shadow-[0_0_25px_rgba(229,169,60,0.8)] scale-110"
              : "border-gold/50 shadow-[0_0_15px_rgba(229,169,60,0.3)]"
          }`}
          title="Explore Code & Works"
          aria-label="Scroll to Works"
        >
          <Code2 size={17} />
        </button>

        {/* Floating Interactive Badge: Book icon */}
        <button
          onClick={() => scrollToSection("books")}
          className={`absolute top-[1755px] left-[50.7%] -translate-x-1/2 w-10 h-10 rounded-full border bg-[#080A0E]/90 backdrop-blur-md hidden lg:flex items-center justify-center text-gold z-20 pointer-events-auto transition-all duration-300 hover:scale-125 ${
            activeNode === 4
              ? "border-gold shadow-[0_0_25px_rgba(229,169,60,0.8)] scale-110"
              : "border-gold/50 shadow-[0_0_15px_rgba(229,169,60,0.3)]"
          }`}
          title="Explore Books"
          aria-label="Scroll to Books"
        >
          <BookOpen size={17} />
        </button>
      </div>

      {/* =========================================================================
          PAGE CONTENT: SEAMLESS RESPONSIVE CONTAINER
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 pt-28 sm:pt-32 pb-16 space-y-20 sm:space-y-28">
        
        {/* =======================================================================
            SECTION 1: HERO (LEFT INTRO + CENTER PORTRAIT + RIGHT ABOUT ME)
        ======================================================================= */}
        <section id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-6 items-center scroll-mt-24">
          
          {/* Left Column: Hello & Hero Headline */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="space-y-1.5">
              <p className="text-sm font-medium tracking-wide text-slate-400">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                <span>Maksud</span>
                <span className="text-gold font-bold">.</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg font-normal text-slate-300 leading-relaxed max-w-sm">
              I build digital experiences that are{" "}
              <span className="text-gold font-semibold">
                fast, clean &amp; meaningful.
              </span>
            </p>

            {/* Explore My World Link */}
            <div className="pt-2">
              <Link
                href="#works"
                className="group inline-flex items-center gap-4 text-xs font-bold tracking-widest text-slate-200 hover:text-gold transition-colors duration-300"
              >
                <span>EXPLORE MY WORLD</span>
                <div className="w-12 h-px bg-slate-700 group-hover:w-16 group-hover:bg-gold transition-all duration-300" />
                <div className="w-9 h-9 rounded-full border border-slate-700 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 text-slate-300">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            </div>
          </div>

          {/* Center Column: Portrait Image Showcase */}
          <div className="lg:col-span-4 flex justify-center relative">
            <div className="relative w-72 sm:w-80 h-96 sm:h-[430px] flex items-end justify-center">
              
              {/* Dot Matrix Grid */}
              <div className="absolute top-4 left-2 w-36 h-36 opacity-25 pointer-events-none">
                <div className="grid grid-cols-6 gap-3">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gold rounded-full" />
                  ))}
                </div>
              </div>

              {/* Portrait Visual */}
              <div className="relative w-full h-full flex items-end justify-center z-10">
                <Image
                  src="/images/portrait.png"
                  alt="Abdullah Al Maksud"
                  width={420}
                  height={500}
                  priority
                  className="object-contain w-auto h-full max-h-[440px] filter contrast-110 brightness-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Smooth Bottom Dissolve */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#07090D] via-[#07090D]/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: About Me Panel */}
          <div id="about" className="lg:col-span-4 space-y-6 lg:pl-6 text-left scroll-mt-24">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                ABOUT ME
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Curious mind.
                <br />
                Creative soul.
                <br />
                <span className="text-gold">Code in hand.</span>
              </h2>
            </div>

            {/* Signature */}
            <div className="py-1">
              <span className="font-cursive text-4xl sm:text-5xl text-gold/90 select-none tracking-wide">
                Maksud
              </span>
            </div>

            {/* 4 Info Badges */}
            <div className="space-y-3 pt-1 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#0E131C] border border-white/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Based in Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#0E131C] border border-white/10 flex items-center justify-center text-gold shrink-0">
                  <Calendar size={14} />
                </div>
                <span>5+ Years Experience</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#0E131C] border border-white/10 flex items-center justify-center text-gold shrink-0">
                  <Code2 size={14} />
                </div>
                <span>Building · Writing · Designing</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#0E131C] border border-white/10 flex items-center justify-center text-gold shrink-0">
                  <Coffee size={14} />
                </div>
                <span>Always learning</span>
              </div>
            </div>
          </div>

        </section>

        {/* =======================================================================
            SECTION 2: ASYNCHRONOUS 2-COLUMN MAIN CONTENT WITH 3D CARDS & SWIPER
        ======================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start pt-6">

          {/* -------------------------------------------------------------------
              LEFT COLUMN: 1. FEATURED PROJECT (SWIPER CARDS) -> 2. WRITING -> 3. BOOKS
          ------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-16 lg:space-y-24">
            
            {/* 1. FEATURED PROJECT (Swiper 3D Cards Effect Deck with 5-8 deg tilt & glowing border) */}
            <div id="works" className="relative space-y-6 scroll-mt-28 [perspective:1400px]">
              
              {/* Vertical Side Tag on Left Edge */}
              <div className="absolute -left-12 top-20 hidden xl:flex items-center gap-2 -rotate-90 origin-top-left text-[10px] font-bold tracking-[0.28em] text-slate-400 uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                <span>FEATURED PROJECT</span>
              </div>

              {/* 3D Tilted Card Container (5-7 deg Tilt) */}
              <div className="relative w-full max-w-[500px] transform lg:[transform:rotate(-5.5deg)_rotateY(-5deg)_rotateX(3deg)] hover:lg:[transform:rotate(-2deg)_rotateY(0deg)_rotateX(0deg)] transition-all duration-500">
                {/* Swiper.js 3D Cards Container */}
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards, Pagination, Autoplay]}
                  cardsEffect={{
                    perSlideOffset: 14,
                    perSlideRotate: 4,
                    rotate: true,
                    slideShadows: false,
                  }}
                  onSwiper={(swiper) => (swiperInstanceRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveProjectIndex(swiper.activeIndex)}
                  className="w-full !overflow-visible"
                >
                  {projects.map((project) => (
                    <SwiperSlide key={project.slug} className="rounded-2xl">
                      <div className="group relative rounded-2xl border border-white/20 hover:border-gold/60 bg-[#0C1018]/95 backdrop-blur-xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(229,169,60,0.14)] space-y-5 transition-all duration-300">
                        
                        {/* DevTools App Mockup Screen */}
                        <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden border border-white/10 bg-[#080B10] flex items-center justify-center shadow-inner">
                          <Image
                            src={project.image || "/images/projects/devtools.jpg"}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1018]/90 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Project Details */}
                        <div className="flex items-start justify-between gap-4 pt-1">
                          <div className="space-y-1.5">
                            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                              {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 max-w-sm">
                              {project.description}
                            </p>
                          </div>

                          {/* Gold Circular Arrow Action */}
                          <Link
                            href={project.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full border border-gold/60 hover:border-gold hover:bg-gold hover:text-slate-950 flex items-center justify-center text-gold transition-all duration-300 shrink-0 shadow-[0_0_15px_rgba(229,169,60,0.2)] hover:scale-105"
                            aria-label={`View ${project.title}`}
                          >
                            <ArrowUpRight size={17} />
                          </Link>
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3.5 py-1 rounded-full text-[11px] font-medium border border-white/15 bg-[#121824] text-slate-300 hover:border-gold/40 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Carousel Pagination with connecting lines and Gold dot indicator */}
              <div className="flex items-center justify-between pt-3 px-1 max-w-[500px]">
                {/* Connected Dots bar matching screenshot */}
                <div className="flex items-center gap-3">
                  {projects.map((_, i) => {
                    const isActive = i === activeProjectIndex;
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <button
                          onClick={() => handleDotClick(i)}
                          className="relative py-1 flex flex-col items-center group cursor-pointer"
                          aria-label={`Go to project slide ${i + 1}`}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "bg-gold shadow-[0_0_10px_rgba(229,169,60,0.9)] scale-110"
                                : "bg-slate-700 hover:bg-slate-500"
                            }`}
                          />
                          {/* Dot indicator underneath active dot */}
                          {isActive && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold" />
                          )}
                        </button>
                        {i < projects.length - 1 && (
                          <span className="w-4 h-px bg-slate-800" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <Link
                  href="/work/projects"
                  className="text-[11px] font-bold tracking-widest text-slate-400 hover:text-gold transition-colors uppercase"
                >
                  VIEW ALL PROJECTS
                </Link>
              </div>
            </div>

            {/* 2. BOOKS (3 STANDING 3D BOOKS WITH FLOOR REFLECTION) */}
            <div id="books" className="space-y-6 pt-4 scroll-mt-28 [perspective:1200px]">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                      BOOKS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    Books shape
                    <br />
                    mindset and
                    <br />
                    change lives.
                  </h2>
                </div>

                <Link
                  href="/work/books"
                  className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest text-slate-300 hover:text-gold transition-colors duration-300 group shrink-0"
                >
                  <span>MY BOOK SHELF</span>
                  <div className="w-9 h-9 rounded-full border border-gold/60 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 text-gold shadow-[0_0_12px_rgba(229,169,60,0.2)]">
                    <ArrowUpRight size={15} />
                  </div>
                </Link>
              </div>

              {/* 3 Standing 3D Books with Soft Blurry Floor Reflection */}
              <div className="grid grid-cols-3 gap-3.5 sm:gap-5 pt-3">
                {/* Book 1: Atomic Habits */}
                <div className="group relative flex flex-col items-center">
                  <div className="relative w-full h-44 sm:h-60 rounded-xl sm:rounded-2xl overflow-hidden bg-[#F6F4EE] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.85)] group-hover:-translate-y-2 transition-all duration-500 z-10">
                    <Image
                      src="/images/books/atomic-habits.jpg"
                      alt="Atomic Habits - James Clear"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Soft Ground Contact Shadow */}
                  <div className="w-4/5 h-2.5 bg-black/90 rounded-full blur-[4px] -mt-1 pointer-events-none z-10" />

                  {/* Smooth Blurry Floor Reflection with Fadeout Mask */}
                  <div
                    className="relative w-full h-16 sm:h-24 overflow-hidden opacity-30 blur-[2.5px] scale-y-[-1] pointer-events-none -mt-1"
                    style={{
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
                    }}
                  >
                    <Image
                      src="/images/books/atomic-habits.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/80 to-transparent" />
                  </div>
                </div>

                {/* Book 2: Deep Work */}
                <div className="group relative flex flex-col items-center">
                  <div className="relative w-full h-44 sm:h-60 rounded-xl sm:rounded-2xl overflow-hidden bg-[#F59E0B] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.85)] group-hover:-translate-y-2 transition-all duration-500 z-10">
                    <Image
                      src="/images/books/deep-work.jpg"
                      alt="Deep Work - Cal Newport"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
                  </div>

                  {/* Soft Ground Contact Shadow */}
                  <div className="w-4/5 h-2.5 bg-black/90 rounded-full blur-[4px] -mt-1 pointer-events-none z-10" />

                  {/* Smooth Blurry Floor Reflection with Fadeout Mask */}
                  <div
                    className="relative w-full h-16 sm:h-24 overflow-hidden opacity-30 blur-[2.5px] scale-y-[-1] pointer-events-none -mt-1"
                    style={{
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
                    }}
                  >
                    <Image
                      src="/images/books/deep-work.jpg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/80 to-transparent" />
                  </div>
                </div>

                {/* Book 3: Almanack of Naval Ravikant */}
                <div className="group relative flex flex-col items-center">
                  <div className="relative w-full h-44 sm:h-60 rounded-xl sm:rounded-2xl bg-[#E8EAEF] border border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.85)] p-3 sm:p-4 flex flex-col justify-between text-slate-800 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden z-10">
                    <div className="space-y-1.5">
                      <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-slate-400 block">
                        Timeless Wisdom
                      </span>
                      <h4 className="text-[9px] sm:text-[10px] font-bold tracking-wider text-slate-500 pt-0.5">
                        THE
                      </h4>
                      <h4 className="text-xs sm:text-base font-black tracking-tight text-slate-900 leading-tight">
                        ALMANACK
                        <br />
                        OF NAVAL
                        <br />
                        RAVIKANT
                      </h4>
                    </div>
                    <div className="pt-2 border-t border-slate-300">
                      <p className="text-[8px] sm:text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                        Eric Jorgenson
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20 pointer-events-none" />
                  </div>

                  {/* Soft Ground Contact Shadow */}
                  <div className="w-4/5 h-2.5 bg-black/90 rounded-full blur-[4px] -mt-1 pointer-events-none z-10" />

                  {/* Smooth Blurry Floor Reflection with Fadeout Mask */}
                  <div
                    className="relative w-full h-16 sm:h-24 overflow-hidden rounded-b-xl bg-[#E8EAEF] opacity-30 blur-[2.5px] scale-y-[-1] pointer-events-none -mt-1 p-3"
                    style={{
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 45%, transparent 95%)",
                    }}
                  >
                    <div className="text-[8px] font-bold text-slate-700">THE ALMANACK</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07090D] via-[#07090D]/80 to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. WRITING (PLACED BELOW BOOKS - UNIFIED DARK GLASS 3-ROW CARD) */}
            <div id="writing" className="space-y-6 pt-4 scroll-mt-28 [perspective:1200px]">
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                      WRITING
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    Thoughts that
                    <br />
                    inspire and
                    <br />
                    create impact.
                  </h2>
                </div>

                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2.5 text-xs font-bold tracking-widest text-slate-300 hover:text-gold transition-colors duration-300 group shrink-0"
                >
                  <span>READ WRITINGS</span>
                  <div className="w-8 h-8 rounded-full border border-gold/60 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 text-gold shadow-[0_0_12px_rgba(229,169,60,0.2)]">
                    <ArrowUpRight size={14} />
                  </div>
                </Link>
              </div>

              {/* Unified 3-Row Dark Glass Writing Card matching screenshot */}
              <div className="rounded-2xl border border-white/10 bg-[#0C1018]/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] divide-y divide-white/[0.06] transform lg:[transform:rotateY(-6deg)_rotateX(3deg)] transition-transform duration-500 hover:[transform:rotateY(0deg)_rotateX(0deg)]">
                {blogs.slice(0, 3).map((blog) => (
                  <Link
                    key={blog.id}
                    href={`/blogs/${blog.slug}`}
                    className="group/item flex items-center justify-between gap-4 py-4 first:pt-1 last:pb-1 transition-colors duration-200"
                  >
                    <div className="space-y-1">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover/item:text-gold transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">
                        {blog.publishedAt}
                      </p>
                    </div>

                    <div className="w-9 h-9 flex items-center justify-center text-slate-400 group-hover/item:text-gold group-hover/item:translate-x-1.5 transition-all duration-300 shrink-0">
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* -------------------------------------------------------------------
              RIGHT COLUMN: 1. FLOATING QUOTE -> 2. GRAPHIC DESIGN (3D TILT) -> 3. CONTACT
          ------------------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-16 lg:space-y-24">
            
            {/* 1. FLOATING INSPIRING QUOTE (RIGHT-ALIGNED WITH LIGHT ELEGANT TYPOGRAPHY) */}
            <div className="relative space-y-2 max-w-md pt-2 lg:pl-24 xl:pl-32 select-none">
              {/* Opening Quote Mark */}
              <div className="text-3xl sm:text-4xl lg:text-5xl text-gold/80 font-serif leading-none select-none">
                “
              </div>
              
              {/* Core Quote Headline with Light refined weight */}
              <p className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-wide text-white leading-[1.24] pl-2">
                I turn
                <br />
                ideas into
                <br />
                <span className="text-gold font-normal">impactful</span>
                <br />
                solutions.
              </p>

              {/* Closing Quote Mark */}
              <div className="flex justify-end max-w-[280px] pt-1">
                <span className="text-3xl sm:text-4xl lg:text-5xl text-gold/80 font-serif leading-none select-none">
                  ”
                </span>
              </div>
            </div>

            {/* 2. GRAPHIC DESIGN POSTERS (UNIFIED 3D PERSPECTIVE CONTAINER) */}
            <div id="designs" className="space-y-6 scroll-mt-28 [perspective:1200px] lg:pl-10 xl:pl-16">
              
              {/* Unified 3D-Tilted Content Plane (Title + Cards + Link together) */}
              <div className="space-y-6 transform lg:[transform:rotateY(-9deg)_rotateX(5deg)_rotateZ(0.5deg)] transition-transform duration-500 hover:[transform:rotateY(-2deg)_rotateX(1deg)]">
                
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                      GRAPHIC DESIGN
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    Visuals that
                    <br />
                    communicate and
                    <br />
                    connect.
                  </h2>
                </div>

                {/* 3 Graphic Design Poster Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 1. BYOU */}
                  <div className="space-y-2 group">
                    <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:-translate-y-2 group-hover:border-gold/50 transition-all duration-300">
                      <Image
                        src="/images/designs/byou.jpg"
                        alt="BYOU Visual Identity"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-center text-[11px] font-medium text-slate-400">
                      Visual Identity
                    </p>
                  </div>

                  {/* 2. 88 KNOT */}
                  <div className="space-y-2 group">
                    <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:-translate-y-2 group-hover:border-gold/50 transition-all duration-300">
                      <Image
                        src="/images/designs/88-knot.jpg"
                        alt="88 KNOT Logo Design"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-center text-[11px] font-medium text-slate-400">
                      Logo Design
                    </p>
                  </div>

                  {/* 3. NATURE */}
                  <div className="space-y-2 group">
                    <div className="relative h-60 sm:h-64 w-full rounded-2xl overflow-hidden bg-[#0A0D14] border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:-translate-y-2 group-hover:border-gold/50 transition-all duration-300">
                      <Image
                        src="/images/designs/nature-poster.jpg"
                        alt="NATURE Poster Design"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-center text-[11px] font-medium text-slate-400">
                      Poster Design
                    </p>
                  </div>
                </div>

                {/* View Designs Link */}
                <div className="flex justify-end pt-2">
                  <Link
                    href="/work/graphics"
                    className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-slate-300 hover:text-gold transition-colors duration-300 group"
                  >
                    <span>VIEW DESIGNS</span>
                    <div className="w-9 h-9 rounded-full border border-gold/60 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 text-gold shadow-[0_0_12px_rgba(229,169,60,0.2)]">
                      <ArrowUpRight size={15} />
                    </div>
                  </Link>
                </div>

              </div>
            </div>

            {/* 3. CONTACT CARD (TALL SLIM 3D TILTED DARK GLASS CARD WITH BIG TEXT) */}
            <div id="contact" className="pt-10 scroll-mt-28 [perspective:1000px] flex justify-end">
              <div className="relative w-full max-w-[350px] sm:max-w-[370px] min-h-[460px] sm:min-h-[500px] rounded-[32px] border border-white/15 bg-gradient-to-b from-[#121824]/95 via-[#0E131C]/95 to-[#080B10]/95 pt-16 pb-9 px-8 sm:pt-20 sm:pb-10 sm:px-9 shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col justify-between transform lg:[transform:rotateY(-11deg)_rotateX(7deg)_rotateZ(2deg)] hover:lg:[transform:rotateY(-2deg)_rotateX(1deg)_rotateZ(0deg)] transition-all duration-500">
                {/* Subtle Ambient Gold Glow */}
                <div className="absolute -top-10 -right-10 w-52 h-52 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                {/* Overlapping Absolute Mail Icon Badge on Top Border matching screenshot */}
                <div className="absolute -top-8 left-8 sm:left-9 w-16 h-16 rounded-full border border-white/20 bg-[#161C28] flex items-center justify-center text-white shadow-[0_14px_30px_rgba(0,0,0,0.95)] z-20">
                  <Mail size={26} />
                </div>

                {/* Headline with Large, Crisp Typography matching screenshot */}
                <div className="space-y-1 my-auto">
                  <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-light tracking-tight text-white leading-[1.18]">
                    Let&apos;s create
                    <br />
                    something
                    <br />
                    <span className="text-gold font-normal">
                      meaningful
                    </span>
                    <br />
                    together.
                  </h2>
                </div>

                {/* Bottom CTA Action matching screenshot */}
                <div className="pt-6 flex items-center justify-between">
                  <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-slate-300 uppercase">
                    GET IN TOUCH
                  </span>
                  <Link
                    href="mailto:contact@abdullahalmaksud.com"
                    className="w-11 h-11 rounded-full border border-gold/70 hover:border-gold hover:bg-gold hover:text-slate-950 flex items-center justify-center text-gold transition-all duration-300 shrink-0 shadow-[0_0_15px_rgba(229,169,60,0.25)] hover:scale-105"
                    aria-label="Send email"
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* =======================================================================
            SECTION 3: FOOTER (LET'S CONNECT & COPYRIGHT)
        ======================================================================= */}
        <footer className="pt-16 pb-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Let's connect & Social Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                Let&apos;s connect
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/abdullahalmaksud"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-slate-400 transition-colors bg-[#0C1018]"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com/in/abdullahalmaksud"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-slate-400 transition-colors bg-[#0C1018]"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="mailto:contact@abdullahalmaksud.com"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-slate-400 transition-colors bg-[#0C1018]"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
              <a
                href="https://twitter.com/abdullahalmaksud"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-gold hover:text-gold flex items-center justify-center text-slate-400 transition-colors bg-[#0C1018]"
                aria-label="Twitter"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-slate-500 tracking-wider">
            &copy; 2025 Maksud. All rights reserved.
          </p>
        </footer>

      </div>
    </main>
  );
}
