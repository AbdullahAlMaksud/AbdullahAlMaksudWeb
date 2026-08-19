"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  BookOpen,
  Code2,
  Palette,
  Sparkles,
  CheckCircle2,
  MapPin,
  Building,
} from "lucide-react";

import { useAboutQuery } from "@/services";

export interface TimelineMilestone {
  id: string;
  type: "work" | "education" | "publication";
  categoryLabel: string;
  displayYear: string;
  fullYear: string;
  title: string;
  subtitle: string;
  location: string;
  badge: string;
  current?: boolean;
  description: string;
  highlights: string[];
  tags: string[];
  icon: string;
}

const iconMap: Record<string, any> = {
  Briefcase,
  GraduationCap,
  BookOpen,
  Code2,
  Palette,
  Sparkles,
};

export function AlternatingTimeline() {
  const [filter, setFilter] = useState<"all" | "work" | "education">("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  const { data: serverAboutData } = useAboutQuery();

  const allMilestones: TimelineMilestone[] = React.useMemo(() => {
    if (!serverAboutData) return [];

    const expMilestones: TimelineMilestone[] = (serverAboutData.experience || []).map(
      (exp: any, i: number) => {
        const isAuthor =
          exp.role?.toLowerCase().includes("author") ||
          exp.type?.toLowerCase().includes("published");
        const displayYear = exp.year?.split("—")[0]?.trim() || "2025";
        return {
          id: exp.id || `exp-${i}`,
          type: isAuthor ? "publication" : "work",
          categoryLabel: isAuthor ? "Authorship & Publication" : "Work Experience",
          displayYear: displayYear.length >= 4 ? displayYear.slice(0, 4) : displayYear,
          fullYear: exp.year || "2025",
          title: exp.role || exp.title || "Software Engineer",
          subtitle: exp.company || exp.subtitle || "Digital Products",
          location: exp.location || "Bangladesh",
          badge: exp.current ? "Current Role" : isAuthor ? "Published Work" : "Experience",
          current: exp.current,
          description: exp.description || "",
          highlights: exp.highlights || [],
          tags: exp.technologies || exp.tags || [],
          icon: isAuthor
            ? "BookOpen"
            : exp.technologies?.includes("Figma")
              ? "Palette"
              : "Briefcase",
        };
      }
    );

    const eduMilestones: TimelineMilestone[] = (serverAboutData.education || []).map(
      (edu: any, i: number) => {
        const displayYear = edu.year?.split("—")[0]?.trim() || "2020";
        const isContinuous =
          edu.year?.toLowerCase().includes("ongoing") ||
          edu.year?.toLowerCase().includes("lifelong");
        return {
          id: edu.id || `edu-${i}`,
          type: "education",
          categoryLabel: isContinuous ? "Lifelong Growth" : "Academic Degree",
          displayYear: isContinuous ? "NOW" : displayYear.slice(0, 4),
          fullYear: edu.year || "Ongoing",
          title: edu.degree || edu.title || "Academic Program",
          subtitle: edu.institution || edu.subtitle || "University",
          location: edu.location || "Bangladesh",
          badge: edu.status || "Education",
          description: edu.description || "",
          highlights: edu.highlights || [],
          tags: edu.courses || edu.tags || [],
          icon: isContinuous ? "Sparkles" : "GraduationCap",
        };
      }
    );

    return [...expMilestones, ...eduMilestones];
  }, [serverAboutData]);

  const filteredMilestones = allMilestones.filter((item) => {
    if (filter === "all") return true;
    if (filter === "work") return item.type === "work" || item.type === "publication";
    if (filter === "education") return item.type === "education";
    return true;
  });

  // Calculate the total height of the milestone container
  useEffect(() => {
    const updateHeight = () => {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    const timeout = setTimeout(updateHeight, 200);
    window.addEventListener("resize", updateHeight);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateHeight);
    };
  }, [filter, filteredMilestones]);

  // Framer Motion buttery-smooth scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 25%", "end 75%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentProgress(latest);
  });

  return (
    <section id="timeline" ref={containerRef} className="scroll-mt-28 space-y-12">
      {/* ========================================================
          HEADER & FILTER TABS
      ======================================================== */}
      <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 dark:border-dark-border md:flex-row md:items-end">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Career &amp; Education Journey
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Experience &amp; <span className="text-gold">Education</span>
          </h2>
          <p className="mt-2 max-w-xl text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
            A chronological timeline of software engineering roles, publications, academic degrees,
            and milestones unlocking as you scroll.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-light-card/80 p-1.5 shadow-sm backdrop-blur-md dark:border-dark-border dark:bg-[#0C1018]/80">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
              filter === "all"
                ? "bg-gold text-slate-950 shadow-md shadow-gold/20"
                : "text-slate-600 hover:text-gold dark:text-slate-400 dark:hover:text-gold"
            }`}
          >
            All Journey ({allMilestones.length})
          </button>

          <button
            onClick={() => setFilter("work")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
              filter === "work"
                ? "bg-gold text-slate-950 shadow-md shadow-gold/20"
                : "text-slate-600 hover:text-gold dark:text-slate-400 dark:hover:text-gold"
            }`}
          >
            Work &amp; Authorship
          </button>

          <button
            onClick={() => setFilter("education")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
              filter === "education"
                ? "bg-gold text-slate-950 shadow-md shadow-gold/20"
                : "text-slate-600 hover:text-gold dark:text-slate-400 dark:hover:text-gold"
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {/* ========================================================
          STRAIGHT VERTICAL TIMELINE CONTAINER (FRAMER MOTION POWERED)
      ======================================================== */}
      <div className="relative pb-16 pt-6">
        {/* 1. Straight Center Baseline Track */}
        <div
          style={{ height: height > 0 ? `${height}px` : "100%" }}
          className="absolute left-6 top-6 w-2.5 -translate-x-1/2 rounded-full bg-slate-200/90 dark:bg-white/[0.08] md:left-1/2 md:w-3"
        >
          {/* Framer Motion Butter-Smooth Golden Beam */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-full rounded-t-full bg-gradient-to-b from-[#F3BA42] via-gold to-amber-500 shadow-[0_0_20px_rgba(229,169,60,0.9)]"
          >
            {/* White Scroll Indicator Circle seated at the EXACT bottom edge of the golden line (NO line below it!) */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 z-30 flex h-4 w-4 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-gold bg-white shadow-[0_0_12px_rgba(229,169,60,1)]">
              <div className="absolute -inset-1 animate-ping rounded-full bg-gold/40 blur-sm" />
              <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            </div>
          </motion.div>
        </div>

        {/* 2. Timeline Milestones List */}
        <div ref={lineRef} className="space-y-16 md:space-y-24">
          {filteredMilestones.map((item, idx) => {
            const isLeftBadge = idx % 2 === 0;
            const threshold =
              filteredMilestones.length > 1
                ? Math.max(0, (idx - 0.2) / (filteredMilestones.length - 1))
                : 0;
            const isUnlocked = currentProgress >= threshold || idx === 0;
            const Icon = iconMap[item.icon] || Briefcase;

            return (
              <div
                key={item.id}
                className="group relative flex flex-col items-start md:flex-row md:items-center"
              >
                {/* -------------------------------------------------------------
                    DESKTOP VIEW: Alternating Left & Right Layout
                ------------------------------------------------------------- */}

                {/* LEFT COLUMN (Desktop only) */}
                <div className="hidden w-[calc(50%-2rem)] items-center justify-end pr-8 md:flex">
                  {isLeftBadge ? (
                    /* Left Side: Large Year + Circular Icon Badge + Horizontal Connector to Center */
                    <div className="relative flex items-center justify-end gap-5">
                      {/* Large Year Display */}
                      <span
                        className={`select-none font-mono text-4xl font-black tracking-tight transition-all duration-500 lg:text-5xl ${
                          isUnlocked
                            ? "scale-105 text-gold drop-shadow-[0_0_15px_rgba(229,169,60,0.4)]"
                            : "text-slate-400 opacity-60 dark:text-slate-600"
                        }`}
                      >
                        {item.displayYear}
                      </span>

                      {/* Circular Icon Badge */}
                      <div
                        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-xl transition-all duration-500 ${
                          isUnlocked
                            ? "scale-110 border-gold bg-light-surface text-gold shadow-[0_0_25px_rgba(229,169,60,0.5)] dark:bg-[#0E131E]"
                            : "border-slate-300 bg-light-card text-slate-400 opacity-60 dark:border-white/15 dark:bg-[#0A0D14]"
                        }`}
                      >
                        <Icon size={30} className={isUnlocked ? "animate-pulse" : ""} />
                      </div>

                      {/* Horizontal Connector Line from Badge to Center Spine */}
                      <div
                        className={`absolute -right-8 h-[2px] w-8 transition-colors duration-500 ${
                          isUnlocked
                            ? "bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]"
                            : "bg-slate-300 dark:bg-white/15"
                        }`}
                      />
                    </div>
                  ) : (
                    /* Left Side: Card Content */
                    <div
                      className={`w-full transform transition-all duration-700 ease-out ${
                        isUnlocked
                          ? "translate-y-0 scale-100 opacity-100"
                          : "pointer-events-none translate-y-6 scale-[0.98] opacity-35"
                      }`}
                    >
                      <TimelineCard item={item} isUnlocked={isUnlocked} />
                    </div>
                  )}
                </div>

                {/* CENTER DOT NODE ON THE STRAIGHT LINE */}
                <div
                  className={`absolute left-6 z-20 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 transition-all duration-500 md:left-1/2 ${
                    isUnlocked
                      ? "scale-125 border-white bg-gold shadow-[0_0_16px_rgba(229,169,60,1)]"
                      : "scale-90 border-slate-400 bg-slate-300 opacity-60 dark:border-white/30 dark:bg-[#0E131E]"
                  }`}
                >
                  <div
                    className={`h-2 w-2 rounded-full transition-colors duration-500 ${
                      isUnlocked ? "bg-white" : "bg-slate-500"
                    }`}
                  />
                </div>

                {/* RIGHT COLUMN (Desktop only) */}
                <div className="ml-auto hidden w-[calc(50%-2rem)] items-center justify-start pl-8 md:flex">
                  {!isLeftBadge ? (
                    /* Right Side: Horizontal Connector from Center + Circular Icon Badge + Large Year */
                    <div className="relative flex items-center justify-start gap-5">
                      {/* Horizontal Connector Line from Center Spine to Badge */}
                      <div
                        className={`absolute -left-8 h-[2px] w-8 transition-colors duration-500 ${
                          isUnlocked
                            ? "bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]"
                            : "bg-slate-300 dark:bg-white/15"
                        }`}
                      />

                      {/* Circular Icon Badge */}
                      <div
                        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-xl transition-all duration-500 ${
                          isUnlocked
                            ? "scale-110 border-gold bg-light-surface text-gold shadow-[0_0_25px_rgba(229,169,60,0.5)] dark:bg-[#0E131E]"
                            : "border-slate-300 bg-light-card text-slate-400 opacity-60 dark:border-white/15 dark:bg-[#0A0D14]"
                        }`}
                      >
                        <Icon size={30} className={isUnlocked ? "animate-pulse" : ""} />
                      </div>

                      {/* Large Year Display */}
                      <span
                        className={`select-none font-mono text-4xl font-black tracking-tight transition-all duration-500 lg:text-5xl ${
                          isUnlocked
                            ? "scale-105 text-gold drop-shadow-[0_0_15px_rgba(229,169,60,0.4)]"
                            : "text-slate-400 opacity-60 dark:text-slate-600"
                        }`}
                      >
                        {item.displayYear}
                      </span>
                    </div>
                  ) : (
                    /* Right Side: Card Content */
                    <div
                      className={`w-full transform transition-all duration-700 ease-out ${
                        isUnlocked
                          ? "translate-y-0 scale-100 opacity-100"
                          : "pointer-events-none translate-y-6 scale-[0.98] opacity-35"
                      }`}
                    >
                      <TimelineCard item={item} isUnlocked={isUnlocked} />
                    </div>
                  )}
                </div>

                {/* -------------------------------------------------------------
                    MOBILE VIEW (Straight Line on Left-6 with Cards on Right)
                ------------------------------------------------------------- */}
                <div className="ml-12 w-[calc(100%-3.5rem)] space-y-4 md:hidden">
                  {/* Mobile Header: Icon Badge + Year Display */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition-all duration-500 ${
                        isUnlocked
                          ? "scale-105 border-gold bg-light-surface text-gold shadow-[0_0_18px_rgba(229,169,60,0.4)] dark:bg-[#0E131E]"
                          : "border-slate-300 bg-light-card text-slate-400 opacity-60 dark:border-white/15 dark:bg-[#0A0D14]"
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="space-y-0.5">
                      <span
                        className={`font-mono text-3xl font-black tracking-tight ${
                          isUnlocked ? "text-gold" : "text-slate-500"
                        }`}
                      >
                        {item.displayYear}
                      </span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                        {item.badge}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Card Content */}
                  <div
                    className={`transform transition-all duration-700 ease-out ${
                      isUnlocked
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-4 scale-[0.98] opacity-40"
                    }`}
                  >
                    <TimelineCard item={item} isUnlocked={isUnlocked} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   SUB-COMPONENT: TimelineCard (Content Container)
======================================================== */
function TimelineCard({ item, isUnlocked }: { item: TimelineMilestone; isUnlocked: boolean }) {
  return (
    <div
      className={`space-y-4 rounded-3xl border p-6 shadow-lg backdrop-blur-xl transition-all duration-500 sm:p-7 ${
        isUnlocked
          ? "border-gold/55 bg-light-surface/95 shadow-[0_0_35px_rgba(229,169,60,0.15)] dark:border-gold/45 dark:bg-[#0E131E]/95"
          : "border-slate-200 bg-light-surface/60 dark:border-white/[0.06] dark:bg-[#0A0D14]/60"
      }`}
    >
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-3 dark:border-dark-border/60 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isUnlocked
                  ? "border-gold/30 bg-gold/15 text-gold"
                  : "border-transparent bg-slate-100 text-slate-500 dark:bg-white/5"
              }`}
            >
              {item.categoryLabel}
            </span>

            {isUnlocked ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                <Sparkles size={11} />
                <span>Unlocked</span>
              </span>
            ) : (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Upcoming
              </span>
            )}
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 transition-colors group-hover:text-gold dark:text-white sm:text-xl">
            {item.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 font-bold text-gold">
              <Building size={13} />
              <span>{item.subtitle}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              <span>{item.location}</span>
            </span>
          </div>
        </div>

        {/* Full Year Range Tag */}
        <div className="shrink-0 self-start sm:self-center">
          <span
            className={`inline-block rounded-full border px-3 py-1 font-mono text-xs font-bold transition-colors ${
              isUnlocked
                ? "border-gold/30 bg-gold/10 text-gold"
                : "border-transparent bg-slate-100 text-slate-400 dark:bg-white/5"
            }`}
          >
            {item.fullYear}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
        {item.description}
      </p>

      {/* Highlights */}
      {item.highlights && item.highlights.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Key Responsibilities &amp; Impact:
          </p>
          <ul className="space-y-1">
            {item.highlights.map((highlight, hIdx) => (
              <li
                key={hIdx}
                className="flex items-start gap-2 text-xs leading-normal text-slate-600 dark:text-slate-300"
              >
                <CheckCircle2
                  size={13}
                  className={`mt-0.5 shrink-0 ${isUnlocked ? "text-gold" : "text-slate-400"}`}
                />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags / Technologies */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 border-t border-slate-200 pt-2 dark:border-dark-border/60">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors ${
                isUnlocked
                  ? "border-slate-200 bg-light-card text-slate-700 dark:border-dark-border dark:bg-[#131824] dark:text-slate-300"
                  : "border-transparent bg-transparent text-slate-400"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
