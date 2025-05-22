"use client"

import { useState, useEffect } from "react"
import AnnouncementBar from "@/components/announcement-bar"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import NewsletterPopover from "@/components/newsletter-popover"
import UspGrid from "@/components/usp-grid"
import FlavorCarousel from "@/components/flavor-carousel"
import SocialProof from "@/components/social-proof"
import Footer from "@/components/footer"

export default function Home() {
  const [showNewsletter, setShowNewsletter] = useState(false)

  useEffect(() => {
    // Check if user has dismissed the newsletter popup before
    const hasSeenNewsletter = localStorage.getItem("hasSeenNewsletter")

    if (!hasSeenNewsletter) {
      // Show newsletter after a short delay
      const timer = setTimeout(() => {
        setShowNewsletter(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [])

  const dismissNewsletter = () => {
    setShowNewsletter(false)
    localStorage.setItem("hasSeenNewsletter", "true")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <UspGrid />
        <FlavorCarousel />
        <SocialProof />
      </main>
      <Footer />
      {showNewsletter && <NewsletterPopover onDismiss={dismissNewsletter} />}
    </div>
  )
}
