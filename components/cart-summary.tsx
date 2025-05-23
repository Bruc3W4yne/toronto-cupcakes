"use client"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Trash2, Plus, Minus, X } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

interface CartSummaryProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSummary({ isOpen, onClose }: CartSummaryProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-xl sm:rounded-xl shadow-xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">Shopping Cart ({cartCount})</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty</p>
              <Link
                href="/order"
                className="inline-block bg-brand-pink hover:bg-hover-pink text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={onClose}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">${item.price.toFixed(2)} each</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-2 text-sm font-medium text-gray-900 dark:text-white min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
              <span className="text-lg font-bold text-brand-pink">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <Link
                href="/order"
                className="block w-full bg-brand-pink hover:bg-hover-pink text-white font-bold py-3 px-4 rounded text-center transition-colors"
                onClick={onClose}
              >
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  clearCart()
                  onClose()
                }}
                className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 py-2 text-sm transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
