"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Plus, Wheat, Droplet, Nut } from 'lucide-react'

export default function FlavorCarousel() {
  const flavors = [
    {
      name: "Vanilla Vanilla Cupcake",
      image: "/images/vanilla-vanilla-cupcake.png",
      rating: 4.8,
      reviews: 124,
      allergens: ["dairy", "gluten"],
    },
    {
      name: "Vanilla Chocolate Cupcake",
      image: "/images/vanilla-chocolate-cupcake.png",
      rating: 4.9,
      reviews: 156,
      allergens: ["dairy", "gluten"],
    },
    {
      name: "Chocolate Hazelnut Cupcake",
      image: "/images/chocolate-hazelnut-cupcake.png",
      rating: 4.7,
      reviews: 98,
      allergens: ["dairy", "gluten", "nuts"],
    },
    {
      name: "Chocolate Vanilla Cupcake",
      image: "/images/chocolate-vanilla-cupcake.png",
      rating: 4.6,
      reviews: 112,
      allergens: ["dairy", "gluten"],
    },
    {
      name: "Red Velvet Fudge",
      image: "/images/red-velvet-fudge-cupcake.png",
      rating: 4.9,
      reviews: 203,
      allergens: ["dairy", "gluten"],
    },
  ]

  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
    }

    const handleResize = () => {
      if (carouselRef.current) {
        setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && expandedCard !== null) {
        setExpandedCard(null)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [expandedCard])

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 200
      const newPosition =
        direction === "left"
          ? Math.max(scrollPosition - scrollAmount, 0)
          : Math.min(scrollPosition + scrollAmount, maxScroll)

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })

      setScrollPosition(newPosition)
    }
  }

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft)
    }
  }

  const getAllergenIcon = (allergen: string) => {
    switch (allergen) {
      case "nuts":
        return <Nut className="h-4 w-4 text-amber-700 dark:text-amber-500" />
      case "dairy":
        return <Droplet className="h-4 w-4 text-blue-500 dark:text-blue-400" />
      case "gluten":
        return <Wheat className="h-4 w-4 text-yellow-700 dark:text-yellow-500" />
      default:
        return null
    }
  }

  const toggleCardExpansion = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index)
  }

  return (
    <section id="flavors" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Our Flavors</h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md ${
              scrollPosition <= 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={scrollPosition <= 0}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            onScroll={handleScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {flavors.map((flavor, index) => (
              <div
                key={index}
                className="group relative min-w-[250px] h-[300px] mx-2 snap-start rounded-xl overflow-hidden shadow-lg focus-within:ring-2 focus-within:ring-brand-pink border border-gray-200 dark:border-gray-700"
                tabIndex={0}
                role="button"
                aria-expanded={expandedCard === index}
                onClick={() => toggleCardExpansion(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleCardExpansion(index)
                  }
                }}
              >
                {/* Base Image */}
                <Image src={flavor.image || "/placeholder.svg"} alt={flavor.name} fill className="object-cover" />

                {/* Flavor Name Overlay (Always Visible) */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-playfair text-xl font-semibold">{flavor.name}</h3>
                </div>

                {/* Detailed Overlay (Visible on Hover/Focus) */}
                <div
                  className={`absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 flex flex-col justify-between transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-focus:opacity-100 group-focus:scale-100 transition-all duration-200 ease-out ${
                    expandedCard === index ? "opacity-100 scale-100" : ""
                  }`}
                >
                  <div>
                    <h4 className="text-base font-semibold text-neutral-900 dark:text-white mb-2">{flavor.name}</h4>

                    {/* Rating Row */}
                    <div className="flex items-center mb-3">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            fill={i < Math.floor(flavor.rating) ? "currentColor" : "none"}
                            className={`h-4 w-4 ${
                              i < Math.floor(flavor.rating)
                                ? "text-brand-pink"
                                : i < flavor.rating
                                ? "text-brand-pink fill-brand-pink/50"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {flavor.rating} ({flavor.reviews})
                      </span>
                    </div>

                    {/* Allergens Row */}
                    <div className="mb-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Contains:</span>
                      <div className="flex flex-wrap gap-2">
                        {flavor.allergens.map((allergen, i) => (
                          <div
                            key={i}
                            className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md"
                            title={allergen.charAt(0).toUpperCase() + allergen.slice(1)}
                          >
                            <span className="mr-1">{getAllergenIcon(allergen)}</span>
                            <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{allergen}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    className="bg-brand-pink text-white rounded-full px-3 py-1 text-sm flex items-center justify-center hover:bg-brand-pink/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add to cart functionality would go here
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md ${
              scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
            disabled={scrollPosition >= maxScroll}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>
      </div>
    </section>
  )
}
