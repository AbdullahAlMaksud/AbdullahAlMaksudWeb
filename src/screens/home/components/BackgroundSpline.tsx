"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { useScroll, useSpring, useMotionValueEvent, motion } from "framer-motion";
import { Code2, BookOpen } from "lucide-react";

interface BackgroundSplineProps {
  containerRef: RefObject<HTMLElement>;
  scrollToSection?: (id: string) => void;
}

export function BackgroundSpline({
  containerRef,
  scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  },
}: BackgroundSplineProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [orbPos, setOrbPos] = useState({ x: 740, y: 310 });
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Framer Motion buttery-smooth scroll progress linked to the main container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // Track position along the spline using Framer Motion motion value event
  useMotionValueEvent(smoothProgress, "change", (progress) => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const distance = Math.max(0, Math.min(progress, 1)) * totalLength;
    const point = path.getPointAtLength(distance);
    setOrbPos({ x: point.x, y: point.y });

    // Node proximity detection thresholds
    if (progress > 0.08 && progress < 0.2) {
      setActiveNode(1); // Hero right node
    } else if (progress > 0.25 && progress < 0.42) {
      setActiveNode(2); // Works left node
    } else if (progress > 0.46 && progress < 0.68) {
      setActiveNode(3); // Designs right node
    } else if (progress > 0.72 && progress < 0.88) {
      setActiveNode(4); // Books left node
    } else {
      setActiveNode(null);
    }
  });

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const point = path.getPointAtLength(0);
      setOrbPos({ x: point.x, y: point.y });
    }
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Soft Radial Ambient Glows in Background */}
      <div className="absolute left-1/2 top-28 h-[550px] w-[700px] -translate-x-1/2 rounded-full bg-gold/[0.045] blur-[140px]" />
      <div className="absolute right-1/4 top-[950px] h-[500px] w-[600px] rounded-full bg-gold/[0.035] blur-[130px]" />
      <div className="absolute left-1/3 top-[1700px] h-[550px] w-[650px] rounded-full bg-gold/[0.04] blur-[140px]" />

      {/* Master 1440px Centered SVG Coordinate Frame */}
      <div className="absolute left-1/2 top-0 h-[2400px] w-full max-w-[1440px] -translate-x-1/2 overflow-visible">
        <svg
          className="h-full w-full overflow-visible"
          viewBox="0 0 1440 2400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background Subtle Gradient */}
            <linearGradient id="goldCurveBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#E5A93C" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#C89028" stopOpacity="0.35" />
            </linearGradient>

            {/* Glowing Active Energy Beam Gradient */}
            <linearGradient id="goldCurveActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F3BA42" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#E5A93C" stopOpacity="0.9" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="1" />
              <stop offset="100%" stopColor="#FFF" stopOpacity="1" />
            </linearGradient>

            {/* Super Glow Filter */}
            <filter id="masterSuperGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <radialGradient id="masterOrbGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="35%" stopColor="#F3BA42" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#E5A93C" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.0" />
            </radialGradient>

            <radialGradient id="masterNodePulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F3BA42" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#E5A93C" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E5A93C" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* HERO CONSTELLATION GEOMETRY */}
          <polygon
            points="580,140 760,400 460,400"
            fill="none"
            stroke="rgba(229, 169, 60, 0.25)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            className="hidden lg:block"
          />
          <circle
            cx="580"
            cy="270"
            r="160"
            fill="none"
            stroke="rgba(229, 169, 60, 0.18)"
            strokeWidth="0.8"
            className="hidden lg:block"
          />
          <line
            x1="320"
            y1="270"
            x2="880"
            y2="270"
            stroke="rgba(229, 169, 60, 0.15)"
            strokeWidth="0.8"
            className="hidden lg:block"
          />

          {/* 1. Base Static Line */}
          <path
            d="M 740 310
               C 810 320, 870 340, 868 420
               C 860 600, 200 550, 250 750
               C 300 950, 850 900, 850 1150
               C 850 1400, 280 1350, 280 1550
               C 280 1750, 280 1750, 280 1850
               C 280 2050, 700 1950, 850 2200"
            stroke="url(#goldCurveBaseGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="hidden opacity-85 lg:block"
          />

          {/* 2. Active Glowing Beam Animated with Framer Motion */}
          <motion.path
            ref={pathRef}
            d="M 740 310
               C 810 320, 870 340, 868 420
               C 860 600, 200 550, 250 750
               C 300 950, 850 900, 850 1150
               C 850 1400, 280 1350, 280 1550
               C 280 1750, 280 1750, 280 1850
               C 280 2050, 700 1950, 850 2200"
            stroke="url(#goldCurveActiveGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#masterSuperGlow)"
            className="hidden lg:block"
            style={{
              pathLength: smoothProgress,
            }}
          />

          {/* Static Glowing Nodes */}
          <circle cx="868" cy="420" r="5" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="868"
            cy="420"
            r={activeNode === 1 ? 22 : 12}
            fill="url(#masterNodePulse)"
            className="hidden transition-all duration-300 lg:block"
          />

          <circle cx="250" cy="750" r="5.5" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="250"
            cy="750"
            r={activeNode === 2 ? 24 : 14}
            fill="url(#masterNodePulse)"
            className="hidden transition-all duration-300 lg:block"
          />

          <circle cx="850" cy="1150" r="6" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="850"
            cy="1150"
            r={activeNode === 3 ? 28 : 16}
            fill="url(#masterNodePulse)"
            className="hidden transition-all duration-300 lg:block"
          />

          <circle cx="280" cy="1650" r="6" fill="#F3BA42" className="hidden lg:block" />
          <circle
            cx="280"
            cy="1650"
            r={activeNode === 4 ? 28 : 16}
            fill="url(#masterNodePulse)"
            className="hidden transition-all duration-300 lg:block"
          />

          {/* Dynamic Scroll Rider Orb with buttery smooth glow */}
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="30"
            fill="url(#masterOrbGlow)"
            opacity="0.85"
            className="hidden animate-pulse lg:block"
          />
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="15"
            fill="url(#masterOrbGlow)"
            filter="url(#masterSuperGlow)"
            className="hidden lg:block"
          />
          <circle
            cx={orbPos.x}
            cy={orbPos.y}
            r="6"
            fill="#F3BA42"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            className="hidden lg:block"
          />
          <circle cx={orbPos.x} cy={orbPos.y} r="2.5" fill="#FFFFFF" className="hidden lg:block" />
        </svg>

        {/* Floating Interactive Badge 1: Code icon at (250, 750) */}
        <button
          onClick={() => scrollToSection("works")}
          style={{ left: "250px", top: "750px" }}
          className={`pointer-events-auto absolute z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white/90 text-gold shadow-md backdrop-blur-md transition-all duration-300 hover:scale-125 dark:bg-[#080A0E]/90 lg:flex ${
            activeNode === 2
              ? "scale-110 border-gold shadow-[0_0_25px_rgba(229,169,60,0.8)]"
              : "border-gold/50 shadow-[0_0_15px_rgba(229,169,60,0.3)]"
          }`}
          title="Explore Code & Works"
          aria-label="Scroll to Works"
        >
          <Code2 size={17} />
        </button>

        {/* Floating Interactive Badge 2: Book icon at (280, 1650) */}
        <button
          onClick={() => scrollToSection("books")}
          style={{ left: "280px", top: "1650px" }}
          className={`pointer-events-auto absolute z-20 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white/90 text-gold shadow-md backdrop-blur-md transition-all duration-300 hover:scale-125 dark:bg-[#080A0E]/90 lg:flex ${
            activeNode === 4
              ? "scale-110 border-gold shadow-[0_0_25px_rgba(229,169,60,0.8)]"
              : "border-gold/50 shadow-[0_0_15px_rgba(229,169,60,0.3)]"
          }`}
          title="Explore Books"
          aria-label="Scroll to Books"
        >
          <BookOpen size={17} />
        </button>
      </div>
    </div>
  );
}
