import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} Toronto Cupcake. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-pink dark:hover:text-accent-gold"
            >
              Contact Us
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 dark:text-gray-300 hover:text-brand-pink dark:hover:text-accent-gold"
            >
              FAQ
            </Link>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-pink dark:hover:text-accent-gold"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-pink dark:hover:text-accent-gold"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-700 dark:text-gray-300 hover:text-brand-pink dark:hover:text-accent-gold"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
