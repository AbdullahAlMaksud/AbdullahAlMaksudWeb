"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RotateCcw,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  ArrowUpRight,
  Sparkles,
  Compass,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Book3DCardProps {
  imageUrl: string;
  imageAlt: string;
  href?: string;
  className?: string;
  spineTitle?: string;
  authorName?: string;
  publisherName?: string;
  isbn?: string;
}

export const Book3DCard: React.FC<Book3DCardProps> = ({
  imageUrl,
  imageAlt,
  href = "/books/emon-jodi-hoto",
  className = "",
  spineTitle = "এমন যদি হতো",
  authorName = "আব্দুল্লাহ আল মাকসুদ",
  publisherName = "ঐতিহ্য প্রকাশনী",
  isbn = "978-984-776-120-4",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const shadowRef = useRef<HTMLDivElement | null>(null);

  // ─── Book Physical Dimensions (px) ───
  // These define the 3D cuboid. W=cover width, H=cover height, D=thickness.
  const W = 176;
  const H = 256;
  const D = 20;
  const HW = W / 2; // 88
  const HH = H / 2; // 128
  const HD = D / 2; // 10
  const PAGE_INSET = 2; // hardcover overhang over the page block

  // ─── Default Isometric Showcase Pose ───
  const DEFAULT_RX = 12;
  const DEFAULT_RY = 28;
  const DEFAULT_RZ = 0;
  const DEFAULT_SCALE = 1;

  // Target (destination) values for spring interpolation
  const targetX = useRef(DEFAULT_RX);
  const targetY = useRef(DEFAULT_RY);
  const targetZ = useRef(DEFAULT_RZ);
  const targetScale = useRef(DEFAULT_SCALE);

  // Current (interpolated) values applied each frame
  const currentX = useRef(DEFAULT_RX);
  const currentY = useRef(DEFAULT_RY);
  const currentZ = useRef(DEFAULT_RZ);
  const currentScale = useRef(DEFAULT_SCALE);

  // Drag interaction state
  const isDragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startRotation = useRef({ x: DEFAULT_RX, y: DEFAULT_RY });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPointerTime = useRef(0);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Touch pinch-to-zoom
  const initialPinchDist = useRef<number | null>(null);
  const initialPinchScale = useRef(DEFAULT_SCALE);

  // UI state
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const isAutoRotatingRef = useRef(true);
  const [activePreset, setActivePreset] = useState("iso");
  const [zoomPct, setZoomPct] = useState(100);

  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    isAutoRotatingRef.current = isAutoRotating;
  }, [isAutoRotating]);

  // ─── Animation Loop (damped spring physics @ 60-120fps) ───
  const animate = useCallback(() => {
    // Auto-rotate when idle
    if (isAutoRotatingRef.current && !isDragging.current) {
      targetY.current += 0.35;
    }

    // Inertia momentum decay after drag release
    if (!isDragging.current && !isAutoRotatingRef.current) {
      if (Math.abs(velocity.current.x) > 0.01 || Math.abs(velocity.current.y) > 0.01) {
        targetY.current += velocity.current.x;
        targetX.current += velocity.current.y;
        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;
      }
    }

    // Spring interpolation (faster during drag for responsiveness)
    const f = isDragging.current ? 0.3 : 0.08;
    currentX.current += (targetX.current - currentX.current) * f;
    currentY.current += (targetY.current - currentY.current) * f;
    currentZ.current += (targetZ.current - currentZ.current) * f;
    currentScale.current += (targetScale.current - currentScale.current) * f;

    // Apply 3D transform to book
    if (bookRef.current) {
      const s = currentScale.current.toFixed(3);
      bookRef.current.style.transform =
        `rotateX(${currentX.current.toFixed(2)}deg) ` +
        `rotateY(${currentY.current.toFixed(2)}deg) ` +
        `rotateZ(${currentZ.current.toFixed(2)}deg) ` +
        `scale3d(${s},${s},${s})`;
    }

    // Dynamic ground shadow
    if (shadowRef.current) {
      const ry = currentY.current;
      const sinY = Math.sin((ry * Math.PI) / 180);
      const sx = sinY * 18;
      const sw = 180 + Math.abs(sinY) * 50;
      const so = Math.max(0.35, 0.8 - Math.abs(currentX.current) * 0.004);
      shadowRef.current.style.transform =
        `rotateX(75deg) translateY(30px) translateX(${sx.toFixed(1)}px) ` +
        `scale(${currentScale.current.toFixed(3)})`;
      shadowRef.current.style.width = `${sw}px`;
      shadowRef.current.style.opacity = `${so.toFixed(2)}`;
    }

    animFrameId.current = requestAnimationFrame(animate);
  }, []);

  // Start animation loop on mount
  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animate]);

  // ─── Pointer Handlers (drag orbit) ───
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isDragging.current = true;
    hasDragged.current = false;
    startPointer.current = { x: e.clientX, y: e.clientY };
    startRotation.current = { x: targetX.current, y: targetY.current };
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    lastPointerTime.current = performance.now();
    velocity.current = { x: 0, y: 0 };
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startPointer.current.x;
    const dy = e.clientY - startPointer.current.y;

    if (Math.hypot(dx, dy) > 4) {
      hasDragged.current = true;
      if (isAutoRotating) setIsAutoRotating(false);
      setActivePreset("custom");
    }

    const sens = 0.5;
    targetY.current = startRotation.current.y + dx * sens;
    targetX.current = Math.max(-85, Math.min(85, startRotation.current.x - dy * sens));

    // Instantaneous velocity for inertia after release
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTime.current);
    velocity.current = {
      x: ((e.clientX - lastPointerPos.current.x) / dt) * 12 * sens,
      y: -((e.clientY - lastPointerPos.current.y) / dt) * 12 * sens,
    };
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    lastPointerTime.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer capture may already be released */
    }
  };

  // ─── Touch Pinch-to-Zoom ───
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      initialPinchDist.current = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      initialPinchScale.current = targetScale.current;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDist.current !== null) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const s = Math.max(
        0.6,
        Math.min(1.8, initialPinchScale.current * (d / initialPinchDist.current))
      );
      targetScale.current = s;
      setZoomPct(Math.round(s * 100));
    }
  };

  const handleTouchEnd = () => {
    initialPinchDist.current = null;
  };

  // ─── Wheel Zoom (non-passive listener to allow preventDefault) ───
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.08 : -0.08;
      const s = Math.max(0.6, Math.min(1.8, targetScale.current + delta));
      targetScale.current = s;
      setZoomPct(Math.round(s * 100));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // ─── Preset Camera Angles ───
  const applyPreset = (preset: "iso" | "front" | "spine" | "back") => {
    velocity.current = { x: 0, y: 0 };
    setActivePreset(preset);
    setIsAutoRotating(false);
    targetZ.current = 0;
    if (preset === "iso") {
      targetX.current = DEFAULT_RX;
      targetY.current = DEFAULT_RY;
      targetZ.current = DEFAULT_RZ;
    }
    if (preset === "front") {
      targetX.current = 0;
      targetY.current = 0;
    }
    if (preset === "spine") {
      targetX.current = 0;
      targetY.current = -90;
    }
    if (preset === "back") {
      targetX.current = 0;
      targetY.current = 180;
    }
  };

  // ─── Zoom Controls ───
  const zoomIn = () => {
    const s = Math.min(1.8, targetScale.current + 0.15);
    targetScale.current = s;
    setZoomPct(Math.round(s * 100));
  };
  const zoomOut = () => {
    const s = Math.max(0.6, targetScale.current - 0.15);
    targetScale.current = s;
    setZoomPct(Math.round(s * 100));
  };
  const resetView = () => {
    targetX.current = DEFAULT_RX;
    targetY.current = DEFAULT_RY;
    targetZ.current = DEFAULT_RZ;
    targetScale.current = DEFAULT_SCALE;
    velocity.current = { x: 0, y: 0 };
    setActivePreset("iso");
    setIsAutoRotating(true);
    setZoomPct(100);
  };
  const toggleAuto = () => {
    setIsAutoRotating((p) => !p);
    velocity.current = { x: 0, y: 0 };
  };

  // ─── Preset Button Style Helper ───
  const presetCls = (key: string) =>
    activePreset === key
      ? "bg-white text-black"
      : "border border-white/15 bg-white/5 text-neutral-300 hover:bg-white/20 hover:text-white";

  // ─── Static barcode stripe widths ───
  const barcodeWidths = [2, 1, 3, 1, 2, 1.5, 3, 1, 2, 1, 2.5];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`group relative flex h-96 w-full cursor-grab items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black select-none active:cursor-grabbing sm:h-[420px] lg:h-[460px] ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* Background grid + ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:28px_28px] opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,rgba(0,0,0,0.85)_70%)]" />

      {/* Top-left: 360° model badge */}
      {/* <div className="absolute top-3.5 left-3.5 z-30 flex items-center space-x-2 border border-white/15 bg-black/75 px-3 py-1.5 font-mono text-[10px] tracking-wider text-neutral-300 backdrop-blur-md">
        <Compass
          className={`h-3.5 w-3.5 text-sky-400 ${isAutoRotating ? "animate-spin" : ""}`}
          style={{ animationDuration: "8s" }}
        />
        <span className="font-semibold text-white">360° 3D MODEL</span>
        <span className="hidden text-neutral-500 sm:inline">|</span>
        <span className="hidden text-neutral-400 sm:inline">DRAG TO ROTATE</span>
      </div> */}

      {/* Top-right: details link */}
      {/* <Link
        href={href}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute top-3.5 right-3.5 z-30 flex items-center space-x-1.5 border border-white/20 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-medium tracking-wider text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-white hover:bg-white hover:text-black active:scale-95"
      >
        <span>DETAILS</span>
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link> */}

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3D Viewport with perspective                                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative flex items-center justify-center"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 45%" }}
      >
        {/* Dynamic ground shadow */}
        <div
          ref={shadowRef}
          className="pointer-events-none absolute -bottom-8 h-14 rounded-full bg-black blur-xl"
          style={{
            width: "180px",
            opacity: 0.8,
            transform: "rotateX(75deg) translateY(30px)",
          }}
        />

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* 3D BOOK CUBOID                                             */}
        {/*                                                            */}
        {/* Geometry: Each face is centered in the W×H container, then */}
        {/* rotated and translated to its correct position. This       */}
        {/* ensures all faces form a seamless closed box.              */}
        {/*                                                            */}
        {/*   Front/Back: inset-0, translateZ(±HD)                     */}
        {/*   Spine:      centered, rotateY(-90°) translateZ(HW)       */}
        {/*   Right:      centered, rotateY(+90°) translateZ(HW-inset) */}
        {/*   Top:        centered, rotateX(+90°) translateZ(HH-inset) */}
        {/*   Bottom:     centered, rotateX(-90°) translateZ(HH-inset) */}
        {/* ═══════════════════════════════════════════════════════════ */}
        <div
          ref={bookRef}
          className="relative will-change-transform"
          style={{
            width: W,
            height: H,
            transformStyle: "preserve-3d",
            transform: `rotateX(${DEFAULT_RX}deg) rotateY(${DEFAULT_RY}deg) rotateZ(${DEFAULT_RZ}deg)`,
          }}
        >
          {/* ── FRONT COVER (+Z face) ────────────────────────────── */}
          <div
            className="absolute inset-0 overflow-hidden border border-white/20 bg-[#0a0f18]"
            style={{
              transform: `translateZ(${HD}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="280px"
              priority
              className="pointer-events-none object-cover"
            />
            {/* Spine hinge crease */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-2.5 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 left-2.5 w-px bg-white/15" />
            {/* Specular sheen */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.06) 35%, transparent 55%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 border border-white/10" />
          </div>

          {/* ── BACK COVER (-Z face, rotated 180° around Y) ──────── */}
          <div
            className="absolute inset-0 flex flex-col justify-between overflow-hidden border border-white/15 bg-gradient-to-b from-[#080d15] via-[#0b1320] to-[#060910] p-3.5 text-white"
            style={{
              transform: `rotateY(180deg) translateZ(${HD}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {/* Spine hinge (appears on right when viewing back) */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-2.5 bg-gradient-to-l from-black/80 via-black/25 to-transparent" />

            {/* Header */}
            <div className="space-y-0.5 border-b border-white/15 pb-1.5">
              <div className="flex items-center justify-between font-mono text-[7px] tracking-[0.2em] text-neutral-400 uppercase">
                <span>MONOGRAPH // SPEC</span>
                <span>VOL. 01</span>
              </div>
              <h4 className="text-xs font-bold tracking-tight text-white uppercase">
                {spineTitle}
              </h4>
            </div>

            {/* Synopsis excerpt */}
            <div className="my-auto space-y-1.5 py-1">
              <p className="line-clamp-3 text-[9px] leading-relaxed text-neutral-300 italic">
                &ldquo;একজন নভোচারী যখন চাঁদের অন্ধকার পৃষ্ঠে দাঁড়িয়ে নিঃসঙ্গতার অর্থ খোঁজে, তখন
                প্রযুক্তি কেবল উপলক্ষ—মূল উপজীব্য মানুষের চিরন্তন শূন্যতা।&rdquo;
              </p>
              <div className="font-mono text-[7px] tracking-wider text-neutral-400">
                — {authorName}
              </div>
            </div>

            {/* Barcode & publisher */}
            <div className="space-y-1.5 border-t border-white/15 pt-1.5">
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <div className="flex h-5 items-end space-x-px bg-white/90 px-1 py-0.5">
                    {barcodeWidths.map((w, i) => (
                      <div key={i} className="h-full bg-black" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <div className="font-mono text-[6px] tracking-widest text-neutral-400">
                    ISBN: {isbn}
                  </div>
                </div>
                <div className="text-right font-mono text-[7px] text-neutral-300">
                  <div className="font-semibold text-white">{publisherName}</div>
                  <div className="text-[6px] text-neutral-400">FIRST EDITION</div>
                </div>
              </div>
            </div>

            {/* Ambient glare */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* ── SPINE (left face, rotated -90° around Y) ─────────── */}
          {/* Centered at HW horizontally before rotation so           */}
          {/* translateZ(HW) places it flush at x=0 (left cover edge) */}
          <div
            className="absolute flex flex-col items-center justify-between border-y border-white/20 bg-gradient-to-r from-[#060a11] via-[#0d1627] to-[#132038] py-3 text-white"
            style={{
              width: D,
              height: H,
              left: HW - HD,
              top: 0,
              transform: `rotateY(-90deg) translateZ(${HW}px)`,
              backfaceVisibility: "hidden",
              boxShadow: "inset 2px 0 4px rgba(255,255,255,0.12), inset -2px 0 4px rgba(0,0,0,0.7)",
            }}
          >
            <div className="flex flex-col items-center space-y-0.5">
              <Sparkles className="h-2 w-2 text-neutral-300" />
              <span className="font-mono text-[5px] tracking-[0.2em] text-neutral-400">ED.01</span>
            </div>
            <span
              className="font-mono text-[8px] font-bold tracking-[0.2em] text-neutral-100 uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {spineTitle}
            </span>
            <span
              className="font-mono text-[6px] tracking-[0.15em] text-neutral-300 uppercase"
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              {authorName}
            </span>
            {/* Metallic sheen */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/40" />
          </div>

          {/* ── RIGHT PAGE EDGES (rotated +90° around Y) ──────────── */}
          {/* Centered at HW, then translateZ(HW - PAGE_INSET) pushes  */}
          {/* it to x = W - PAGE_INSET (hardcover overhang on right)   */}
          <div
            className="absolute border-y border-neutral-600/50 shadow-inner"
            style={{
              width: D - PAGE_INSET,
              height: H - PAGE_INSET * 2,
              left: HW - (D - PAGE_INSET) / 2,
              top: PAGE_INSET,
              transform: `rotateY(90deg) translateZ(${HW - PAGE_INSET}px)`,
              backfaceVisibility: "hidden",
              backgroundImage:
                "repeating-linear-gradient(to right, #e8dfcc 0px, #cfbf9e 1px, #ded4be 2px, #baa784 3px)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
          </div>

          {/* ── TOP PAGE EDGES (rotated +90° around X) ────────────── */}
          {/* Centered at HH vertically, translateZ(HH - PAGE_INSET)   */}
          {/* lifts it to y = PAGE_INSET (hardcover overhang on top)   */}
          <div
            className="absolute border-x border-neutral-600/50 shadow-inner"
            style={{
              width: W - PAGE_INSET,
              height: D - PAGE_INSET,
              left: 0,
              top: HH - (D - PAGE_INSET) / 2,
              transform: `rotateX(90deg) translateZ(${HH - PAGE_INSET}px)`,
              backfaceVisibility: "hidden",
              backgroundImage:
                "repeating-linear-gradient(to bottom, #e8dfcc 0px, #cfbf9e 1px, #ded4be 2px, #baa784 3px)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/25" />
          </div>

          {/* ── BOTTOM PAGE EDGES (rotated -90° around X) ─────────── */}
          {/* Centered at HH, translateZ(HH - PAGE_INSET) pushes it    */}
          {/* to y = H - PAGE_INSET (hardcover overhang on bottom)    */}
          <div
            className="absolute border-x border-neutral-600/50 shadow-inner"
            style={{
              width: W - PAGE_INSET,
              height: D - PAGE_INSET,
              left: 0,
              top: HH - (D - PAGE_INSET) / 2,
              transform: `rotateX(-90deg) translateZ(${HH - PAGE_INSET}px)`,
              backfaceVisibility: "hidden",
              backgroundImage:
                "repeating-linear-gradient(to top, #e8dfcc 0px, #cfbf9e 1px, #ded4be 2px, #baa784 3px)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/25" />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* HUD Controls Bar                                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-x-3 bottom-3 z-30 flex items-center justify-between gap-1.5 border border-white/10 bg-black/80 p-1.5 text-white backdrop-blur-md sm:bottom-4"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Preset angle buttons (3 buttons spanning full available width) */}
        <div className="grid flex-1 grid-cols-3 gap-1">
          {(["iso", "front", "back"] as const).map((p) => (
            <button
              key={p}
              onClick={() => applyPreset(p)}
              className={`py-1.5 text-center font-mono text-[9px] font-semibold tracking-wider transition-colors ${presetCls(p)}`}
            >
              {p === "iso" ? "3D ISO" : p.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Three-Dot Dropdown Menu for Secondary Controls */}
        <div className="flex shrink-0 items-center border-l border-white/15 pl-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="3D View Settings"
                className="flex h-7 w-7 cursor-pointer items-center justify-center border border-white/15 bg-white/5 p-1 text-neutral-300 transition-colors hover:border-white hover:bg-white hover:text-black active:scale-95"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={8}
              className="w-48 border border-neutral-800 bg-neutral-950 p-1.5 font-mono text-white shadow-2xl"
            >
              <DropdownMenuLabel className="flex items-center justify-between px-2 py-1 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                <span>CONTROLS</span>
                <span className="text-[9px] text-neutral-400">{zoomPct}%</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-800" />

              <DropdownMenuItem
                onClick={toggleAuto}
                className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
              >
                <span className="flex items-center gap-2">
                  {isAutoRotating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>AUTO ROTATE</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-400">
                  {isAutoRotating ? "ON" : "OFF"}
                </span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  zoomIn();
                }}
                className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
              >
                <span className="flex items-center gap-2">
                  <ZoomIn className="h-3 w-3" />
                  <span>ZOOM IN</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-400">+</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  zoomOut();
                }}
                className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
              >
                <span className="flex items-center gap-2">
                  <ZoomOut className="h-3 w-3" />
                  <span>ZOOM OUT</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-400">-</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-neutral-800" />

              <DropdownMenuItem
                onClick={resetView}
                className="flex cursor-pointer items-center justify-between px-2 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-200 uppercase transition-colors hover:bg-white hover:text-black focus:bg-white focus:text-black"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="h-3 w-3" />
                  <span>RESET VIEW</span>
                </span>
                <span className="font-mono text-[9px] text-neutral-400">100%</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
