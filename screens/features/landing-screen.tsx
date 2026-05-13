import { BooksSection } from "@/components/marketing/books-section"
import { FeaturedProjects } from "@/components/marketing/featured-projects"
import { HeroSection } from "@/components/marketing/hero-section"
import { LatestBlogSection } from "@/components/marketing/latest-blog-section"
import { SkillsExperience } from "@/components/marketing/skills-experience"
import { TestimonialsCTA } from "@/components/marketing/testimonials-cta"

export function LandingScreen() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <LatestBlogSection />
      <BooksSection />
      <SkillsExperience />
      <TestimonialsCTA />
    </>
  )
}
