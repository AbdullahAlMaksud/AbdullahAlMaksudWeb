import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"

import { MotionSection } from "@/components/common/motion-section"
import { SectionHeading } from "@/components/common/section-heading"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig, testimonials } from "@/constants/site"

export function TestimonialsCTA() {
  return (
    <MotionSection className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="Testimonials"
        title="A calm partner for ambitious product work."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <SpotlightCard key={item.name}>
            <div className="p-5">
              <Quote className="size-6 text-primary" />
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {item.quote}
              </p>
              <div className="mt-5">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
      <div
        id="contact"
        className="premium-border glass-panel mt-10 overflow-hidden rounded-3xl p-8 md:p-10"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance">
              Have a product, article, or interface system in mind?
            </h2>
            <p className="mt-3 text-muted-foreground">{siteConfig.email}</p>
          </div>
          <Link
            href={`mailto:${siteConfig.email}`}
            className={buttonVariants({
              size: "lg",
              className: "h-12 rounded-xl px-6",
            })}
          >
            Start a conversation
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </MotionSection>
  )
}
