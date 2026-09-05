import React from "react";
import { EnterpriseProject } from "@/types/portfolio";
import { ModalArticleData } from "@/components/interactive/ArticleModal";

interface EnterpriseArchitectureSectionProps {
  category: string;
  titleLine1: string;
  titleLine2: string;
  projects: EnterpriseProject[];
  onSelectProject: (data: ModalArticleData) => void;
}

export const EnterpriseArchitectureSection: React.FC<EnterpriseArchitectureSectionProps> = ({
  category,
  titleLine1,
  titleLine2,
  projects,
  onSelectProject,
}) => {
  return (
    <section id="work" className="w-full border-b border-black bg-white">
      <div className="mx-auto px-4 py-10 sm:px-8 sm:py-14">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 lg:gap-10">
          {/* Col 1: Section Title & Category */}
          <div className="flex flex-col justify-start space-y-3 md:col-span-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-neutral-600 uppercase">
              {category}
            </span>
            <h2 className="font-sans text-2xl leading-[1.05] font-extrabold tracking-tight text-black uppercase sm:text-3xl lg:text-4xl">
              <span>{titleLine1}</span>
              <br />
              <span>{titleLine2}</span>
            </h2>
          </div>

          {/* Col 2 & Col 3: Projects */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-8 lg:gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() =>
                  onSelectProject({
                    tag: project.tag,
                    title: project.title,
                    category: "STRATEGIC IMPLEMENTATION // CASE STUDY",
                    description: project.description,
                    fullContent: project.fullContent,
                    techStack: project.techStack,
                    metrics: project.metrics,
                  })
                }
                className="group -m-3 flex cursor-pointer flex-col justify-start space-y-3 rounded-none p-3 transition-colors hover:bg-neutral-50/80"
              >
                <div className="font-mono text-[11px] font-medium tracking-[0.2em] text-neutral-500 uppercase">
                  {project.tag}
                </div>

                <h3 className="flex items-center justify-between font-sans text-base font-bold tracking-tight text-black uppercase transition-colors group-hover:text-neutral-700 sm:text-lg">
                  <span>{project.title}</span>
                  <span className="font-mono text-xs opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </h3>

                <p className="font-editorial-body text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
