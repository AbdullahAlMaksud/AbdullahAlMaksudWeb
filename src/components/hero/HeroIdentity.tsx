"use client";

import React from "react";
import Link from "next/link";
import { NavItem } from "@/types/portfolio";
import {
  ArrowUpRight,
  ChevronDown,
  Code2,
  BookOpen,
  Layers,
  Sparkles,
  FileText,
  Menu,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeroIdentityProps {
  name: string;
  role: string;
  subRole: string;
  navItems: NavItem[];
  onOpenContactModal?: () => void;
}

export const HeroIdentity: React.FC<HeroIdentityProps> = ({
  name,
  role,
  subRole,
  navItems,
  onOpenContactModal,
}) => {
  return (
    <section className="w-full border-b border-black/20 bg-white">
      <div className="mx-auto space-y-0 px-4 pt-5 sm:space-y-0 sm:px-8 sm:pt-10">
        {/* Top Masthead Header Row */}
        <div className="flex items-start justify-between gap-4 border-b-0 pb-0 md:flex-row md:items-end md:gap-8 md:border-b md:border-neutral-200 md:pb-8">
          {/* Left: Two-Tier Name (Abdullah Al on top smaller, MAQSUD big below) */}
          <div className="flex flex-col justify-start space-y-2 pb-8">
            <span className="font-sans text-lg leading-none font-bold tracking-[0.2em] text-neutral-800 uppercase sm:text-3xl">
              ABDULLAH AL
            </span>

            <h1 className="font-sans text-4xl leading-[0.88] font-extrabold tracking-tight text-black uppercase sm:text-6xl md:text-7xl">
              MAKSUD
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2 font-mono text-[11px] font-semibold tracking-[0.2em] text-neutral-800 uppercase sm:text-xs">
              <span className="font-bold text-black">{role}</span>
              <span className="text-neutral-400">//</span>
              <span className="text-neutral-600">{subRole}</span>
            </div>
          </div>

          {/* Mobile Navigation Trigger: Minimalist Drawer/Sheet (Visible only on mobile < md) */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open Navigation Directory"
                  className="flex cursor-pointer items-center gap-2 border border-black bg-black px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-white uppercase shadow-xs transition-colors hover:bg-neutral-800 active:scale-95"
                >
                  <Menu className="h-3.5 w-3.5" />
                  <span>MENU</span>
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex flex-col justify-between overflow-y-auto border-l-2 border-black bg-white p-6"
              >
                <SheetHeader className="border-b border-black pb-4 text-left">
                  <SheetTitle className="font-mono text-sm font-bold tracking-[0.25em] text-black uppercase">
                    MENU
                  </SheetTitle>
                  <SheetDescription className="sr-only">Mobile Navigation Menu</SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col justify-between py-6">
                  <nav className="flex flex-col space-y-3 font-mono text-sm font-bold tracking-[0.2em] text-black uppercase">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="flex items-center justify-between border-b border-neutral-100 py-3 transition-colors hover:text-neutral-500"
                      >
                        <span>HOME</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="flex items-center justify-between border-b border-neutral-100 py-3 transition-colors hover:text-neutral-500"
                      >
                        <span>ABOUT</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/blog"
                        className="flex items-center justify-between border-b border-neutral-100 py-3 transition-colors hover:text-neutral-500"
                      >
                        <span>BLOG</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="flex items-center justify-between border-b border-neutral-100 py-3 transition-colors hover:text-neutral-500"
                      >
                        <span>CONTACT</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <a
                        href="/#work"
                        className="flex items-center justify-between border-b border-neutral-100 py-3 transition-colors hover:text-neutral-500"
                      >
                        <span>WORK</span>
                        <ArrowUpRight className="h-4 w-4 text-neutral-400" />
                      </a>
                    </SheetClose>
                  </nav>

                  <div className="pt-6">
                    <a
                      href="/CV-of-Abdullah-Al-Maksud.pdf"
                      download="CV-of-Abdullah-Al-Maksud.pdf"
                      className="flex items-center justify-center gap-2 border border-black bg-black py-2.5 font-mono text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-neutral-800"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>DOWNLOAD CV (PDF)</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Right: Vertical Menu Items (About, Blog, Contact) + Black Dropdown Button */}
          <div className="hidden flex-col items-end justify-end space-y-3.5 md:flex">
            {/* Vertical Stack Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="flex flex-col items-end space-y-1.5 text-right font-mono text-xs font-bold tracking-[0.22em] text-black uppercase"
            >
              <Link href="/about" className="py-0.5 transition-opacity hover:opacity-50">
                ABOUT
              </Link>
              <Link href="/contact" className="py-0.5 transition-opacity hover:opacity-50">
                CONTACT
              </Link>
              <Link href="/blog" className="py-0.5 transition-opacity hover:opacity-50">
                BLOG
              </Link>
            </nav>

            {/* Black Button Dropdown with Work & Sections */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex cursor-pointer items-center gap-2 rounded-none bg-black px-4 py-1 font-mono text-[11px] font-bold tracking-wider text-white uppercase shadow-xs transition-colors hover:bg-neutral-800">
                  <span>EXPLORE</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 border border-black bg-white p-1 shadow-2xl"
              >
                <DropdownMenuLabel className="px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
                  PORTFOLIO DIRECTORY
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-200" />

                <DropdownMenuItem asChild>
                  <a
                    href="/#work"
                    className="flex cursor-pointer items-center gap-2.5 px-3 py-2.5 font-mono text-xs font-semibold text-black uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>01 / ENGINEERING WORK</span>
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a
                    href="/#books"
                    className="flex cursor-pointer items-center gap-2.5 px-3 py-2.5 font-mono text-xs font-semibold text-black uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>02 / LITERATURE & ESSAYS</span>
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a
                    href="/#design"
                    className="flex cursor-pointer items-center gap-2.5 px-3 py-2.5 font-mono text-xs font-semibold text-black uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>03 / DESIGN SYSTEMS</span>
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <a
                    href="/#advisory"
                    className="flex cursor-pointer items-center gap-2.5 px-3 py-2.5 font-mono text-xs font-semibold text-black uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>04 / STRATEGIC ADVISORY</span>
                  </a>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-neutral-200" />

                <DropdownMenuItem asChild>
                  <a
                    href="/CV-of-Abdullah-Al-Maksud.pdf"
                    download="CV-of-Abdullah-Al-Maksud.pdf"
                    className="flex cursor-pointer items-center gap-2.5 px-3 py-2.5 font-mono text-xs font-bold text-neutral-800 uppercase transition-colors hover:bg-black hover:text-white"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>DOWNLOAD CV (PDF)</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Pure Typographic Borderless Broadsheet: Large 1st Card + 3 Minimalist Text Cards */}
        <div className="hidden">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* CARD 1: Larger Column (About Me) */}
            <div className="lg:col-span-5">
              <Link href="/about" className="group block cursor-pointer space-y-3">
                <h2 className="font-sans text-2xl leading-[1.05] font-extrabold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-600 sm:text-3xl">
                  The Engineer & The Craft
                </h2>

                <p className="font-editorial-body text-base leading-relaxed text-neutral-800 sm:text-lg">
                  Frontend engineer building resilient, high-performance web systems with React,
                  Next.js, and TypeScript. Exploring literary translation, essay writing, and
                  interface design along the way.
                </p>

                <div className="inline-flex items-center gap-1.5 pt-2 font-mono text-xs font-bold text-black uppercase transition-transform group-hover:translate-x-1">
                  <span>Read Biography</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </div>

            {/* RIGHT COLUMN: 3 Minimalist Borderless Cards (Work, Blog, Contact) */}
            <div className="grid grid-cols-1 gap-6 pt-1 sm:grid-cols-3 lg:col-span-7 lg:gap-8 lg:pt-0">
              {/* Card 2: Work & Code */}
              <Link
                href="/#work"
                className="group flex cursor-pointer flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <h3 className="font-sans text-base leading-snug font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-600 sm:text-lg">
                    Engineering Work
                  </h3>

                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    Deterministic frontend state pipelines, sub-frame real-time data visualizers,
                    and edge-native Next.js applications.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 pt-1 font-mono text-xs font-bold text-black transition-transform group-hover:translate-x-1">
                  <span>Explore Work</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black" />
                </div>
              </Link>

              {/* Card 3: Blog & Essays */}
              <Link
                href="/blog"
                className="group flex cursor-pointer flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <h3 className="font-sans text-base leading-snug font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-600 sm:text-lg">
                    Monographs & Essays
                  </h3>

                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    Analytical essays on physical entropy in software systems, formal UI logic,
                    multilingual typography, and translation.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 pt-1 font-mono text-xs font-bold text-black transition-transform group-hover:translate-x-1">
                  <span>Read Blog</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black" />
                </div>
              </Link>

              {/* Card 4: Contact & Dialogue */}
              <Link
                href="/contact"
                className="group flex cursor-pointer flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <h3 className="font-sans text-base leading-snug font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-600 sm:text-lg">
                    Initiate Dialogue
                  </h3>

                  <p className="font-editorial-body text-xs leading-relaxed text-neutral-600 sm:text-sm">
                    Open for conversations regarding frontend architecture, open-source initiatives,
                    translation projects, and engineering.
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 pt-1 font-mono text-xs font-bold text-black transition-transform group-hover:translate-x-1">
                  <span>Get In Touch</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-black" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
