"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import projectsData from "@/data/projects.json";

export function FeaturedProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const projects = projectsData.projects;
  const currentProject = projects[activeIndex] || projects[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="works" className="relative py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* ========================================================
              LEFT COLUMN: FEATURED PROJECT CARD & CAROUSEL
          ======================================================== */}
          <div className="lg:col-span-6 space-y-5">
            {/* Header / Section Label - HORIZONTAL (No text rotation as requested) */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
                FEATURED PROJECT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            </div>

            {/* Featured Project Showcase Card */}
            <div className="relative group">
              {/* Subtle Offset Decorative Layer behind for depth */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-gold/20 via-transparent to-gold/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />

              <div className="relative rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 sm:p-7 shadow-xl space-y-5 transition-all duration-300">
                
                {/* Project Interface Mockup Screenshot */}
                <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-200 dark:border-dark-border bg-slate-950 flex items-center justify-center">
                  <Image
                    src={currentProject.image || "/images/projects/devtools.jpg"}
                    alt={currentProject.title}
                    fill
                    priority
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Dark Overlay on hover */}
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-300" />
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

                  {/* External Project Link Button */}
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
                      className="px-3 py-1 rounded-full text-[11px] font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-dark-card text-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>

            {/* Carousel Pagination Dots & View All Link */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-7 bg-gold"
                        : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-gold/60"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <Link
                href="#works"
                className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors"
              >
                VIEW ALL PROJECTS
              </Link>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: QUOTE BLOCK (CENTER-RIGHT FLOW)
          ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start lg:pl-10 space-y-6">
            
            {/* Quote with glowing gold accents */}
            <div className="relative pl-6 border-l-2 border-gold/40 space-y-4">
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
              <span className="text-4xl sm:text-5xl text-gold font-serif leading-none select-none opacity-80 block text-right">
                ”
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
