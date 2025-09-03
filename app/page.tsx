import type { Metadata } from "next"
import LinkTree from "@/components/link-tree"

export const metadata: Metadata = {
  title: "Hafiz Business Card",
  description: "A simple, customizable digital business card",
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-4 pt-8 bg-secondary">
      <LinkTree />
    </main>
  )
}
