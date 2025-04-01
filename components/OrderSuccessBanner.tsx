"use client";
import React, { useEffect, useState } from "react";

const OrderSuccessBanner = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedMessage = sessionStorage.getItem("successMessage");
    if (storedMessage) {
      setMessage(storedMessage);
    }

    const timer = setTimeout(() => {
      setMessage("");
      sessionStorage.removeItem("successMessage");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!message) return null;
  return (
    <div className="mb-4 rounded bg-green-100 p-3 text-center text-sm text-green-800 shadow">
      <p>{message}</p>
    </div>
  );
};

export default OrderSuccessBanner;
