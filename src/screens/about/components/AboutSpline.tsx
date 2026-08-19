"use client";

import { RefObject } from "react";

interface AboutSplineProps {
  pathRef?: RefObject<SVGPathElement>;
  pathLength?: number;
  scrollProgress?: number;
  activeNode?: number | null;
  orbPos?: { x: number; y: number };
  scrollToSection?: (id: string) => void;
}

export function AboutSpline({}: AboutSplineProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Soft Ambient Aurora Glows in Background */}
      <div className="absolute left-1/2 top-24 h-[580px] w-[720px] -translate-x-1/2 rounded-full bg-gold/[0.045] blur-[140px]" />
      <div className="absolute right-1/4 top-[900px] h-[520px] w-[620px] rounded-full bg-gold/[0.035] blur-[130px]" />
      <div className="absolute left-1/4 top-[1800px] h-[560px] w-[680px] rounded-full bg-gold/[0.04] blur-[140px]" />
      <div className="absolute right-1/3 top-[2800px] h-[540px] w-[640px] rounded-full bg-gold/[0.035] blur-[130px]" />

      {/* Top Hero Constellation Accent Geometry */}
      <svg
        className="absolute left-0 top-0 h-[600px] w-full"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="620,130 800,380 480,380"
          fill="none"
          stroke="rgba(229, 169, 60, 0.20)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
          className="hidden lg:block"
        />
        <circle
          cx="620"
          cy="260"
          r="150"
          fill="none"
          stroke="rgba(229, 69, 60, 0.15)"
          strokeWidth="0.8"
          className="hidden lg:block"
        />
      </svg>
    </div>
  );
}
