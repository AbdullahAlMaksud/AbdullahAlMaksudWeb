import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { SpotlightCard } from "@/components/common/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { getSiteData } from "@/lib/data"
import { getI18n, getRequestLocale } from "@/lib/i18n/server"

export async function SettingsScreen() {
  const locale = await getRequestLocale()
  const [{ siteConfig }, { t }] = await Promise.all([
    getSiteData(locale),
    getI18n(locale, "dashboard"),
  ])
  const preferences = [
    t("settings.emailNotifications"),
    t("settings.weeklyDigest"),
    t("settings.draftReminders"),
    t("settings.reducedMotion"),
  ]

  return (
    <>
      <DashboardPageHeader
        title={t("settings.title")}
        description={t("settings.description")}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <SpotlightCard>
          <div className="space-y-5 p-6">
            <div>
              <h2 className="text-xl font-semibold">{t("settings.profile")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("settings.profileDescription")}
              </p>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">{t("settings.name")}</Label>
                <Input id="name" defaultValue={siteConfig.owner} className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{t("settings.email")}</Label>
                <Input id="email" defaultValue={siteConfig.email} className="rounded-xl" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bio">{t("settings.bio")}</Label>
              <Textarea
                id="bio"
                defaultValue={t("settings.bioValue")}
                className="min-h-28 rounded-xl"
              />
            </div>
            <Button className="rounded-xl">{t("settings.save")}</Button>
          </div>
        </SpotlightCard>
        <SpotlightCard>
          <div className="space-y-5 p-6">
            <h2 className="text-xl font-semibold">{t("settings.preferences")}</h2>
            {preferences.map((item) => (
              <div key={item} className="flex items-center justify-between gap-4">
                <Label>{item}</Label>
                <Switch defaultChecked={item !== t("settings.reducedMotion")} />
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </>
  )
}
