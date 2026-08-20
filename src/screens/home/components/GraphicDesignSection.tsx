"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useDesignsQuery, useHomeQuery } from "@/services";
import { GraphicDesignSectionSkeleton } from "@/components/skeletons/SectionSkeletons";
import { getImageUrl } from "@/lib/image";

const DEFAULT_GRAPHIC_DESIGN = {
  badge: "GRAPHIC DESIGN",
  headlineLines: ["Visuals that", "communicate and", "connect."],
  exploreText: "VIEW DESIGNS",
  exploreLink: "/work/graphics",
};

export function GraphicDesignSection() {
  const { data: serverHomeData } = useHomeQuery();
  const { data: serverDesigns, isLoading: isDesignsLoading } = useDesignsQuery();

  const graphicDesign = serverHomeData?.graphicDesign || DEFAULT_GRAPHIC_DESIGN;

  const rawDesigns = Array.isArray(serverDesigns) ? serverDesigns : [];
  const designs = rawDesigns.slice(0, 3);

  if (isDesignsLoading && designs.length === 0) {
    return <GraphicDesignSectionSkeleton />;
  }

  return (
    <div id="designs" className="scroll-mt-28 space-y-6 [perspective:1200px] lg:pl-10 xl:pl-16">
      {/* Unified 3D-Tilted Content Plane */}
      <div className="transform space-y-6 transition-transform duration-500 hover:[transform:rotateY(-2deg)_rotateX(1deg)] lg:[transform:rotateY(-9deg)_rotateX(5deg)_rotateZ(0.5deg)]">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {graphicDesign.badge}
            </span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
          </div>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {graphicDesign.headlineLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx !== graphicDesign.headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* 3 Graphic Design Poster Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {designs.map((design: any) => (
            <div key={design.id} className="group space-y-2">
              <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_20px_45px_rgba(0,0,0,0.1)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-gold/50 dark:border-white/10 dark:bg-[#0A0D14] dark:shadow-[0_20px_45px_rgba(0,0,0,0.85)] sm:h-64">
                <Image
                  src={getImageUrl(design.coverImage)}
                  alt={design.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <p className="text-center text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {design.subtitle || design.category || "Design"}
              </p>
            </div>
          ))}
        </div>

        {/* View Designs Link */}
        <div className="flex justify-end pt-2">
          <Link
            href={graphicDesign.exploreLink || "/work/graphics"}
            className="group inline-flex items-center gap-3 text-xs font-bold tracking-widest text-slate-600 transition-colors duration-300 hover:text-gold dark:text-slate-300"
          >
            <span>{graphicDesign.exploreText}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 text-gold shadow-[0_0_12px_rgba(229,169,60,0.2)] transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-slate-950">
              <ArrowUpRight size={15} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
