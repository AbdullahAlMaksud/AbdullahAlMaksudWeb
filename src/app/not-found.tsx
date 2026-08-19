import Link from "next/link";
import { Home, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-cream flex min-h-screen items-center justify-center px-6 dark:bg-[#141210]">
      <div className="w-full max-w-xl">
        {/* Window chrome */}
        <div className="win overflow-hidden">
          {/* Title bar */}
          <div className="bg-ink dark:bg-cream flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-cream dark:text-ink" />
              <span className="font-pixel text-cream dark:text-ink text-[10px] tracking-wider">
                error_404.exe
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="bg-orange/60 h-3 w-3" />
              <div className="bg-green/60 h-3 w-3" />
              <div className="bg-cream/30 dark:bg-ink/30 h-3 w-3" />
            </div>
          </div>

          {/* Body */}
          <div className="p-8 sm:p-12">
            {/* Glitch 404 */}
            <div className="relative mb-8">
              <p className="font-pixel text-ink/10 dark:text-cream/10 text-orange/20 absolute left-0 top-0 translate-x-[3px] translate-y-[3px] select-none text-[72px] leading-none sm:text-[96px]">
                404
              </p>
              <p className="font-pixel text-ink dark:text-cream relative text-[72px] leading-none sm:text-[96px]">
                4<span className="text-orange">0</span>4
              </p>
            </div>

            {/* Terminal output */}
            <div className="bg-ink mb-8 p-4 font-mono text-[13px] leading-7 dark:bg-[#0d0c09]">
              <p className="text-green">
                <span className="text-orange">$</span> find . -path &quot;/requested-page&quot;
              </p>
              <p className="text-cream/50">Searching...</p>
              <p className="text-red-400">
                find: &apos;/requested-page&apos;: No such file or directory
              </p>
              <p className="text-cream/40 mt-2 text-[12px]">
                Exit code: 404 — Page not found
                <span className="bg-green ml-1 inline-block h-4 w-2 animate-pulse align-middle" />
              </p>
            </div>

            <h1 className="font-pixel mb-3 text-[14px] leading-8">
              PAGE NOT FOUND<span className="text-orange">.</span>
            </h1>
            <p className="text-ink/60 dark:text-cream/50 mb-8 text-[13px] leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
              you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="bg-green hover:bg-green-dark text-cream inline-flex items-center gap-2 px-5 py-3 text-[12px] tracking-widest transition-colors"
              >
                <Home size={13} />
                GO HOME
              </Link>
              <Link
                href="/blogs"
                className="border-ink dark:border-cream/30 text-ink dark:text-cream hover:bg-ink hover:text-cream dark:hover:bg-cream dark:hover:text-ink inline-flex items-center gap-2 border px-5 py-3 text-[12px] tracking-widest transition-colors"
              >
                <ArrowLeft size={13} />
                READ BLOGS
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom tag */}
        <p className="text-ink/30 dark:text-cream/20 mt-6 text-center text-[11px] tracking-widest">
          — abdullahalmaksud.com
        </p>
      </div>
    </main>
  );
}
