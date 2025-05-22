"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"

export default function SocialProof() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div
        className={`container mx-auto px-4 flex flex-wrap justify-center gap-6 transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2 flex items-center shadow-md">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className="text-gray-700 dark:text-gray-200 font-medium">4.9/5 (500+ reviews)</span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2 shadow-md">
          <span className="text-gray-700 dark:text-gray-200 font-medium">10,000+ Events Served</span>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-full px-6 py-2 shadow-md">
          <span className="text-gray-700 dark:text-gray-200 font-medium">Toronto's #1 Cupcake Bakery</span>
        </div>
      </div>
    </section>
  )
}
