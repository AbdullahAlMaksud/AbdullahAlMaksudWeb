"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { buttonVariants } from "@/components/ui/button"
import { useFullpageNext } from "@/components/common/fullpage-scroll"

export function HeroSection({
  labels,
  ownerName,
}: {
  labels: {
    badge: string
    title: string
    description: string
    work: string
    cv: string
    imageAlt: string
    note: string
    scrollDown: string
  }
  ownerName: string
}) {
  const goNext = useFullpageNext()

  return (
    <section className="relative flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-8 h-64 w-56 overflow-hidden md:h-80 md:w-72">
          <Image
            src="/images/abdullahalmaksud/Asset%2011.svg"
            alt={labels.imageAlt}
            fill
            priority
            sizes="(min-width: 768px) 288px, 224px"
            unoptimized
            className="object-contain object-bottom p-3"
          />
        </div>
        <h1 className="text-5xl font-semibold tracking-tight text-balance md:text-7xl lg:text-8xl">
          {ownerName}
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg"
      >
        {labels.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Link
          href="/projects"
          className={buttonVariants({
            size: "lg",
            className: "h-11 rounded-xl px-6 shadow-lg shadow-primary/20",
          })}
        >
          {labels.work}
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        onClick={goNext}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={labels.scrollDown}
      >
        <span className="text-xs tracking-wider">{labels.scrollDown}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.button>
    </section>
  )
}
