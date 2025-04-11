"use client";
import { useCart } from "@/app/context/CartContext";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";

const CartGuard = ({ children }: { children: ReactNode }) => {
  const { cart } = useCart();
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/checkout" && cart.length === 0) {
      router.replace("/cart");
    } else {
      setReady(true);
    }
  }, [cart, pathname]);
  if (!ready) return null;

  return <>{children}</>;
};

export default CartGuard;
