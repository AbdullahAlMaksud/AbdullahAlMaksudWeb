import Link from "next/link";
import { Home, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream dark:bg-[#141210] flex items-center justify-center px-6">
      <div className="max-w-xl w-full">
        {/* Window chrome */}
        <div className="win overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center justify-between bg-ink dark:bg-cream px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-cream dark:text-ink" />
              <span className="font-pixel text-[10px] text-cream dark:text-ink tracking-wider">
                error_404.exe
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-orange/60" />
              <div className="w-3 h-3 bg-green/60" />
              <div className="w-3 h-3 bg-cream/30 dark:bg-ink/30" />
            </div>
          </div>

          {/* Body */}
          <div className="p-8 sm:p-12">
            {/* Glitch 404 */}
            <div className="mb-8 relative">
              <p className="font-pixel text-[72px] sm:text-[96px] leading-none text-ink/10 dark:text-cream/10 select-none absolute top-0 left-0 translate-x-[3px] translate-y-[3px] text-orange/20">
                404
              </p>
              <p className="font-pixel text-[72px] sm:text-[96px] leading-none text-ink dark:text-cream relative">
                4<span className="text-orange">0</span>4
              </p>
            </div>

            {/* Terminal output */}
            <div className="bg-ink dark:bg-[#0d0c09] p-4 mb-8 font-mono text-[13px] leading-7">
              <p className="text-green">
                <span className="text-orange">$</span> find . -path
                &quot;/requested-page&quot;
              </p>
              <p className="text-cream/50">Searching...</p>
              <p className="text-red-400">
                find: &apos;/requested-page&apos;: No such file or directory
              </p>
              <p className="text-cream/40 text-[12px] mt-2">
                Exit code: 404 — Page not found
                <span className="inline-block w-2 h-4 bg-green ml-1 align-middle animate-pulse" />
              </p>
            </div>

            <h1 className="font-pixel text-[14px] leading-8 mb-3">
              PAGE NOT FOUND<span className="text-orange">.</span>
            </h1>
            <p className="text-[13px] text-ink/60 dark:text-cream/50 leading-relaxed mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-cream px-5 py-3 text-[12px] tracking-widest transition-colors"
              >
                <Home size={13} />
                GO HOME
              </Link>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 border border-ink dark:border-cream/30 text-ink dark:text-cream hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink px-5 py-3 text-[12px] tracking-widest transition-colors"
              >
                <ArrowLeft size={13} />
                READ BLOGS
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom tag */}
        <p className="text-center text-[11px] text-ink/30 dark:text-cream/20 mt-6 tracking-widest">
          — abdullahalmaksud.com
        </p>
      </div>
    </main>
  );
}
