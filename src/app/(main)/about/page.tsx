import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Calendar,
  Code2,
  Coffee,
  Download,
  Mail,
  Sparkles,
  BookOpen,
  Palette,
  Terminal,
  Layers,
  Cpu,
  Globe,
  Database,
  Smartphone,
} from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";

export const metadata: Metadata = {
  title: "About — Abdullah Al Maksud",
  description:
    "Learn about Abdullah Al Maksud — Full-Stack Developer, UI/UX Designer, and Writer from Bangladesh.",
};

const SKILLS_CATEGORIES = [
  {
    title: "Frontend & Mobile",
    icon: Smartphone,
    skills: ["Next.js", "React.js", "React Native", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
  },
  {
    title: "Backend & Cloud",
    icon: Database,
    skills: ["Node.js", "Express", "RESTful APIs", "MongoDB", "PostgreSQL", "Prisma", "Vercel", "Firebase"],
  },
  {
    title: "Design & Creative",
    icon: Palette,
    skills: ["UI/UX Design", "Figma", "Design Systems", "Typography", "Visual Identity", "Photoshop", "Illustrator"],
  },
  {
    title: "Tools & Workflow",
    icon: Terminal,
    skills: ["Git & GitHub", "Docker", "Postman", "Bun / Node", "Linux", "VS Code", "CI/CD"],
  },
];

const TIMELINE = [
  {
    year: "2025 — Present",
    role: "Senior Full-Stack Developer & Designer",
    company: "Independent / Digital Products",
    description:
      "Architecting scalable web applications, developer tooling suites (DevTools), and creating high-impact visual design identities.",
  },
  {
    year: "2024 — 2025",
    role: "Author & Tech Writer",
    company: "GyanKosh Prakashoni",
    description:
      "Published popular science and curiosity book 'এমন যদি হতো', breaking down astrophysics and science into relatable narratives.",
  },
  {
    year: "2021 — 2024",
    role: "Full-Stack Engineer",
    company: "Product Studio & Freelance",
    description:
      "Built responsive mobile and web applications with React, Next.js, and Node.js for clients across Bangladesh and global markets.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          <span>HOME</span>
        </Link>

        {/* ========================================================
            HERO SECTION: PORTRAIT & INTRO
        ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Gold Glow Behind */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-gold/30 via-transparent to-gold/10 rounded-3xl blur-xl opacity-60" />

              <div className="relative rounded-3xl border border-slate-300 dark:border-dark-border bg-gradient-to-b from-light-surface via-light-card to-light-surface dark:from-[#0E131E] dark:via-[#121826] dark:to-[#0A0E17] p-4 overflow-hidden shadow-2xl">
                <div className="relative w-full h-[400px] sm:h-[460px] flex items-end justify-center rounded-2xl overflow-hidden bg-slate-950/40">
                  <Image
                    src="/images/portrait.png"
                    alt="Abdullah Al Maksud"
                    fill
                    priority
                    className="object-contain object-bottom filter contrast-110 drop-shadow-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0E17] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold inline-block" />
              <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                About Me
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Curious mind.
              <br />
              Creative soul.
              <br />
              <span className="text-gold">Code in hand.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Hello! I&apos;m <span className="font-semibold text-slate-900 dark:text-white">Abdullah Al Maksud</span>, a full-stack developer, UI/UX designer, and author based in Bangladesh. I love turning complex problems into elegant, fast, and thoughtful digital experiences.
            </p>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
              Whether building high-performance web apps with Next.js, crafting pixel-perfect interfaces with meticulous attention to detail, or writing books and articles that spark curiosity—I care deeply about craftsmanship and impact.
            </p>

            {/* Handwritten Signature */}
            <div className="py-2">
              <span className="font-cursive text-5xl text-gold/90 select-none">
                Maksud
              </span>
            </div>

            {/* 4 Info Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018]">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Based in Bangladesh</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018]">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Calendar size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">5+ Years Experience</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018]">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Code2 size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Building • Writing • Designing</span>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-dark-border bg-light-surface dark:bg-[#0C1018]">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Coffee size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Always learning</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/CV of Abdullah Al Maksud.pdf"
                target="_blank"
                download
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-bold text-xs tracking-wider transition-all duration-300 shadow-md hover:scale-105"
              >
                <Download size={15} />
                <span>DOWNLOAD CV</span>
              </a>

              <Link
                href="mailto:contact@abdullahalmaksud.com"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-slate-400 dark:border-dark-border hover:border-gold dark:hover:border-gold bg-light-surface dark:bg-[#131824] hover:bg-gold/10 text-slate-800 dark:text-white font-bold text-xs tracking-wider transition-all duration-300"
              >
                <Mail size={15} />
                <span>GET IN TOUCH</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================
            4 CORE PILLARS
        ======================================================== */}
        <div className="mb-24 space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                What I Do
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Crafting at the intersection of engineering &amp; design
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 space-y-4 card-hover-glow">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Code2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Web &amp; App Engineering
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Building scalable, lightning-fast web applications and mobile apps with Next.js, TypeScript, and modern APIs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 space-y-4 card-hover-glow">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Palette size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                UI/UX &amp; Brand Design
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Designing cohesive brand identities, modern design systems, and delightful interfaces with rich micro-animations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 space-y-4 card-hover-glow">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <BookOpen size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Writing &amp; Authorship
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Author of popular science book &apos;এমন যদি হতো&apos; and thought pieces on software craft, mindset, and productivity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 space-y-4 card-hover-glow">
              <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Cpu size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Developer Tooling
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Creating intuitive utilities, open-source modules, and productivity platforms that make engineers&apos; workflows effortless.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            SKILLS & TECH STACK
        ======================================================== */}
        <div className="mb-24 space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                Technical Expertise
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Technologies &amp; Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS_CATEGORIES.map(({ title, icon: Icon, skills }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] text-slate-700 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            EXPERIENCE TIMELINE
        ======================================================== */}
        <div className="mb-24 space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
              <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                Career Journey
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Experience &amp; Milestones
            </h2>
          </div>

          <div className="space-y-6">
            {TIMELINE.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-6 sm:p-8 card-hover-glow flex flex-col sm:flex-row sm:items-start justify-between gap-6"
              >
                <div className="space-y-2 max-w-xl">
                  <span className="text-xs font-bold text-gold tracking-widest uppercase">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {item.company}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                    {item.description}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] flex items-center justify-center text-gold shrink-0">
                  <Sparkles size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            BOTTOM CONTACT CTA
        ======================================================== */}
        <div className="relative rounded-3xl border border-slate-300 dark:border-dark-border bg-gradient-to-br from-light-surface via-light-card to-light-surface dark:from-[#0E131E] dark:via-[#121826] dark:to-[#0A0E17] p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#151D2C] flex items-center justify-center text-gold shadow-md">
                <Mail size={22} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Want to build something <span className="text-gold">extraordinary</span> together?
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-lg">
                I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end items-center">
              <Link
                href="mailto:contact@abdullahalmaksud.com"
                className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gold hover:bg-gold-light text-slate-950 font-bold tracking-widest text-xs transition-all duration-300 shadow-xl hover:scale-105"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
