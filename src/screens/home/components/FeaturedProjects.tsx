"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import { useHomeQuery, useProjectsQuery } from "@/services";
import { FeaturedProjectsSkeleton } from "@/components/skeletons/SectionSkeletons";

const DEFAULT_FEATURED_CONFIG = {
  tagText: "FEATURED PROJECT",
  viewAllText: "VIEW ALL PROJECTS",
  viewAllLink: "/work/projects",
  defaultMockup: "/images/portrait.png",
};

export function FeaturedProjects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const swiperInstanceRef = useRef<any>(null);

  const { data: serverHomeData, isLoading: isHomeLoading } = useHomeQuery();
  const { data: serverProjects, isLoading: isProjectsLoading } = useProjectsQuery({
    featured: true,
  });

  const featuredProjects = serverHomeData?.featuredProjects || DEFAULT_FEATURED_CONFIG;

  const rawProjects =
    Array.isArray(serverProjects) && serverProjects.length > 0 ? serverProjects : [];

  const projects = rawProjects.map((p: any) => ({
    title: p.title,
    slug: p.slug,
    description: p.description,
    image: p.coverImage || p.image || featuredProjects.defaultMockup,
    link: p.liveLink || p.link || "#",
    tags: p.stack || p.tags || [],
  }));

  const handleDotClick = (index: number) => {
    setActiveProjectIndex(index);
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.slideTo(index);
    }
  };

  if ((isProjectsLoading || isHomeLoading) && projects.length === 0) {
    return <FeaturedProjectsSkeleton />;
  }

  return (
    <div id="works" className="relative scroll-mt-28 space-y-6 [perspective:1400px]">
      {/* Vertical Side Tag on Left Edge */}
      <div className="absolute -left-12 top-20 hidden origin-top-left -rotate-90 select-none items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 xl:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
        <span>{featuredProjects.tagText}</span>
      </div>

      {/* 3D Tilted Card Container (5-7 deg Tilt) */}
      <div className="relative w-full max-w-[500px] transform transition-all duration-500 lg:[transform:rotate(-5.5deg)_rotateY(-5deg)_rotateX(3deg)] hover:lg:[transform:rotate(-2deg)_rotateY(0deg)_rotateX(0deg)]">
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
          {projects.map((project: any) => (
            <SwiperSlide key={project.slug} className="rounded-2xl">
              <div className="group relative space-y-5 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05),0_0_20px_rgba(229,169,60,0.05)] backdrop-blur-xl transition-all duration-300 hover:border-gold/60 dark:border-white/20 dark:bg-[#0C1018]/95 dark:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(229,169,60,0.14)] sm:p-7">
                {/* Mockup Screen */}
                <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner dark:border-white/10 dark:bg-[#080B10] sm:h-60">
                  <Image
                    src={project.image || featuredProjects.defaultMockup}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent dark:from-[#0C1018]/90" />
                </div>

                {/* Project Details */}
                <div className="flex items-start justify-between gap-4 pt-1">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 max-w-sm text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Gold Circular Arrow Action */}
                  <Link
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold shadow-[0_0_15px_rgba(229,169,60,0.2)] transition-all duration-300 hover:scale-105 hover:border-gold hover:bg-gold hover:text-slate-950"
                    aria-label={`View ${project.title}`}
                  >
                    <ArrowUpRight size={17} />
                  </Link>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-gold/40 dark:border-white/15 dark:bg-[#121824] dark:text-slate-300"
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
      <div className="flex max-w-[500px] items-center justify-between px-1 pt-3">
        <div className="flex items-center gap-3">
          {projects.map((_: any, i: number) => {
            const isActive = i === activeProjectIndex;
            return (
              <div key={i} className="flex items-center gap-3">
                <button
                  onClick={() => handleDotClick(i)}
                  className="group relative flex cursor-pointer flex-col items-center py-1"
                  aria-label={`Go to project slide ${i + 1}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "scale-110 bg-gold shadow-[0_0_10px_rgba(229,169,60,0.9)]"
                        : "bg-slate-300 hover:bg-slate-500 dark:bg-slate-700"
                    }`}
                  />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                  )}
                </button>
                {i < projects.length - 1 && (
                  <span className="h-px w-4 bg-slate-300 dark:bg-slate-800" />
                )}
              </div>
            );
          })}
        </div>

        <Link
          href={featuredProjects.viewAllLink}
          className="text-[11px] font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-gold dark:text-slate-400"
        >
          {featuredProjects.viewAllText}
        </Link>
      </div>
    </div>
  );
}
