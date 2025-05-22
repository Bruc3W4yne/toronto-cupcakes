"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ChevronDown, ChevronUp, Search, Star, Plus, Minus, ShoppingCart, ShoppingBag } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useCart } from "@/hooks/use-cart"

// Product types
type Allergen = "nuts" | "dairy" | "gluten"

interface Product {
  id: string
  name: string
  image: string
  price: number
  rating: number
  reviews: number
  allergens: Allergen[]
  category: "always" | "holiday" | "custom"
  isVegan?: boolean
}

export default function OrderPage() {
  // State
  const [activeTab, setActiveTab] = useState<"one-click" | "custom">("one-click")
  const [activeCategory, setActiveCategory] = useState<"always" | "holiday" | "custom">("always")
  const [showFaq, setShowFaq] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    nutFree: false,
    vegan: false,
  })
  const [dozenQuantity, setDozenQuantity] = useState(1)
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({})

  // Use cart hook
  const { addToCart, cart, cartCount, cartTotal } = useCart()

  // Sample product data
  const products: Product[] = [
    {
      id: "vanilla-vanilla",
      name: "Vanilla Vanilla Cupcake",
      image: "/images/vanilla-vanilla-cupcake.png",
      price: 3.75,
      rating: 4.8,
      reviews: 124,
      allergens: ["dairy", "gluten"],
      category: "always",
    },
    {
      id: "vanilla-chocolate",
      name: "Vanilla Chocolate Cupcake",
      image: "/images/vanilla-chocolate-cupcake.png",
      price: 3.75,
      rating: 4.9,
      reviews: 156,
      allergens: ["dairy", "gluten"],
      category: "always",
    },
    {
      id: "chocolate-hazelnut",
      name: "Chocolate Hazelnut Cupcake",
      image: "/images/chocolate-hazelnut-cupcake.png",
      price: 4.25,
      rating: 4.7,
      reviews: 98,
      allergens: ["dairy", "gluten", "nuts"],
      category: "always",
    },
    {
      id: "chocolate-vanilla",
      name: "Chocolate Vanilla Cupcake",
      image: "/images/chocolate-vanilla-cupcake.png",
      price: 3.75,
      rating: 4.6,
      reviews: 112,
      allergens: ["dairy", "gluten"],
      category: "always",
    },
    {
      id: "red-velvet",
      name: "Red Velvet Fudge",
      image: "/images/red-velvet-fudge-cupcake.png",
      price: 4.5,
      rating: 4.9,
      reviews: 203,
      allergens: ["dairy", "gluten"],
      category: "always",
    },
    {
      id: "vegan-chocolate",
      name: "Vegan Chocolate Delight",
      image: "/chocolate-cupcake.png",
      price: 4.95,
      rating: 4.5,
      reviews: 87,
      allergens: ["gluten"],
      category: "always",
      isVegan: true,
    },
    {
      id: "holiday-pride",
      name: "Pride Cupcake",
      image: "/images/pride-cupcake.png",
      price: 5.0,
      rating: 4.9,
      reviews: 112,
      allergens: ["dairy", "gluten"],
      category: "holiday",
    },
    {
      id: "holiday-easter",
      name: "Easter Cupcake",
      image: "/images/easter-cupcake.png",
      price: 4.75,
      rating: 4.8,
      reviews: 95,
      allergens: ["dairy", "gluten"],
      category: "holiday",
    },
  ]

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (product.category !== activeCategory) return false

    // Filter by search query
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Filter by nut-free
    if (filters.nutFree && product.allergens.includes("nuts")) return false

    // Filter by vegan
    if (filters.vegan && !product.isVegan) return false

    return true
  })

  // Handle adding dozen to cart
  const addDozenToCart = () => {
    addToCart({
      id: "assorted-dozen",
      name: "Assorted Dozen Cupcakes",
      price: 41.5,
      quantity: 1,
      image: "/assorted-dozen-cupcakes.png",
    })
  }

  // Handle adding individual product to cart
  const addProductToCart = (product: Product) => {
    const quantity = productQuantities[product.id] || 1

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    })

    // Reset quantity
    setProductQuantities({
      ...productQuantities,
      [product.id]: 1,
    })
  }

  // Handle quantity change for a product
  const updateProductQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) newQuantity = 1
    if (newQuantity > 99) newQuantity = 99

    setProductQuantities({
      ...productQuantities,
      [productId]: newQuantity,
    })
  }

  // Get allergen icon
  const getAllergenIcon = (allergen: Allergen) => {
    switch (allergen) {
      case "nuts":
        return (
          <span title="Contains nuts" className="text-amber-700 dark:text-amber-500">
            🥜
          </span>
        )
      case "dairy":
        return (
          <span title="Contains dairy" className="text-blue-500 dark:text-blue-400">
            🥛
          </span>
        )
      case "gluten":
        return (
          <span title="Contains gluten" className="text-yellow-700 dark:text-yellow-500">
            🌾
          </span>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow pt-20">
        {/* Header */}
        <header className="sticky top-16 z-30 bg-white dark:bg-gray-900 shadow-sm py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center">
              <Link href="/" className="mr-4 text-gray-700 dark:text-gray-200 hover:text-brand-pink">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-playfair text-2xl font-bold text-gray-900 dark:text-white">Order Your Cupcakes</h1>
            </div>
          </div>
        </header>

        {/* Step Selector Toggle */}
        <section className="py-4 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
              <button
                className={`flex-1 py-2 px-4 text-center transition-all duration-200 ease-out text-gray-900 dark:text-gray-900 font-medium ${
                  activeTab === "one-click"
                    ? "bg-brand-pink/90"
                    : "bg-white dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("one-click")}
              >
                One-Click Dozen
              </button>
              <button
                className={`flex-1 py-2 px-4 text-center transition-all duration-200 ease-out text-gray-900 dark:text-gray-900 font-medium ${
                  activeTab === "custom"
                    ? "bg-brand-pink/90"
                    : "bg-white dark:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab("custom")}
              >
                Pick Your Own
              </button>
            </div>
          </div>
        </section>

        {/* One-Click Dozen Section */}
        {activeTab === "one-click" && (
          <section className="py-6">
            <div className="container mx-auto px-4">
              <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="relative h-64 w-full">
                  <Image
                    src="/assorted-dozen-cupcakes.png"
                    alt="Assorted Dozen Cupcakes"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-1">Assorted Dozen</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">12 cupcakes</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">$41.50/doz</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                      <button
                        className="px-3 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setDozenQuantity(Math.max(1, dozenQuantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 min-w-[40px] text-center">{dozenQuantity}</span>
                      <button
                        className="px-3 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setDozenQuantity(Math.min(99, dozenQuantity + 1))}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      className="bg-brand-pink hover:bg-brand-pink/90 text-black font-bold py-2 px-4 rounded-lg transition-all duration-200 ease-out shadow-sm border border-black flex items-center"
                      onClick={addDozenToCart}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      <span className="drop-shadow-none">Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible FAQ */}
              <div className="max-w-md mx-auto mt-4">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-700 dark:text-gray-200 hover:text-brand-pink dark:hover:text-brand-pink transition-colors"
                  onClick={() => setShowFaq(!showFaq)}
                >
                  <span className="font-medium">Why go custom?</span>
                  {showFaq ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
                {showFaq && (
                  <div className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm">
                    <p>
                      Our assorted dozen includes our most popular flavors. If you prefer to select specific flavors or
                      have dietary restrictions, use our "Pick Your Own" option to customize your order exactly how you
                      want it.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Pick Your Own Section */}
        {activeTab === "custom" && (
          <section className="py-6">
            <div className="container mx-auto px-4">
              {/* Category Tabs */}
              <div className="sticky top-[calc(4rem+64px)] z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 mb-4">
                <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
                  <button
                    className={`py-2 px-4 whitespace-nowrap transition-all duration-200 ease-out ${
                      activeCategory === "always"
                        ? "text-brand-pink border-b-2 border-brand-pink font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-brand-pink"
                    }`}
                    onClick={() => setActiveCategory("always")}
                  >
                    Always Available
                  </button>
                  <button
                    className={`py-2 px-4 whitespace-nowrap transition-all duration-200 ease-out ${
                      activeCategory === "holiday"
                        ? "text-brand-pink border-b-2 border-brand-pink font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-brand-pink"
                    }`}
                    onClick={() => setActiveCategory("holiday")}
                  >
                    Holiday
                  </button>
                  <button
                    className={`py-2 px-4 whitespace-nowrap transition-all duration-200 ease-out ${
                      activeCategory === "custom"
                        ? "text-brand-pink border-b-2 border-brand-pink font-medium"
                        : "text-gray-700 dark:text-gray-300 hover:text-brand-pink"
                    }`}
                    onClick={() => setActiveCategory("custom")}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:border-transparent"
                      placeholder="Search flavors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={filters.nutFree}
                        onChange={() => setFilters({ ...filters, nutFree: !filters.nutFree })}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-pink"></div>
                      <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">Nut-free</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={filters.vegan}
                        onChange={() => setFilters({ ...filters, vegan: !filters.vegan })}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-pink rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-brand-pink"></div>
                      <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300">Vegan</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-brand-pink font-semibold text-sm sm:text-base mb-2">
                        ${product.price.toFixed(2)}
                      </p>

                      {/* Rating and Allergens */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-brand-pink fill-brand-pink" />
                          <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{product.rating}</span>
                        </div>
                        <div className="flex space-x-1">
                          {product.allergens.map((allergen, i) => (
                            <span key={i} className="text-sm">
                              {getAllergenIcon(allergen)}
                            </span>
                          ))}
                          {product.isVegan && (
                            <span title="Vegan" className="text-green-600 dark:text-green-500 text-xs">
                              🌱
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                          <button
                            className="px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => updateProductQuantity(product.id, (productQuantities[product.id] || 1) - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 py-1 text-xs min-w-[24px] text-center">
                            {productQuantities[product.id] || 1}
                          </span>
                          <button
                            className="px-2 py-1 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => updateProductQuantity(product.id, (productQuantities[product.id] || 1) + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className="w-full bg-brand-pink hover:bg-brand-pink/90 text-black py-2 px-3 rounded-md flex items-center justify-center transition-all duration-200 ease-out font-bold border border-black shadow-sm"
                        onClick={() => addProductToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2 text-black" />
                        <span className="drop-shadow-sm">Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    No cupcakes match your filters. Try adjusting your search.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Sticky Cart Summary */}
        {cartCount > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700 py-3 px-4 z-40">
            <div className="container mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 text-brand-pink mr-2" />
                  <span className="text-gray-900 dark:text-white font-medium">
                    {cartCount} {cartCount === 1 ? "item" : "items"} — ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <button className="bg-brand-pink hover:bg-brand-pink/90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 ease-out">
                  Review & Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
