import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { messages } from "@/constants/mock-data"

export function MessagesCard() {
  const unread = messages.filter((message) => message.unread).length

  return (
    <SpotlightCard>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Messages</h3>
          <Badge variant="secondary">{unread} new</Badge>
        </div>
        <div className="mt-5 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar className="size-9">
                <AvatarFallback>{initials(message.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-medium">{message.name}</p>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {message.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
}
