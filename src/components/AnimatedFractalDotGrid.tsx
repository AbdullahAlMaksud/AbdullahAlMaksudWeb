"use client";

import { useEffect, useRef, useCallback } from "react";

// Simplex-like noise helper (2D)
function hash(n: number) {
  return Math.sin(n) * 43758.5453123;
}
function noise2d(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix + iy * 57);
  const b = hash(ix + 1 + iy * 57);
  const c = hash(ix + (iy + 1) * 57);
  const d = hash(ix + 1 + (iy + 1) * 57);
  return (
    a +
    (b - a) * ux +
    (c - a) * uy +
    (a - b - c + d) * ux * uy
  );
}

type Props = {
  dotColor?: string;
  dotColorDark?: string;
  dotSize?: number;
  spacing?: number;
  waveRadius?: number;
  waveAmplitude?: number;
  glowStrength?: number;
  noiseScale?: number;
  noiseSpeed?: number;
};

export function AnimatedFractalDotGrid({
  dotSize = 1.5,
  spacing = 22,
  waveRadius = 140,
  waveAmplitude = 3.5,
  glowStrength = 6,
  noiseScale = 0.008,
  noiseSpeed = 0.0003,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafId = useRef<number>(0);
  const timeRef = useRef(0);

  const getColors = useCallback(() => {
    const isDark = document.documentElement.classList.contains("dark");
    return {
      dot: isDark ? "63,93,72" : "30,28,23",       // green-dark in dark / ink in light
      glow: isDark ? "210,87,31" : "63,93,72",      // orange in dark / green in light
      bg: isDark ? "20,18,16" : "242,237,225",      // ink-dark in dark / cream in light
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const draw = (timestamp: number) => {
      timeRef.current = timestamp * noiseSpeed;
      const { dot, glow } = getColors();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacing;
          const baseY = r * spacing;

          // Fractal noise offset
          const n = noise2d(baseX * noiseScale + timeRef.current, baseY * noiseScale + timeRef.current);
          const nx = noise2d(baseX * noiseScale + 100, baseY * noiseScale + timeRef.current * 0.7);

          const x = baseX + nx * 4;
          const y = baseY + n * 4;

          // Distance from cursor
          const dx = x - mouse.current.x;
          const dy = y - mouse.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Wave ripple
          const wave = dist < waveRadius
            ? Math.cos((dist / waveRadius) * Math.PI * 0.5) * waveAmplitude
            : 0;

          const px = x + (dist < waveRadius ? (dx / (dist || 1)) * wave : 0);
          const py = y + (dist < waveRadius ? (dy / (dist || 1)) * wave : 0);

          // Size pulse near cursor
          const nearCursor = dist < waveRadius;
          const sizeMult = nearCursor ? 1 + (1 - dist / waveRadius) * 1.8 : 1;
          const radius = dotSize * sizeMult;
          const alpha = nearCursor ? 0.7 + (1 - dist / waveRadius) * 0.3 : 0.25 + Math.abs(n) * 0.25;

          // Glow near cursor
          if (nearCursor && dist < waveRadius * 0.6) {
            ctx.shadowColor = `rgba(${glow},${(1 - dist / (waveRadius * 0.6)) * 0.6})`;
            ctx.shadowBlur = glowStrength;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dot},${alpha})`;
          ctx.fill();
        }
      }

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [dotSize, spacing, waveRadius, waveAmplitude, glowStrength, noiseScale, noiseSpeed, getColors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}
