"use client";

import { useHomeQuery } from "@/services";

const DEFAULT_QUOTE = {
  lines: ["I turn", "ideas into", "impactful", "solutions."],
  highlightIndex: 2,
};

export function FloatingQuote() {
  const { data: serverHomeData } = useHomeQuery();
  const quote = serverHomeData?.quote || DEFAULT_QUOTE;

  return (
    <div className="relative max-w-md select-none space-y-2 pt-2 lg:pl-24 xl:pl-32">
      {/* Opening Quote Mark */}
      <div className="select-none font-serif text-3xl leading-none text-gold/80 sm:text-4xl lg:text-5xl">
        “
      </div>

      {/* Core Quote Headline with Light refined weight */}
      <p className="pl-2 text-2xl font-light leading-[1.24] tracking-wide text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
        {quote.lines.map((line, idx) => {
          if (idx === quote.highlightIndex) {
            return (
              <span key={idx}>
                <span className="font-normal text-gold">{line}</span>
                <br />
              </span>
            );
          }
          return (
            <span key={idx}>
              {line}
              {idx !== quote.lines.length - 1 && <br />}
            </span>
          );
        })}
      </p>

      {/* Closing Quote Mark */}
      <div className="flex max-w-[280px] justify-end pt-1">
        <span className="select-none font-serif text-3xl leading-none text-gold/80 sm:text-4xl lg:text-5xl">
          ”
        </span>
      </div>
    </div>
  );
}
