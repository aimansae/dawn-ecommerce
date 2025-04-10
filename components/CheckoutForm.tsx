"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import OrderSummary from "./OrderSummary";
import { CheckoutFormData } from "@/app/types/types";
import data from "../app/data/header.json";
const CheckoutForm = () => {
  const { clearCart } = useCart();
  const router = useRouter();

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
  const [selectCountry, setSelectCountry] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSelectCountry = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectCountry(e.target.value);
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        setMessage(data.message);
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          address: "",
          apartment: "",
          postalCode: "",
          city: "",
          email: "",
          receiveEmails: false,
        });
        sessionStorage.setItem("successMessage", data.message);
        router.push("/");
      } else {
        setMessage(data.message || "Oops Something went wrong");
        setStatus("error");
      }
    } catch (err) {
      console.log(err);
      setMessage("Oops, Something went wrong");
      setStatus("error");
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col justify-between">
      <div className="md:grid md:grid-cols-2 md:items-start md:justify-between">
        <OrderSummary />

        <form onSubmit={handleSubmit} className="px-7 py-3 sm:gap-0 md:order-1">
          {status === "error" && (
            <div className="mb-4 rounded p-3 text-center text-sm text-red-800 shadow">
              <span>{message}</span>
            </div>
          )}

          <h2 className="my-2 text-[21px] font-bold">Contact</h2>
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

          <h2 className="my-4 text-[21px] font-bold">Delivery</h2>
          <div className="flex flex-col gap-3">
            <div className="relative">
              <select
                id="country"
                name="country"
                value={selectCountry}
                onChange={handleSelectCountry}
                className="peer w-full appearance-none rounded-xl border-2 border-blue-500 bg-transparent px-4 pb-2 pt-6 text-base text-black focus:outline-none"
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
              />
              <FormInput
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                label="Last Name"
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
            />
            <FormInput
              type="text"
              id="apartment"
              name="apartment"
              placeholder="Apartment"
              value={formData.apartment}
              onChange={handleChange}
              label="Apartment"
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
              />
              <FormInput
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                label="City"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="my-4 text-[21px] font-bold">Shipping method</h2>
            <div className="my-2 rounded-md border border-gray-100 bg-gray-100 p-3">
              <p className="text-sm text-gray-600">
                Enter your shipping address to view available shipping methods.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="w-full rounded-md border border-black bg-[#334FB4] px-4 py-3 text-lg font-bold text-white"
                type="submit"
              >
                Send order
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;

export const FormInput = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  label,
  checked,
}: {
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  checked?: boolean;
}) => {
  return (
    <>
      {type === "checkbox" ? (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 accent-[#334FB4]"
          />
          {label}
        </label>
      ) : (
        <>
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
          <input
            required
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#334FB4] focus:outline-none focus:ring-1 focus:ring-[#334FB4]"
          />
        </>
      )}
    </>
  );
};
