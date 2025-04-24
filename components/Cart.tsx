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
import products from "../app/data/productList.json";
import { transformProduct } from "@/app/utils/transformProduct";
import YouMayAlsoLike from "./YouMayAlsoLike";

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
  const transformedProducts = products.products.map(transformProduct);
  const productsForCart = transformedProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <>
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-7 lg:max-w-6xl lg:px-10">
        {quantity > 0 && (
          <>
            <div className="block items-center justify-between py-4 sm:flex md:py-9">
              <h1 className="mb-4 text-[30px] sm:text-[40px] md:mb-9">
                {data.cart.title}
              </h1>
              <Link
                className="my-2 capitalize text-darkGray underline"
                href="/collections"
              >
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
                  <th className="hidden md:block">
                    {data.cart.subheader.total}
                  </th>
                </tr>
              </thead>
              <tbody className="border-b border-darkGray">
                {cart.map(item => {
                  const price =
                    item.product.prices.sale &&
                    item.product.prices.sale.trim() !== ""
                      ? item.product.prices.sale
                      : item.product.prices.regular;
                  const total = Number(price) * item.quantity;

                  return (
                    <tr
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedSize ?? ""}`}
                      className="my-8 flex items-center justify-between md:items-start"
                    >
                      <td className="flex gap-2 md:gap-4">
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
                        <div className="flex w-[180px] flex-col md:w-[250px]">
                          <Link
                            href={`/product/${createSlugFromName(
                              item.product.name
                            )}`}
                            className="my-2 capitalize hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-darkGray">
                            <p>
                              {`${convertPriceToCurrency(
                                Number(
                                  item.product.prices.sale ||
                                    item.product.prices.regular
                                ),
                                exchangeRate
                              )} ${selectedLocation.currencySymbol} `}
                            </p>
                            {item.quantity > 1 && (
                              <div className="my-2 md:hidden">
                                <p className="font-bold">
                                  {`${convertPriceToCurrency(total, exchangeRate)}  ${selectedLocation.currencySymbol}`}
                                </p>
                              </div>
                            )}
                            <div className="mb-2 flex flex-col">
                              <span className="white-space-nowrap capitalize text-darkGray">
                                Color: {item.selectedColor}
                              </span>
                              {item.selectedSize && (
                                <span className="text-darkGray">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 md:hidden">
                            <div className="w-2/3 sm:w-3/4">
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
                      <td className="hidden md:block">
                        <span className="block">
                          {selectedLocation.currencySymbol}
                          {convertPriceToCurrency(total, exchangeRate)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </section>
      {/*Cart Footer*/}
      {quantity > 0 ? (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-7 py-9 md:items-end lg:max-w-6xl lg:px-10">
          <div className="flex items-center justify-between">
            <h1 className="whitespace-nowrap text-sm md:text-base">
              {data.cart.footer.estimatedTotal}
            </h1>
            <h2 className="font-semibold capitalize text-darkGray">
              {`${selectedLocation.currencySymbol} 
              ${convertPriceToCurrency(totalPrice, exchangeRate)} 
              ${selectedLocation.currency}`}
            </h2>
          </div>
          <h3 className="text-sm text-darkGray">{data.cart.footer.taxInfo}</h3>
          <Link className="md:w-1/3" href={"/checkout"}>
            <button className="w-full bg-black px-8 py-2 text-xs text-white">
              {data.cart.footer.checkout}
            </button>
          </Link>
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-7 md:gap-6 lg:max-w-6xl lg:px-10">
          <div className="items-center justify-center py-7 text-center">
            <h1 className="my-7 text-3xl">{data.cart.footer.empty}</h1>
            <Link
              className="inline-block whitespace-nowrap bg-black p-3 text-center text-sm capitalize text-white"
              href={"/collections"}
            >
              {data.cart.continueShopping}
            </Link>
            <div className="mt-7">
              <h2 className="my-2 text-xl">{data.cart.footer.account}</h2>
              <p>
                <span className="underline">{data.cart.footer.login}</span>
                {data.cart.footer.checkoutFaster}
              </p>
            </div>{" "}
          </div>
          <YouMayAlsoLike
            title={"You may also like"}
            productsForPage={productsForCart}
          />
        </div>
      )}
    </>
  );
};

export default Cart;
