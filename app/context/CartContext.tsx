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
  selectedImage?: string;
  selectedSize?: string;
};

type CartContextType = {
  cart: CartItemType[];
  addToCart: (item: CartItemType) => void;
  updateQuantity: (
    productId: string,
    selectedColor: string,
    change: number
  ) => void;
  getTotalQuantity: () => string;
  getTotalPrice: () => string;
  removeFromCart: (
    productId: string,
    selectedColor: string,
    selectedSize?: string
  ) => void;
};
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItemType) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.product.id === item.product.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.product.id === item.product.id &&
          item.selectedColor === item.selectedColor
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // Find the image corresponding to the selected color

      const selectedImage = item.product.availableColors?.find(
        (color) => color.color === item.selectedColor
      )?.imageUrl;

      console.log("Selected color:", item.selectedColor);
      console.log("Selected image:", selectedImage);

      return [...prevCart, { ...item, selectedImage }];
    });
  };
  const updateQuantity = (
    productId: string,
    selectedColor: string,
    change: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.product.id === productId &&
        cartItem.selectedColor === selectedColor
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
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) =>
          cartItem.product.id !== productId ||
          cartItem.selectedColor !== selectedColor ||
          cartItem.selectedSize !== selectedSize
      )
    );
  };

  const getTotalQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart
      .reduce(
        (acc, item) => acc + item.product.prices.regular * item.quantity,
        0
      )
      .toFixed(2);
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
