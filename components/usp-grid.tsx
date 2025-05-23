"use client"

import { useRouter } from "next/navigation"
import { Clock, Palette, Truck, Award } from "lucide-react"

export default function UspGrid() {
  const router = useRouter()

  const handleTopFlavorsClick = () => {
    // Navigate to order page with top5 category selected
    router.push("/order?category=top5#top")
    // The focus will be handled by the browser when navigating to the anchor
  }

  const features = [
    {
      icon: <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-brand-pink" strokeWidth={1.5} />,
      title: "Baked Daily",
      description: "Never frozen, always fresh",
    },
    {
      icon: <Palette className="h-10 w-10 sm:h-12 sm:w-12 text-brand-pink" strokeWidth={1.5} />,
      title: "Custom Designs",
      description: "Logos & themes you love",
    },
    {
      icon: <Truck className="h-10 w-10 sm:h-12 sm:w-12 text-brand-pink" strokeWidth={1.5} />,
      title: "Fast Delivery",
      description: "Under 4 h anywhere in the GTA",
    },
    {
      icon: <Award className="h-10 w-10 sm:h-12 sm:w-12 text-brand-pink" strokeWidth={1.5} />,
      title: "Top 5 Flavours",
      description: "See what's trending now",
      onClick: handleTopFlavorsClick,
    },
  ]

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) =>
            feature.onClick ? (
              <button
                key={index}
                onClick={feature.onClick}
                className="feature-card bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-center items-center text-center cursor-pointer hover:shadow-lg hover:-translate-y-1 focus:shadow-lg focus:-translate-y-1 active:scale-95 transition-all duration-200 ease-out w-full aspect-[4/5]"
              >
                <div className="mb-4 flex items-center justify-center">{feature.icon}</div>
                <h3 className="font-playfair text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{feature.description}</p>
              </button>
            ) : (
              <div
                key={index}
                className="feature-card bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm flex flex-col justify-center items-center text-center hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200 ease-out w-full aspect-[4/5]"
              >
                <div className="mb-4 flex items-center justify-center">{feature.icon}</div>
                <h3 className="font-playfair text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{feature.description}</p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
