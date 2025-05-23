"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
  cartTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const CART_EXPIRY_HOURS = 24 // Cart expires after 24 hours

  // Add this function after the CartProvider function definition:
  const isCartExpired = (timestamp: number) => {
    const now = Date.now()
    const expiryTime = CART_EXPIRY_HOURS * 60 * 60 * 1000 // Convert to milliseconds
    return now - timestamp > expiryTime
  }

  // Load cart from localStorage on initial render
  useEffect(() => {
    if (isClient) {
      try {
        const savedCart = localStorage.getItem("cart")
        const cartTimestamp = localStorage.getItem("cartTimestamp")

        if (savedCart && cartTimestamp) {
          const timestamp = Number.parseInt(cartTimestamp, 10)

          if (!isCartExpired(timestamp)) {
            const parsedCart = JSON.parse(savedCart)
            setCart(parsedCart)
          } else {
            // Clear expired cart
            localStorage.removeItem("cart")
            localStorage.removeItem("cartTimestamp")
          }
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        // Clear corrupted data
        localStorage.removeItem("cart")
        localStorage.removeItem("cartTimestamp")
      }
    }
  }, [isClient])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart))
        localStorage.setItem("cartTimestamp", Date.now().toString())
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }

      // Calculate cart count and total
      const count = cart.reduce((total, item) => total + item.quantity, 0)
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

      setCartCount(count)
      setCartTotal(total)
    }
  }, [cart, isClient])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((cartItem) => cartItem.id === item.id)

      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += item.quantity
        return updatedCart
      } else {
        // Add new item
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
