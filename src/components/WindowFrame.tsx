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
        <span className="flex items-center gap-1.5 shrink-0">
          <span className="win-dot" />
          <span className="win-dot" />
          <span className="win-dot bg-orange" />
        </span>
      </div>
      {children}
    </div>
  );
}
