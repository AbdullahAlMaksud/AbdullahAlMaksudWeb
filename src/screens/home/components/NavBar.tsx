"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  Sun,
  Moon,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code2,
  BookOpen,
  Palette,
  FileText,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "HOME", href: "/" },
  { id: "works", label: "WORKS", href: "/work" },
  { id: "writing", label: "WRITING", href: "/blogs" },
  { id: "books", label: "BOOKS", href: "/work/books" },
  { id: "about", label: "ABOUT", href: "/about" },
  { id: "contact", label: "CONTACT", href: "/#contact" },
];

export function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  // Active section tracking & scroll detection across pages
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname === "/" || pathname === "/home") {
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          const rect = contactEl.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection("contact");
            return;
          }
        }
        setActiveSection("home");
      }
    };

    if (pathname !== "/" && pathname !== "/home") {
      if (pathname.startsWith("/work/books")) setActiveSection("books");
      else if (pathname.startsWith("/work")) setActiveSection("works");
      else if (pathname.startsWith("/blogs")) setActiveSection("writing");
      else if (pathname.startsWith("/about")) setActiveSection("about");
      else setActiveSection("");
    } else {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle smooth scroll or navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    setPopoverOpen(false);

    if (pathname === "/" || pathname === "/home") {
      if (href === "/" || href === "/home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
      } else if (href.startsWith("/#") || href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.replace(/^\/?#/, "");
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(targetId);
        }
      }
    }
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/[0.05] bg-light-bg/90 py-4 shadow-sm backdrop-blur-md dark:border-white/[0.03] dark:bg-[#080A0E]/90"
          : "border-b border-transparent bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
        {/* ========================================================
            LEFT: BRAND LOGO (M.)
        ======================================================== */}
        <Link
          href="/"
          className="text-light-text-main group flex select-none items-center font-sans text-2xl font-light tracking-tight transition-opacity hover:opacity-90 dark:text-white sm:text-[26px]"
          aria-label="Abdullah Al Maksud Homepage"
        >
          <span className="font-light tracking-wider">M</span>
          <span className="ml-[1px] inline-block translate-y-[-1px] font-semibold text-gold transition-transform duration-300 group-hover:scale-125">
            .
          </span>
        </Link>

        {/* ========================================================
            RIGHT: NAVIGATION LINKS + POPOVER MENU TRIGGER
        ======================================================== */}
        <div className="flex items-center gap-7 lg:gap-10">
          {/* Desktop Navigation Links */}
          <nav
            className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.24em] md:flex lg:gap-9 lg:text-[12px]"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`group relative flex flex-col items-center py-1.5 transition-colors duration-300 ${
                    isActive
                      ? "font-semibold text-gold"
                      : "hover:text-light-text-main text-slate-600 dark:text-[#8E9EB5] dark:hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Gold Active Dot underneath text */}
                  {isActive && (
                    <span className="animate-fade-in-up absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ========================================================
              SHADCN POPOVER (Circular Menu Button as Trigger)
          ======================================================== */}
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen} modal={false}>
            <PopoverTrigger asChild>
              <button
                aria-label={popoverOpen ? "Close menu" : "Open menu"}
                aria-expanded={popoverOpen}
                className="group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-light-card/40 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 dark:border-gold/35 dark:bg-dark-card/40 dark:hover:border-gold sm:h-11 sm:w-11"
              >
                {/* 3 Horizontal Lines (Hamburger icon) */}
                <div className="flex h-[14px] w-[18px] flex-col items-center justify-between">
                  <span
                    className={`block h-[1.5px] w-full origin-center rounded-full bg-gold transition-all duration-300 ${
                      popoverOpen ? "translate-y-[6.25px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full rounded-full bg-gold transition-all duration-300 ${
                      popoverOpen ? "scale-x-0 opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full origin-center rounded-full bg-gold transition-all duration-300 ${
                      popoverOpen ? "-translate-y-[6.25px] -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={14}
              className="w-[310px] rounded-2xl border border-light-border bg-light-surface/95 p-5 shadow-2xl backdrop-blur-2xl dark:border-dark-border/80 dark:bg-[#0E121A]/95 sm:w-[350px]"
            >
              {/* Popover Header */}
              <div className="flex items-center justify-between border-b border-light-border pb-4 dark:border-dark-border/60">
                <div className="flex items-center">
                  <span className="text-light-text-main text-xl font-light tracking-wider dark:text-white">
                    M
                  </span>
                  <span className="ml-[1px] font-semibold text-gold">.</span>
                  <span className="ml-2 text-[11px] font-medium tracking-wider text-slate-500 dark:text-slate-400">
                    PORTFOLIO
                  </span>
                </div>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-light-border bg-light-card text-slate-700 transition-all duration-200 hover:border-gold hover:text-gold dark:border-dark-border dark:bg-dark-card dark:text-slate-300"
                  aria-label="Toggle theme"
                  title="Toggle light/dark theme"
                >
                  {theme === "dark" ? (
                    <Sun size={15} className="text-gold" />
                  ) : (
                    <Moon size={15} className="text-slate-800" />
                  )}
                </button>
              </div>

              {/* Mobile Navigation List (Visible on smaller screens or quick jump) */}
              <div className="space-y-1.5 border-b border-light-border py-4 dark:border-dark-border/60">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  Navigation
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = activeSection === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href, item.id)}
                        className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 ${
                          isActive
                            ? "bg-gold/10 font-bold text-gold"
                            : "text-slate-700 hover:bg-light-card hover:text-gold dark:text-slate-300 dark:hover:bg-dark-card dark:hover:text-gold"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-gold/60">0{idx + 1}</span>
                          <span>{item.label}</span>
                        </span>
                        {isActive && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Pages & Category Exploration */}
              <div className="space-y-2 border-b border-light-border py-4 dark:border-dark-border/60">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                  Explore Highlights
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <Link
                    href="/work/projects"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-light-card hover:text-gold dark:text-slate-400 dark:hover:bg-dark-card dark:hover:text-gold"
                  >
                    <Code2 size={13} className="shrink-0 text-gold" />
                    <span>Projects</span>
                  </Link>
                  <Link
                    href="/work/graphics"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-light-card hover:text-gold dark:text-slate-400 dark:hover:bg-dark-card dark:hover:text-gold"
                  >
                    <Palette size={13} className="shrink-0 text-gold" />
                    <span>UI &amp; Graphics</span>
                  </Link>
                  <Link
                    href="/work/books"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-light-card hover:text-gold dark:text-slate-400 dark:hover:bg-dark-card dark:hover:text-gold"
                  >
                    <BookOpen size={13} className="shrink-0 text-gold" />
                    <span>Books</span>
                  </Link>
                  <Link
                    href="/blogs"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-slate-600 transition-colors hover:bg-light-card hover:text-gold dark:text-slate-400 dark:hover:bg-dark-card dark:hover:text-gold"
                  >
                    <FileText size={13} className="shrink-0 text-gold" />
                    <span>Articles</span>
                  </Link>
                </div>
              </div>

              {/* Popover Footer: Socials & Talk */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <a
                    href="https://github.com/abdullahalmaksud"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-light-border transition-colors hover:border-gold hover:text-gold dark:border-dark-border"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="https://linkedin.com/in/abdullahalmaksud"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-light-border transition-colors hover:border-gold hover:text-gold dark:border-dark-border"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a
                    href="https://twitter.com/abdullahalmaksud"
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-light-border transition-colors hover:border-gold hover:text-gold dark:border-dark-border"
                    aria-label="Twitter"
                  >
                    <Twitter size={14} />
                  </a>
                  <a
                    href="mailto:contact@abdullahalmaksud.com"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-light-border transition-colors hover:border-gold hover:text-gold dark:border-dark-border"
                    aria-label="Email"
                  >
                    <Mail size={14} />
                  </a>
                </div>

                <a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact", "contact")}
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-gold hover:underline"
                >
                  <span>LET&apos;S TALK</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
