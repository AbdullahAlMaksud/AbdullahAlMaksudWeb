import Link from "next/link"
import { Sparkles } from "lucide-react"

import { siteConfig } from "@/constants/site"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-semibold">
      {/* <span
        className={cn(
          "grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20",
          compact && "size-8"
        )}
      > */}
      <Image
        src="/images/brand/logo-dark.svg"
        alt={siteConfig.name}
        width={30}
        height={30}
        className="rounded-md"
      />
      {/* </span> */}
      {!compact && <span>{siteConfig.name}</span>}
    </Link>
  )
}
