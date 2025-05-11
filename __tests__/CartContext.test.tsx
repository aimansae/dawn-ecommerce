import React from "react";
import { CartProvider, useCart } from "@/app/context/CartContext";
import { ProductType } from "@/app/types/types";
import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";

const mockProduct: ProductType = {
  id: "1",
  name: "Test product",
  category: ["bags"],
  prices: {
    currency: "USD",
    regular: "100",
    sale: "80",
  },
  availableColors: [
    {
      color: "red",
      colorCategory: "red",
      tag: "available",
      imageUrl: ["img/red-front.jpg", "img/red-back.jpg"],
    },
  ],
  status: "inStock",
  availability: "available",
  createdAt: "2024-01-01",
  description: "Sample description",
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);
describe("Cart Context", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  it("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        product: mockProduct,
        quantity: 1,
        selectedColor: "red",
        selectedSize: "default",
      });
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.cart[0].selectedColor).toBe("red");
    expect(result.current.cart[0].selectedImage).toEqual([
      "img/red-front.jpg",
      "img/red-back.jpg",
    ]);
  });

  it("updates cart quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        product: mockProduct,
        quantity: 1,
        selectedColor: "red",
        selectedSize: "default",
      });
      result.current.updateQuantity("1", "red", "default", 1);
    });
    expect(result.current.cart[0].quantity).toBe(2);
  });

  it("calculates total price", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        product: mockProduct,
        quantity: 2,
        selectedColor: "red",
        selectedSize: "default",
      });
    });

    expect(result.current.getTotalPrice()).toBe(160);
  });

  it("removes item from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        product: mockProduct,
        quantity: 1,
        selectedColor: "red",
        selectedSize: "default",
      });
      result.current.removeFromCart("1", "red", "default");
    });
    expect(result.current.cart.length).toBe(0);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        product: mockProduct,
        quantity: 1,
        selectedColor: "red",
        selectedSize: "default",
      });
      result.current.clearCart();
    });
    expect(result.current.cart.length).toBe(0);
  });
});
