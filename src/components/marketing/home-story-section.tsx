"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BookOpen, Code2, PenLine, Sparkles } from "lucide-react"

const storyWords = [
  "developer",
  "fiction writer",
  "books",
  "code",
  "passion",
  "professional craft",
]

export function HomeStorySection() {
  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden px-8 py-12 text-center md:px-16">
      <Image
        src="/images/abdullahalmaksud/Asset%208.svg"
        alt=""
        width={260}
        height={280}
        unoptimized
        aria-hidden="true"
        className="pointer-events-none absolute bottom-8 left-6 hidden opacity-[0.06] md:block lg:left-16"
      />
      <Image
        src="/images/abdullahalmaksud/Asset%2012.svg"
        alt=""
        width={260}
        height={280}
        unoptimized
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-6 hidden opacity-[0.08] md:block lg:right-16"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-muted-foreground"
        >
          <Code2 className="size-5" />
          <span className="h-12 w-px bg-border" />
          <PenLine className="size-5" />
          <span className="h-12 w-px bg-border" />
          <BookOpen className="size-5" />
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {storyWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.08 * index,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium shadow-sm"
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-6xl"
        >
          I am a developer and a fiction writer.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg"
        >
          I write books. I write code. Somewhere between imagined worlds and
          engineered systems, that double power turned curiosity into passion,
          and passion into the discipline of becoming a professional developer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center gap-3 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
        >
          <Sparkles className="size-4 text-primary" />
          stories become products, products become practice
        </motion.div>
      </div>
    </section>
  )
}
