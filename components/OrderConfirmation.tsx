"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createSlugFromName } from "@/app/utils/functions";
import { useCart } from "@/app/context/CartContext";
import content from "@/app/data/OrderConfirmation.json";
type LocationInfo = {
  country: string;
  currency: string;
  currencySymbol: string;
};
type ShippingInfo = {
  method: string;
  price: string;
};
type Cart = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color: string;
  image: string[];
  size?: string;
  _id: string;
};
type OrderType = {
  shippingCountry: LocationInfo;
  _id: string;
  email: string;
  receiveEmails: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  selectedShipping: ShippingInfo;
  selectedPaymentMethod: string;
  cart: Cart[];
  totalToPay: number;
  createdAt: string;
};
type OrderConfirmationProps = {
  params: string;
  order: OrderType;
};
const OrderConfirmation = ({ params, order }: OrderConfirmationProps) => {
  const date = new Date(order.createdAt);

  const formattedDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    localStorage.removeItem("orderSummary");
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl bg-[#f5f5f5] px-4 py-10 sm:px-7">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-semibold">
          {content.header.title} {order.firstName} {order.lastName},
        </h1>
        <p className="mt-2 text-darkGray">{content.header.subtitle} </p>
      </header>

      <section className="mx-auto max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h2 className="mb-4 bg-black py-2 text-center text-lg font-bold text-white">
          {content.sectionTitle}
        </h2>

        <div className="mb-6 grid grid-cols-2 gap-y-3 text-sm">
          <p>
            <strong> {content.orderDetails.orderDate}</strong>
            <br />
            <span className="block text-darkGray">{formattedDate}</span>
          </p>
          <p>
            <strong>{content.orderDetails.orderNumber}</strong>
            <br />
            <span className="block text-darkGray">#{params}</span>
          </p>
          <p>
            <strong>{content.orderDetails.totalAmount}</strong>
            <br />
            <span className="block text-darkGray">
              {order.shippingCountry.currencySymbol}
              {order.totalToPay.toFixed(2)}
            </span>
          </p>
          <p>
            <strong>{content.orderDetails.paymentMethod}</strong>
            <br />
            <span className="block text-darkGray">
              {order.selectedPaymentMethod}
            </span>
          </p>
          <p className="col-span-2">
            <strong>{content.orderDetails.shippingMethod}</strong>
            <br />
            <span className="block text-darkGray">
              {order.selectedShipping.method} (
              {order.shippingCountry.currencySymbol}{" "}
              {order.selectedShipping.price})
            </span>
          </p>
        </div>

        <div className="mb-6 text-sm">
          <p className="mb-1 font-semibold">{content.shippingAddress.title}</p>
          <span className="block text-darkGray">
            {order.address}
            {order.apartment && `, ${order.apartment}`}, {order.city},
            {order.postalCode}, {order.shippingCountry.country}
          </span>
        </div>

        <div className="flex flex-col text-sm">
          <h3 className="mb-3 text-base font-semibold md:text-xl">
            {content.itemsOrdered.title}
          </h3>
          <ul className="flex flex-col justify-between gap-2 space-y-2 first-letter:items-center md:grid md:grid-cols-2">
            {order.cart.map((item, index) => (
              <li key={index} className="flex gap-4 border-b pb-4">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image[0]}
                    alt={item.name}
                    height={100}
                    width={100}
                    className="rounded object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`${createSlugFromName(item.name)}`}
                    className="font-bold hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p>
                    <span className="font-semibold">
                      {content.itemsOrdered.labels.color}
                    </span>
                    {item.color}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {" "}
                      {content.itemsOrdered.labels.size}
                    </span>
                    {item.size ? item.size : "One size"}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {" "}
                      {content.itemsOrdered.labels.quantity}
                    </span>
                    {item.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">
                      {" "}
                      {content.itemsOrdered.labels.price}
                    </span>
                    {order.shippingCountry.currencySymbol}
                    {item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-8 text-center">
        <Link
          href="/collections"
          className="inline-block rounded-md bg-black px-6 py-2 text-white transition hover:bg-gray-800"
        >
          {content.footer.buttonText}
        </Link>
      </div>
    </main>
  );
};

export default OrderConfirmation;
