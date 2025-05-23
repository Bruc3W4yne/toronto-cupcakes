"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0)

  const benefits = [
    "Baked Fresh Daily",
    "Perfect for Any Occasion",
    "Custom Designs Available",
    "Fast Delivery Across GTA",
  ]

  // Detect keyboard open on mobile
  useEffect(() => {
    const detectKeyboard = () => {
      if (window.innerHeight < window.outerHeight * 0.75) {
        setIsKeyboardOpen(true)
      } else {
        setIsKeyboardOpen(false)
      }
    }

    window.addEventListener("resize", detectKeyboard)
    return () => window.removeEventListener("resize", detectKeyboard)
  }, [])

  // Rotate through benefits
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitIndex((prevIndex) => (prevIndex + 1) % benefits.length)
    }, 4000) // Increased from 3000 to 4000 for better readability

    return () => clearInterval(interval)
  }, [benefits.length])

  return (
    <section className="relative h-screen md:h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/hero-background.png" alt="Cupcake background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-lg">
            Toronto Cupcake
          </h1>

          <p className="text-xl md:text-2xl mb-6 drop-shadow-md">
            Handcrafted cupcakes made with love, delivered across the GTA
          </p>

          <div className="mb-8">
            <p className="text-lg md:text-xl font-medium mb-2">Why order from us?</p>
            <div className="h-12 flex items-center justify-center relative">
              {benefits.map((benefit, index) => (
                <p
                  key={index}
                  className={`text-xl md:text-2xl font-playfair absolute transition-all duration-500 ${
                    currentBenefitIndex === index
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-4"
                  }`}
                >
                  {benefit}
                </p>
              ))}
            </div>
          </div>

          <Link
            href="/order"
            id="orderBtn"
            className={`inline-block bg-brand-pink hover:bg-hover-pink text-white font-bold py-1.5 px-3 rounded text-sm border-2 border-white/30 backdrop-blur-sm hover:scale-105 hover:shadow-xl active:bg-hover-pink active:scale-95 active:shadow-inner focus:bg-hover-pink focus:outline-none focus:ring-2 focus:ring-brand-pink focus:ring-opacity-50 ${
              isKeyboardOpen ? "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-[calc(100%-2rem)]" : ""
            }`}
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Decorative Cupcake Images */}
      <div className="hidden md:block absolute -bottom-10 -left-10 z-10 opacity-80">
        <Image
          src="/images/vanilla-vanilla-cupcake.png"
          alt="Vanilla cupcake"
          width={150}
          height={150}
          className="transform rotate-12"
        />
      </div>

      <div className="hidden md:block absolute -top-10 -right-10 z-10 opacity-80">
        <Image
          src="/images/chocolate-vanilla-cupcake.png"
          alt="Chocolate vanilla cupcake"
          width={150}
          height={150}
          className="transform -rotate-12"
        />
      </div>
    </section>
  )
}
