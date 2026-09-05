import React, { FC } from "react";
import { SocialLink } from "@/types/portfolio";

interface FooterProps {
  copyright: string;
  rights: string;
  socials: SocialLink[];
}

export const Footer: FC<FooterProps> = ({ copyright, rights, socials }) => {
  return (
    <footer id="contact" className="w-full bg-white">
      <div className="mx-auto px-4 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          {/* Left / Centered Copyright with Dot Indicator */}
          <div className="flex items-center justify-center space-x-2.5 sm:justify-start">
            <span className="inline-block h-8 w-1 shrink-0 rounded-sm bg-black" />
            <div className="flex flex-col items-center space-y-0.5 sm:items-start">
              <span className="font-mono text-[11px] font-bold tracking-widest text-black uppercase sm:text-xs">
                {copyright}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                {rights}
              </span>
            </div>
          </div>

          {/* Right / Centered Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 sm:justify-end sm:gap-x-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.isExternal ? "_blank" : undefined}
                rel={social.isExternal ? "noopener noreferrer" : undefined}
                className="group relative py-0.5 font-mono text-xs font-semibold tracking-[0.2em] text-black uppercase transition-colors hover:text-neutral-500"
              >
                {social.label}
                <span className="block h-[1px] max-w-0 bg-black transition-all duration-300 group-hover:max-w-full" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
