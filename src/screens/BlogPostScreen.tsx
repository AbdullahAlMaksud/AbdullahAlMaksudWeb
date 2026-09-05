import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { TopHeader } from "@/components/layout/TopHeader";
import { Footer } from "@/components/layout/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { ArrowLeft } from "lucide-react";

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

            {/* Markdown Body Content */}
            <div className="pt-8 sm:pt-10">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="font-editorial-body mt-8 mb-4 text-2xl font-bold tracking-tight text-black uppercase sm:text-3xl">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h3 className="font-editorial-body mt-8 mb-3 text-xl font-bold tracking-tight text-black uppercase sm:text-2xl">
                      {children}
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="font-editorial-body mt-6 mb-2.5 text-lg font-bold tracking-tight text-black uppercase sm:text-xl">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="font-editorial-body mb-6 text-[16px] leading-[1.8] text-neutral-800 sm:text-[17px]">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-editorial-body font-bold text-black">{children}</strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="font-editorial-body my-5 list-disc space-y-2.5 pl-5 text-[16px] leading-[1.7] text-neutral-800 marker:text-neutral-400">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="font-editorial-body my-5 list-decimal space-y-3 pl-5 text-[16px] leading-[1.7] text-neutral-800 marker:font-mono marker:text-neutral-500">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="pl-1 leading-relaxed">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="font-editorial-body my-8 border-l-2 border-black pl-5 text-lg leading-relaxed text-neutral-800 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-xs text-neutral-900">
                      {children}
                    </code>
                  ),
                }}
              >
                {post.content.trim()}
              </ReactMarkdown>
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
