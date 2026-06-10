import { Construction } from "lucide-react"

export function BooksScreen() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
        <Construction className="size-8 text-muted-foreground" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Under Construction</h1>
        <p className="mt-3 text-base text-muted-foreground">
          The books section is being built. Check back soon.
        </p>
      </div>
    </div>
  )
}

