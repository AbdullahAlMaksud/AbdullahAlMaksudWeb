"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import projectsData from "@/data/projects.json";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FEATURED = projectsData.projects.filter((p) => p.featured);

export function ProjectsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: swiperContRef, isVisible: swiperVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 mt-24">
      {/* Header */}
      <div
        ref={headerRef}
        className={`flex items-center justify-between mb-6 ${
          headerVisible ? "anim-fade-up anim-delay-0" : "anim-hidden"
        }`}
      >
        <p className="text-[12px] tracking-widest text-ink/60 dark:text-cream/40">
          / FEATURED PROJECTS
        </p>
        <Link
          href="/projects"
          className="text-[12px] text-orange font-medium flex items-center gap-1 hover:underline"
        >
          VIEW ALL PROJECTS <ArrowRight size={12} />
        </Link>
      </div>

      {/* Swiper */}
      <div
        ref={swiperContRef}
        className={`project-swiper ${swiperVisible ? "anim-fade-up anim-delay-1" : "anim-hidden"}`}
      >
        <Swiper
          modules={[Pagination, Navigation, A11y]}
          spaceBetween={20}
          breakpoints={{
            0:   { slidesPerView: 1.1 },
            480: { slidesPerView: 1.6 },
            640: { slidesPerView: 2.2 },
            900: { slidesPerView: 3.1 },
            1100:{ slidesPerView: 4   },
          }}
          pagination={{ clickable: true, el: ".proj-pagination" }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          className="pb-2"
        >
          {FEATURED.map((p) => (
            <SwiperSlide key={p.index} className="mb-2">
              <ProjectCard {...p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Controls */}
      <div
        className={`flex items-center justify-center gap-4 mt-6 ${
          swiperVisible ? "anim-fade-up anim-delay-2" : "anim-hidden"
        }`}
      >
        <button
          id="proj-prev"
          aria-label="Previous project"
          onClick={() => swiperRef.current?.slidePrev()}
          className="w-8 h-8 border border-ink/30 dark:border-cream/20 flex items-center justify-center hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink transition-colors group"
        >
          <ChevronLeft size={15} className="text-ink/60 dark:text-cream/40 group-hover:text-cream dark:group-hover:text-ink transition-colors" />
        </button>

        <div className="proj-pagination flex items-center gap-1.5" />

        <button
          id="proj-next"
          aria-label="Next project"
          onClick={() => swiperRef.current?.slideNext()}
          className="w-8 h-8 border border-ink/30 dark:border-cream/20 flex items-center justify-center hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink transition-colors group"
        >
          <ChevronRight size={15} className="text-ink/60 dark:text-cream/40 group-hover:text-cream dark:group-hover:text-ink transition-colors" />
        </button>
      </div>
    </section>
  );
}
