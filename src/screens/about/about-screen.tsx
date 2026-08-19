"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Calendar,
  Code2,
  Coffee,
  Download,
  Mail,
  Sparkles,
  BookOpen,
  Palette,
  Terminal,
  Smartphone,
  Database,
  Cpu,
} from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { AboutSpline } from "./components/AboutSpline";
import { AlternatingTimeline } from "./components/AlternatingTimeline";
import { useAboutQuery } from "@/services";

const DEFAULT_ABOUT_HEADER = {
  badge: "ABOUT ME",
  headline: "Curious mind. Creative soul. Code in hand.",
  intro:
    "Hello! I'm Abdullah Al Maksud, a passionate Full-Stack Developer, UI/UX Designer, and Author based in Bangladesh.",
  subIntro:
    "Whether building high-performance web systems with Next.js, designing pixel-perfect interfaces, or writing books—I care deeply about craftsmanship.",
  signature: "Maksud",
  location: "Dhaka, Bangladesh",
  experienceYears: "5+ Years Experience",
  focusAreas: "Building · Writing · Designing",
  learningMindset: "Always Curious & Learning",
  cvUrl: "/CV of Abdullah Al Maksud.pdf",
  email: "contact@abdullahalmaksud.com",
};

export default function AboutScreen() {
  const { data: serverAboutData } = useAboutQuery();
  const header = serverAboutData?.header || DEFAULT_ABOUT_HEADER;
  const pillars = Array.isArray(serverAboutData?.pillars) ? serverAboutData.pillars : [];
  const skillsCategories = Array.isArray(serverAboutData?.skillsCategories)
    ? serverAboutData.skillsCategories
    : [];

  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [orbPos, setOrbPos] = useState({ x: 720, y: 280 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pathLength, setPathLength] = useState(0);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Measure path and track scroll smoothly across the single canvas
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

      // Track scroll with responsive lead-in
      const currentScroll = Math.max(-rect.top, 0);
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
        if (currentLerp > 0.05 && currentLerp < 0.18) {
          setActiveNode(1); // Hero
        } else if (currentLerp > 0.22 && currentLerp < 0.38) {
          setActiveNode(2); // What I Do
        } else if (currentLerp > 0.42 && currentLerp < 0.62) {
          setActiveNode(3); // Timeline upper
        } else if (currentLerp > 0.65 && currentLerp < 0.82) {
          setActiveNode(4); // Timeline lower
        } else if (currentLerp > 0.85) {
          setActiveNode(5); // Skills & CTA
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

  const pillarIconMap: Record<string, any> = {
    Code2,
    Palette,
    BookOpen,
    Terminal,
  };

  const skillCategoryIconMap: Record<string, any> = {
    Smartphone,
    Database,
    Palette,
    Terminal,
  };

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-light-bg font-sans text-slate-900 transition-colors duration-300 selection:bg-gold selection:text-black dark:bg-[#07090D] dark:text-white"
    >
      {/* Top Fixed Navigation Bar */}
      <NavBar />

      {/* Background Ambient Glows & Continuous Interactive Golden Spline */}
      <AboutSpline
        pathRef={pathRef}
        pathLength={pathLength}
        scrollProgress={scrollProgress}
        activeNode={activeNode}
        orbPos={orbPos}
        scrollToSection={scrollToSection}
      />

      {/* Main Responsive Page Content */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-24 px-6 pb-24 pt-28 sm:space-y-32 sm:px-10 sm:pt-32">
        {/* ========================================================
            TOP BREADCRUMB & BACK LINK
        ======================================================== */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
          >
            <ArrowLeft size={14} />
            <span>HOME</span>
          </Link>
        </div>

        {/* ========================================================
            SECTION 1: HERO (PORTRAIT & BIO)
        ======================================================== */}
        <section
          id="about-hero"
          className="grid scroll-mt-28 grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left Column: Full-Height Portrait Card */}
          <div className="relative flex h-full min-h-[480px] w-full sm:min-h-[540px] lg:col-span-5">
            {/* Subtle Gold Ambient Radial Glow Behind */}
            <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-to-tr from-gold/25 via-gold/10 to-transparent opacity-70 blur-3xl" />

            <div className="group relative h-full min-h-[480px] w-full overflow-hidden rounded-3xl border border-slate-300 bg-slate-950 shadow-2xl dark:border-dark-border sm:min-h-[540px]">
              <Image
                src="/images/portrait-full.png"
                alt="Abdullah Al Maksud"
                fill
                priority
                className="contrast-105 object-cover object-center filter transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle Atmospheric Vignette */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right Column: Bio & Highlights (Stretched to match Left) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {header.badge}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Curious mind.
              <br />
              Creative soul.
              <br />
              <span className="text-gold">Code in hand.</span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              {header.intro}
            </p>

            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              {header.subIntro}
            </p>

            {/* Handwritten Signature */}
            <div className="py-2">
              <span className="select-none font-cursive text-5xl text-gold/90">
                {header.signature}
              </span>
            </div>

            {/* 4 Info Badges */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-light-surface p-3 dark:border-dark-border dark:bg-[#0C1018]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <MapPin size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {header.location}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-light-surface p-3 dark:border-dark-border dark:bg-[#0C1018]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {header.experienceYears}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-light-surface p-3 dark:border-dark-border dark:bg-[#0C1018]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Code2 size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {header.focusAreas}
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-light-surface p-3 dark:border-dark-border dark:bg-[#0C1018]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Coffee size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {header.learningMindset}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={header.cvUrl}
                target="_blank"
                download
                className="inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3 text-xs font-bold tracking-wider text-slate-950 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gold-light"
              >
                <Download size={15} />
                <span>DOWNLOAD CV</span>
              </a>

              <Link
                href={`mailto:${header.email}`}
                className="inline-flex items-center gap-3 rounded-full border border-slate-400 bg-light-surface px-6 py-3 text-xs font-bold tracking-wider text-slate-800 transition-all duration-300 hover:border-gold hover:bg-gold/10 dark:border-dark-border dark:bg-[#131824] dark:text-white dark:hover:border-gold"
              >
                <Mail size={15} />
                <span>GET IN TOUCH</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: WHAT I DO (CORE PILLARS & CAPABILITIES)
        ======================================================== */}
        <section id="what-i-do" className="scroll-mt-28 space-y-10">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-dark-border sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Core Capabilities
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                What I <span className="text-gold">Do</span>
              </h2>
            </div>
            <p className="max-w-md text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              Crafting at the intersection of full-stack engineering, modern design systems, and
              insightful authorship.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillarIconMap[pillar.icon] || Code2;
              return (
                <div
                  key={pillar.id}
                  className="card-hover-glow group flex flex-col justify-between space-y-5 rounded-3xl border border-slate-300 bg-light-surface/90 p-6 backdrop-blur-sm transition-all duration-300 dark:border-dark-border dark:bg-[#0C1018]/90 sm:p-7"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:text-black">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full border border-gold/30 bg-gold/5 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-gold">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-gold dark:text-white">
                      {pillar.title}
                    </h3>

                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 sm:text-sm">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Pillar Skills Tags */}
                  <div className="space-y-2 border-t border-slate-200 pt-2 dark:border-dark-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-md border border-slate-200 bg-light-card px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:border-dark-border/50 dark:bg-[#121824] dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 3: INTERACTIVE ALTERNATING TIMELINE (LEFT-RIGHT UNLOCKING)
        ======================================================== */}
        <AlternatingTimeline />

        {/* ========================================================
            SECTION 4: SKILLS & TECHNICAL STACK
        ======================================================== */}
        <section id="skills" className="scroll-mt-28 space-y-10">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 dark:border-dark-border sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Technical Arsenal
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Technologies &amp; <span className="text-gold">Tools</span>
              </h2>
            </div>
            <p className="max-w-md text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
              A comprehensive view of the tools, frameworks, languages, and platforms I work with.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillsCategories.map(({ title, icon, skills }) => {
              const Icon = skillCategoryIconMap[icon] || Terminal;
              return (
                <div
                  key={title}
                  className="card-hover-glow space-y-4 rounded-3xl border border-slate-300 bg-light-surface/90 p-6 backdrop-blur-md transition-all duration-300 dark:border-dark-border dark:bg-[#0C1018]/90"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold shadow-sm">
                      <Icon size={19} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-200 bg-light-card px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-gold hover:text-gold dark:border-dark-border dark:bg-[#131824] dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            SECTION 5: BOTTOM CONTACT CTA BANNER
        ======================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-300 bg-gradient-to-br from-light-surface via-light-card to-light-surface p-8 shadow-2xl dark:border-dark-border dark:from-[#0E131E] dark:via-[#121826] dark:to-[#0A0E17] sm:p-14">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300 bg-light-surface text-gold shadow-md dark:border-dark-border dark:bg-[#151D2C]">
                <Mail size={22} />
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Want to build something <span className="text-gold">extraordinary</span> together?
              </h2>

              <p className="max-w-lg text-sm text-slate-600 dark:text-slate-300">
                I am always open to discussing new engineering projects, design systems, book
                concepts, or consulting opportunities.
              </p>
            </div>

            <div className="flex items-center lg:col-span-4 lg:justify-end">
              <Link
                href="mailto:contact@abdullahalmaksud.com"
                className="inline-flex items-center gap-4 rounded-full bg-gold px-8 py-4 text-xs font-bold tracking-widest text-slate-950 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gold-light"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
