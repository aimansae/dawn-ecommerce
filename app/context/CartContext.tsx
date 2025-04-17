"use client";
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
  const [cart, setCart] = useState<CartItemType[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });
  const [isCartReady, setIsCartReady] = useState(false);
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      console.log("🛒 Restored cart from localStorage:", storedCart);
      setIsCartReady(true);
    } else {
      console.log("🛒 No cart found in localStorage.");
      setIsCartReady(true); // even if empty, we’re ready
    }
  }, []);

  useEffect(() => {
    if (isCartReady && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Cart saved to localStorage:", cart);
    }
  }, [cart, isCartReady]);

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
      console.log("selected Image in context", selectedImage);
      return [...prevCart, { ...item, selectedImage }];
    });
  };
  const updateQuantity = (
    productId: string,
    selectedColor: string,
    selectedSize: string,
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
      prevCart.filter(
        cartItem =>
          cartItem.product.id !== productId ||
          cartItem.selectedColor !== selectedColor ||
          cartItem.selectedSize !== selectedSize
      )
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
