"use client";

import React, { useEffect, useState } from "react";

interface TopHeaderProps {
  badge?: string;
  issue?: string;
  folio?: string;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  badge = "PORTFOLIO",
  issue = "ISSUE 01",
  folio = "FOLIO 001",
}) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formatted.toUpperCase());
  }, []);

  return (
    <header className="relative hidden w-full border-b border-black bg-white sm:block">
      <div className="mx-auto flex items-center justify-between px-4 py-2.5 font-mono text-[10px] font-medium tracking-widest uppercase sm:px-8 sm:text-xs">
        <div className="flex items-center space-x-2">
          <span className="inline-block h-1 w-1 animate-ping rounded-full bg-black" />
          <span className="font-semibold tracking-[0.2em] text-black">{badge}</span>
        </div>

        {/* Live Formatted Date Display */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium tracking-[0.15em] whitespace-nowrap text-neutral-600">
          {currentDate || "MONOGRAPHS & ENGINEERING"}
        </div>

        <div className="tracking-[0.2em] text-neutral-700">{issue}</div>
      </div>
    </header>
  );
};
