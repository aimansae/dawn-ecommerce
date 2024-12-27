"use client";

import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
const Cart = () => {
  const { cart, removeFromCart, setCart, totalQuantity } = useCart();

  const handleQuantityChange = (
    productId: string,
    selectedColor: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.product.id === productId && item.selectedColor === selectedColor
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    console.log("CART", cart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Trigger state update
    window.dispatchEvent(new Event("storage"));
  };
  console.log(totalQuantity, "************");
  return (
    <section className="px-[30px] py-6 flex flex-col gap-4 md:max-w-[26rem] md:left-auto md:right-6 ">
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] sm:text-[40px]">Your Cart</h1>
        <Link className="hover:underline" href="/collections/all">
          Continue Shopping
        </Link>
      </div>
      <div className="text-darkGray flex justify-between items-center pb-2 border-b border-lightGray">
        <p className="uppercase text-xs ">Product</p>
        <p className="uppercase  text-xs">Total</p>
      </div>
      <div>
        <ul className="flex flex-col gap-4">
          {cart.map((item) => (
            <li className="flex gap-4">
              <div className="">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={100}
                  height={65}
                />
              </div>
              <div className="">
                <h3 className="text-[15px] ">{item.product.name}</h3>
                <h4 className="text-[14px] text-darkGray">
                  Color:
                  <span className="capitalize"> {item.selectedColor}</span>
                </h4>
                <QuantitySelector
                  quantity={item.quantity}
                  onQuantityChange={(newQuantity) => {
                    handleQuantityChange(
                      item.product.id,
                      item.selectedColor,
                      newQuantity
                    );
                  }}
                ></QuantitySelector>
              </div>
            </li>
          ))}
        </ul>
        {totalQuantity}
      </div>
    </section>
  );
};
export default Cart;
