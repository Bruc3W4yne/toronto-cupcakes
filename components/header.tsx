"use client"
import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingCart, X } from "lucide-react"

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/cupcake-logo.png" alt="Toronto Cupcake Logo" width={40} height={40} className="mr-2" />
          <span className="font-playfair text-xl font-bold text-brand-pink dark:text-accent-gold">Toronto Cupcake</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="#flavors"
            className="text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold"
          >
            Flavors
          </Link>
          <Link
            href="#about"
            className="text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold"
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold"
          >
            Contact
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </nav>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center md:hidden">
          <Link href="/cart" className="relative mr-4">
            <ShoppingCart className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 dark:text-gray-200"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="#flavors"
              className="text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Flavors
            </Link>
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-accent-gold"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
