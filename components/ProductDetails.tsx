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
import AvailabilityTag from "./AvailabilityTag";
import { convertPriceToCurrency } from "@/app/utils/functions";

import ProductInfoAccordion from "./ProductInfoAccordion";

const ProductDetails = ({ product }: SingleProductType) => {
  const { addToCart } = useCart();
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
      colorItem => colorItem.color === selectedColor
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
        colorItem => colorItem.color === color.color
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
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex(
      prevIndex => (prevIndex - 1 + selectedImage.length) % selectedImage.length
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % selectedImage.length);
  };

  const selectedColorObject = product.availableColors.find(
    color => color.color === selectedColor
  );
  const isDisabled =
    product.availability === "sold out" ||
    selectedColorObject?.tag === "sold out";

  const replaceDefaultPicture = (url: string) => {
    const colorMatch = product.availableColors.find(color =>
      color.imageUrl.includes(url)
    );
    if (!colorMatch) return;
    const imageIndex = colorMatch?.imageUrl.findIndex(image => image === url);
    if (imageIndex !== -1) {
      setSelectedColor(colorMatch.color);
      setSelectedImage(colorMatch.imageUrl);
      setCurrentImageIndex(imageIndex);
      updateURLParams(colorMatch.color, selectedSize, quantity);
    }
  };
  const allGridImages = [
    ...new Set(
      product.availableColors.flatMap(color => color.imageUrl.slice(1))
    ),
  ];
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-2 p-4 md:grid-cols-3 md:gap-8 md:p-7 lg:max-w-6xl lg:px-10">
      <div className="col-span-2">
        <div className="relative aspect-square w-full">
          {/*Default Image*/}
          <Image
            src={selectedImage[currentImageIndex]} // Display selected color image or default image
            alt={product.name}
            quality={75}
            fill
            className="left-0 top-0 h-full w-full object-cover"
            sizes="(max-width:375px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        </div>
        {/* grid section for md+ devices */}
        <div className="my-4 hidden gap-4 md:grid md:grid-cols-2">
          {allGridImages.map((url, index) => (
            <div
              onClick={() => replaceDefaultPicture(url)}
              key={index}
              className="relative aspect-square w-full cursor-pointer overflow-hidden"
            >
              <Image
                src={url} // Display selected color image or default image
                alt={`${product.name} ${index + 2}`}
                quality={100}
                fill
                className="left-0 top-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width:375px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Info section */}
      <div className="flex flex-col justify-center gap-4 md:items-start">
        {/* Pagination for Image */}
        <div className="mt-4 flex items-center justify-center gap-4 text-darkGray md:hidden">
          <button
            onClick={handlePreviousImage}
            className="transform transition duration-200 ease-in-out hover:scale-125 hover:font-bold"
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <span className="text-[10px]">
            {currentImageIndex + 1}/ {selectedImage.length}
          </span>
          <button
            onClick={handleNextImage}
            className="transform transition duration-200 ease-in-out hover:scale-125 hover:font-bold"
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
        <div className="flex flex-col items-start justify-center gap-4">
          <h2 className="text-[30px] capitalize">{product.name}</h2>
          <div className="flex items-center gap-2 whitespace-nowrap text-sm text-darkGray md:gap-4 md:text-base">
            {product.prices.sale !== undefined && (
              <p>
                {`${selectedLocation.currencySymbol} ${convertPriceToCurrency(
                  Number(parseFloat(product.prices.sale).toFixed(2)),
                  exchangeRate
                )} ${selectedLocation.currency}`}
              </p>
            )}

            <p
              className={`${product.prices.sale ? "text-sm text-darkGray line-through" : ""}`}
            >
              {`${selectedLocation.currencySymbol} ${convertPriceToCurrency(
                Number(parseFloat(product.prices.regular).toFixed(2)),
                exchangeRate
              )} ${selectedLocation.currency}`}
            </p>
          </div>
          <AvailabilityTag
            availability={product.availability}
          ></AvailabilityTag>
        </div>
        {/* Color selection Selection */}
        <div className="flex flex-col gap-2">
          <span className="text-xs text-darkGray">Color</span>
          <div>
            <ul className="flex flex-wrap gap-2">
              {product.availableColors.map((color, index: number) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleColorClick(color)}
                      className={`rounded-2xl border px-5 py-1 capitalize hover:border-black ${
                        selectedColor === color.color
                          ? "bg-black text-white"
                          : ""
                      } ${color.tag === "sold out" ? "text-darkGray line-through hover:border hover:border-darkGray" : ""}`}
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
                            className={`rounded-2xl border px-5 py-1 capitalize hover:border-black ${
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
          className="w-1/2"
          onChangeQuantity={handleQuantity}
          quantity={quantity}
          label="Quantity"
        ></QuantitySelector>
        {/* Add to Cart and Buy Now */}
        <div className="flex w-full flex-col items-start justify-between gap-4">
          <button
            disabled={
              product.availability === "sold out" ||
              selectedColorObject?.tag === "sold out"
            }
            className={`w-full border border-darkGray p-3 sm:w-4/5 md:w-full ${product.availability === "sold out" || selectedColorObject?.tag === "sold out" ? "cursor-not-allowed border-darkGray text-darkGray" : "text-customBlack"}`}
            onClick={handleAddToCart}
          >
            {product.availability === "sold out" ||
            selectedColorObject?.tag === "sold out"
              ? "Sold out"
              : "Add to cart"}
          </button>
          <button
            disabled={isDisabled}
            onClick={() => {
              if (!isDisabled) {
                handleAddToCart();
                router.push("/cart");
              }
            }}
            className={`w-full border border-darkGray p-3 text-center sm:w-4/5 md:w-full ${
              isDisabled
                ? "pointer-events-none cursor-not-allowed bg-gray-300 text-darkGray"
                : "bg-black text-white transition hover:opacity-90"
            }`}
          >
            Buy Now
          </button>
        </div>
        {/*Additional information accordion*/}
        <div className="flex flex-col gap-4">
          <h3 className="my-4 text-darkGray">{product.description}</h3>
          <div>
            <ProductInfoAccordion product={product.name} />
          </div>
        </div>
      </div>
      {/* View Cart Div */}
      {viewCart && (
        <AddToCart
          quantity={quantity}
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
      )}
    </section>
  );
};

export default ProductDetails;
