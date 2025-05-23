"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Wheat, Droplet, Nut, Leaf } from "lucide-react"

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
      isVegan: false,
    },
  ]

  const carouselRef = useRef<HTMLDivElement>(null)
  const carouselContainerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [cardWidth, setCardWidth] = useState(266) // Default: 250px card + 16px margin
  const [containerWidth, setContainerWidth] = useState(0)

  // Initialize and handle resize
  useEffect(() => {
    const updateDimensions = () => {
      if (carouselRef.current && carouselContainerRef.current) {
        // Get the actual width of a card including margins
        const cards = carouselRef.current.querySelectorAll(".carousel-card-wrapper")
        if (cards.length > 0) {
          const cardRect = cards[0].getBoundingClientRect()
          const actualCardWidth = cardRect.width
          setCardWidth(actualCardWidth)
        }

        // Get container width
        const containerRect = carouselContainerRef.current.getBoundingClientRect()
        setContainerWidth(containerRect.width)

        // Update max scroll
        setMaxScroll(carouselRef.current.scrollWidth - carouselRef.current.clientWidth)
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Calculate the position to center a card
  const calculateCenterPosition = (index: number) => {
    if (!carouselRef.current) return 0

    // Calculate the position of the card
    const cardPosition = index * cardWidth

    // Calculate the center offset (to center the card in the container)
    const centerOffset = (containerWidth - cardWidth) / 2

    // The position to scroll to center the card
    return Math.max(0, Math.min(cardPosition - centerOffset, maxScroll))
  }

  const smoothScrollTo = (targetPosition: number) => {
    if (!carouselRef.current || isScrolling) return

    setIsScrolling(true)
    const startPosition = carouselRef.current.scrollLeft
    const distance = targetPosition - startPosition
    const duration = 400 // 400ms animation
    let startTime: number | null = null

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function for smooth animation
      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1)
      const easedProgress = easeInOutCubic(progress)

      const currentPosition = startPosition + distance * easedProgress

      if (carouselRef.current) {
        carouselRef.current.scrollLeft = currentPosition
        setScrollPosition(currentPosition)
      }

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        setIsScrolling(false)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Navigate to a specific card and center it
  const navigateToCard = (index: number) => {
    if (index < 0 || index >= flavors.length || isScrolling) return

    // If the card is already active, toggle it off
    if (activeCardIndex === index) {
      setActiveCardIndex(null)
    } else {
      setActiveCardIndex(index)
      const centerPosition = calculateCenterPosition(index)
      smoothScrollTo(centerPosition)
    }
  }

  // Handle previous/next navigation
  const navigate = (direction: "left" | "right") => {
    // If no card is active, select the first or last card
    if (activeCardIndex === null) {
      navigateToCard(direction === "left" ? 0 : flavors.length - 1)
      return
    }

    const newIndex =
      direction === "left" ? Math.max(0, activeCardIndex - 1) : Math.min(flavors.length - 1, activeCardIndex + 1)

    navigateToCard(newIndex)
  }

  // Handle manual scrolling
  const handleScroll = () => {
    if (carouselRef.current && !isScrolling) {
      const newScrollPosition = carouselRef.current.scrollLeft
      setScrollPosition(newScrollPosition)
    }
  }

  // Handle card click
  const handleCardClick = (index: number) => {
    navigateToCard(index)
  }

  // Get allergen icon
  const getAllergenIcon = (allergen: string) => {
    switch (allergen) {
      case "nuts":
        return (
          <div className="relative group">
            <Nut className="h-5 w-5 text-amber-700 dark:text-amber-500" />
            <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Contains nuts
            </span>
          </div>
        )
      case "dairy":
        return (
          <div className="relative group">
            <Droplet className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Contains dairy
            </span>
          </div>
        )
      case "gluten":
        return (
          <div className="relative group">
            <Wheat className="h-5 w-5 text-yellow-700 dark:text-yellow-500" />
            <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Contains gluten
            </span>
          </div>
        )
      default:
        return null
    }
  }

  // Custom easing function (ease-in-out-quint)
  const easeInOutQuint = "cubic-bezier(0.83, 0, 0.17, 1)"

  return (
    <section id="flavors" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Our Flavors
        </h2>

        <div className="relative z-10 mt-8" ref={carouselContainerRef}>
          {/* Left Arrow */}
          <button
            onClick={() => navigate("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-opacity ${
              activeCardIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:shadow-lg"
            }`}
            disabled={activeCardIndex === 0 || isScrolling}
            aria-label="Previous flavor"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide py-8 px-2"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "auto", // Disable native smooth scroll since we're using custom
            }}
          >
            {flavors.map((flavor, index) => (
              <div
                key={index}
                className="carousel-card-wrapper mx-2 flex-shrink-0"
                style={{
                  width: "250px", // Fixed width for the wrapper
                  height: "325px", // Fixed height for the wrapper
                  perspective: "1000px", // Add perspective for better 3D effect
                  zIndex: activeCardIndex === index ? 30 : 10, // Higher z-index for active card
                }}
              >
                <div
                  className={`carousel-card relative w-full h-full transition-all duration-500 ease-out transform-gpu ${
                    activeCardIndex === index ? "scale-110" : "hover:scale-105"
                  }`}
                  style={{
                    transformOrigin: "center center",
                    willChange: "transform", // Optimize for animations
                    transformStyle: "preserve-3d", // Enable 3D transforms
                    borderRadius: "0.75rem", // 12px rounded corners
                    boxShadow: activeCardIndex === index ? "0 10px 25px -5px rgba(0, 0, 0, 0.2)" : "none",
                  }}
                  onClick={() => handleCardClick(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${flavor.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCardClick(index)
                    }
                  }}
                >
                  {/* Card Flip Container - This is what actually flips */}
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: activeCardIndex === index ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: `transform 0.6s ${easeInOutQuint}`,
                    }}
                  >
                    {/* Front Face */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        border: "2px solid #000000", // Border on the front face
                        borderRadius: "0.75rem", // Match parent border-radius
                      }}
                    >
                      {/* Image Container */}
                      <Image
                        src={flavor.image || "/placeholder.svg"}
                        alt={flavor.name}
                        fill
                        className="object-cover"
                        sizes="250px"
                      />

                      {/* Flavor Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h3 className="text-white font-playfair text-xl font-semibold">{flavor.name}</h3>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden bg-white dark:bg-gray-800 p-4 flex flex-col"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)", // This makes the back face face backward
                        border: "2px solid #000000", // Border on the back face
                        borderRadius: "0.75rem", // Match parent border-radius
                      }}
                    >
                      <h3 className="font-playfair text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {flavor.name}
                      </h3>

                      {/* Rating Section */}
                      <div className="mb-4">
                        <div className="flex items-center mb-1">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(flavor.rating) ? "fill-current" : ""}`}
                              />
                            ))}
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{flavor.rating}/5</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{flavor.reviews} reviews</p>
                      </div>

                      {/* Allergen Information */}
                      <div className="mt-auto">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Allergen Information:</h4>
                        <div className="flex flex-wrap gap-3">
                          {flavor.allergens.map((allergen, i) => (
                            <div key={i} className="flex items-center">
                              {getAllergenIcon(allergen)}
                            </div>
                          ))}
                          {flavor.isVegan && (
                            <div className="flex items-center">
                              <div className="relative group">
                                <Leaf className="h-5 w-5 text-green-600 dark:text-green-500" />
                                <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  Vegan
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Back Button */}
                      <button
                        className="mt-4 text-sm text-brand-pink hover:text-hover-pink dark:text-accent-gold dark:hover:text-brand-pink transition-colors"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveCardIndex(null)
                        }}
                      >
                        Back to image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => navigate("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md transition-opacity ${
              activeCardIndex === flavors.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:shadow-lg"
            }`}
            disabled={activeCardIndex === flavors.length - 1 || isScrolling}
            aria-label="Next flavor"
          >
            <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {flavors.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                activeCardIndex === index ? "bg-brand-pink w-4" : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => navigateToCard(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
