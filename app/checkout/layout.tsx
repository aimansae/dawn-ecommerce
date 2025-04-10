import CartGuard from "@/components/CartGuard";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CartGuard>{children}</CartGuard>;
};

export default Layout;
