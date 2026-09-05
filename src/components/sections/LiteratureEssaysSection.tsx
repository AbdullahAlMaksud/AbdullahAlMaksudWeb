import React from "react";
import { EssayPublication } from "@/types/portfolio";
import { ModalArticleData } from "@/components/interactive/ArticleModal";
import { Book3DCard } from "@/components/interactive/Book3DCard";

interface LiteratureEssaysSectionProps {
  category: string;
  titleLine1: string;
  titleLine2: string;
  imageUrl: string;
  imageAlt: string;
  items: EssayPublication[];
  onSelectItem: (data: ModalArticleData) => void;
}

export const LiteratureEssaysSection: React.FC<LiteratureEssaysSectionProps> = ({
  category,
  titleLine1,
  titleLine2,
  imageUrl,
  imageAlt,
  items,
  onSelectItem,
}) => {
  return (
    <section id="books" className="w-full border-b border-black bg-black text-white">
      <div className="mx-auto px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12 lg:gap-12">
          {/* Col 1: Title, Category & 3D Book Presentation */}
          <div className="flex h-full flex-col justify-between space-y-6 md:col-span-4">
            <div className="space-y-3">
              <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
                {category}
              </span>
              <h2 className="font-sans text-2xl leading-[1.05] font-extrabold tracking-tight text-white uppercase sm:text-3xl lg:text-4xl">
                <span>{titleLine1}</span>
                <br />
                <span>{titleLine2}</span>
              </h2>
            </div>

            {/* Aesthetic 3D Hardcover Book Showcase */}
            <div className="flex-1 overflow-hidden">
              <Book3DCard
                imageUrl={imageUrl}
                imageAlt={imageAlt}
                href="/books/emon-jodi-hoto"
                spineTitle="এমন যদি হতো"
                authorName="আব্দুল্লাহ আল মাকসুদ"
                publisherName="জ্ঞানকোষ প্রকাশনী"
                isbn="978-984-776-120-4"
              />
            </div>
          </div>

          {/* Col 2 & Col 3: Pure Borderless Editorial Magazine Layout (Top Grid + Bottom Full-Width List) */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:col-span-8 lg:gap-x-12 lg:gap-y-8">
            {items.map((item, index) => {
              const isListRow = index >= 2;

              return (
                <div
                  key={item.id}
                  onClick={() =>
                    onSelectItem({
                      tag: item.tag,
                      title: item.title,
                      category: "THEORETICAL FRAMEWORKS // ESSAY & PUBLICATION",
                      description: item.description,
                      fullContent: item.fullContent,
                      date: item.date,
                      readTime: item.readTime,
                    })
                  }
                  className={`group flex cursor-pointer flex-col justify-start space-y-2.5 transition-opacity hover:opacity-85 ${
                    isListRow ? "border-t border-white/15 pt-6 sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                      {item.tag}
                    </span>
                    {item.readTime && (
                      <span className="font-mono text-[10px] text-neutral-500">
                        {item.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="flex items-center justify-between font-sans text-base font-bold tracking-tight text-white uppercase transition-colors group-hover:text-neutral-300 sm:text-lg">
                    <span>{item.title}</span>
                    <span className="font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
                      ↗
                    </span>
                  </h3>

                  <p className="font-editorial-body-dark text-[14px] leading-relaxed text-neutral-300 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
