import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/hooks/use-cart"
import NewsletterBanner from "@/components/newsletter-banner"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Toronto Cupcake | Handcrafted Cupcakes",
  description:
    "Toronto's premier cupcake bakery offering handcrafted cupcakes for any occasion. Order online for delivery or pickup.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <NewsletterBanner />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
