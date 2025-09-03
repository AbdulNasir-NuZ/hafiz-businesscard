"use client"

import type React from "react"

import { useState, useRef } from "react"
import { CardFlip } from "@/components/ui/card-flip"
import { ProfileView } from "@/components/link-tree/profile-view"
import BusinessCardBack from "@/components/link-tree/business-card-back"
import type { Profile } from "@/hooks/use-profile"

// Minimal default profile for the business card front
const defaultProfile: Profile = {
  name: "ABDELHAFİZ MAHFOUZ ALİ",
  bio: "",
  avatarUrl: "/images/hafiz.png",
  secondaryBg: "bg-secondary",
  verified: true,
}

export default function BusinessCardPage() {
  const [flipped, setFlipped] = useState(false)

  const tiltRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const handleMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = tiltRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // limit tilt to +/- 6deg
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 6
    const rx = ((rect.height / 2 - y) / (rect.height / 2)) * 6
    setTilt({ rx, ry })
  }

  const handleLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <main
      className="min-h-screen w-full grid place-items-center p-6"
      style={{
        backgroundColor: "#ffedd5", // orange-100 base
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(249,115,22,0.35) 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, rgba(249,115,22,0.35) 0 1px, transparent 1px 32px)",
        backgroundSize: "32px 32px, 32px 32px",
        backgroundPosition: "0 0, 0 0",
      }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: "transform 200ms ease",
        }}
        className="w-full max-w-md mx-auto drop-shadow-2xl"
      >
        {/* Standalone business card page; flips on click and every 60s */}
        <CardFlip
          isFlipped={flipped}
          onFlip={() => setFlipped((f) => !f)}
          frontContent={<ProfileView profile={defaultProfile} links={[]} />}
          backContent={<BusinessCardBack />}
          clickToFlip
          autoFlipMs={60000}
        />
      </div>
    </main>
  )
}
