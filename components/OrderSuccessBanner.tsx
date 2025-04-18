"use client";
import React, { useEffect, useState } from "react";

const OrderSuccessBanner = () => {
  const [message, setMessage] = useState("");
  const [hasHydrated, setHasHydrated] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      const msg = sessionStorage.getItem("successMessage");
      if (msg) {
        setMessage(msg);
        setVisible(true);
        sessionStorage.removeItem("successMessage");
        const timer = setTimeout(() => {
          setVisible(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [hasHydrated]);

  if (!message || !visible) return null;
  return (
    <div className="mx-auto my-4 max-w-2xl rounded bg-green-100 p-4 text-center text-green-800 shadow">
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default OrderSuccessBanner;
