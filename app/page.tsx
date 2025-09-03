import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Hafiz Business Card",
  description: "A simple, customizable digital business card",
}

export default function Home() {
  redirect("/business-card")
  return null
}
