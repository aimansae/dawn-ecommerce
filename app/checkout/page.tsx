"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
const CheckoutPage = () => {
  const { clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    houseNumber: "",
    postalCode: "",
    city: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));
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
    <>
      <form onSubmit={handleSubmit}>
        {status === "error" && (
          <div className="mb-4 rounded bg-red-100 p-3 text-center text-sm text-red-800 shadow">
            <span>{message}</span>
          </div>
        )}
        {Object.entries(formData).map(([key, value]) => (
          <>
            <div key={key} className="flex">
              <label htmlFor={key} id={key}>
                {key}
              </label>
              <input
                required
                className="p1 rounded-md border border-black"
                type={
                  key === "email"
                    ? "email"
                    : key === "houseNumber"
                      ? "number"
                      : "string"
                }
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
              />
            </div>
          </>
        ))}
        <button className="rounded-md border border-black" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default CheckoutPage;
