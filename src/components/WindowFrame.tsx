import { cn } from "@/lib/utils";

export function WindowFrame({
  title,
  children,
  className,
  titleClassName,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("win overflow-hidden", className)}>
      <div className={cn("win-titlebar", titleClassName)}>
        <span className="truncate">{title}</span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="win-dot" />
          <span className="win-dot" />
          <span className="win-dot bg-orange" />
        </span>
      </div>
      {children}
    </div>
  );
}
