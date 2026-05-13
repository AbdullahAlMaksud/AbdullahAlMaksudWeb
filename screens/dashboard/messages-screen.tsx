import { Mail } from "lucide-react"

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { EmptyState } from "@/components/common/empty-state"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { messages } from "@/constants/mock-data"

export function MessagesScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Messages"
        description="A frontend-only inbox for collaboration and reader notes."
      />
      {messages.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="Inbox is clear"
          description="New collaboration messages will appear here."
        />
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <SpotlightCard key={message.id}>
              <div className="flex items-center gap-4 p-5">
                <Avatar>
                  <AvatarFallback>{message.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{message.name}</h3>
                    {message.unread && <Badge>Unread</Badge>}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {message.subject}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{message.time}</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}
    </>
  )
}
