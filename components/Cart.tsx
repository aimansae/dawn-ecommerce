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
    <section className="flex flex-col gap-4 px-[15px] py-[14px] md:mx-auto md:max-w-6xl md:px-[50px] lg:px-[50px]">
      {quantity > 0 && (
        <>
          <div className="block items-center justify-between sm:flex">
            <h1 className="text-[30px] sm:text-[40px]">{data.cart.title}</h1>
            <Link className="underline" href="/collections/all">
              {data.cart.continueShopping}
            </Link>
          </div>
          <table className="w-full table-auto">
            <thead className="border-b border-darkGray">
              <tr className="flex items-center justify-between gap-2 pb-4 text-left text-[10px] uppercase text-darkGray">
                <th className=" ">{data.cart.subheader.product}</th>
                <th className="ml-[104px] hidden md:block">
                  {data.cart.subheader.quantity}
                </th>
                <th className=" ">{data.cart.subheader.total}</th>
              </tr>
            </thead>
            <tbody className="border-b border-darkGray">
              {cart.map(item => (
                <tr
                  key={item.product.id}
                  className="my-8 flex items-start justify-between bg-orange-300 md:items-center"
                >
                  <td className="flex flex-grow-0 gap-4 bg-yellow-200">
                    <div>
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
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/product/${createSlugFromName(
                          item.product.name
                        )}`}
                        className="truncate text-[15px] hover:underline"
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
                      <div className="flex items-center justify-between md:hidden">
                        <div className="w-3/4">
                          <QuantitySelector
                            quantity={item.quantity}
                            onChangeQuantity={change =>
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
                  <td className="hidden items-center gap-4 md:flex">
                    <div>
                      <QuantitySelector
                        className="w-32"
                        quantity={item.quantity}
                        onChangeQuantity={change =>
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
        <div className="my-[30px] flex flex-col items-center justify-center gap-4 text-center md:items-end">
          <p>
            {data.cart.footer.estimatedTotal}{" "}
            <span className="text-lg capitalize text-darkGray">
              <span>{selectedLocation.currencySymbol}</span>{" "}
              {convertPriceToCurrency(totalPrice, exchangeRate)}{" "}
              {selectedLocation.currency}
            </span>
          </p>
          <p className="text-[13px] text-darkGray">
            {data.cart.footer.taxInfo}
          </p>
          <Link className="w-3/4 md:w-1/3" href={"/checkout"}>
            <button className="w-full bg-black px-8 py-2 text-xs text-white">
              {data.cart.footer.checkout}
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-[27px]">
          <h1 className="mt-[40px] whitespace-nowrap text-[30px]">
            {data.cart.footer.empty}
          </h1>
          <Link className=" " href={"/collections"}>
            <button className="bg-black px-10 py-3 text-sm capitalize text-white">
              {data.cart.continueShopping}
            </button>
          </Link>

          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="mt-[55px] text-xl">{data.cart.footer.account}</h2>
            <p>
              <span className="underline">{data.cart.footer.login}</span>{" "}
              {data.cart.footer.checkoutFaster}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
