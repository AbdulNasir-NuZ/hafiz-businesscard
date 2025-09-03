"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  address: string
  linkedinUrl?: string
  whatsappUrl?: string
  meetingUrl?: string
  profileImageSrc: string
}

function downloadVCard(opts: {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  address: string
}) {
  const { name, title, company, email, phone, website, address } = opts
  // Simple vCard 3.0
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    `TITLE:${title}`,
    `ORG:${company}`,
    `TEL;TYPE=WORK,VOICE:${phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${email}`,
    `URL:${website}`,
    `ADR;TYPE=WORK:;;${address.replace(/,/g, "\\,")}`,
    "END:VCARD",
  ].join("\n")

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${name.replace(/\s+/g, "_")}.vcf`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function BusinessCardFront({
  name,
  title,
  company,
  email,
  phone,
  website,
  address,
  linkedinUrl,
  whatsappUrl,
  meetingUrl,
  profileImageSrc,
}: Props) {
  return (
    <div className="relative size-full rounded-xl bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 shadow-2xl ring-1 ring-black/5 overflow-hidden">
      {/* subtle edges for realism (no gradients; using inset ring and shadow) */}
      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-black/5"></div>

      <div className="flex size-full flex-col p-4 sm:p-6">
        {/* Top row: Avatar + Identity */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-1 ring-black/10">
            <AvatarImage src={profileImageSrc || "/placeholder.svg"} alt={`${name} profile photo`} />
            <AvatarFallback aria-hidden>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold leading-tight text-pretty">{name}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {title} · {company}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-slate-200 dark:bg-slate-700" />

        {/* Contact rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`mailto:${email}`}
            className="text-sm text-slate-700 dark:text-slate-200 hover:underline truncate"
            aria-label="Send email"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="text-sm text-slate-700 dark:text-slate-200 hover:underline truncate"
            aria-label="Call phone"
          >
            {phone}
          </a>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-700 dark:text-slate-200 hover:underline truncate"
            aria-label="Open website"
          >
            {website}
          </a>
          <p className="text-sm text-slate-700 dark:text-slate-200 truncate" aria-label="Office address">
            {address}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="Connect on LinkedIn"
            >
              LinkedIn
            </a>
          )}
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="Open WhatsApp chat"
            >
              WhatsApp
            </a>
          )}
          {meetingUrl && (
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
              aria-label="Book a meeting"
            >
              Book Meeting
            </a>
          )}
          <button
            type="button"
            onClick={() => downloadVCard({ name, title, company, email, phone, website, address })}
            className="rounded-md bg-teal-600 text-white px-3 py-1.5 text-sm hover:bg-teal-700"
          >
            Save Contact
          </button>
        </div>
      </div>
    </div>
  )
}
