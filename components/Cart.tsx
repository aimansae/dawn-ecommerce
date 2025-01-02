"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
const Cart = () => {
  const { cart, getTotalQuantity, updateQuantity } = useCart();
  console.log("cart is*******************", cart);

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
                  src={
                    item.selectedImage ||
                    item.product.availableColors[0].imageUrl
                  }
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
                quantity price: {item.product.prices.regular}
              </div>
              <QuantitySelector
                quantity={item.quantity}
                onChangeQuantity={(change) =>
                  updateQuantity(item.product.id, item.selectedColor, change)
                }
              ></QuantitySelector>
            </li>
          ))}
        </ul>
      </div>
      Total is: {getTotalQuantity()}
    </section>
  );
};
export default Cart;
