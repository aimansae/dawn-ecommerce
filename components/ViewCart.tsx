import React, { useState } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { ProductType } from "@/app/types/types";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

type AddToCartProps = {
  product: ProductType;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
};

const AddToCart = ({
  product,
  selectedColor,
  selectedSize,
}: AddToCartProps) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const { getTotalQuantity } = useCart();

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const selectedColorObj = product.availableColors.find(
    color => color.color === selectedColor
  );
  // Get the image URLs for the selected color, or fall back to an empty array
  const selectedImage = selectedColorObj?.imageUrl || [];
  // Use the first image if available, or fall back to a default image
  const imageToDisplay = selectedImage.length > 0 ? selectedImage[0] : "";
  if (!isCartOpen) return null;

  return (
    <div className="absolute z-50 flex w-full flex-col gap-4 bg-white px-[30px] py-6 shadow-md md:right-2 md:max-w-[20rem]">
      <div className="flex items-center justify-between">
        <div className="flex flex-shrink-0 items-center gap-2">
          <IoCheckmark />
          <h1 className="text-sm font-bold">Item added to your cart</h1>
        </div>
        <button onClick={handleCartClose}>
          <IoCloseOutline
            size={26}
            className="transform transition-transform duration-300 hover:scale-110"
          />
        </button>
      </div>
      <div className="flex items-start gap-2">
        <Image src={imageToDisplay} alt={product.name} width={70} height={65} />
        <div>
          <h2 className="text-[15px]">{product.name}</h2>
          {selectedSize && (
            <h3 className="text-[14px] text-darkGray">
              Size: <span className="capitalize">{selectedSize}</span>
            </h3>
          )}
          <h3 className="text-[14px] text-darkGray">
            Color: <span className="capitalize">{selectedColor}</span>
          </h3>
        </div>
      </div>
      <div className="mt-2 flex flex-col items-start justify-between gap-4">
        <Link
          href="/cart"
          className="w-full border border-darkGray p-3 text-center"
        >
          View cart ({getTotalQuantity()})
        </Link>
        <Link
          href="/checkout"
          className="flex w-full items-center justify-center border border-darkGray bg-black p-3 text-white"
        >
          Check out
        </Link>
        <button className="w-full text-center" onClick={handleCartClose}>
          <span className="underline">Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
