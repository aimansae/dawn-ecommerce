"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import { RiDeleteBin6Line } from "react-icons/ri";
import data from "../app/data/cart.json";
const Cart = () => {
  const {
    cart,
    getTotalQuantity,
    updateQuantity,
    getTotalPrice,
    removeFromCart,
  } = useCart();
  console.log("cart is*******************", cart, getTotalPrice);

  return (
    <>
      <section className="px-[15px] py-6 flex flex-col gap-4 md:px-[50px]">
        <div className="flex items-center justify-between">
          <h1 className="text-[30px] sm:text-[40px]">{data.cart.title}</h1>
          <Link className=" underline" href="/collections/all">
            {data.cart.continueShopping}
          </Link>
        </div>
        <div className="text-darkGray flex justify-between items-center pb-4 border-b border-lightGray  ">
          <p className="uppercase text-[10px] col-span-2">
            {data.cart.subheader.product}
          </p>
          <p className="uppercase text-[10px] hidden md:block">
            {data.cart.subheader.quantity}
          </p>
          <p className="uppercase text-[10px]">{data.cart.subheader.total}</p>
        </div>
        <ul className="mt-6 flex flex-col justify-between   gap-4">
          {cart.map((item) => (
            <li
              key={item.product.id}
              className="flex justify-between items-start gap-11 "
            >
              <div className="flex gap-4">
                <Image
                  src={item.selectedImage || ""}
                  alt={item.product.name}
                  width={100}
                  height={50}
                  className="object-cover"
                />

                {/* Product Info */}

                <div className="flex flex-col gap-4">
                  <h3 className="text-[15px] break-words">
                    {item.product.name}
                  </h3>

                  <p> {item.product.prices.regular.toFixed(2)}</p>
                  <p className="text-[14px] text-darkGray">
                    Color:
                    <span className="capitalize"> {item.selectedColor}</span>
                  </p>

                  {/* Quantity Selector small devices */}
                  <div className="flex-col sm:flex-row gap-8 ">
                    <QuantitySelector
                      quantity={item.quantity}
                      onChangeQuantity={(change) =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          change
                        )
                      }
                    />
                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize
                        )
                      }
                    >
                      <RiDeleteBin6Line />
                    </button>{" "}
                  </div>
                </div>
                {/* Quantity Selector bigger devices */}
              </div>
              <div className="md:flex hidden">
                <QuantitySelector
                  quantity={item.quantity}
                  onChangeQuantity={(change) =>
                    updateQuantity(item.product.id, item.selectedColor, change)
                  }
                ></QuantitySelector>
                {/* Delete Button */}

                <button
                  onClick={() =>
                    removeFromCart(
                      item.product.id,
                      item.selectedColor,
                      item.selectedSize
                    )
                  }
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
              <div>
                {(item.product.prices.regular * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      </section>
      quantity is: {getTotalQuantity()}
      Total cart amount: {getTotalPrice()}
    </>
  );
};
export default Cart;
