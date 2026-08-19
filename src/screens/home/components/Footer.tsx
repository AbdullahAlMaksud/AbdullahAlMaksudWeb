"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useHomeQuery } from "@/services";

const DEFAULT_FOOTER = {
  connectText: "Let's connect",
  copyright: "© 2025 Maksud. All rights reserved.",
  socials: [
    { platform: "Github", url: "https://github.com/abdullahalmaksud" },
    { platform: "Linkedin", url: "https://linkedin.com/in/abdullahalmaksud" },
    { platform: "Mail", url: "mailto:contact@abdullahalmaksud.com" },
    { platform: "Twitter", url: "https://twitter.com/abdullahalmaksud" },
  ],
};

export function Footer() {
  const { data: serverHomeData } = useHomeQuery();
  const footer = serverHomeData?.footer || DEFAULT_FOOTER;

  const iconMap: Record<string, any> = {
    Github,
    Linkedin,
    Mail,
    Twitter,
  };

  return (
    <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-200 pb-6 pt-16 dark:border-white/[0.06] sm:flex-row">
      {/* Left: Let's connect & Social Buttons */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {footer.connectText}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>

        <div className="flex items-center gap-2.5">
          {footer.socials.map((social, idx) => {
            const Icon = iconMap[social.platform];
            return (
              <a
                key={idx}
                href={social.url}
                target={social.platform !== "Mail" ? "_blank" : undefined}
                rel={social.platform !== "Mail" ? "noreferrer" : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:border-gold hover:text-gold dark:border-white/10 dark:bg-[#0C1018] dark:text-slate-400"
                aria-label={social.platform}
              >
                {Icon && <Icon size={15} />}
              </a>
            );
          })}
        </div>
      </div>

      {/* Right: Copyright */}
      <p className="text-xs tracking-wider text-slate-400 dark:text-slate-500">
        {footer.copyright}
      </p>
    </footer>
  );
}
