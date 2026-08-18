"use client";

import { Code2, BookOpen, Palette, Coffee, GraduationCap, PenLine, FlaskConical, Laptop } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TIMELINE = [
  {
    year: "2026",
    event: "Started working at Nexalyze as a Team Lead — Frontend Engineer",
    icon: Laptop,
  },
  {
    year: "2025",
    event: "Shifted into the IT industry for the first time and joined NeovoTech as a Frontend Mobile App Developer",
    icon: Code2,
  },
  {
    year: "2024",
    event: "Published my first book — `Emon Jodi Hoto : Scientific answer of stupid questions` in Bangla",
    icon: BookOpen,
  },
  {
    year: "2023",
    event: "Completed my graduation and continued growing as a writer and creator",
    icon: GraduationCap,
  },
  {
    year: "2021",
    event: "Started working with BigganChinta, exploring science communication and writing",
    icon: FlaskConical,
  },
  {
    year: "2019",
    event: "Started my journey in writing and creative expression",
    icon: PenLine,
  }
];

const DELAYS = [
  "anim-delay-0",
  "anim-delay-1",
  "anim-delay-2",
  "anim-delay-3",
  "anim-delay-4",
  "anim-delay-5",
] as const;

export function AboutSection() {
  const { ref: bioRef, isVisible: bioVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="about" className="max-w-6xl mx-auto px-6 mt-20">
      <div className="flex items-center gap-4 mb-8">
        <p className="text-[12px] tracking-widest text-ink/60">/ ABOUT ME</p>
        <div className="flex-1 h-px border-t border-dashed border-ink/20" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Bio */}
        <div
          ref={bioRef}
          className={`win p-6 ${bioVisible ? "anim-slide-left anim-delay-0" : "anim-hidden"}`}
        >
          <h2 className="font-pixel text-[18px] leading-8 mb-5">
            Who am I<span className="text-orange">?</span>
          </h2>
          <div className="space-y-4 text-[13px] text-ink/80 leading-7">
            <p>
              I&apos;m <strong>Abdullah Al Maksud</strong> — a programmer, writer,
              and designer based in Dhaka, Bangladesh. I&apos;ve been building
              digital products for over 3 years, helping startups and individuals
              turn their ideas into reality.
            </p>
            <p>
              Beyond code, I write about tech, productivity, and personal growth.
              I published my first book <em>অপেক্ষার প্রহর</em> in 2024 — a
              collection of stories rooted in everyday Bengali life.
            </p>
            <p>
              When I&apos;m not at the keyboard, you&apos;ll find me reading, sketching
              UI ideas, or sipping coffee while watching the city lights.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["React", "Next.js", "React Native", "TypeScript", "Node.js", "Figma"].map(
              (skill) => (
                <span
                  key={skill}
                  className="text-[11px] border border-ink/30 bg-cream-2 px-3 py-1 hover:border-green hover:text-green transition-colors cursor-default"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="flex flex-col justify-between min-h-full">
          {TIMELINE.map(({ year, event, icon: Icon }, i) => (
            <div
              key={i}
              className={`flex gap-4 items-start group ${
                timelineVisible ? `anim-fade-up ${DELAYS[i] ?? "anim-delay-5"}` : "anim-hidden"
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="win w-10 h-10 flex items-center justify-center shrink-0 group-hover:bg-green group-hover:border-green transition-all">
                  <Icon
                    size={16}
                    className="text-green group-hover:text-cream transition-colors"
                  />
                </div>
                {i < TIMELINE.length - 1 && (
                  <div className="w-px h-12 border-l border-dashed border-ink/30 mt-1" />
                )}
              </div>
              <div className="pt-1">
                <p className="font-pixel text-[11px] text-orange mb-1">{year}</p>
                <p className="text-[13px] text-ink/80 leading-snug">{event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
