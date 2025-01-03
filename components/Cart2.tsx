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
    <section className="  flex flex-col gap-4 md:px-[50px] md:max-w-7xl  py-[14px] px-[30px] lg:px-[50px] md:mx-auto ">
      <div className="flex items-center justify-between  ">
        <h1 className="text-[30px] sm:text-[40px]">{data.cart.title}</h1>
        <Link className=" underline" href="/collections/all">
          {data.cart.continueShopping}
        </Link>
      </div>
      <table className=" table-auto w-full  ">
        <thead className="border-b border-darkGray ">
          <tr className="uppercase text-[10px] flex gap-2 text-left text-darkGray pb-4 items-center justify-between  ">
            <th className=" ">{data.cart.subheader.product}</th>
            <th className="md:block hidden  ml-[104px]">
              {data.cart.subheader.quantity}
            </th>
            <th className=" ">{data.cart.subheader.total}</th>
          </tr>
        </thead>

        <tbody className="border-b border-darkGray">
          {cart.map((item) => (
            <tr className="flex justify-between items-start md:items-center my-8 ">
              <td key={item.product.id} className="flex gap-4">
                <div className="div">
                  <Image
                    src={item.selectedImage || ""}
                    alt={item.product.name}
                    width={100}
                    height={50}
                    className="object-cover"
                  />
                </div>
                {/*Product Details */}
                <div className="flex flex-col gap-2 w-2/3">
                  <h3 className="text-[15px] break-words hover:underline">
                    {item.product.name}
                  </h3>
                  <p> {item.product.prices.regular.toFixed(2)}</p>
                  <p className="text-[14px] text-darkGray">
                    Color:
                    <span className="capitalize"> {item.selectedColor}</span>
                  </p>
                  <div className="flex items-center justify-between md:hidden ">
                    <div className="w-3/4">
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
                    </div>
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
                </div>
              </td>
              {/*Product info*/}

              {/*Quantity info medium devices*/}
              <td className="hidden md:flex gap-4 items-center">
                <div>
                  <QuantitySelector
                    className="w-32"
                    quantity={item.quantity}
                    onChangeQuantity={(change) =>
                      updateQuantity(
                        item.product.id,
                        item.selectedColor,
                        change
                      )
                    }
                  />
                </div>
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
              </td>

              <td>
                {(item.product.prices.regular * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Cart Footer*/}
      <div className="flex flex-col justify-center md:items-end items-center gap-4 my-[30px] ">
        <p>
          {data.cart.productDetails.estimatedTotal}
          <span className="text-darkGray capitalize text-lg">
            {" "}
            {getTotalPrice()}
          </span>
        </p>
        <p className="text-darkGray text-[13px]">
          {data.cart.productDetails.taxInfo}
        </p>
        <Link className="w-3/4 md:w-1/3" href={"/checkout"}>
          <button className="w-full px-8 py-2 text-white bg-black">
            {data.cart.productDetails.checkout}
          </button>
        </Link>
      </div>
      quantity is: {getTotalQuantity()}
      Total cart amount: {getTotalPrice()}
    </section>
  );
};
export default Cart;
