"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import AddToCart from "./ViewCart";
import { Color, SingleProductType } from "@/app/types/types";
import { useCart } from "@/app/context/CartContext";
import QuantitySelector from "./QuantitySelector";

const SingleProduct = ({ product }: SingleProductType) => {
  const { cart, addToCart } = useCart();
  const searchParams = useSearchParams();

  const [selectedColor, setSelectedColor] = useState(() => {
    return searchParams.get("color") || product.availableColors?.[0].color;
  });
  const [currentImage, setCurrentImage] = useState(
    product.availableColors?.[0].imageUrl
  );

  // find image based on color

  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1
  );

  const [viewCart, setViewCart] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

  const updateURLParams = (color?: string, quantity?: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (color) newParams.set("color", color);
    if (quantity !== undefined) newParams.set("quantity", quantity.toString());
    router.push(`${pathName}?${newParams.toString().toLowerCase()}`, {
      scroll: false,
    });
  };

  const handleColorClick = (color: Color) => {
    setSelectedColor(color.color);
    setQuantity(1);
    const imageWithSelectedColor = product.availableColors?.find(
      (colorItem) => colorItem.color === color.color
    )?.imageUrl;

    if (imageWithSelectedColor) {
      setCurrentImage(imageWithSelectedColor);
    }
    updateURLParams(color.color, quantity);
  };

  const handleQuantity = (change: number) => {
    const newQuantity = quantity + change;
    setQuantity(newQuantity);
    updateURLParams(selectedColor, newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      console.log("error: No color selected");
    }

    const selectedImage = product.availableColors?.find(
      (colorItem) => colorItem.color === selectedColor
    )?.imageUrl;
    addToCart({ product, quantity, selectedColor, selectedImage });
    setViewCart(true);
    console.log("cart clicked", cart);
  };

  return (
    <section className="z-10 relative py-7 px-4 md:px-[50px] grid gap-2 grid-cols-1 md:grid-cols-2 items-center sm:items-start mx-auto lg:max-w-7xl lg:grid-cols-[2fr_1fr] md:gap-4">
      <div className="w-full relative aspect-square">
        <Image
          src={currentImage} // Display selected color image or default image
          alt={product.name}
          quality={75}
          fill
          className="w-full h-full top-0 left-0 object-cover"
          sizes="(max-width:375px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-center gap-4">
        <div className="text-darkGray mt-4 flex items-center justify-center gap-4">
          <button onClick={() => {}}>
            <span>
              <MdOutlineKeyboardArrowLeft />
            </span>
          </button>

          <span className="text-[10px] imageSides">{1}/ 10</span>

          <button onClick={() => {}}>
            <span>
              <MdOutlineKeyboardArrowRight />
            </span>
          </button>
        </div>
        <div className="items-start justify-center">
          <h1 className="text-[30px]">{product.name}</h1>
          <div>
            <h2>{product.prices.regular}</h2>
          </div>
        </div>

        {/* Color selection Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-darkGray">Color</span>
          <div>
            <ul className="flex flex-wrap gap-2">
              {product.availableColors?.map((color, index: number) => (
                <li key={index}>
                  <button
                    onClick={() => handleColorClick(color)}
                    className={`border capitalize py-1 rounded-2xl px-5 hover:border-black ${
                      selectedColor === color.color ? "bg-black text-white" : ""
                    }`}
                  >
                    {color.color}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quantity Selection */}
        <QuantitySelector
          onChangeQuantity={handleQuantity}
          quantity={quantity}
          label="Quantity"
        ></QuantitySelector>

        {/* Add to Cart and Buy Now */}
        <div className="flex flex-col items-start justify-between gap-4">
          <button
            className="border border-darkGray w-full sm:w-4/5 md:w-full p-3"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button className="border border-darkGray w-full sm:w-4/5 md:w-full p-3 bg-black text-white">
            Buy Now
          </button>
        </div>

        <div>
          <h3 className="text-darkGray">{product.description}</h3>
        </div>
      </div>

      {/* View Cart Div */}
      {viewCart && (
        <AddToCart
          quantity={quantity}
          product={product}
          selectedColor={selectedColor}
        ></AddToCart>
      )}
    </section>
  );
};

export default SingleProduct;
