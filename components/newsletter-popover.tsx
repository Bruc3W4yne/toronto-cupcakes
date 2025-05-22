"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { X } from "lucide-react"
import FocusTrap from "focus-trap-react"

interface NewsletterPopoverProps {
  onDismiss: () => void
}

export default function NewsletterPopover({ onDismiss }: NewsletterPopoverProps) {
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus on email input when component mounts
    if (emailRef.current) {
      emailRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    onDismiss()
  }

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center"
        style={{ display: "none" }}
      >
        <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-xl sm:rounded-xl shadow-xl">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">
                Get 15% off your first dozen
              </h2>
              <button
                onClick={onDismiss}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close newsletter popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sign up for our newsletter and receive a 15% discount on your first order of a dozen cupcakes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-pink dark:focus:ring-accent-gold focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Get My Discount
              </button>
            </form>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              By signing up, you agree to receive marketing emails. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </FocusTrap>
  )
}
