import Link from "next/link";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { ArrowLeft } from "lucide-react";
import { BlockContentRenderer } from "@/components/content/BlockContentRenderer";

import { BlogPost } from "@/types/blog";

interface BlogPostScreenProps {
  post: BlogPost;
}

export const BlogPostScreen = ({ post }: BlogPostScreenProps) => {
  return (
    <main className="flex min-h-screen w-full justify-center bg-neutral-100 px-0 py-0 sm:px-4 sm:py-6 md:px-8 lg:py-10">
      <div className="flex w-full max-w-[1240px] flex-col justify-between overflow-hidden border-0 bg-white shadow-2xl sm:border sm:border-black">
        <div>
          {/* Top Folio Strip */}
          <TopHeader
            badge={`PORTFOLIO // ${post.type.toUpperCase()}`}
            issue="ISSUE 01"
            folio="FOLIO 003"
          />

          {/* Minimal Navigation Bar */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-5 sm:px-8">
            <Link
              href="/blog"
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-black uppercase transition-opacity hover:opacity-60"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              ALL WRITINGS
            </Link>

            <nav className="flex items-center gap-6 font-mono text-xs tracking-widest uppercase">
              <Link href="/" className="transition-opacity hover:opacity-60">
                HOME
              </Link>
              <Link href="/about" className="transition-opacity hover:opacity-60">
                ABOUT
              </Link>
              <Link href="/contact" className="transition-opacity hover:opacity-60">
                CONTACT
              </Link>
            </nav>
          </div>

          {/* Distraction-Free Article Reading Spread */}
          <article className="font-editorial-body mx-auto max-w-3xl px-4 py-10 sm:px-8 sm:py-16">
            {/* Header / Meta */}
            <header className="space-y-4 border-b border-neutral-200 pb-8">
              <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                {post.date} · {post.readTime} · {post.type.toUpperCase()}
              </div>

              <h1 className="font-editorial-body text-3xl leading-[1.08] font-extrabold tracking-tight text-black uppercase sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <p className="font-editorial-body pt-1 text-base leading-relaxed text-neutral-600 sm:text-lg">
                {post.excerpt}
              </p>
            </header>

            {/* Block Body Content */}
            <div className="pt-8 sm:pt-10">
              <BlockContentRenderer content={post.content} />
            </div>

            {/* Simple Quiet Sign-Off */}
            <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-neutral-200 pt-8 font-mono text-xs text-neutral-500 sm:flex-row sm:items-center">
              <div>
                Written by <span className="font-bold text-black">Abdullah Al Maksud</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/blog" className="underline transition-colors hover:text-black">
                  Back to all writings
                </Link>
                <span>·</span>
                <Link href="/contact" className="underline transition-colors hover:text-black">
                  Contact author
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Minimal Footer */}
        <Footer
          copyright={PORTFOLIO_DATA.footer.copyright}
          rights={PORTFOLIO_DATA.footer.rights}
          socials={PORTFOLIO_DATA.footer.socials}
        />
      </div>
    </main>
  );
};
