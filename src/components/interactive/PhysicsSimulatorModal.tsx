"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw, Flame, Wind, Play, Pause } from "lucide-react";

interface PhysicsSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  energy: number;
}

export const PhysicsSimulatorModal: React.FC<PhysicsSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [temperature, setTemperature] = useState<number>(300); // Kelvin
  const [entropy, setEntropy] = useState<number>(1.24);
  const [particleCount, setParticleCount] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const w = rect.width;
      const h = rect.height;
      const count = particleCount;
      const speedFactor = Math.sqrt(temperature / 300);

      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const speed = (0.5 + Math.random() * 2) * speedFactor;
        const angle = Math.random() * Math.PI * 2;
        newParticles.push({
          x: Math.random() * (w - 20) + 10,
          y: Math.random() * (h - 20) + 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2.5 + Math.random() * 2,
          color: "#ffffff",
          energy: speed * speed,
        });
      }
      particlesRef.current = newParticles;
    };

    initParticles();

    const render = () => {
      if (!isRunning) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Dark editorial background
      ctx.fillStyle = "rgba(10, 10, 10, 0.25)";
      ctx.fillRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 0.5;
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const particles = particlesRef.current;
      let totalKineticEnergy = 0;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < p.radius) {
          p.x = p.radius;
          p.vx *= -1;
        } else if (p.x > w - p.radius) {
          p.x = w - p.radius;
          p.vx *= -1;
        }

        if (p.y < p.radius) {
          p.y = p.radius;
          p.vy *= -1;
        } else if (p.y > h - p.radius) {
          p.y = h - p.radius;
          p.vy *= -1;
        }

        const speedSq = p.vx * p.vx + p.vy * p.vy;
        totalKineticEnergy += speedSq;

        // Draw connections between nearby particles (thermodynamic state clustering)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * (1 - dist / 45)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.fillStyle = speedSq > 5 ? "#ffffff" : "#a3a3a3";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update calculated entropy metric
      const calculatedEntropy = ((totalKineticEnergy / (particles.length || 1)) * 0.4).toFixed(2);
      setEntropy(parseFloat(calculatedEntropy));

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, temperature, particleCount, isRunning]);

  const handleHeatUp = () => {
    setTemperature((t) => Math.min(800, t + 100));
    particlesRef.current.forEach((p) => {
      p.vx *= 1.25;
      p.vy *= 1.25;
    });
  };

  const handleCoolDown = () => {
    setTemperature((t) => Math.max(50, t - 100));
    particlesRef.current.forEach((p) => {
      p.vx *= 0.8;
      p.vy *= 0.8;
    });
  };

  const handleReset = () => {
    setTemperature(300);
    setParticleCount(120);
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      particlesRef.current = Array.from({ length: 120 }, () => {
        const speed = 0.5 + Math.random() * 2;
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * (w - 20) + 10,
          y: Math.random() * (h - 20) + 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2.5 + Math.random() * 2,
          color: "#ffffff",
          energy: speed * speed,
        };
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl border-black bg-neutral-950 p-6 text-white sm:p-8">
        <DialogHeader className="border-neutral-800 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-white" />
              <DialogTitle className="font-mono text-lg tracking-widest text-white">
                VISUALIZER // THERMODYNAMIC STATE ENGINE
              </DialogTitle>
            </div>
          </div>
          <DialogDescription className="text-neutral-400">
            A minimalist web-based simulation demonstrating kinetic entropy, molecular collision
            manifolds, and state equilibria in real-time.
          </DialogDescription>
        </DialogHeader>

        {/* Canvas Display */}
        <div className="relative h-72 w-full overflow-hidden border border-neutral-800 bg-black sm:h-80">
          <canvas ref={canvasRef} className="block h-full w-full" />
          {/* Telemetry HUD */}
          <div className="absolute bottom-3 left-3 space-y-0.5 border border-neutral-800 bg-black/80 p-2 font-mono text-[10px] text-neutral-300">
            <div>
              TEMP: <span className="font-bold text-white">{temperature} K</span>
            </div>
            <div>
              ENTROPY (S): <span className="font-bold text-white">{entropy} J/K</span>
            </div>
            <div>
              PARTICLES: <span className="font-bold text-white">{particleCount}</span>
            </div>
            <div>
              EQUILIBRIUM: <span className="text-emerald-400">STABLE</span>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 pt-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="invertedOutline"
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center gap-1.5"
            >
              {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {isRunning ? "PAUSE" : "RESUME"}
            </Button>
            <Button
              variant="invertedOutline"
              size="sm"
              onClick={handleHeatUp}
              className="flex items-center gap-1.5"
            >
              <Flame className="h-3 w-3 text-amber-400" />
              HEAT (+100K)
            </Button>
            <Button
              variant="invertedOutline"
              size="sm"
              onClick={handleCoolDown}
              className="flex items-center gap-1.5"
            >
              <Wind className="h-3 w-3 text-cyan-400" />
              COOL (-100K)
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="flex items-center gap-1 text-neutral-400 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            RESET ENGINE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
