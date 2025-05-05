"use client";
import React from "react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProductType } from "../types/types";

export type CartItemType = {
  product: ProductType;
  quantity: number;
  selectedColor: string;
  selectedImage?: string[];
  selectedSize?: string;
};

type CartContextType = {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateQuantity: (
    productId: string,
    selectedColor: string,
    selectedSize: string | undefined,
    change: number
  ) => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
  removeFromCart: (
    productId: string,
    selectedColor: string,
    selectedSize?: string
  ) => void;
  clearCart: () => void;
};
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Load cart from localStorage only on client
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error("Failed to parse cart from localStorage", err);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // ✅ Save cart to localStorage after initial load
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (item: CartItemType) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        cartItem =>
          cartItem.product.id === item.product.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.product.id === item.product.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // Find the image corresponding to the selected color

      const selectedImage = item.product.availableColors?.find(
        color => color.color === item.selectedColor
      )?.imageUrl;

      return [...prevCart, { ...item, selectedImage }];
    });
  };
  const updateQuantity = (
    productId: string,
    selectedColor: string,
    selectedSize: string | undefined,
    change: number
  ) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.product.id === productId &&
        cartItem.selectedColor === selectedColor &&
        cartItem.selectedSize === selectedSize
          ? { ...cartItem, quantity: Math.max(cartItem.quantity + change, 1) } // Ensure quantity is at least 1
          : cartItem
      )
    );
  };
  const removeFromCart = (
    productId: string,
    selectedColor: string,
    selectedSize?: string
  ) => {
    setCart(prevCart =>
      prevCart.filter(cartItem => {
        const sameProduct = cartItem.product.id === productId;
        const sameColor = cartItem.selectedColor === selectedColor;

        const sameSize =
          cartItem.selectedSize === selectedSize ||
          (!cartItem.selectedSize && !selectedSize); // handles undefined case

        return !(sameProduct && sameColor && sameSize);
      })
    );
  };

  const getTotalQuantity = () => {
    if (!cart || cart.length === 0) {
      return 0;
    }
    return cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  };

  const getTotalPrice = () => {
    if (!cart || cart.length === 0) {
      return 0;
    }
    return cart.reduce((acc, item) => {
      const price = Number(
        item.product.prices.sale || item.product.prices.regular
      );
      return acc + price * item.quantity;
    }, 0);
  };
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalQuantity,
        getTotalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Use context within provider");
  }

  return context;
}
