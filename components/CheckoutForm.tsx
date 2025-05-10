/* eslint-disable indent */
"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import OrderSummary from "./OrderSummary";
import { CheckoutFormData } from "@/app/types/types";
import data from "../app/data/header.json";
import content from "../app/data/checkoutForm.json";
import { useCountry } from "@/app/context/CountryContext";
import PaymentOptions from "./PaymentOptions";
import ShippingOptions from "./ShippingOptions";
import FormInput from "./FormInput";
import cartContent from "@/app/data/cart.json";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

const CheckoutForm = () => {
  const { cart } = useCart();
  const flattenedCart = cart.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.prices.sale || item.product.prices.regular,
    quantity: item.quantity,
    color: item.selectedColor,
    image: item.selectedImage || "", // or provide a fallback
    size: item.selectedSize,
  }));
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    receiveEmails: false,
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const { selectedLocation, setSelectedLocation } = useCountry();
  const [selectedPayment, setSelectedPayment] = useState("");

  const [selectedShipping, setSelectedShipping] = useState<{
    type: string;
    price: string;
  } | null>(null);
  const [totalWithShipping, setTotalWithShipping] = useState(0);

  const handleTotalChange = (total: number) => {
    setTotalWithShipping(total);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const clearForm = () => {
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      postalCode: "",
      city: "",
      receiveEmails: false,
    });
    setSelectedShipping(null);
    setSelectedPayment("");
    setTotalWithShipping(0);
    setMessage("");
    setStatus("");
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cart: flattenedCart,
          selectedShipping: selectedShipping
            ? {
                method: selectedShipping.type,
                price: selectedShipping.price,
              }
            : null,
          selectedPaymentMethod: selectedPayment,
          totalToPay: totalWithShipping,
          shippingCountry: selectedLocation,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const orderSummary = {
          cart,
          totalToPay: totalWithShipping,
          shipping: selectedShipping,
          paymentMethod: selectedPayment,
          shippingCountry: selectedLocation,
          formData,
        };

        localStorage.setItem("orderSummary", JSON.stringify(orderSummary));

        router.push(`/order-confirmation/${data.orderId}`);
        clearForm();
      } else {
        setMessage(data.error || "Oops Something went wrong");
        setStatus("error");
      }
    } catch (err) {
      console.log(err);
      setMessage("Oops, Something went wrong");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };
  if (cart.length === 0)
    return (
      <div className="items-center justify-center py-7 text-center">
        <h1 className="my-7 text-3xl">{cartContent.cart.footer.empty}</h1>
        <Link
          className="inline-block whitespace-nowrap bg-black p-3 text-center text-sm capitalize text-white"
          href={"/collections"}
        >
          {cartContent.cart.continueShopping}
        </Link>
        <div className="mt-7">
          <h2 className="my-2 text-xl">{cartContent.cart.footer.account}</h2>
          <p>
            <span className="underline">{cartContent.cart.footer.login}</span>
            {cartContent.cart.footer.checkoutFaster}
          </p>
        </div>
      </div>
    );
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-between">
      <div className="md:grid md:grid-cols-2 md:items-start md:justify-between">
        <OrderSummary
          selectedShipping={selectedShipping}
          onTotalChange={handleTotalChange}
        />
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 sm:gap-0 sm:px-7 md:order-1"
        >
          {status === "error" && (
            <div className="mb-4 rounded p-3 text-center text-sm text-red-800 shadow">
              <span>{message}</span>
            </div>
          )}
          <h2 className="my-2 font-bold md:text-[21px]">Contact</h2>
          <div className="flex flex-col gap-4">
            <FormInput
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
            />
            <FormInput
              type="checkbox"
              id="receiveEmails"
              name="receiveEmails"
              checked={formData.receiveEmails}
              onChange={handleChange}
              label="Email me with news and offers"
            />
          </div>
          <h2 className="my-4 font-bold md:text-[21px]">Delivery</h2>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <select
                id="country"
                name="country"
                value={selectedLocation.country}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  const selected = data.footer.locations.find(
                    location => location.country === e.target.value
                  );

                  if (selected) {
                    setSelectedLocation({
                      country: selected.country,
                      currency: selected.currency,
                      currencySymbol: selected.currencySymbol,
                    });
                  }
                }}
                className="peer w-full appearance-none rounded-xl border bg-transparent px-4 pb-2 pt-6 text-base text-black focus:border-[#334FB4] focus:outline-none"
              >
                <option disabled className="text-gray-400">
                  Country/Region
                </option>
                {data.footer.locations.map(item => (
                  <option key={item.country} value={item.country}>
                    {item.country}
                  </option>
                ))}
              </select>
              {/* Floating Label */}
              <label
                htmlFor="country"
                className="pointer-events-none absolute left-4 top-2 text-sm text-gray-500"
              >
                Country/Region
              </label>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <FormInput
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name (optional)"
                value={formData.firstName}
                onChange={handleChange}
                label="First Name"
                minLength={3}
              />
              <FormInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                label="Last Name"
                minLength={3}
              />
            </div>
            <FormInput
              type="text"
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              minLength={3}
            />
            <FormInput
              type="text"
              id="apartment"
              name="apartment"
              placeholder="Apartment"
              value={formData.apartment}
              onChange={handleChange}
              label="Apartment"
              minLength={1}
            />
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <FormInput
                type="text"
                id="postalCode"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                label="Postal Code"
                minLength={3}
              />
              <FormInput
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                label="City"
                minLength={3}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="my-4 font-bold md:text-[21px]">Shipping method</h2>
            <div className="my-2 rounded-md border border-gray-100 bg-gray-100">
              {selectedLocation ? (
                content.shipping.map((option, index) => (
                  <div
                    className="flex flex-col gap-2 rounded-md border"
                    key={index}
                  >
                    <div className="flex items-start justify-between gap-2 p-4">
                      <input
                        className={`h-6 w-6`}
                        type="radio"
                        name="shipping"
                        id={option.type}
                        value={option.type}
                        onChange={() => {
                          setSelectedShipping(option);
                        }}
                        checked={selectedShipping?.type === option.type}
                      />
                      <div className="w-full text-sm md:text-base">
                        <label
                          className={` ${selectedShipping?.type === option.type ? "text-bold" : ""}`}
                          htmlFor={option.type}
                        >
                          {selectedLocation.country} {option.type}
                        </label>
                        <p className="my-2 text-darkGray">{option.times}</p>
                      </div>
                      <span className="font-bold">
                        {selectedLocation.currencySymbol}
                        {option.price}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-4 text-sm text-gray-600">
                  {content.labels.shippingNote}
                </p>
              )}
            </div>
            {/* Payment Options */}
            <PaymentOptions
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
            {/*Shipping info*/}
            <ShippingOptions isLoading={isLoading} />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;
