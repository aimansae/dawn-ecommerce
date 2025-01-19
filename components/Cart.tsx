"use client";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import QuantitySelector from "./QuantitySelector";
import { RiDeleteBin6Line } from "react-icons/ri";
import data from "../app/data/cart.json";
import { useCountry } from "@/app/context/CountryContext";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
const Cart = () => {
  const {
    cart,
    getTotalQuantity,
    updateQuantity,
    getTotalPrice,
    removeFromCart,
  } = useCart();

  const { selectedLocation, exchangeRate } = useCountry();
  const quantity = getTotalQuantity();
  const totalPrice = getTotalPrice();
  return (
    <section className="  flex flex-col gap-4 md:px-[50px] md:max-w-6xl  py-[14px] px-[15px] lg:px-[50px] md:mx-auto ">
      {quantity > 0 && (
        <>
          <div className="block sm:flex items-center justify-between  ">
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
                <tr
                  key={item.product.id}
                  className="flex justify-between items-start md:items-center my-8 "
                >
                  <td className="flex gap-4">
                    <div className="div">
                      <Image
                        src={
                          Array.isArray(item.selectedImage)
                            ? item.selectedImage[0]
                            : ""
                        }
                        alt={item.product.name}
                        width={100}
                        height={50}
                        className="object-cover"
                      />
                    </div>
                    {/*Product Details */}
                    <div className="flex flex-col gap-2 w-2/3">
                      <Link
                        href={`/product/${createSlugFromName(
                          item.product.name
                        )}`}
                        className="text-[15px] whitespace-nowrap hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p>
                        <span>{selectedLocation.currencySymbol}</span>{" "}
                        {item.product.prices.sale
                          ? convertPriceToCurrency(
                              Number(item.product.prices.sale.toFixed(2)),
                              exchangeRate
                            )
                          : convertPriceToCurrency(
                              Number(item.product.prices.regular.toFixed(2)),
                              exchangeRate
                            )}
                      </p>
                      <p className="text-[14px] text-darkGray">
                        Color:
                        <span className="capitalize">{item.selectedColor}</span>
                      </p>
                      <div className="flex items-center justify-between md:hidden ">
                        <div className="w-3/4">
                          <QuantitySelector
                            quantity={item.quantity}
                            onChangeQuantity={(change) =>
                              updateQuantity(
                                item.product.id,
                                item.selectedColor,
                                item.selectedSize ?? "",
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
                            item.selectedSize,
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
                  {/*total per product*/}
                  <td>
                    <span>{selectedLocation.currencySymbol}</span>{" "}
                    {item.product.prices.sale
                      ? convertPriceToCurrency(
                          item.product.prices.sale * item.quantity,
                          exchangeRate
                        )
                      : convertPriceToCurrency(
                          item.product.prices.regular * item.quantity,
                          exchangeRate
                        )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/*Cart Footer*/}
      {quantity > 0 ? (
        <div className="flex flex-col justify-center md:items-end items-center gap-4 my-[30px] text-center ">
          <p>
            {data.cart.footer.estimatedTotal}{" "}
            <span className="text-darkGray capitalize text-lg">
              <span>{selectedLocation.currencySymbol}</span>{" "}
              {convertPriceToCurrency(totalPrice, exchangeRate)}{" "}
              {selectedLocation.currency}
            </span>
          </p>
          <p className="text-darkGray text-[13px]">
            {data.cart.footer.taxInfo}
          </p>
          <Link className="w-3/4 md:w-1/3" href={"/checkout"}>
            <button className="w-full px-8 py-2 text-white text-xs bg-black">
              {data.cart.footer.checkout}
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-[27px]">
          <h1 className="text-[30px]  whitespace-nowrap mt-[40px]">
            {data.cart.footer.empty}
          </h1>
          <Link className=" " href={"/collections/all"}>
            <button className="px-10 py-3 text-sm text-white bg-black capitalize">
              {data.cart.continueShopping}
            </button>
          </Link>

          <div className="  flex flex-col gap-2 items-center justify-center">
            <h2 className="text-xl mt-[55px]">{data.cart.footer.account}</h2>
            <p>
              <span className=" underline">{data.cart.footer.login}</span>{" "}
              {data.cart.footer.checkoutFaster}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
export default Cart;
