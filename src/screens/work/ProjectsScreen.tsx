"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/screens/home/components/NavBar";
import { Footer } from "@/screens/home/components/Footer";
import { AppProjectCard } from "@/components/cards/AppProjectCard";
import { useProjectsQuery } from "@/services";

export function ProjectsScreen() {
  const { data: serverProjects } = useProjectsQuery();

  const projects = Array.isArray(serverProjects) ? serverProjects : [];

  return (
    <main className="min-h-screen bg-light-bg text-slate-900 transition-colors duration-300 dark:bg-dark-bg dark:text-white">
      <NavBar />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-28 sm:px-10">
        {/* Breadcrumb */}
        <Link
          href="/work"
          className="mb-12 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 transition-colors hover:text-gold dark:text-slate-400 dark:hover:text-gold"
        >
          <ArrowLeft size={14} />
          <span>BACK TO WORKS</span>
        </Link>

        {/* Header */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Applications &amp; Tooling
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Software <span className="text-gold">Projects</span>
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            A comprehensive list of full-stack web applications, mobile apps, developer utilities,
            and platforms I have engineered.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p: any) => (
            <AppProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              description={p.description}
              image={p.coverImage || p.image || "/images/projects/devtools.jpg"}
              tags={p.stack || p.tags || []}
              year={p.year || "2025"}
              link={p.liveLink || p.link}
              github={p.gitRepo || p.github}
              category={p.tag || p.category || "Web Application"}
              featured={p.isFeatured || p.featured}
            />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
