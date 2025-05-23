"use client"

import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image src="/hero-background.png" alt="Cupcake background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">Our Story</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              From a small kitchen to Toronto's favorite cupcake bakery
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                How It All Started
              </h2>

              <div className="mb-8 relative h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/assorted-cupcake-dozen.png"
                  alt="Our first batch of cupcakes"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Toronto Cupcake began in 2010 when our founder, Sarah, started baking cupcakes in her apartment
                  kitchen for friends and family gatherings. What started as a hobby quickly turned into a passion as
                  word spread about her delicious creations.
                </p>

                <p className="mt-4">
                  After countless requests and encouragement from loved ones, Sarah decided to take a leap of faith and
                  turn her passion into a business. She rented a small commercial kitchen space and began selling her
                  cupcakes at local farmers' markets and through word-of-mouth orders.
                </p>

                <h3 className="font-playfair text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
                  Growing With Toronto
                </h3>

                <p>
                  As demand grew, so did our team and offerings. We opened our first storefront in 2012, and have since
                  expanded to three locations across the Greater Toronto Area. Our commitment to quality ingredients,
                  innovative flavors, and exceptional customer service has remained unchanged.
                </p>

                <p className="mt-4">
                  Today, Toronto Cupcake is proud to be a part of countless celebrations across the city - from
                  birthdays and weddings to corporate events and everyday treats. We've grown, but we still bake each
                  cupcake with the same care and attention that Sarah put into those very first batches in her apartment
                  kitchen.
                </p>

                <h3 className="font-playfair text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">Our Values</h3>

                <ul className="list-disc pl-6 mt-4">
                  <li>
                    <strong>Quality:</strong> We use only the finest ingredients, sourcing locally whenever possible.
                  </li>
                  <li>
                    <strong>Creativity:</strong> We're constantly developing new flavors and designs to delight our
                    customers.
                  </li>
                  <li>
                    <strong>Community:</strong> We believe in giving back to the Toronto community that has supported us
                    from day one.
                  </li>
                  <li>
                    <strong>Sustainability:</strong> We're committed to reducing our environmental footprint through
                    eco-friendly packaging and practices.
                  </li>
                </ul>

                <p className="mt-6">
                  Thank you for being a part of our story. We look forward to being a part of your celebrations for many
                  years to come!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                  <Image src="/woman-baker-portrait.png" alt="Sarah Johnson" fill className="object-cover" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-1 text-gray-900 dark:text-white">Sarah Johnson</h3>
                <p className="text-brand-pink dark:text-accent-gold font-medium mb-3">Founder & Head Baker</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sarah's passion for baking and entrepreneurial spirit brought Toronto Cupcake to life.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                  <Image src="/man-chef-portrait.png" alt="Michael Chen" fill className="object-cover" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-1 text-gray-900 dark:text-white">Michael Chen</h3>
                <p className="text-brand-pink dark:text-accent-gold font-medium mb-3">Executive Pastry Chef</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  With 15 years of experience, Michael brings culinary expertise and innovation to our flavors.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 relative rounded-full overflow-hidden">
                  <Image src="/business-woman-portrait.png" alt="Priya Patel" fill className="object-cover" />
                </div>
                <h3 className="font-playfair text-xl font-bold mb-1 text-gray-900 dark:text-white">Priya Patel</h3>
                <p className="text-brand-pink dark:text-accent-gold font-medium mb-3">Operations Manager</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Priya ensures everything runs smoothly, from our kitchens to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
