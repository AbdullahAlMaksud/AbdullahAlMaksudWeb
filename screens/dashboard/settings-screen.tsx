import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function SettingsScreen() {
  return (
    <>
      <DashboardPageHeader
        title="Settings"
        description="Frontend-only controls for profile, preferences, and publishing defaults."
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <SpotlightCard>
          <div className="space-y-5 p-6">
            <div>
              <h2 className="text-xl font-semibold">Profile</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Mock profile fields for the portfolio owner.
              </p>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Rakibul Islam" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" defaultValue="hello@devwriter.studio" className="rounded-xl" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue="Frontend engineer and writer building polished developer experiences."
                className="min-h-28 rounded-xl"
              />
            </div>
            <Button className="rounded-xl">Save mock settings</Button>
          </div>
        </SpotlightCard>
        <SpotlightCard>
          <div className="space-y-5 p-6">
            <h2 className="text-xl font-semibold">Preferences</h2>
            {[
              "Email notifications",
              "Weekly analytics digest",
              "Draft reminders",
              "Reduced motion preview",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between gap-4">
                <Label>{item}</Label>
                <Switch defaultChecked={item !== "Reduced motion preview"} />
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </>
  )
}
