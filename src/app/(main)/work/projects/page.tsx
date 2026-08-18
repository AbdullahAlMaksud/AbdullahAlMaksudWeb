import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Code2 } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects — Abdullah Al Maksud",
  description: "All web and mobile software projects built by Abdullah Al Maksud.",
};

export default function ProjectsPage() {
  const { projects } = projectsData;

  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg text-slate-900 dark:text-white transition-colors duration-300">
      <NavBar />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          <span>BACK TO WORKS</span>
        </Link>

        {/* Header */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold inline-block" />
            <span className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
              Applications &amp; Tooling
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Software <span className="text-gold">Projects</span>
          </h1>

          <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            A comprehensive list of full-stack web applications, mobile apps, developer utilities, and platforms I have engineered.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
