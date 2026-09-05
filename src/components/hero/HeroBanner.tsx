"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";

interface HeroBannerProps {
  verticalLabel?: string;
}

// ─── Character / Glyph Particle Definition ───
interface MatrixParticle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  z: number; // 0 (far) to 1 (near)
  char: string;
  size: number;
  speed: number;
  opacity: number;
  changeTimer: number;
  isHead: boolean;
  type: "char" | "shape";
  shapeType?: "cross" | "diamond" | "ring" | "bracket" | "hex" | "cube";
  rotation?: number;
  rotationSpeed?: number;
  // Brownian motion fields for organic drifting
  brownVx?: number;
  brownVy?: number;
  brownTimer?: number;
  brownAngle?: number;
}

// Technical character glyph set (Binary, Hex, Greek/Math, Architecture tokens)
const GLYPH_CHARS = [
  "0",
  "1",
  "0",
  "1",
  "0x",
  "λ",
  "Δ",
  "Ω",
  "§",
  "8",
  "F",
  "7",
  "4",
  "9",
  "X",
  "Z",
  "SYS",
  "NODE",
  "ARCH",
  "MOD",
  "01",
  "10",
  "∑",
  "√",
  "•",
  "+",
  "//",
];

const SHAPE_TYPES: MatrixParticle["shapeType"][] = [
  "cross",
  "diamond",
  "ring",
  "bracket",
  "hex",
  "cube",
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ verticalLabel = "INDEX — VOL. I" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Click to Pause / Freeze animation state
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const isPausedRef = useRef<boolean>(false);
  const frozenMousePosRef = useRef<{ x: number; y: number } | null>(null);

  // Mouse & Touch position in pixel coordinates
  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  const particlesRef = useRef<MatrixParticle[]>([]);
  const animFrameId = useRef<number | null>(null);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const lastTimeRef = useRef<number>(0);

  // Initialize matrix particles
  const initParticles = useCallback((w: number, h: number) => {
    const particles: MatrixParticle[] = [];

    // 1. Matrix Column Streams (120 - 150 pixels per second)
    const colSpacing = 22;
    const numCols = Math.floor(w / colSpacing) + 2;

    for (let c = 0; c < numCols; c++) {
      const colX = c * colSpacing + (Math.random() - 0.5) * 6;
      const streamCount = 7 + Math.floor(Math.random() * 9);
      const startY = Math.random() * h;
      // Precise 120 - 150 px per second speed
      const speed = 120 + Math.random() * 30;
      const z = 0.3 + Math.random() * 0.7;

      for (let s = 0; s < streamCount; s++) {
        const y = (startY + s * 20) % (h + 120);
        const isHead = s === streamCount - 1;
        const char = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];

        particles.push({
          x: colX,
          y: y,
          homeX: colX,
          homeY: y,
          vx: 0,
          vy: 0,
          z: z,
          char: char,
          size: 9 + z * 5.5,
          speed: speed,
          opacity: isHead ? 0.95 : 0.2 + (s / streamCount) * 0.5,
          changeTimer: Math.floor(Math.random() * 120),
          isHead: isHead,
          type: "char",
        });
      }
    }

    // 2. Bold 3D Geometric Architectural Elements (Brownian motion drift, subtle depth)
    const shapeCount = 18;
    for (let i = 0; i < shapeCount; i++) {
      const z = 0.3 + Math.random() * 0.7; // Depth layer (0.3 to 1.0)
      const x = Math.random() * w;
      const y = Math.random() * h;
      const shapeType = SHAPE_TYPES[i % SHAPE_TYPES.length];

      particles.push({
        x: x,
        y: y,
        homeX: x,
        homeY: y,
        vx: 0,
        vy: 0,
        z: z,
        char: "",
        size: 22 + z * 28, // Bolder, larger presence
        speed: 0.002 + Math.random() * 0.004, // Ultra-slow drift speed
        opacity: 0.12 + z * 0.15, // Subtle, lowered opacity
        changeTimer: 0,
        isHead: false,
        type: "shape",
        shapeType: shapeType,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.006, // Ultra-slow subtle rotation
        // Brownian motion: random organic wandering
        brownVx: (Math.random() - 0.5) * 0.08,
        brownVy: (Math.random() - 0.5) * 0.08,
        brownTimer: Math.floor(Math.random() * 240),
        brownAngle: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Main Canvas Render & Physics Loop
  const draw = useCallback(
    (timestamp?: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const now = typeof timestamp === "number" ? timestamp : performance.now();
      const lastTime = lastTimeRef.current || now;
      // Time delta in seconds (clamped to prevent jumps on tab unfocus)
      const dt = Math.min(Math.max((now - lastTime) / 1000, 0.001), 0.1);
      lastTimeRef.current = now;
      const timeScale = dt * 60; // Normalized physics baseline

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        ctx.scale(dpr, dpr);

        if (
          particlesRef.current.length === 0 ||
          Math.abs(sizeRef.current.w - w) > 5 ||
          Math.abs(sizeRef.current.h - h) > 5
        ) {
          sizeRef.current = { w, h };
          initParticles(w, h);
        }
      }

      // 1. Crisp White Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      // 2. Subtle Architectural Technical Dot & Line Grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      const gridStep = 40;
      for (let gx = 0; gx < w; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      // Grid Intersect Dots
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      for (let gx = 0; gx < w; gx += gridStep) {
        for (let gy = 0; gy < h; gy += gridStep) {
          ctx.fillRect(gx - 1, gy - 1, 2, 2);
        }
      }

      // 3. Mouse Repulsion Field (Uses locked position if paused)
      const mouse =
        isPausedRef.current && frozenMousePosRef.current
          ? { x: frozenMousePosRef.current.x, y: frozenMousePosRef.current.y, active: true }
          : mousePos.current;
      const outerRadius = 185; // Big circle: elements pass through
      const innerRadius = 88; // Small circle: protected core, nothing enters

      if (mouse.active) {
        // Big outer circle
        ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, outerRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Small inner dashed circle (exclusion core)
        ctx.strokeStyle = "rgba(0, 0, 0, 0.14)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, innerRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Center crosshair pointer (+)
        ctx.strokeStyle = isPausedRef.current ? "rgba(220, 38, 38, 0.85)" : "rgba(0, 0, 0, 0.65)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mouse.x - 9, mouse.y);
        ctx.lineTo(mouse.x + 9, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 9);
        ctx.lineTo(mouse.x, mouse.y + 9);
        ctx.stroke();
      }

      // 4. Update & Draw Particles (Matrix Glyphs & 3D Bold Shapes)
      const particles = particlesRef.current;
      const paused = isPausedRef.current;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!paused) {
          if (p.type === "char") {
            // Matrix vertical falling stream: strictly 120 - 150 px/second
            p.homeY += p.speed * dt;
            if (p.homeY > h + 50) {
              p.homeY = -35;
            }

            // Smooth ultra-slow character morphing
            p.changeTimer += timeScale;
            if (p.changeTimer > 120 + Math.random() * 150) {
              p.char = GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
              p.changeTimer = 0;
            }

            let targetX = p.homeX;
            let targetY = p.homeY;

            // Repulsion & Flow Physics for chars
            if (mouse.active) {
              const parallaxShiftX = (mouse.x - w / 2) * p.z * 0.04;
              const parallaxShiftY = (mouse.y - h / 2) * p.z * 0.04;
              const visualX = p.x + parallaxShiftX;
              const visualY = p.y + parallaxShiftY;
              const dx = visualX - mouse.x;
              const dy = visualY - mouse.y;
              const dist = Math.hypot(dx, dy);

              // ─── A. SMALL CIRCLE: Absolute exclusion — nothing enters inside! ───
              if (dist < innerRadius) {
                const safeDist = Math.max(dist, 0.001);
                const angle = Math.atan2(dy, dx);
                const overlap = innerRadius - safeDist;

                // Divert target rest position outside the small circle
                targetX = mouse.x - parallaxShiftX + Math.cos(angle) * (innerRadius + 8);
                targetY = mouse.y - parallaxShiftY + Math.sin(angle) * (innerRadius + 8);

                // Direct clearance push so nothing remains inside the small circle
                p.x += Math.cos(angle) * (overlap * 0.5 + 2);
                p.y += Math.sin(angle) * (overlap * 0.5 + 2);
                p.vx += Math.cos(angle) * 7;
                p.vy += Math.sin(angle) * 7;
              }
              // ─── B. BIG CIRCLE: Elements pass through! ───
              // Streams pass through the outer circle area; if a stream directly collides with
              // the small inner circle, it is smoothly curved around into the big circle zone:
              else if (dist < outerRadius) {
                const homeDx = p.homeX - mouse.x;
                if (Math.abs(homeDx) < innerRadius) {
                  const side = homeDx >= 0 ? 1 : -1;
                  const factor = 1 - (dist - innerRadius) / (outerRadius - innerRadius);
                  const curveOffset = side * factor * (innerRadius - Math.abs(homeDx) + 12);
                  targetX = p.homeX + curveOffset;
                }
                // Particles whose column is outside innerRadius flow freely straight through the big circle
              }
            }

            // Spring-back damping to home or dispersed target trajectory
            const springK = 0.035;
            const friction = 0.88;

            p.vx += (targetX - p.x) * springK;
            p.vy += (targetY - p.y) * springK;

            p.vx *= friction;
            p.vy *= friction;

            p.x += p.vx * timeScale;
            p.y += p.vy * timeScale;
          } else if (p.type === "shape") {
            // ─── Brownian Motion for Shapes ───
            // Organic random wandering like particles in fluid
            if (p.brownTimer !== undefined && p.brownAngle !== undefined) {
              p.brownTimer! -= timeScale;
              if (p.brownTimer! <= 0) {
                // Pick a new random direction with smooth angular change
                p.brownAngle! += (Math.random() - 0.5) * Math.PI * 0.6;
                p.brownTimer = 120 + Math.floor(Math.random() * 240);
              }

              // Brownian drift force — ultra gentle
              const brownForce = 0.005 + p.z * 0.004;
              p.brownVx =
                p.brownVx! * 0.985 + Math.cos(p.brownAngle!) * brownForce * 0.015 * timeScale;
              p.brownVy =
                p.brownVy! * 0.985 + Math.sin(p.brownAngle!) * brownForce * 0.015 * timeScale;
            }

            // Slow rotation
            if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
              p.rotation += p.rotationSpeed * timeScale;
            }

            // Mouse interaction for shapes: shapes cannot enter small circle, but can drift through big circle
            if (mouse.active) {
              const parallaxShiftX = (mouse.x - w / 2) * p.z * 0.04;
              const parallaxShiftY = (mouse.y - h / 2) * p.z * 0.04;
              const visualX = p.x + parallaxShiftX;
              const visualY = p.y + parallaxShiftY;
              const dx = visualX - mouse.x;
              const dy = visualY - mouse.y;
              const dist = Math.hypot(dx, dy);
              const shapeCoreRadius = innerRadius + p.size * 0.45;

              if (dist < shapeCoreRadius) {
                const safeDist = Math.max(dist, 0.001);
                const angle = Math.atan2(dy, dx);
                const overlap = shapeCoreRadius - safeDist;

                // Push shape out of the small circle
                p.x += Math.cos(angle) * (overlap * 0.45 + 2);
                p.y += Math.sin(angle) * (overlap * 0.45 + 2);
                p.vx += Math.cos(angle) * 5;
                p.vy += Math.sin(angle) * 5;

                // Offset anchor
                p.homeX += Math.cos(angle) * (overlap * 0.25);
                p.homeY += Math.sin(angle) * (overlap * 0.25);
              }
            }

            // Soft spring-back + Brownian wander combined
            const shapeSpring = 0.012;
            const shapeFriction = 0.92;

            p.vx += (p.homeX - p.x) * shapeSpring + (p.brownVx || 0);
            p.vy += (p.homeY - p.y) * shapeSpring + (p.brownVy || 0);

            p.vx *= shapeFriction;
            p.vy *= shapeFriction;

            p.x += p.vx * timeScale;
            p.y += p.vy * timeScale;

            // Wrap shapes softly if they drift too far
            const margin = 60;
            if (p.x < -margin) p.homeX = w + margin * 0.5;
            if (p.x > w + margin) p.homeX = -margin * 0.5;
            if (p.y < -margin) p.homeY = h + margin * 0.5;
            if (p.y > h + margin) p.homeY = -margin * 0.5;
          }
        }

        // Parallax 3D Depth Shift (Near objects shift more with mouse position)
        const parallaxShiftX = mouse.active ? (mouse.x - w / 2) * p.z * 0.04 : 0;
        const parallaxShiftY = mouse.active ? (mouse.y - h / 2) * p.z * 0.04 : 0;

        // ─── Render Element ───
        ctx.save();
        ctx.translate(p.x + parallaxShiftX, p.y + parallaxShiftY);

        if (p.type === "char") {
          // Monospace Matrix Typography
          ctx.font = `${p.isHead ? "bold" : "normal"} ${p.size}px monospace`;
          if (p.isHead) {
            // Head of stream: bold dark black with slight glow
            ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
            ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
            ctx.shadowBlur = 4;
          } else {
            // Body of stream: editorial slate / charcoal
            ctx.fillStyle = `rgba(30, 30, 30, ${p.opacity.toFixed(2)})`;
          }
          ctx.fillText(p.char, 0, 0);
        } else if (p.type === "shape") {
          // Bold 3D Geometric Architectural Element with Drop Shadows & Multi-layer Wireframe
          if (p.rotation) {
            ctx.rotate((p.rotation * Math.PI) / 180);
          }

          // Subtle depth shadow (reduced for lower opacity shapes)
          ctx.shadowColor = `rgba(0, 0, 0, ${(p.opacity * 0.5).toFixed(2)})`;
          ctx.shadowBlur = 3 + p.z * 4;
          ctx.shadowOffsetX = 1 + p.z * 2;
          ctx.shadowOffsetY = 2 + p.z * 3;

          // Subtle stroke styling
          ctx.strokeStyle = `rgba(10, 10, 10, ${p.opacity.toFixed(2)})`;
          ctx.fillStyle = `rgba(10, 10, 10, ${(p.opacity * 0.8).toFixed(2)})`;
          ctx.lineWidth = 1.2 + p.z * 0.8; // Thinner, more refined
          ctx.lineJoin = "round";
          ctx.lineCap = "round";

          const s = p.size;
          const hs = s / 2;

          switch (p.shapeType) {
            case "cross":
              // Bold Architectural Precision Cross with Center Node
              ctx.beginPath();
              ctx.moveTo(0, -hs);
              ctx.lineTo(0, hs);
              ctx.moveTo(-hs, 0);
              ctx.lineTo(hs, 0);
              ctx.stroke();

              // Center Depth Node & Ticks
              ctx.beginPath();
              ctx.arc(0, 0, 3, 0, Math.PI * 2);
              ctx.fill();
              ctx.strokeRect(-hs * 0.4, -hs * 0.4, hs * 0.8, hs * 0.8);
              break;

            case "diamond":
              // Double-walled 3D Diamond with Axis
              ctx.beginPath();
              ctx.moveTo(0, -hs);
              ctx.lineTo(hs, 0);
              ctx.lineTo(0, hs);
              ctx.lineTo(-hs, 0);
              ctx.closePath();
              ctx.stroke();

              // Inner nested diamond
              ctx.beginPath();
              ctx.moveTo(0, -hs * 0.5);
              ctx.lineTo(hs * 0.5, 0);
              ctx.lineTo(0, hs * 0.5);
              ctx.lineTo(-hs * 0.5, 0);
              ctx.closePath();
              ctx.stroke();
              break;

            case "ring":
              // Concentric 3D Radar Target Rings
              ctx.beginPath();
              ctx.arc(0, 0, hs, 0, Math.PI * 2);
              ctx.stroke();

              // Inner Ring & Center Core
              ctx.beginPath();
              ctx.arc(0, 0, hs * 0.55, 0, Math.PI * 2);
              ctx.stroke();
              ctx.beginPath();
              ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
              ctx.fill();
              break;

            case "bracket":
              // Heavy 3D Architectural Framing Brackets
              ctx.beginPath();
              ctx.moveTo(hs * 0.6, -hs);
              ctx.lineTo(-hs * 0.6, -hs);
              ctx.lineTo(-hs * 0.6, hs);
              ctx.lineTo(hs * 0.6, hs);
              ctx.stroke();

              ctx.beginPath();
              ctx.moveTo(-hs * 0.6, 0);
              ctx.lineTo(hs * 0.2, 0);
              ctx.stroke();
              break;

            case "hex": {
              // Double-walled 3D Hexagon
              ctx.beginPath();
              for (let j = 0; j < 6; j++) {
                const a = (Math.PI / 3) * j;
                const hx = hs * Math.cos(a);
                const hy = hs * Math.sin(a);
                if (j === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
              }
              ctx.closePath();
              ctx.stroke();

              // Internal isometric Y-axis depth spokes
              ctx.beginPath();
              for (let j = 0; j < 3; j++) {
                const a = ((Math.PI * 2) / 3) * j - Math.PI / 2;
                ctx.moveTo(0, 0);
                ctx.lineTo(hs * Math.cos(a), hs * Math.sin(a));
              }
              ctx.stroke();
              break;
            }

            case "cube": {
              // Isometric 3D Wireframe Cube
              const d = hs * 0.85;
              // Top diamond face
              ctx.beginPath();
              ctx.moveTo(0, -d);
              ctx.lineTo(d * 0.866, -d * 0.5);
              ctx.lineTo(0, 0);
              ctx.lineTo(-d * 0.866, -d * 0.5);
              ctx.closePath();
              ctx.stroke();

              // Bottom edges
              ctx.beginPath();
              ctx.moveTo(-d * 0.866, -d * 0.5);
              ctx.lineTo(-d * 0.866, d * 0.5);
              ctx.lineTo(0, d);
              ctx.lineTo(d * 0.866, d * 0.5);
              ctx.lineTo(d * 0.866, -d * 0.5);
              ctx.stroke();

              // Center vertical axis
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(0, d);
              ctx.stroke();
              break;
            }
          }
        }

        ctx.restore();
      }

      // Only schedule next frame when not paused
      if (!isPausedRef.current) {
        animFrameId.current = requestAnimationFrame(draw);
      }
    },
    [initParticles]
  );

  // Mouse & Touch Tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onPointerEnter = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onPointerLeave = () => {
      if (!isPausedRef.current) {
        mousePos.current.active = false;
      }
    };

    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    return () => {
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  // Window Resize Handling
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (
          Math.abs(sizeRef.current.w - rect.width) > 5 ||
          Math.abs(sizeRef.current.h - rect.height) > 5
        ) {
          sizeRef.current = { w: rect.width, h: rect.height };
          initParticles(rect.width, rect.height);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  // Start Animation Loop
  useEffect(() => {
    lastTimeRef.current = 0;
    animFrameId.current = requestAnimationFrame(draw);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [draw]);

  const lastToggleTimeRef = useRef<number>(0);
  const togglePause = useCallback(() => {
    const now = Date.now();
    // 200ms debounce to prevent double-firing between pointerdown and click
    if (now - lastToggleTimeRef.current < 200) return;
    lastToggleTimeRef.current = now;

    const next = !isPausedRef.current;
    isPausedRef.current = next;
    setIsPaused(next);

    if (!next) {
      // Resume animation
      frozenMousePosRef.current = null;
      lastTimeRef.current = 0;
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      animFrameId.current = requestAnimationFrame(draw);
    } else {
      // Pause animation: lock current hovered mouse position so dispersed circle stays frozen
      frozenMousePosRef.current = mousePos.current.active
        ? { x: mousePos.current.x, y: mousePos.current.y }
        : null;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
      animFrameId.current = requestAnimationFrame(draw);
    }
  }, [draw]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary left-click or touch press
    if (e.button !== 0) return;
    togglePause();
  };

  return (
    <section className="hidden w-full overflow-hidden border-b border-black/30 bg-white md:flex">
      <div className="flex w-full items-stretch">
        {/* Left Vertical Rail Label */}
        <div className="hidden w-10 shrink-0 items-center justify-center border-r border-black/20 bg-white py-6 select-none sm:flex sm:w-12">
          <div className="vertical-lr font-mono text-[10px] font-medium tracking-[0.25em] text-neutral-600 uppercase sm:text-[11px]">
            {verticalLabel}
          </div>
        </div>

        {/* Matrix Technical Canvas Area with White Editorial Background */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onClick={togglePause}
          className="group relative h-48 w-full flex-1 cursor-crosshair overflow-hidden bg-white select-none sm:h-64 md:h-80 lg:h-96"
        >
          {/* Main Interactive Matrix & Repulsion Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          {/* ─── Static Editorial Architectural Reticles (Dark on White) ─── */}
          {/* Top-left corner bracket */}
          <div className="pointer-events-none absolute top-4 left-4 text-black/40 sm:top-6 sm:left-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="h-5 w-5 sm:h-7 sm:w-7"
            >
              <path d="M1 12V1h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Bottom-right corner bracket */}
          <div className="pointer-events-none absolute right-4 bottom-4 text-black/40 sm:right-6 sm:bottom-6">
            <svg
              width="28"
              height="28"
              viewBox="0 0 32 32"
              fill="none"
              className="h-5 w-5 sm:h-7 sm:w-7"
            >
              <path
                d="M31 20v11H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Top-Right: Interactive Click-to-Pause Status Badge */}
          {/* <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 border border-black/15 bg-white/95 px-3 py-1.5 font-mono text-[8.5px] font-semibold tracking-[0.2em] uppercase shadow-xs backdrop-blur-xs transition-all duration-300 group-hover:border-black sm:top-6 sm:right-6 sm:text-[10px]">
            {isPaused ? (
              <>
                <Play className="h-3 w-3 fill-amber-600 text-amber-600" />
                <span className="text-amber-700">PAUSED // CLICK TO RESUME</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-neutral-800">MATRIX.3D // CLICK TO PAUSE</span>
              </>
            )}
          </div> */}

          {/* Bottom-Left Metadata Badge */}
          <div className="pointer-events-none absolute bottom-4 left-4 font-mono text-[8px] tracking-[0.25em] text-neutral-500 uppercase sm:bottom-6 sm:left-6 sm:text-[9.5px]">
            {isPaused
              ? "ANIMATION FROZEN • CLICK ANYWHERE TO RESUME"
              : "HOVER TO DISPERSE • CLICK ANYWHERE TO PAUSE"}
          </div>
        </div>
      </div>
    </section>
  );
};
