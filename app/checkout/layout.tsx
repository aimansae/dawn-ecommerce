import CartGuard from "@/components/CartGuard";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <CartGuard>{children}</CartGuard>;
};

export default layout;
