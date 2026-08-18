"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const SOCIALS = [
  { icon: Github, href: "https://github.com/abdullahalmaksud", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/abdullahalmaksud", label: "LinkedIn" },
  { icon: Mail, href: "mailto:contact@abdullahalmaksud.com", label: "Email" },
  { icon: Twitter, href: "https://twitter.com/abdullahalmaksud", label: "X (Twitter)" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-dark-border/60 py-10 bg-light-bg dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Let's connect • Socials */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Let&apos;s connect
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
          </div>

          <div className="flex items-center gap-3 pl-2">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full border border-slate-300 dark:border-dark-border flex items-center justify-center text-slate-600 dark:text-slate-400 hover:border-gold hover:text-gold dark:hover:border-gold dark:hover:text-gold transition-all duration-200 hover:scale-110"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-slate-500 dark:text-slate-500 font-medium">
          © 2025 Maksud. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
