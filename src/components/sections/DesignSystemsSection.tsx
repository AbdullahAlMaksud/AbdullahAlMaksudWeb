import React from "react";
import { DesignSystemModule } from "@/types/portfolio";
import { WireframeCanvas } from "@/components/interactive/WireframeCanvas";
import { ModalArticleData } from "@/components/interactive/ArticleModal";
import { ArrowUpRight } from "lucide-react";

interface DesignSystemsSectionProps {
  category: string;
  title: string;
  modules: DesignSystemModule[];
  onOpenPhysicsSimulator: () => void;
  onSelectModule: (data: ModalArticleData) => void;
}

export const DesignSystemsSection: React.FC<DesignSystemsSectionProps> = ({
  category,
  title,
  modules,
  onOpenPhysicsSimulator,
  onSelectModule,
}) => {
  const handleModuleClick = (module: DesignSystemModule) => {
    if (module.id === "physics-simulator" || module.isInteractive) {
      onOpenPhysicsSimulator();
    } else {
      onSelectModule({
        tag: module.tag,
        title: module.title,
        category: "AESTHETIC PARADIGMS // DESIGN SYSTEM SPECIFICATION",
        description: module.description,
        fullContent: module.details?.overview,
        metrics: module.details?.keyPoints,
      });
    }
  };

  return (
    <section id="design" className="w-full border-b border-black bg-white">
      <div className="mx-auto px-4 py-10 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-12 lg:gap-12">
          {/* Col 1: Title, Category & 3D Wireframe Canvas */}
          <div className="flex h-full flex-col justify-between space-y-6 md:col-span-4">
            <div className="space-y-3">
              <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-600 uppercase">
                {category}
              </span>
              <h2 className="font-sans text-2xl leading-[1.05] font-extrabold tracking-tight text-black uppercase sm:text-3xl lg:text-4xl">
                {title}
              </h2>
            </div>

            {/* Interactive 3D Wireframe Cubes */}
            <div className="flex-1 overflow-hidden border border-black shadow-xs">
              <WireframeCanvas className="h-full w-full" />
            </div>
          </div>

          {/* Col 2: Editorial Magazine List / Grid */}
          <div className="grid grid-cols-1 bg-gray-50 md:col-span-8">
            {modules.map((item, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={item.id}
                  onClick={() => handleModuleClick(item)}
                  className={`group flex cursor-pointer flex-col justify-start space-y-2.5 p-3 transition-all ${
                    isFirst ? "bg-white opacity-100" : "opacity-70 hover:bg-white hover:opacity-100"
                  }`}
                >
                  {/* Magazine Tag Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                      {item.tag}
                    </span>
                    {item.isInteractive ? (
                      <span className="font-mono text-[10px] font-semibold tracking-wider text-black">
                        [ LIVE DEMO ]
                      </span>
                    ) : (
                      <span
                        className={`font-mono text-[11px] transition-colors ${
                          isFirst ? "text-black" : "text-neutral-400 group-hover:text-black"
                        }`}
                      >
                        <ArrowUpRight className="text-xs" size={14} />
                      </span>
                    )}
                  </div>

                  {/* Bold Headline */}
                  <h3 className="font-sans text-base font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-700 sm:text-lg">
                    {item.title}
                  </h3>

                  {/* Editorial Serif Paragraph */}
                  <p className="font-editorial-body text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
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
