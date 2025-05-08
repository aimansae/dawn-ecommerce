import React, { Suspense } from "react";
import Cart from "@/components/Cart";
import LoadingSpinner from "@/components/LoadingSpinner";
const CartPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
      <Cart />
    </Suspense>
  );
};

export default CartPage;
