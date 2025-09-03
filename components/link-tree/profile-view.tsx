"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VerifiedBadge } from "@/components/verified-badge"
import { useThemeSettings } from "@/hooks/use-theme-settings"
import { cn } from "@/lib/utils"
import type { Profile } from "@/hooks/use-profile"
import type { LinkItemProps } from "@/hooks/use-links"

interface ProfileViewProps {
  profile: Profile
  links: LinkItemProps[]
}

export function ProfileView({ profile }: ProfileViewProps) {
  const { themeSettings } = useThemeSettings()

  // Business card data (from user-supplied details)
  const person = {
    name: "ABDELHAFİZ MAHFOUZ ALİ",
    title: "Owner / Managing director",
    company: "MIT4A TEKSTİL GIDA İNŞAAT TURİZM SANAYİ TİCARET LTD. ŞTİ",
    email: "info@globexlinkb2b.com",
    phoneDisplay: "+90 545 974 48 76",
    phoneE164: "+905459744876",
    addressLine: "İstanbul/ Şişli Fulya Mah. Ortaklar Cad. No:2  D5",
    // Inferred from email domain for convenience:
    website: "https://globexlinkb2b.com",
    landing: "https://globexlinkb2b.com",
    linkedIn: "#", // Replace with actual profile if available
    meeting: "#", // Replace with actual booking link if available
  }

  const handleSaveContact = () => {
    // vCard 3.0 format
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:ALI;ABDELHAFİZ MAHFOUZ;;;",
      "FN:ABDELHAFİZ MAHFOUZ ALİ",
      `ORG:${person.company}`,
      `TITLE:${person.title}`,
      `TEL;TYPE=WORK,VOICE:${person.phoneE164}`,
      `EMAIL;TYPE=INTERNET,WORK:${person.email}`,
      // ADR: PO Box;Extended;Street;City;Region;PostalCode;Country
      "ADR;TYPE=WORK:;;Fulya Mah. Ortaklar Cad. No:2 D5;Şişli;İstanbul;;Türkiye",
      `URL:${person.website}`,
      "END:VCARD",
    ].join("\n")

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "abdelhafiz-mahfouz-ali.vcf"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-xl will-change-transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl",
        themeSettings.borderRadius,
        themeSettings.effects.shadow ? "shadow-lg" : "shadow-none",
        themeSettings.effects.glassmorphism && "glassmorphism",
      )}
      style={{ opacity: themeSettings.effects.cardOpacity }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-1"
        style={{
          background:
            "radial-gradient(1000px 300px at -10% -10%, rgba(255,255,255,0.12), transparent 50%), radial-gradient(600px 260px at 120% 0%, rgba(255,255,255,0.06), transparent 40%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-30"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(0,0,0,0.06) 0, transparent 40%), radial-gradient(circle at 85% 10%, rgba(0,0,0,0.06) 0, transparent 40%)",
        }}
      />
      <CardContent className="p-6">
        <div className={cn("flex flex-col items-center gap-4", themeSettings.font)}>
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile.avatarUrl || "/images/hafiz.png"} alt={person.name} />
            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5">
              <h2 className="text-xl font-bold text-balance">{person.name}</h2>
              {profile.verified && <VerifiedBadge />}
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{person.title}</p>
            <p className="text-sm mt-1">{person.company}</p>
          </div>

          <div className="w-full mt-4 grid gap-3">
            <div className="grid grid-cols-3 items-start gap-2">
              <span className="col-span-1 text-xs text-muted-foreground">Email</span>
              <a className="col-span-2 text-sm underline underline-offset-2" href={`mailto:${person.email}`}>
                {person.email}
              </a>
            </div>
            <div className="grid grid-cols-3 items-start gap-2">
              <span className="col-span-1 text-xs text-muted-foreground">Phone</span>
              <a
                className="col-span-2 text-sm underline underline-offset-2"
                href={`tel:${person.phoneE164}`}
                aria-label={`Call ${person.phoneDisplay}`}
              >
                {person.phoneDisplay} (Work)
              </a>
            </div>
            <div className="grid grid-cols-3 items-start gap-2">
              <span className="col-span-1 text-xs text-muted-foreground">Address</span>
              <p className="col-span-2 text-sm">{person.addressLine}</p>
            </div>
            <div className="grid grid-cols-3 items-start gap-2">
              <span className="col-span-1 text-xs text-muted-foreground">Landing Page</span>
              <a
                className="col-span-2 text-sm underline underline-offset-2"
                href={person.landing}
                target="_blank"
                rel="noopener noreferrer"
              >
                {person.landing}
              </a>
            </div>
            <div className="grid grid-cols-3 items-start gap-2">
              <span className="col-span-1 text-xs text-muted-foreground">Website</span>
              <a
                className="col-span-2 text-sm underline underline-offset-2"
                href={person.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {person.website}
              </a>
            </div>
          </div>

          <div className="w-full mt-6 grid gap-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button
                asChild
                variant="default"
                className="w-full bg-[#0a66c2] hover:bg-[#084e99] text-white border-[#0a66c2]"
              >
                <a href={person.linkedIn} target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <a
                  href={`https://wa.me/${person.phoneE164.replace("+", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a href={person.meeting} target="_blank" rel="noopener noreferrer">
                  Book a meeting
                </a>
              </Button>
              <Button onClick={handleSaveContact} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Save Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
