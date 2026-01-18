"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/sections-header"
import { Showcase } from "@/components/sections-features"
import { MenuGrid } from "@/components/sections-menu"
import { AboutSection } from "@/components/sections-about"
import { LocationSection } from "@/components/sections-location"
import { FooterSection } from "@/components/sections-footer"

// Dynamically import Hero with 3D canvas to prevent blocking initial page load
const Hero = dynamic(() => import("@/components/sections-hero").then(mod => ({ default: mod.Hero })), {
  loading: () => <div className="h-screen bg-background" />,
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative bg-background">
      <Header />
      <Hero />
      <Showcase />
      <MenuGrid />
      <AboutSection />
      <LocationSection />
      <FooterSection />
    </main>
  )
}
