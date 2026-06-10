import Image from "next/image"

import { cn } from "@/lib/utils"

type ThemePortraitProps = {
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
}

export function ThemePortrait({
  alt,
  className,
  imageClassName,
  priority,
}: ThemePortraitProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src="/images/abdullahalmaksud/Asset%2011.svg"
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 288px, 224px"
        unoptimized
        className={cn(
          "object-contain object-bottom dark:hidden",
          imageClassName
        )}
      />
      <Image
        src="/images/abdullahalmaksud/Asset%2012.svg"
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 288px, 224px"
        unoptimized
        className={cn(
          "hidden object-contain object-bottom dark:block",
          imageClassName
        )}
      />
    </div>
  )
}
