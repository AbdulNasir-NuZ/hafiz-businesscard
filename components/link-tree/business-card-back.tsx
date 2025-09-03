"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useThemeSettings } from "@/hooks/use-theme-settings"

export function BusinessCardBack() {
  const { themeSettings } = useThemeSettings()

  // Keep data consistent with front side
  const person = {
    name: "ABDELHAFİZ MAHFOUZ ALİ",
    title: "Owner / Managing director",
    company: "MIT4A TEKSTİL GIDA İNŞAAT TURİZM SANAYİ TİCARET LTD. ŞTİ",
    email: "info@globexlinkb2b.com",
    phoneDisplay: "+90 545 974 48 76",
    phoneE164: "+905459744876",
    addressLine: "İstanbul/ Şişli Fulya Mah. Ortaklar Cad. No:2  D5",
    website: "https://globexlinkb2b.com",
    landing: "https://globexlinkb2b.com",
    linkedIn: "#",
    meeting: "#",
  }

  // New Other Websites list
  const otherWebsites = [
    { label: "Landing Page", url: person.landing },
    // You can add more entries here, e.g. { label: "Supplier Portal", url: "https://example.com" }
  ]

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xl will-change-transform",
        themeSettings.borderRadius,
      )}
      style={{ opacity: themeSettings.effects.cardOpacity }}
      aria-label="Business card back side"
    >
      {/* Shine highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1"
        style={{
          background:
            "radial-gradient(1200px 400px at -10% -10%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(600px 300px at 120% 0%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      {/* Subtle texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.06) 0, transparent 40%), radial-gradient(circle at 80% 10%, rgba(0,0,0,0.06) 0, transparent 40%)",
        }}
      />

      <CardContent className="p-6">
        <div className={cn("flex flex-col gap-4")}>
          <div className="text-center">
            <h3 className="text-base font-semibold">{person.company}</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {person.name} · {person.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Primary Contacts</p>
              <div className="mt-2 text-sm">
                <a className="underline underline-offset-2" href={`mailto:${person.email}`}>
                  {person.email}
                </a>
                <div className="mt-1">
                  <a
                    className="underline underline-offset-2"
                    href={`tel:${person.phoneE164}`}
                    aria-label={`Call ${person.phoneDisplay}`}
                  >
                    {person.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Website</p>
              <a
                className="mt-1 block text-sm underline underline-offset-2"
                href={person.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {person.website}
              </a>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">WhatsApp</p>
              <a
                className="mt-1 block text-sm underline underline-offset-2"
                href={`https://wa.me/${person.phoneE164.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open chat
              </a>
            </div>

            <div className="col-span-2 rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Other Websites</p>
              <ul className="mt-1 text-sm list-disc pl-4">
                {otherWebsites.map((w) => (
                  <li key={w.url}>
                    <a className="underline underline-offset-2" href={w.url} target="_blank" rel="noopener noreferrer">
                      {w.label}: {w.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Office Address</p>
              <p className="mt-1 text-sm">{person.addressLine}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            <Button asChild variant="outline" className="w-full bg-transparent">
              <a href={person.linkedIn} target="_blank" rel="noopener noreferrer">
                LinkedIn Profile
              </a>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <a href={person.meeting} target="_blank" rel="noopener noreferrer">
                Book a Meeting
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BusinessCardBack
