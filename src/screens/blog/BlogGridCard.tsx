import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface BlogGridCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  type: string;
  isLead: boolean;
  isSecondary: boolean;
  index: number;
}

export const BlogGridCard = ({
  slug,
  title,
  excerpt,
  date,
  readTime,
  type,
  isLead,
  isSecondary,
  index,
}: BlogGridCardProps) => {
  const actionText = `READ ${type.toUpperCase()}`;

  return (
    <article
      className={`group flex h-full flex-col justify-between space-y-4 ${
        index % 4 !== 0 ? "border-neutral-200 pt-6 sm:border-l sm:pt-0 sm:pl-6 lg:pl-8" : ""
      }`}
    >
      <div className="space-y-3">
        {/* Monospace Metadata */}
        <div className="flex items-center justify-between font-mono text-[10px] font-semibold tracking-widest text-neutral-400 uppercase">
          <span>{date}</span>
          <span>{readTime}</span>
        </div>

        {/* Varied Newspaper Headline */}
        <Link href={`/blog/${slug}`} className="block">
          <h2
            className={`font-sans leading-tight font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-600 ${
              isLead
                ? "text-xl sm:text-2xl"
                : isSecondary
                  ? "text-lg sm:text-xl"
                  : "text-base sm:text-lg"
            }`}
          >
            {title}
          </h2>
        </Link>

        {/* Excerpt with Editorial Serif */}
        <p
          className={`font-editorial-body leading-relaxed text-neutral-700 ${
            isLead ? "text-sm sm:text-base" : "text-xs sm:text-sm"
          }`}
        >
          {excerpt}
        </p>
      </div>

      {/* Dynamic Action Link */}
      <div className="pt-2">
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1 font-mono text-xs font-bold text-black uppercase transition-transform group-hover:translate-x-1"
        >
          <span>{actionText}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black" />
        </Link>
      </div>
    </article>
  );
};
