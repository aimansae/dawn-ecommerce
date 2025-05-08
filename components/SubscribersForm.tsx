"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const SubscribersForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/subscribers", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
        setTimeout(() => {
          setStatus("");
          setMessage("");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Oops, something went wrong");

        setTimeout(() => {
          setStatus("");
          setMessage("");
          setEmail("");
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      setStatus("error");
      setMessage("Request failed");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmitEmail}
        className="flex w-full max-w-md overflow-hidden rounded-md border border-gray-400 transition-colors focus-within:border-darkGray"
      >
        <input
          id="subscribe"
          name="email"
          type="email"
          value={email}
          required
          placeholder="Email"
          className="w-full border-y border-l border-gray-400 px-3 py-2 outline-none"
          onChange={handleChange}
        />
        <label className="sr-only" htmlFor="subscribe">
          Subscribe with your email
        </label>
        <button
          type="submit"
          className="border-y border-r border-gray-400 pr-3"
        >
          <span>
            <FaArrowRightLong className="transform font-thin text-customBlack transition-transform duration-300 hover:scale-110" />
          </span>
        </button>
      </form>
      {status === "success" && (
        <div className="my-2 flex items-center justify-center bg-green-100 p-1 text-green-700">
          <p className="text-center">{message}</p>
        </div>
      )}
      {status === "error" && (
        <div className="my-2 flex items-center justify-center bg-red-200 p-1 text-red-700">
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default SubscribersForm;
