"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, X } from "lucide-react"

export default function NewsletterBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user has dismissed the banner before
    const hasSeenBanner = localStorage.getItem("hasSeenNewsletterBanner")

    if (!hasSeenBanner) {
      // Show banner after 7 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [])

  // This function completely dismisses the banner (X button)
  const handleDismiss = () => {
    setIsDismissed(true)
    // After animation completes
    setTimeout(() => {
      setIsVisible(false)
    }, 500)
    localStorage.setItem("hasSeenNewsletterBanner", "true")
  }

  // This function toggles between expanded and collapsed states
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)

    // Focus on email input when expanded
    if (!isExpanded) {
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus()
        }
      }, 500)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your newsletter service
    setIsSubmitted(true)
    localStorage.setItem("hasSeenNewsletterBanner", "true")

    // Hide banner after successful submission
    setTimeout(() => {
      setIsDismissed(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 500)
    }, 3000)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] pointer-events-none">
      {/* Banner Container */}
      <div
        ref={bannerRef}
        className={`relative transition-transform duration-500 ease-in-out ${
          isDismissed ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          transform: `translateY(${isExpanded ? "0" : "calc(-100%)"})`,
        }}
      >
        {/* Main Banner Content */}
        <div className="bg-brand-pink text-white shadow-lg pointer-events-auto">
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-4 p-1 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Dismiss newsletter banner"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Banner Content */}
          <div className="container mx-auto px-4 py-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-playfair text-xl md:text-2xl font-bold mb-2">🎁 GET 15% OFF YOUR FIRST ORDER!</h2>
              <p className="text-sm md:text-base text-white/90">
                Join our newsletter for exclusive deals, new flavor announcements, and baking tips
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="container mx-auto px-4 pb-8 pt-2">
            <div className="border-t border-white/20 pt-6">
              {!isSubmitted ? (
                <div className="max-w-lg mx-auto">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <input
                        ref={emailInputRef}
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-white/30 bg-white/20 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent placeholder-white/70 text-white text-base"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-white text-brand-pink font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
                    >
                      Get My 15% Off
                    </button>
                  </form>

                  <div className="mt-4 flex items-center justify-center text-xs text-white/80">
                    <span>✓ No spam, unsubscribe anytime</span>
                    <span className="mx-2">•</span>
                    <span>✓ Exclusive subscriber-only deals</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="max-w-md mx-auto">
                    <h3 className="font-playfair text-lg font-bold mb-2 text-white">Welcome to the Family! 🎉</h3>
                    <p className="font-medium mb-2 text-white">
                      Your 15% discount code has been sent to your email and will arrive within a few minutes.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab - Attached to the bottom of the banner */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-[calc(100%-2px)]">
          <button
            onClick={toggleExpand}
            className="bg-brand-pink hover:bg-hover-pink transition-all duration-200 px-6 py-3 rounded-b-lg border border-white/30 shadow-lg hover:shadow-xl pointer-events-auto"
            aria-label={isExpanded ? "Hide newsletter signup" : "Show newsletter signup"}
            style={{
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium mb-1 text-white">{isExpanded ? "Hide" : "Sign Up Now"}</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-white" />
              ) : (
                <ChevronDown className="h-4 w-4 text-white" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
