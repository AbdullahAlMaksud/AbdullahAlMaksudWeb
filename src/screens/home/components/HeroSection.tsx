"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Calendar, Code2, Coffee } from "lucide-react";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Background Constellation Lines & Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Radial Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gold/5 dark:bg-gold/[0.04] rounded-full blur-3xl" />

        {/* SVG Constellation Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35 dark:opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Geometric constellation triangle & axis behind portrait */}
          <polygon
            points="550,120 720,380 420,380"
            fill="none"
            stroke="url(#goldLineGrad)"
            strokeWidth="0.75"
            strokeDasharray="4 4"
            className="hidden lg:block"
          />
          <circle
            cx="550"
            cy="250"
            r="160"
            fill="none"
            stroke="rgba(229, 169, 60, 0.15)"
            strokeWidth="0.75"
            className="hidden lg:block"
          />
          <line
            x1="300"
            y1="250"
            x2="850"
            y2="250"
            stroke="rgba(229, 169, 60, 0.12)"
            strokeWidth="0.75"
            className="hidden lg:block"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* ========================================================
              LEFT COLUMN: HERO INTRO & CTA
          ======================================================== */}
          <div className="lg:col-span-4 space-y-7 text-left">
            <div className="space-y-2">
              <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
                Hello, I&apos;m
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                <span>Maksud</span>
                <span className="text-gold">.</span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl font-normal text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              I build digital experiences that are{" "}
              <span className="text-gold font-semibold">
                fast, clean &amp; meaningful.
              </span>
            </p>

            {/* Explore My World CTA */}
            <div className="pt-3">
              <Link
                href="#works"
                className="group inline-flex items-center gap-4 text-xs font-bold tracking-widest text-slate-800 dark:text-slate-200 hover:text-gold dark:hover:text-gold transition-colors duration-300"
              >
                <span>EXPLORE MY WORLD</span>
                <div className="w-12 h-px bg-slate-400 dark:bg-slate-700 group-hover:w-16 group-hover:bg-gold transition-all duration-300" />
                <div className="w-9 h-9 rounded-full border border-slate-400 dark:border-dark-border group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 text-slate-700 dark:text-slate-300">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            </div>
          </div>

          {/* ========================================================
              CENTER COLUMN: PORTRAIT IMAGE SHOWCASE
          ======================================================== */}
          <div className="lg:col-span-4 flex justify-center relative">
            {/* Glowing Golden Ambient Circle */}
            <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] flex items-end justify-center">
              
              {/* Constellation Dots Grid Graphic in Background */}
              <div className="absolute top-4 left-4 w-40 h-40 opacity-20 pointer-events-none">
                <div className="grid grid-cols-6 gap-3">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-gold rounded-full" />
                  ))}
                </div>
              </div>

              {/* Glowing Golden Node Dot on Connector */}
              <div className="absolute top-1/3 -right-3 hidden sm:block">
                <div className="gold-node" />
              </div>

              {/* Portrait Visual */}
              <div className="relative w-full h-full flex items-end justify-center z-10 drop-shadow-2xl">
                <Image
                  src="/images/portrait.png"
                  alt="Abdullah Al Maksud"
                  width={420}
                  height={500}
                  priority
                  className="object-contain w-auto h-full max-h-[440px] filter contrast-115 brightness-100 drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* Subtle Bottom Fade to blend seamlessly with background */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-light-bg dark:from-dark-bg via-light-bg/70 dark:from-dark-bg/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: ABOUT ME PANEL & STATS
          ======================================================== */}
          <div id="about" className="lg:col-span-4 space-y-6 lg:pl-4 text-left">
            {/* Section Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400">
                ABOUT ME
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                Curious mind.
                <br />
                Creative soul.
                <br />
                <span className="text-gold">Code in hand.</span>
              </h2>
            </div>

            {/* Handwritten Signature */}
            <div className="py-1">
              <span className="font-cursive text-4xl sm:text-5xl text-gold/90 select-none tracking-wide">
                Maksud
              </span>
            </div>

            {/* 4 Info Badges List */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-light-card dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center justify-center text-gold shrink-0">
                  <MapPin size={14} />
                </div>
                <span>Based in Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-light-card dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center justify-center text-gold shrink-0">
                  <Calendar size={14} />
                </div>
                <span>5+ Years Experience</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-light-card dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center justify-center text-gold shrink-0">
                  <Code2 size={14} />
                </div>
                <span>Building • Writing • Designing</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-light-card dark:bg-dark-card border border-slate-200 dark:border-dark-border flex items-center justify-center text-gold shrink-0">
                  <Coffee size={14} />
                </div>
                <span>Always learning</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
