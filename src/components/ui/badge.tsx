import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center text-[10px] uppercase font-mono tracking-widest font-medium transition-colors focus:outline-hidden",
  {
    variants: {
      variant: {
        default: "text-neutral-500",
        outline: "border border-neutral-300 px-2 py-0.5 text-black",
        dark: "text-neutral-400",
        darkOutline: "border border-neutral-700 px-2 py-0.5 text-neutral-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
