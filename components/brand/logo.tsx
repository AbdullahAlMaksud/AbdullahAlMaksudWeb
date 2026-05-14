import Link from "next/link"

import Image from "next/image"

export function Logo({
  compact = false,
  name = "Abdullah Al Maksud",
}: {
  compact?: boolean
  name?: string
}) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 font-semibold">
      <Image
        src="/images/brand/logo-dark.svg"
        alt={name}
        width={30}
        height={30}
        className="rounded-md"
      />
      {!compact && <span>{name}</span>}
    </Link>
  )
}
