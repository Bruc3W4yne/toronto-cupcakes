"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Home, Info, Phone, ShoppingBag, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useCart } from "@/hooks/use-cart"
import CartSummary from "./cart-summary"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showCartPreview, setShowCartPreview] = useState(false)
  const [showCartSummary, setShowCartSummary] = useState(false)
  const [cartAnimation, setCartAnimation] = useState(false)
  const pathname = usePathname()
  const { cart, removeFromCart, cartCount, cartTotal } = useCart()

  // Add this after the other state declarations
  const [bannerVisible, setBannerVisible] = useState(false)

  // Check if we're on the order page
  const isOrderPage = pathname === "/order"

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false)
      }

      if (showCartPreview && !target.closest(".cart-preview") && !target.closest(".cart-icon")) {
        setShowCartPreview(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen, showCartPreview])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  // Trigger cart animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartAnimation(true)
      const timer = setTimeout(() => {
        setCartAnimation(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [cartCount])

  // Add this effect after the other useEffect hooks
  useEffect(() => {
    // Check if banner should be visible
    const hasSeenBanner = localStorage.getItem("hasSeenNewsletterBanner")
    if (!hasSeenBanner) {
      // Banner will be visible after 7 seconds
      const timer = setTimeout(() => {
        setBannerVisible(true)
      }, 7000)

      return () => clearTimeout(timer)
    }

    // Listen for storage events (when banner is dismissed)
    const handleStorageChange = () => {
      const hasSeenBanner = localStorage.getItem("hasSeenNewsletterBanner")
      if (hasSeenBanner) {
        setBannerVisible(false)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleCartPreview = () => {
    setShowCartPreview(!showCartPreview)
  }

  const openCartSummary = () => {
    setShowCartSummary(true)
    setShowCartPreview(false)
  }

  // Modify the navLinks array to remove the "Flavors" link
  const navLinks = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5 mr-3" /> },
    { name: "About", href: "/about", icon: <Info className="h-5 w-5 mr-3" /> },
    { name: "Contact", href: "/#contact", icon: <Phone className="h-5 w-5 mr-3" /> },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Main Navigation Bar */}
        <div
          className={cn(
            "w-full transition-all duration-300",
            scrolled
              ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
              : isOrderPage
                ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
                : "bg-white/60 backdrop-blur-sm",
          )}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image
                  src="/toronto-cupcake-logo.png"
                  alt="Toronto Cupcake Logo"
                  width={50}
                  height={50}
                  className="mr-2"
                />
                <span
                  className={cn(
                    "font-playfair text-xl font-bold transition-colors duration-300 md:hidden",
                    "text-brand-pink dark:text-accent-gold",
                  )}
                >
                  Toronto Cupcake
                </span>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-neutral-900 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="relative">
                  <button
                    className="text-base font-medium text-neutral-900 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold flex items-center transition-colors duration-200"
                    onMouseEnter={() => cartCount > 0 && setShowCartPreview(true)}
                    onMouseLeave={() => setTimeout(() => setShowCartPreview(false), 300)}
                    onClick={openCartSummary}
                    aria-label={`View cart with ${cartCount} items`}
                  >
                    <div className="relative cart-icon">
                      <ShoppingBag
                        className={cn("h-5 w-5 mr-1 transition-transform", cartAnimation ? "animate-bounce" : "")}
                      />
                      {cartCount > 0 && (
                        <span
                          className={cn(
                            "absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all",
                            cartAnimation ? "animate-ping-once" : "",
                          )}
                        >
                          {cartCount}
                        </span>
                      )}
                    </div>
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </button>

                  {/* Cart Preview Dropdown */}
                  {showCartPreview && cartCount > 0 && (
                    <div
                      className="cart-preview absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700 overflow-hidden"
                      onMouseEnter={() => setShowCartPreview(true)}
                      onMouseLeave={() => setShowCartPreview(false)}
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="font-medium text-gray-900 dark:text-white">Your Cart ({cartCount})</h3>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center"
                          >
                            <div className="w-10 h-10 relative mr-3 flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                removeFromCart(item.id)
                              }}
                              className="text-gray-400 hover:text-brand-pink transition-colors"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Total:</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            ${cartTotal.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={openCartSummary}
                          className="block w-full bg-brand-pink hover:bg-hover-pink text-white text-center py-2 rounded-md font-medium"
                        >
                          View Cart
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </nav>

              {/* Mobile Navigation Controls */}
              <div className="flex items-center md:hidden">
                <div className="relative mr-4">
                  <button
                    className="text-neutral-900 dark:text-gray-200 transition-colors duration-200 cart-icon"
                    aria-label="View Cart"
                    onClick={openCartSummary}
                  >
                    <ShoppingBag
                      className={cn("h-6 w-6 transition-transform", cartAnimation ? "animate-bounce" : "")}
                    />
                    {cartCount > 0 && (
                      <span
                        className={cn(
                          "absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all",
                          cartAnimation ? "animate-ping-once" : "",
                        )}
                      >
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
                <button
                  onClick={toggleMenu}
                  className="menu-button p-1 focus:outline-none text-neutral-900 dark:text-gray-200 transition-colors duration-200"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Height Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black/30 z-40 transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          aria-hidden="true"
          onClick={closeMenu}
        ></div>

        {/* Mobile Side Menu with Enhanced Rose-Pink Hue */}
        <div
          className={cn(
            "mobile-menu fixed top-0 right-0 bottom-0 w-[60%] bg-rose-50/50 backdrop-blur-xl z-50 shadow-xl md:hidden transform transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
        >
          {/* Consolidated Navigation Container */}
          <nav className="flex flex-col h-full p-4">
            {/* Hidden focusable sentinel */}
            <button aria-hidden="true" tabIndex={0} className="focusable-sentinel sr-only" />

            {/* Visible Close Button */}
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu" className="p-2 self-end mb-4">
              <X className="h-6 w-6 text-neutral-900" />
            </button>

            {/* Logo and Menu Title */}
            <div className="flex items-center justify-center mb-6">
              <span className="font-playfair text-xl font-bold text-brand-pink dark:text-accent-gold drop-shadow-sm text-center">
                Menu
              </span>
            </div>

            {/* Navigation Links */}
            <ul className="space-y-2 flex-1 overflow-y-auto py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center px-4 py-3 text-base font-medium text-neutral-900 dark:text-white hover:bg-white/40 dark:hover:bg-white/40 rounded-lg transition-colors duration-200"
                  onClick={closeMenu}
                >
                  <span className="text-gray-700 dark:text-gray-300 mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              <li>
                <Link
                  key="Order Now"
                  href="/order"
                  className="flex items-center px-4 py-3 text-base font-medium text-neutral-900 dark:text-white hover:bg-white/40 dark:hover:bg-white/40 rounded-lg transition-colors duration-200"
                  onClick={closeMenu}
                >
                  <span className="text-gray-700 dark:text-gray-300 mr-3">
                    <ShoppingBag className="h-5 w-5" />
                  </span>
                  Order Now
                </Link>
              </li>
            </ul>

            {/* Cart Summary in Mobile Menu */}
            {cartCount > 0 && (
              <div className="border-t border-white/20 pt-4 mt-4">
                <div className="px-4 py-2 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-neutral-900 dark:text-white font-medium">Cart Summary</span>
                    <span className="text-neutral-900 dark:text-white font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                  </p>
                  <button
                    className="block w-full bg-brand-pink hover:bg-hover-pink text-white text-center py-2 rounded-lg font-medium"
                    onClick={() => {
                      setIsMenuOpen(false)
                      setShowCartSummary(true)
                    }}
                  >
                    View Cart
                  </button>
                </div>
              </div>
            )}

            {/* Order Now Button */}
            <div className="mt-auto pt-6">
              <Link
                href="/order"
                className="block w-full bg-brand-pink hover:bg-hover-pink text-white dark:text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-md text-center"
                onClick={closeMenu}
              >
                Order Now
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Cart Summary Modal */}
      <CartSummary isOpen={showCartSummary} onClose={() => setShowCartSummary(false)} />
    </>
  )
}
