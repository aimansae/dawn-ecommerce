"use client";
import React from "react";
import Image from "next/image";
import stockData from "../app/data/stock.json";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
import { useCountry } from "@/app/context/CountryContext";
import { transformProduct } from "@/app/utils/transformProduct";
import allProducts from "@/app/data/productList.json";

const BackInStock = () => {
  const { selectedLocation, exchangeRate } = useCountry();
  const transformedProducts = allProducts.products.map(transformProduct);
  const showEddieBagInStock = transformedProducts.find(
    product => product.id === "9"
  );
  if (!showEddieBagInStock) {
    return <div>Product not found</div>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-9">
      <div className="grid grid-cols-3 items-center gap-1 sm:gap-2">
        <h2 className="col-span-3 mb-2 text-xl sm:mb-5 md:text-2xl">
          {stockData.title}
        </h2>
        {/*main image*/}
        <Link href="collections/bags" className="col-span-3 md:col-span-2">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={stockData.backInStock.mainImage}
              quality={100}
              alt={stockData.backInStock.alt}
              fill
              className="translate-transform left-0 top-0 h-full w-full object-fill duration-200 hover:scale-105"
              sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
            />
          </div>
          <div className="flex items-center gap-1 hover:underline sm:gap-2">
            <h3 className="py-4 text-base sm:text-lg">{stockData.bagsLink}</h3>
            <span>
              <FaArrowRightLong className="mt-1 transform text-sm text-customBlack transition-transform duration-300 hover:scale-110 sm:text-base" />
            </span>
          </div>
        </Link>
        {/* 2 images - first image */}
        <div className="col-span-3 flex h-full w-full gap-2 md:col-span-1 md:flex-col">
          <Link
            href={`/product/${createSlugFromName(showEddieBagInStock.name)}`}
            className="h-40 w-full md:flex md:h-full md:flex-col"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={showEddieBagInStock.availableColors[0].imageUrl[0]}
                quality={75}
                className="left-0 top-0 h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                alt={showEddieBagInStock.name}
                fill
              />
            </div>
            <div className="my-3 flex flex-col gap-2">
              <h4 className="truncate text-xs text-customBlack group-hover:underline sm:text-[13px]">
                {showEddieBagInStock.name}
              </h4>
              <p className="text-sm sm:text-base">
                {`${selectedLocation.currencySymbol} ${convertPriceToCurrency(
                  Number(showEddieBagInStock.prices.regular),
                  exchangeRate
                )} ${selectedLocation.currency}`}
              </p>
            </div>
          </Link>
          {/*second image*/}
          <Link
            href="collections/shoes"
            className="h-full w-full md:flex md:flex-col"
          >
            <div className="relative h-40 w-full overflow-hidden md:h-full">
              <Image
                src={stockData.shoeCollection.image}
                alt={stockData.shoeCollection.alt}
                quality={75}
                className="left-0 top-0 h-full w-full object-cover transition-transform duration-100 hover:scale-105"
                sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                fill
              />
            </div>
            <div className="flex items-center gap-1 hover:underline sm:gap-2">
              <h3 className="py-4 text-sm sm:text-lg">{stockData.shoesLink}</h3>
              <span>
                <FaArrowRightLong className="mt-1 transform text-sm font-thin text-customBlack transition-transform duration-300 hover:scale-110 sm:text-base" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BackInStock;
