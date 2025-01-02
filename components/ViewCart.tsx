import React, { useState } from "react";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { ProductType } from "@/app/types/types";
import Link from "next/link";

type AddToCartProps = {
  product: ProductType;
  quantity: number;
  selectedColor: string;
};

const AddToCart = ({ product, quantity, selectedColor }: AddToCartProps) => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  const selectedImage = product.availableColors.find(
    (color) => color.color === selectedColor
  )?.imageUrl;
  console.log(selectedImage);
  if (!isCartOpen) return null;
  return (
    <div className="z-50 bg-white absolute top-0 left-0 w-full px-[30px] py-6 flex flex-col gap-4 md:max-w-[26rem] md:left-auto md:right-6 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center flex-shrink-0 gap-2">
          <IoCheckmark />
          <span className="text-[13px]">Item added to your cart</span>
        </div>

        <button onClick={handleCartClose}>
          <IoCloseOutline
            size={26}
            className="transition-transform transform hover:scale-110 duration-300"
          />
        </button>
      </div>
      <div className="flex  items-start gap-2">
        <Image
          src={selectedImage || ""}
          alt={product.name}
          width={70}
          height={65}
        />
        <div className="">
          <h3 className="text-[15px]  ">{product.name}</h3>
          <h4 className="text-[14px] text-darkGray">
            Color: <span className="capitalize">{selectedColor}</span>
          </h4>
        </div>
      </div>
      <div className="flex flex-col  items-start justify-between gap-4 mt-2 ">
        <Link
          href="/cart"
          className="border border-darkGray w-full sm:w-4/5 md:w-full p-3 "
        >
          View cart ({quantity})
        </Link>
        <button className="border border-darkGray w-full sm:w-4/5  md:w-full p-3 bg-black text-white ">
          Check out
        </button>

        <button className="text-center w-full " onClick={handleCartClose}>
          <span className="underline ">Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
