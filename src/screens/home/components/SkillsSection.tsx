"use client";

import { Terminal, PenLine, Pencil } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SKILLS = [
  {
    icon: Terminal,
    title: "PROGRAMMER",
    desc: "Building scalable, performant and user-friendly applications.",
  },
  {
    icon: PenLine,
    title: "WRITER",
    desc: "Writing blogs and books on tech, productivity and life.",
  },
  {
    icon: Pencil,
    title: "DESIGNER",
    desc: "Designing clean, modern and meaningful digital experiences.",
  },
];

const DELAY_MAP = ["anim-delay-0", "anim-delay-1", "anim-delay-2"] as const;

export function SkillsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 mt-20">
      <div className="win grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-ink/30">
        {SKILLS.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={title}
            className={`p-6 flex gap-4 items-start group ${
              isVisible ? `anim-fade-up ${DELAY_MAP[i]}` : "anim-hidden"
            }`}
          >
            <div
              className="win w-14 h-14 flex items-center justify-center shrink-0 transition-all group-hover:bg-green group-hover:border-green"
              style={{ boxShadow: "3px 3px 0 0 #1e1c17" }}
            >
              <Icon
                size={22}
                className="text-green group-hover:text-cream transition-colors"
              />
            </div>
            <div>
              <h3 className="text-[13px] font-semibold tracking-wide">{title}</h3>
              <p className="text-[13px] text-ink/70 mt-1 leading-snug">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
