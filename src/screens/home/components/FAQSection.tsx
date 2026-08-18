"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQS = [
  {
    q: "Are you available for freelance projects?",
    a: "Yes! I'm currently open to freelance and full-time opportunities. Feel free to reach out via the contact form below.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "I work primarily with React, Next.js, React Native, and TypeScript. For backend I use Node.js and Python, and I design in Figma.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on the scope. A simple landing page takes 1–2 weeks, while a full-scale app could take 2–3 months. I always provide a clear timeline before starting.",
  },
  {
    q: "Do you also do UI/UX design?",
    a: "Absolutely. I handle the full stack — from wireframes and visual design in Figma to the final production-ready code.",
  },
  {
    q: "Where can I buy your book?",
    a: "অপেক্ষার প্রহর is available on Rokomari.com and selected book fairs. You can also reach out to me directly for a signed copy.",
  },
  {
    q: "Can I collaborate with you on an open-source project?",
    a: "I love open-source! Drop me a message or open an issue on my GitHub. I'm always happy to collaborate on meaningful projects.",
  },
];

const DELAYS = [
  "anim-delay-0",
  "anim-delay-1",
  "anim-delay-2",
  "anim-delay-3",
  "anim-delay-4",
  "anim-delay-5",
] as const;

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`win transition-all ${open ? "bg-cream-2" : "bg-cream hover:bg-cream-2"}`}
    >
      <button
        className="w-full flex items-center justify-between p-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[13px] font-semibold leading-snug">{q}</span>
        <span className="shrink-0 text-green transition-transform duration-300" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <ChevronDown size={16} />
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-dashed border-ink/20 animate-[fadeUp_0.3s_ease_both]">
          <p className="text-[13px] text-ink/70 leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.05 });

  return (
    <section id="faq" ref={ref} className="max-w-6xl mx-auto px-6 mt-20">
      <div className={`flex items-center gap-4 mb-8 ${isVisible ? "anim-fade-up anim-delay-0" : "anim-hidden"}`}>
        <p className="text-[12px] tracking-widest text-ink/60">/ FAQ</p>
        <div className="flex-1 h-px border-t border-dashed border-ink/20" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {FAQS.map((faq, i) => (
          <div
            key={i}
            className={isVisible ? `anim-fade-up ${DELAYS[i] ?? "anim-delay-5"}` : "anim-hidden"}
          >
            <FAQItem {...faq} />
          </div>
        ))}
      </div>
    </section>
  );
}
