"use client"

import { useState, useEffect } from "react"
import { useProfile } from "@/hooks/use-profile"
import { useLinks } from "@/hooks/use-links"
import { CardFlip } from "@/components/ui/card-flip"
import { ProfileView } from "@/components/link-tree/profile-view"
import BusinessCardBack from "@/components/link-tree/business-card-back"
import { useThemeSettings } from "@/hooks/use-theme-settings"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Default profile data
const defaultProfile = {
  name: "ABDELHAFİZ MAHFOUZ ALİ",
  bio: "",
  avatarUrl: "/images/abdelhafiz.png",
  secondaryBg: "bg-secondary",
  verified: true,
}

// Default links data
const defaultLinks = [
  {
    id: "1",
    title: "Personal Website",
    url: "https://www.haydenbleasel.com/",
  },
  {
    id: "2",
    title: "X / Twitter",
    url: "https://x.com/haydenbleasel",
  },
  {
    id: "3",
    title: "GitHub",
    url: "https://github.com/haydenbleasel",
  },
  {
    id: "4",
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/haydenbleasel",
  },
]

export default function LinkTree() {
  const [isEditMode, setIsEditMode] = useState(false)
  const { theme } = useTheme()

  // Use custom hooks for profile and links management
  const { profile, handleProfileChange, toggleVerified, updateSecondaryBg, saveProfileChanges } =
    useProfile(defaultProfile)

  const { links, newLink, addLink, deleteLink, updateLink, handleNewLinkChange } = useLinks(defaultLinks)

  const { themeSettings } = useThemeSettings()

  const toggleEditMode = () => {
    setIsEditMode((v) => !v)
  }

  // Apply font family to the entire application when it changes
  useEffect(() => {
    document.documentElement.classList.remove("font-sans", "font-serif", "font-mono")
    document.documentElement.classList.add(themeSettings.font)
  }, [themeSettings.font, theme])

  return (
    <div className={cn("w-full max-w-3xl mx-auto", themeSettings.font)}>
      <div className="w-full max-w-md mx-auto">
        <CardFlip
          isFlipped={isEditMode}
          onFlip={toggleEditMode}
          frontContent={<ProfileView profile={profile} links={links} />}
          backContent={<BusinessCardBack />}
          clickToFlip
          autoFlipMs={60000}
        />
      </div>
    </div>
  )
}
