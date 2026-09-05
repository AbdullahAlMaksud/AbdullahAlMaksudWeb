import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BlogListCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  type: string;
}

export const BlogListCard = ({ slug, title, excerpt, date, readTime, type }: BlogListCardProps) => {
  const actionText = `READ ${type.toUpperCase()} →`;

  return (
    <article className="group grid w-full grid-cols-1 items-start gap-4 pt-8 first:pt-0 md:grid-cols-12 md:gap-8">
      {/* Left Meta (Col-span 3) */}
      <div className="font-mono text-[11px] font-medium tracking-widest text-neutral-400 uppercase md:col-span-3">
        <div>{date}</div>
        <div className="font-semibold text-neutral-500">{readTime}</div>
      </div>

      {/* Right Full-Width Content (Col-span 9) */}
      <div className="space-y-2 md:col-span-9">
        <Link href={`/blog/${slug}`} className="block">
          <h2 className="flex items-center justify-between gap-3 font-sans text-lg leading-snug font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-600 sm:text-xl md:text-2xl">
            <span>{title}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
          </h2>
        </Link>

        <p className="font-editorial-body max-w-4xl text-sm leading-relaxed text-neutral-700 sm:text-base">
          {excerpt}
        </p>

        <div className="pt-1">
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-black uppercase hover:underline"
          >
            <span>{actionText}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
