"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import designsData from "@/data/designs.json";
import blogsData from "@/data/blogs.json";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FEATURED_DESIGNS = designsData.designs.filter(
  (d) => d.featured
);

// সর্বশেষ (প্রথম) ব্লগ পোস্ট
const LATEST_BLOG = blogsData.blogs[0];

export function BlogDesignsSection() {
  const { ref: blogRef, isVisible: blogVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: designRef, isVisible: designVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section
      id="blog"
      className="
        max-w-6xl mx-auto
        px-4 sm:px-6
        mt-6
        grid grid-cols-1 md:grid-cols-2
        gap-4 sm:gap-6
      "
    >
      {/* =====================================================
          LATEST BLOG
      ====================================================== */}
      <div
        ref={blogRef}
        className={`win p-4 sm:p-6 ${blogVisible ? "anim-slide-left anim-delay-0" : "anim-hidden"}`}
      >
        {/* Section Label */}
        <p className="text-[10px] sm:text-[11px] tracking-widest text-ink/60 dark:text-cream/40 mb-3">
          / LATEST BLOG
        </p>

        {/* Blog Preview */}
        <Link
          href={`/blogs/${LATEST_BLOG.slug}`}
          className="
            block
            h-36 sm:h-32
            bg-cream-2 dark:bg-ink/60
            border border-ink/20 dark:border-cream/10
            mb-4
            overflow-hidden
            relative
            group
          "
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-green-dark/5 group-hover:bg-green-dark/15 transition-colors" />

          {/* Illustration */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-ink/40 dark:text-cream/30">
            <Image src={"/images/blogs/blog-0.jpg"} alt="Blog" width={100} height={100} className="object-cover h-full w-full" unoptimized />
          </div>

          {/* Hover Arrow */}
          <div
            className="
              absolute
              top-3 right-3
              w-7 h-7
              bg-cream
              flex items-center justify-center
              opacity-0
              group-hover:opacity-100
              transition-opacity
            "
          >
            <ArrowRight
              size={12}
              className="text-ink"
            />
          </div>
        </Link>

        {/* Blog Title */}
        <h3 className="text-[13px] sm:text-base font-semibold leading-6 mb-3">
          {LATEST_BLOG.title}
        </h3>

        {/* Read More */}
        <Link
          href={`/blogs/${LATEST_BLOG.slug}`}
          className="
            text-orange
            text-[11px] sm:text-[12px]
            font-medium
            inline-flex
            items-center
            gap-1
            hover:underline
          "
        >
          READ MORE
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* =====================================================
          RECENT DESIGNS
      ====================================================== */}
      <div
        id="designs"
        ref={designRef}
        className={`win p-4 sm:p-6 flex flex-col min-w-0 ${designVisible ? "anim-slide-right anim-delay-1" : "anim-hidden"}`}

      >
        {/* Header */}
        <div
          className="
            flex
            flex-col xs:flex-row
            xs:items-center
            xs:justify-between
            gap-3
            mb-4
          "
        >
          <p className="text-[10px] sm:text-[11px] tracking-widest text-ink/60 dark:text-cream/40">
            / RECENT DESIGNS
          </p>

          <Link
            href="/designs"
            className="
              text-orange
              text-[10px] sm:text-[11px]
              font-medium
              inline-flex
              items-center
              gap-1
              hover:underline
              w-fit
            "
          >
            VIEW ALL DESIGNS
            <ArrowRight size={11} />
          </Link>
        </div>

        {/* =================================================
            DESKTOP / TABLET GRID
        ================================================== */}
<div
  className="
    hidden sm:grid
    grid-cols-2 lg:grid-cols-3
    gap-3
    min-w-0
    h-full
  "
>
  {FEATURED_DESIGNS.map((d) => (
    <Link
      key={d.id}
      href={d.link || "#"}
      className="
        relative
        h-full
        min-h-0
        flex items-end
        overflow-hidden
        rounded-md
        cursor-pointer
        group
      "
      style={{
        backgroundColor: d.bg,
      }}
    >
      {/* Image */}
      <Image
        src={d.coverImage || "/images/blogs/blog-0.jpg"}
        alt={d.title}
        fill
        sizes="(max-width: 1024px) 50vw, 33vw"
        className="
          object-right
          object-cover
          transition-transform
          duration-500
          group-hover:scale-105
          p-2
        "
        style={{backgroundColor: d.bg}}
        unoptimized
      />

      {/* Bottom to Top Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/30
          to-transparent
          transition-all
          duration-300
          group-hover:from-black/90
          group-hover:via-black/40
        "
        aria-hidden="true"
      />

      {/* Title */}
      <div
        className="
          relative
          z-10
          w-full
          p-3
        "
      >
        <span
          className="
            block
            text-cream
            text-xs
            font-medium
            leading-tight
            line-clamp-2
            opacity-90
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          {d.title}
        </span>
      </div>
    </Link>
  ))}
</div>

        {/* =================================================
            MOBILE SWIPER
        ================================================== */}
        <div className="sm:hidden w-full min-w-0">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={8}
            slidesPerView={1.6}
            pagination={{
              clickable: true,
            }}
            className="design-swiper !pb-8"
          >
            {FEATURED_DESIGNS.map((d) => (
              <SwiperSlide key={d.id}>
                <Link
                  href={d.link || "#"}
                  className="
                    relative
                    block
                    h-36
                    overflow-hidden
                    group
                  "
                  style={{
                    backgroundColor: d.bg,
                  }}
                >
                  {/* Overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/70
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* Title */}
                  <span
                    className="
                      absolute
                      bottom-2
                      left-2
                      right-2
                      text-cream
                      text-[10px]
                      truncate
                      z-10
                    "
                  >
                    {d.title}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}