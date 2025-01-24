"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";

import AddToCart from "./ViewCart";
import { Color, SingleProductType, Size } from "@/app/types/types";
import { useCart } from "@/app/context/CartContext";
import QuantitySelector from "./QuantitySelector";
import { useCountry } from "@/app/context/CountryContext";
import AvailabilityTag from "../components/AvailabilityTag";
import { convertPriceToCurrency } from "@/app/utils/functions";
const SingleProduct = ({ product }: SingleProductType) => {
  const { cart, addToCart } = useCart();
  const { selectedLocation, exchangeRate } = useCountry();
  const searchParams = useSearchParams();

  const [selectedColor, setSelectedColor] = useState(() => {
    return searchParams.get("color") || product.availableColors?.[0].color;
  });
  const [selectedSize, setSelectedSize] = useState(() => {
    return searchParams.get("size") || "";
  });
  const [selectedImage, setSelectedImage] = useState(
    product.availableColors?.find(
      (colorItem) => colorItem.color === selectedColor
    )?.imageUrl || []
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1
  );

  const [viewCart, setViewCart] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const pathName = usePathname();
  const router = useRouter();

  const updateURLParams = (
    color?: string,
    size?: string,
    quantity?: number
  ) => {
    const newParams = new URLSearchParams(searchParams);
    if (color) newParams.set("color", color);
    if (size) newParams.set("size", size);
    if (quantity !== undefined) newParams.set("quantity", quantity.toString());
    router.push(`${pathName}?${newParams.toString().toLowerCase()}`, {
      scroll: false,
    });
  };

  const handleColorClick = (color: Color) => {
    setSelectedColor(color.color);
    setSelectedSize("");
    setQuantity(1);
    const imagesForSelectedColor =
      product.availableColors?.find(
        (colorItem) => colorItem.color === color.color
      )?.imageUrl || [];

    if (imagesForSelectedColor) {
      setSelectedImage(imagesForSelectedColor);
      setCurrentImageIndex(0);
    }
    updateURLParams(color.color, selectedSize, quantity);
  };

  const handleSizeClick = (size: string) => {
    setSelectedSize(size); // Update the selected size
    updateURLParams(selectedColor, size, quantity);
  };

  const handleQuantity = (change: number) => {
    const newQuantity = quantity + change;
    setQuantity(newQuantity);
    updateURLParams(selectedColor, selectedSize, newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedColor) {
      console.log("error: No color selected");
    }
    if (!selectedSize && product.availableSizes) {
      console.log("No size selected");
    }
    const image = selectedImage[currentImageIndex]; // Get the selected image

    addToCart({
      product,
      quantity,
      selectedColor,
      selectedImage: [image],
      selectedSize,
    });
    setViewCart(true);
    scrollToTop();
    console.log("cart clicked", cart);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedImage.length) % selectedImage.length
    );
  };
  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedImage.length);
  };
  return (
    <section className="z-10 relative py-7 px-4 md:px-[50px] grid gap-2 grid-cols-1 md:grid-cols-2 items-center sm:items-start mx-auto lg:max-w-6xl lg:grid-cols-[2fr_1fr] md:gap-4">
      <div className="w-full relative aspect-square">
        <Image
          src={selectedImage[currentImageIndex]} // Display selected color image or default image
          alt={product.name}
          quality={75}
          fill
          className="w-full h-full top-0 left-0 object-cover"
          sizes="(max-width:375px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
        />
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-center gap-4">
        {/* Pagination for Image */}
        <div className="text-darkGray mt-4 flex items-center justify-center gap-4">
          <button onClick={handlePreviousImage}>
            <span>
              <MdOutlineKeyboardArrowLeft />
            </span>
          </button>

          <span className="text-[10px] imageSides">
            {currentImageIndex + 1}/ {selectedImage.length}
          </span>

          <button onClick={handleNextImage}>
            <span>
              <MdOutlineKeyboardArrowRight />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-4 items-start justify-center">
          <h1 className="text-[30px]">{product.name}</h1>
          <div className="flex flex-col items-start  gap-3 sm:flex-row sm:items-center sm:gap-6  text-darkGray whitespace-nowrap">
            <span className={`${product.prices.sale ? "line-through" : ""}`}>
              {selectedLocation.currencySymbol}{" "}
              {convertPriceToCurrency(
                Number(product.prices.regular.toFixed(2)),
                exchangeRate
              )}{" "}
              {selectedLocation.currency}
            </span>

            {product.prices.sale !== undefined && (
              <span>
                {selectedLocation.currencySymbol}{" "}
                {convertPriceToCurrency(
                  Number(product.prices.sale.toFixed(2)),
                  exchangeRate
                )}{" "}
                {selectedLocation.currency}
              </span>
            )}
            <AvailabilityTag
              availability={product.availability}
            ></AvailabilityTag>
          </div>
        </div>
        {/* Color selection Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-darkGray">Color</span>
          <div>
            <ul className="flex flex-wrap gap-2">
              {product.availableColors.map((color, index: number) => {
                console.log("tag (", color);
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleColorClick(color)}
                      className={` border capitalize py-1 rounded-2xl px-5 hover:border-black ${
                        selectedColor === color.color
                          ? "bg-black text-white"
                          : ""
                      } ${
                        color.tag?.trim() === "sold out" ? "line-through  " : ""
                      }`}
                    >
                      {color.color}
                    </button>
                  </li>
                );
              })}
            </ul>
            {/* Size selection (only for shoes) */}
            {product.availableSizes && (
              <div className="flex flex-col gap-2">
                <span className="text-xs text-darkGray">Size</span>
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {product.availableSizes?.map(
                      (size: Size, index: number) => (
                        <li key={index}>
                          <button
                            onClick={() => handleSizeClick(size)}
                            className={`border capitalize py-1 rounded-2xl px-5 hover:border-black ${
                              selectedSize === size ? "bg-black text-white" : ""
                            }`}
                          >
                            {size}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}
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
        />
      )}
    </section>
  );
};

export default SingleProduct;
