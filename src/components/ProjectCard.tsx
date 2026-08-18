import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

type ProjectCardProps = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  imageBg?: string;
  barColor?: string;
  image?: string;
  link?: string;
  github?: string;
  year?: string;
};

export function ProjectCard({
  index,
  title,
  description,
  tags,
  image = "/images/projects/devtools.jpg",
  link,
  github,
  year = "2025",
}: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-[#0C1018] p-5 sm:p-6 space-y-4 card-hover-glow transition-all duration-300">
      {/* Mockup Preview */}
      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-dark-border">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

        {/* Index Tag */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-dark-bg/80 backdrop-blur-md text-gold border border-gold/30">
          {index}
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h3>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {year}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 pt-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-slate-200 dark:border-dark-border bg-light-card dark:bg-[#131824] text-slate-700 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Links */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-dark-border">
        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
        ) : <span />}

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline"
          >
            <span>Live Demo</span>
            <ArrowUpRight size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
