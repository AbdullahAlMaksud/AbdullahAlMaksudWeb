"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Download, PenLine, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function HeroSection({
  labels,
  techStack,
}: {
  labels: {
    badge: string
    title: string
    description: string
    work: string
    cv: string
    imageAlt: string
    note: string
  }
  techStack: string[]
}) {
  return (
    <section className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-10 bottom-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Badge className="mb-6 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <Sparkles className="mr-2 size-4" />
          {labels.badge}
        </Badge>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
          {labels.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          {labels.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/projects"
            className={buttonVariants({
              size: "lg",
              className:
                "h-12 rounded-xl px-6 shadow-lg shadow-primary/20 hover:bg-primary/90",
            })}
          >
            {labels.work}
            <ArrowRight className="size-4" />
          </Link>
          <Button variant="outline" size="lg" className="h-12 rounded-xl px-6">
            {labels.cv}
            <Download className="size-4" />
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative"
      >
        <div className="premium-border glass-panel overflow-hidden rounded-3xl p-3">
          <Image
            src="/images/landing/hero-cover.png"
            alt={labels.imageAlt}
            width={1400}
            height={1000}
            priority
            className="aspect-[1.25] rounded-2xl object-cover"
          />
        </div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "absolute top-12 -left-4 hidden rounded-2xl border bg-background/80 p-4 shadow-2xl backdrop-blur md:block"
          )}
        >
          <PenLine className="mb-3 size-5 text-primary" />
          <p className="max-w-36 text-sm font-medium">{labels.note}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
