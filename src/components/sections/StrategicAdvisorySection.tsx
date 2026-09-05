"use client";

import React, { useState } from "react";
import { StrategicAdvisory } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Copy, Check, MessageSquare, Radio } from "lucide-react";

interface StrategicAdvisorySectionProps {
  data: StrategicAdvisory;
  onOpenBriefModal?: () => void;
}

export const StrategicAdvisorySection: React.FC<StrategicAdvisorySectionProps> = ({
  data,
  onOpenBriefModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@abdullahalaksud.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="advisory"
      className="relative w-full overflow-hidden border-b border-black bg-white"
    >
      {/* Architectural Technical Dotted Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(rgba(0,0,0,0.1)_1.2px,transparent_1.2px)] [background-size:24px_24px]"
      />

      {/* Large Decorative Quotation Mark in Background Corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-0 -right-2 z-0 font-serif text-[180px] leading-none font-black tracking-tighter text-neutral-100 select-none sm:-top-0 sm:right-6 sm:text-[280px] md:text-[340px]"
      >
        &ldquo;
      </div>

      <div className="relative z-10 mx-auto space-y-12 px-4 py-12 sm:space-y-14 sm:px-8 sm:py-16">
        {/* Magazine Meta Tag Strip (Borderless) */}
        <div className="flex flex-col items-start justify-between gap-2 font-mono text-[11px] tracking-[0.2em] uppercase sm:flex-row sm:items-center">
          <div className="flex items-center space-x-2 font-semibold text-neutral-800">
            <Radio className="h-3 w-3 animate-pulse text-black" />
            <span>{data.badge}</span>
          </div>
          <div className="text-[10px] tracking-widest text-neutral-500">{data.availability}</div>
        </div>

        {/* Title & Statement Block */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-3 lg:col-span-5">
            <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-600 uppercase">
              {data.category}
            </span>
            <h2 className="font-sans text-2xl leading-[1.05] font-extrabold tracking-tight text-black uppercase sm:text-3xl lg:text-4xl">
              {data.headline}
            </h2>
          </div>

          <div className="pt-1 lg:col-span-7">
            <p className="font-editorial-body text-[15px] leading-relaxed text-neutral-800 sm:text-[17px]">
              {data.statement}
            </p>
          </div>
        </div>

        {/* 4 Architectural Pillars - Pure Borderless Magazine Columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {data.pillars.map((pillar) => (
            <div key={pillar.number} className="flex flex-col justify-start space-y-3">
              <div className="font-mono text-xs font-bold text-neutral-400">// {pillar.number}</div>
              <h3 className="font-sans text-sm font-bold tracking-tight text-black uppercase">
                {pillar.title}
              </h3>
              <p className="font-editorial-body text-xs leading-relaxed text-neutral-700 sm:text-[14px]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action & Engagement Strip (Clean Editorial Monograph Bar) */}
        <div className="flex flex-col items-start justify-between gap-6 pt-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
              DIRECT ARCHITECTURAL CONSULTATION
            </div>
            <div className="font-sans text-base font-bold tracking-tight text-black uppercase sm:text-lg">
              RESERVE STRATEGIC EVALUATION SESSION
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="default"
              size="default"
              onClick={onOpenBriefModal}
              className="flex cursor-pointer items-center gap-2 font-mono text-xs uppercase"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              {data.cta.primaryText}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="outline"
              size="default"
              onClick={handleCopyEmail}
              className="flex cursor-pointer items-center gap-2 font-mono text-xs uppercase"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-black" />
                  EMAIL COPIED
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  COPY EMAIL
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
