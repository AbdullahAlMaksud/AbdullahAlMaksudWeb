import Link from "next/link"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function Logo({
  compact = false,
  className,
  name = "Abdullah Al Maksud",
  textClassName,
}: {
  compact?: boolean
  className?: string
  name?: string
  textClassName?: string
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex min-w-0 items-center gap-2 font-semibold", className)}
    >
      <Image
        src="/images/brand/logo-dark.svg"
        alt={name}
        width={30}
        height={30}
        className="shrink-0 rounded-md"
      />
      {!compact && <span className={cn("min-w-0", textClassName)}>{name}</span>}
    </Link>
  )
}
