"use client"

import { useEffect, useRef } from "react"
import AnnouncementBar from "@/components/announcement-bar"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import UspGrid from "@/components/usp-grid"
import FlavorCarousel from "@/components/flavor-carousel"
import SocialProof from "@/components/social-proof"
import Footer from "@/components/footer"
import { useCart } from "@/hooks/use-cart"

export default function Home() {
  const { cartCount } = useCart()
  const previousCartCountRef = useRef(0)

  // Update previous cart count reference
  useEffect(() => {
    previousCartCountRef.current = cartCount
  }, [cartCount])

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
    </div>
  )
}
