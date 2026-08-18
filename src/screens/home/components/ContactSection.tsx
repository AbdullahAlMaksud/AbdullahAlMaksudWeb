"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Contact Banner Card */}
        <div className="relative rounded-3xl border border-slate-300 dark:border-dark-border bg-gradient-to-br from-light-surface via-light-card to-light-surface dark:from-dark-surface dark:via-dark-card dark:to-dark-surface p-8 sm:p-14 overflow-hidden shadow-2xl">
          
          {/* Ambient Gold Glow inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Main Column: Title */}
            <div className="lg:col-span-8 space-y-6">
              {/* Mail Icon in circular badge */}
              <div className="w-12 h-12 rounded-full border border-slate-300 dark:border-dark-border bg-light-surface dark:bg-dark-surface flex items-center justify-center text-gold shadow-sm">
                <Mail size={22} />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                Let&apos;s create
                <br />
                something{" "}
                <span className="text-gold">
                  meaningful
                </span>
                <br />
                together.
              </h2>
            </div>

            {/* Right Column: CTA Button */}
            <div className="lg:col-span-4 flex lg:justify-end items-center">
              <Link
                href="mailto:contact@abdullahalmaksud.com"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-slate-400 dark:border-slate-600 hover:border-gold dark:hover:border-gold bg-light-surface dark:bg-dark-surface hover:bg-gold dark:hover:bg-gold text-slate-900 dark:text-white hover:text-slate-950 dark:hover:text-slate-950 font-bold tracking-widest text-xs transition-all duration-300 shadow-md hover:scale-105"
              >
                <span>GET IN TOUCH</span>
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-dark-border group-hover:bg-slate-950 group-hover:text-gold flex items-center justify-center transition-colors">
                  <ArrowUpRight size={15} />
                </div>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
