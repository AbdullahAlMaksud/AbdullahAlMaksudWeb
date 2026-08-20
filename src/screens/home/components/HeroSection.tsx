"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Calendar, Code2, Coffee } from "lucide-react";
import { useHomeQuery } from "@/services";
import { getImageUrl } from "@/lib/image";

const DEFAULT_HERO = {
  greeting: "Hello, I'm",
  firstName: "Maksud",
  subtitlePrefix: "I build digital experiences that are ",
  subtitleHighlight: "fast, clean & meaningful.",
  exploreText: "EXPLORE MY WORLD",
  portraitImage: "/images/portrait.png",
  portraitAlt: "Abdullah Al Maksud",
};

const DEFAULT_ABOUT = {
  badge: "ABOUT ME",
  headlineLines: ["Curious mind.", "Creative soul.", "Code in hand."],
  signature: "Maksud",
  infoBadges: [
    { text: "Based in Bangladesh", icon: "MapPin" },
    { text: "5+ Years Experience", icon: "Calendar" },
    { text: "Building · Writing · Designing", icon: "Code2" },
    { text: "Always learning", icon: "Coffee" },
  ],
};

export function HeroSection() {
  const { data: serverHomeData } = useHomeQuery();
  const hero = serverHomeData?.hero || DEFAULT_HERO;
  const about = serverHomeData?.about || DEFAULT_ABOUT;

  const iconMap: Record<string, any> = {
    MapPin,
    Calendar,
    Code2,
    Coffee,
  };

  return (
    <section
      id="home"
      className="grid scroll-mt-24 grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-6"
    >
      {/* Left Column: Hello & Hero Headline */}
      <div className="space-y-6 text-left lg:col-span-4">
        <div className="space-y-1.5">
          <p className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400">
            {hero.greeting}
          </p>
          <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span>{hero.firstName}</span>
            <span className="font-bold text-gold">.</span>
          </h1>
        </div>

        <p className="max-w-sm text-base font-normal leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          {hero.subtitlePrefix}{" "}
          <span className="font-semibold text-gold">{hero.subtitleHighlight}</span>
        </p>

        {/* Explore My World Link */}
        <div className="pt-2">
          <Link
            href="#works"
            className="group inline-flex items-center gap-4 text-xs font-bold tracking-widest text-slate-700 transition-colors duration-300 hover:text-gold dark:text-slate-200"
          >
            <span>{hero.exploreText}</span>
            <div className="h-px w-12 bg-slate-300 transition-all duration-300 group-hover:w-16 group-hover:bg-gold dark:bg-slate-700" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950 dark:border-slate-700 dark:text-slate-300">
              <ArrowUpRight size={15} />
            </div>
          </Link>
        </div>
      </div>

      {/* Center Column: Portrait Image Showcase */}
      <div className="relative flex justify-center lg:col-span-4">
        <div className="relative flex h-96 w-72 items-end justify-center sm:h-[430px] sm:w-80">
          {/* Dot Matrix Grid */}
          <div className="pointer-events-none absolute left-2 top-4 h-36 w-36 opacity-25">
            <div className="grid grid-cols-6 gap-3">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-gold" />
              ))}
            </div>
          </div>

          {/* Portrait Visual */}
          <div className="relative z-10 flex h-full w-full items-end justify-center">
            <Image
              src={getImageUrl(hero.portraitImage, "/images/portrait.png")}
              alt={hero.portraitAlt || "Abdullah Al Maksud"}
              width={420}
              height={500}
              priority
              className="contrast-110 h-full max-h-[440px] w-auto object-contain brightness-100 drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] filter dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>
      </div>

      {/* Right Column: About Me Panel */}
      <div id="about" className="scroll-mt-24 space-y-6 text-left lg:col-span-4 lg:pl-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {about.badge}
          </span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {about.headlineLines.map((line, idx) => {
              if (idx === about.headlineLines.length - 1) {
                return (
                  <span key={idx} className="text-gold">
                    {line}
                  </span>
                );
              }
              return (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              );
            })}
          </h2>
        </div>

        {/* Signature */}
        <div className="py-1">
          <span className="select-none font-cursive text-4xl tracking-wide text-gold/90 sm:text-5xl">
            {about.signature}
          </span>
        </div>

        {/* 4 Info Badges */}
        <div className="space-y-3 pt-1 text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
          {about.infoBadges.map((badge, idx) => {
            const Icon = iconMap[badge.icon];
            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-gold dark:border-white/10 dark:bg-[#0E131C]">
                  {Icon && <Icon size={14} />}
                </div>
                <span>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
