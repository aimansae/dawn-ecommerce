import React from "react";

type CartItem = {
  _id: string; // This could be productId or cart entry ID
  quantity: number;
};
type ShippingOption = {
  method: string;
  price: string;
};

type Order = {
  _id: string;
  email: string;
  receiveEmails: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  postalCode: string;
  city: string;
  selectedShipping: ShippingOption;
  selectedPaymentMethod: string;
  cart: CartItem[];
  totalToPay: number;
  createdAt: string;
};
const OrderConfirmation = ({ id }: { id: string }) => {
  return (
    <div className="mx-auto h-full w-full max-w-7xl bg-[#f5f5f5] px-4 sm:px-7 md:order-2 md:h-full">
      order ref {id}
    </div>
  );
};

export default OrderConfirmation;
