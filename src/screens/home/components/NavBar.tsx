"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/providers/ThemeProvider";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
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
  { id: "home", label: "HOME", href: "/#home" },
  { id: "works", label: "WORKS", href: "/#works" },
  { id: "writing", label: "WRITING", href: "/#writing" },
  { id: "books", label: "BOOKS", href: "/#books" },
  { id: "about", label: "ABOUT", href: "/#about" },
  { id: "contact", label: "CONTACT", href: "/#contact" },
];

export function NavBar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  // Active section tracking on homepage via scroll
  useEffect(() => {
    if (pathname !== "/") {
      if (pathname.startsWith("/work/books")) setActiveSection("books");
      else if (pathname.startsWith("/work")) setActiveSection("works");
      else if (pathname.startsWith("/blogs")) setActiveSection("writing");
      else if (pathname.startsWith("/about")) setActiveSection("about");
      else setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["home", "works", "writing", "books", "about", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle smooth scroll or navigation
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        setPopoverOpen(false);
      }
    } else {
      setPopoverOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-light-bg/90 dark:bg-[#080A0E]/90 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.03] py-4 shadow-sm"
          : "bg-transparent border-b border-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* ========================================================
            LEFT: BRAND LOGO (M.)
        ======================================================== */}
        <Link
          href="/"
          className="group flex items-center select-none text-2xl sm:text-[26px] font-sans font-light tracking-tight text-light-text-main dark:text-white transition-opacity hover:opacity-90"
          aria-label="Abdullah Al Maksud Homepage"
        >
          <span className="font-light tracking-wider">M</span>
          <span className="text-gold font-semibold translate-y-[-1px] group-hover:scale-125 transition-transform duration-300 inline-block ml-[1px]">
            .
          </span>
        </Link>

        {/* ========================================================
            RIGHT: NAVIGATION LINKS + POPOVER MENU TRIGGER
        ======================================================== */}
        <div className="flex items-center gap-7 lg:gap-10">
          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9 text-[11px] lg:text-[12px] tracking-[0.24em] font-medium"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.id)}
                  className={`relative py-1.5 transition-colors duration-300 flex flex-col items-center group ${
                    isActive
                      ? "text-gold font-semibold"
                      : "text-slate-600 dark:text-[#8E9EB5] hover:text-light-text-main dark:hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Gold Active Dot underneath text */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(229,169,60,0.8)] animate-fade-in-up" />
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
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold/45 hover:border-gold dark:border-gold/35 dark:hover:border-gold flex items-center justify-center transition-all duration-300 hover:scale-105 bg-light-card/40 dark:bg-dark-card/40 backdrop-blur-sm shadow-sm group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              >
                {/* 3 Horizontal Lines (Hamburger icon) */}
                <div className="w-[18px] h-[14px] flex flex-col justify-between items-center">
                  <span
                    className={`block h-[1.5px] w-full bg-gold rounded-full transition-all duration-300 origin-center ${
                      popoverOpen ? "rotate-45 translate-y-[6.25px]" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full bg-gold rounded-full transition-all duration-300 ${
                      popoverOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-[1.5px] w-full bg-gold rounded-full transition-all duration-300 origin-center ${
                      popoverOpen ? "-rotate-45 -translate-y-[6.25px]" : ""
                    }`}
                  />
                </div>
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              sideOffset={14}
              className="w-[310px] sm:w-[350px] p-5 rounded-2xl border border-light-border dark:border-dark-border/80 bg-light-surface/95 dark:bg-[#0E121A]/95 shadow-2xl backdrop-blur-2xl"
            >
              {/* Popover Header */}
              <div className="flex items-center justify-between pb-4 border-b border-light-border dark:border-dark-border/60">
                <div className="flex items-center">
                  <span className="text-xl font-light tracking-wider text-light-text-main dark:text-white">
                    M
                  </span>
                  <span className="text-gold font-semibold ml-[1px]">.</span>
                  <span className="ml-2 text-[11px] tracking-wider text-slate-500 dark:text-slate-400 font-medium">
                    PORTFOLIO
                  </span>
                </div>

                {/* Theme Toggle Button */}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-8 h-8 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center text-slate-700 dark:text-slate-300 hover:border-gold hover:text-gold transition-all duration-200 bg-light-card dark:bg-dark-card"
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
              <div className="py-4 space-y-1.5 border-b border-light-border dark:border-dark-border/60">
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-400 dark:text-slate-500 uppercase mb-2">
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
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-200 ${
                          isActive
                            ? "bg-gold/10 text-gold font-bold"
                            : "text-slate-700 dark:text-slate-300 hover:bg-light-card dark:hover:bg-dark-card hover:text-gold dark:hover:text-gold"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gold/60">
                            0{idx + 1}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Quick Pages & Category Exploration */}
              <div className="py-4 space-y-2 border-b border-light-border dark:border-dark-border/60">
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-400 dark:text-slate-500 uppercase mb-2">
                  Explore Highlights
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <Link
                    href="/work/projects"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-gold dark:hover:text-gold hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                  >
                    <Code2 size={13} className="text-gold shrink-0" />
                    <span>Projects</span>
                  </Link>
                  <Link
                    href="/work/graphics"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-gold dark:hover:text-gold hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                  >
                    <Palette size={13} className="text-gold shrink-0" />
                    <span>UI &amp; Graphics</span>
                  </Link>
                  <Link
                    href="/work/books"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-gold dark:hover:text-gold hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                  >
                    <BookOpen size={13} className="text-gold shrink-0" />
                    <span>Books</span>
                  </Link>
                  <Link
                    href="/blogs"
                    onClick={() => setPopoverOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-gold dark:hover:text-gold hover:bg-light-card dark:hover:bg-dark-card transition-colors"
                  >
                    <FileText size={13} className="text-gold shrink-0" />
                    <span>Articles</span>
                  </Link>
                </div>
              </div>

              {/* Popover Footer: Socials & Talk */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <a
                    href="https://github.com/abdullahalmaksud"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={14} />
                  </a>
                  <a
                    href="https://linkedin.com/in/abdullahalmaksud"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={14} />
                  </a>
                  <a
                    href="https://twitter.com/abdullahalmaksud"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter size={14} />
                  </a>
                  <a
                    href="mailto:contact@abdullahalmaksud.com"
                    className="w-8 h-8 rounded-full border border-light-border dark:border-dark-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
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


