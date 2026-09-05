"use client";

import React, { useEffect, useRef } from "react";

interface WireframeCanvasProps {
  className?: string;
}

export const WireframeCanvas: React.FC<WireframeCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      mouseY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    // 3D Point projection helper
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    const project = (
      p: Point3D,
      cx: number,
      cy: number,
      scale: number,
      rotX: number,
      rotY: number
    ): [number, number] => {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      const fov = 400;
      const factor = fov / (fov + z2 + 200);
      return [cx + x1 * scale * factor, cy + y2 * scale * factor];
    };

    // Draw Wireframe Cube
    const drawCube = (
      cx: number,
      cy: number,
      size: number,
      rotX: number,
      rotY: number,
      color: string,
      lineWidth = 1
    ) => {
      const s = size / 2;
      const vertices: Point3D[] = [
        { x: -s, y: -s, z: -s },
        { x: s, y: -s, z: -s },
        { x: s, y: s, z: -s },
        { x: -s, y: s, z: -s },
        { x: -s, y: -s, z: s },
        { x: s, y: -s, z: s },
        { x: s, y: s, z: s },
        { x: -s, y: s, z: s },
      ];

      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      const proj = vertices.map((v) => project(v, cx, cy, 1, rotX, rotY));

      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      edges.forEach(([i, j]) => {
        ctx.moveTo(proj[i][0], proj[i][1]);
        ctx.lineTo(proj[j][0], proj[j][1]);
      });
      ctx.stroke();

      // Draw subtle vertex nodes
      ctx.fillStyle = "#ffffff";
      proj.forEach(([x, y]) => {
        ctx.fillRect(x - 1, y - 1, 2, 2);
      });
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, w, h);

      // Draw perspective grid plane floor
      const gridY = h * 0.78;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.lineWidth = 0.8;

      // Perspective horizon lines
      for (let i = 0; i < 9; i++) {
        const yRatio = Math.pow(i / 8, 2);
        const y = gridY + yRatio * (h - gridY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Perspective radial lines converging towards center
      const vanishingX = w / 2;
      const vanishingY = h * 0.45;
      for (let x = -w * 0.5; x <= w * 1.5; x += 35) {
        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      angle += 0.01;
      const targetRotX = 0.4 + mouseY * 0.25;
      const targetRotY = angle + mouseX * 0.5;

      const centerX = w * 0.5;
      const centerY = h * 0.42;

      // Main central wireframe cube
      drawCube(centerX, centerY, 70, targetRotX, targetRotY, "rgba(255, 255, 255, 0.85)", 1.2);

      // Satellite surrounding smaller cubes
      const sat1X = centerX + Math.cos(angle * 1.2) * 55;
      const sat1Y = centerY + Math.sin(angle * 1.2) * 20 - 15;
      drawCube(
        sat1X,
        sat1Y,
        32,
        targetRotX * 1.2,
        -targetRotY * 1.5,
        "rgba(255, 255, 255, 0.5)",
        0.9
      );

      const sat2X = centerX - Math.cos(angle * 0.9) * 60;
      const sat2Y = centerY - Math.sin(angle * 0.9) * 25 + 10;
      drawCube(sat2X, sat2Y, 28, -targetRotX, targetRotY * 0.8, "rgba(255, 255, 255, 0.4)", 0.8);

      const sat3X = centerX + Math.sin(angle * 0.7) * 45;
      const sat3Y = centerY - 45;
      drawCube(
        sat3X,
        sat3Y,
        24,
        targetRotX * 0.7,
        targetRotY * 1.4,
        "rgba(255, 255, 255, 0.35)",
        0.7
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`relative w-full overflow-hidden bg-black ${className || "h-72 sm:h-80 lg:h-[320px]"}`}
    >
      <canvas ref={canvasRef} className="block h-full w-full cursor-crosshair" />
      <div className="absolute top-2 right-2 border border-white/10 bg-black/60 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-neutral-500 uppercase">
        3D GRID // INTERACTIVE
      </div>
    </div>
  );
};
