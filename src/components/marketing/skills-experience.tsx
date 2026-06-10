import { CheckCircle2 } from "lucide-react"

import { MotionSection } from "@/components/common/motion-section"
import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import type { SkillGroup, TimelineItem } from "@/types/content"

export function SkillsExperience({
  experience,
  labels,
  skillGroups,
}: {
  experience: TimelineItem[]
  labels: {
    eyebrow: string
    title: string
    description: string
    timeline: string
  }
  skillGroups: SkillGroup[]
}) {
  return (
    <MotionSection className="mx-auto grid max-w-7xl gap-6 px-4 py-16 lg:grid-cols-2">
      <div>
        <SectionHeading
          eyebrow={labels.eyebrow}
          title={labels.title}
          description={labels.description}
        />
        <div className="mt-8 grid gap-4">
          {skillGroups.map((group) => (
            <SpotlightCard key={group.title}>
              <div className="p-5">
                <h3 className="font-semibold">{group.title}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="size-4 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
      <SpotlightCard className="self-start">
        <div className="p-6">
          <h3 className="text-2xl font-semibold">{labels.timeline}</h3>
          <div className="mt-8 space-y-8">
            {experience.map((item) => (
              <div key={`${item.year}-${item.role}`} className="relative pl-8">
                <span className="absolute left-0 top-1.5 size-3 rounded-full bg-primary ring-8 ring-primary/10" />
                <p className="text-sm font-semibold text-primary">{item.year}</p>
                <h4 className="mt-2 font-semibold">
                  {item.role} - {item.company}
                </h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </MotionSection>
  )
}
