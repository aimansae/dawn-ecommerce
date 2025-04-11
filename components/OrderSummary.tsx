import { useCart } from "@/app/context/CartContext";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
import { useCountry } from "@/app/context/CountryContext";
import { MdKeyboardArrowDown } from "react-icons/md";
type ShippingOption = {
  type: string;
  price: string;
} | null;

interface OrderSummaryProps {
  selectedShipping: ShippingOption;
  onTotalChange: (total: number) => void;
}
const OrderSummary = ({
  selectedShipping,
  onTotalChange,
}: OrderSummaryProps) => {
  const { cart, getTotalPrice, getTotalQuantity } = useCart();
  const { selectedLocation, exchangeRate } = useCountry();
  const [toggleOrderSummary, setToggleOrderSummary] = useState(false);

  const totalPrice = getTotalPrice();
  const total =
    totalPrice + (selectedShipping ? Number(selectedShipping.price) : 0);

  onTotalChange(total);

  console.log(JSON.stringify(cart), "Logging cart");
  const quantity = getTotalQuantity();

  const toggleSummary = () => {
    setToggleOrderSummary(prev => !prev);
  };

  return (
    <div className="mx-auto h-full w-full max-w-7xl bg-[#f5f5f5] px-7 md:order-2 md:h-full">
      <button
        onClick={toggleSummary}
        className="flex w-full items-center justify-between border border-b py-5 text-[#334FB4]"
      >
        <span className="flex items-center gap-1 text-[15px]">
          Order Summary
          <MdKeyboardArrowDown className="md:hidden" />
        </span>

        <span className="text-lg font-bold">
          {selectedLocation.currencySymbol}
          {convertPriceToCurrency(Number(totalPrice), exchangeRate)}
        </span>
      </button>

      <div
        className={`md:block ${!toggleOrderSummary ? "block" : "hidden"} py-4`}
      >
        {/* Product List */}
        <div className="flex flex-col gap-6 py-6">
          {cart.map(item => {
            const imageUrl =
              Array.isArray(item.selectedImage) && item.selectedImage.length > 0
                ? item.selectedImage[0]
                : "/placeholder.jpg"; // Fallback if image missing

            // Choose sale price if available, otherwise regular
            const price =
              item.product.prices.sale && item.product.prices.sale.trim() !== ""
                ? item.product.prices.sale
                : item.product.prices.regular;

            return (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex items-start justify-between gap-4"
              >
                {/* Image with Quantity Bubble */}
                <div className="relative rounded-md bg-white">
                  <Image
                    src={imageUrl}
                    unoptimized
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-md border border-gray-300 object-contain"
                  />
                  {item.quantity > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-xs font-medium text-white">
                      {item.quantity}
                    </span>
                  )}
                </div>
                {/* Product Info */}
                <div className="text-s flex w-full items-center justify-between">
                  <div>
                    <Link
                      href={`/product/${createSlugFromName(item.product.name)}`}
                      className="font-medium capitalize hover:underline"
                    >
                      {item.product.name}
                    </Link>
                    <p className="capitalize text-darkGray">
                      {item.selectedColor}
                    </p>
                    {item.selectedSize && (
                      <p className="text-darkGray">Size: {item.selectedSize}</p>
                    )}
                  </div>
                  {/*Price*/}
                  <div className="mt-4 flex justify-between font-bold">
                    <p className="font-semibold">
                      {selectedLocation.currencySymbol}
                      {convertPriceToCurrency(Number(price), exchangeRate)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Total Section */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Subtotal - {quantity} items</span>
            <span className="font-semibold">
              {selectedLocation.currencySymbol}
              {convertPriceToCurrency(Number(totalPrice), exchangeRate)}
            </span>
          </div>
          {selectedShipping && (
            <div className="flex justify-between">
              <p>Shipping</p>
              <span className="font-semibold">
                {selectedLocation.currencySymbol} {selectedShipping.price}
              </span>
            </div>
          )}

          <div className="my-4 flex justify-between text-2xl font-bold">
            <p>Total</p>
            <span className="font-semibold">
              {selectedLocation.currencySymbol}
              {convertPriceToCurrency(total, exchangeRate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
