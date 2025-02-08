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
    <section className="mx-auto grid grid-cols-3 items-center gap-3 px-4 py-[36px] md:px-[50px] lg:max-w-6xl">
      <div className="col-span-3">
        <h2 className=" ">{stockData.title}</h2>
      </div>
      {/*main image*/}
      <Link href="/bags" className="col-span-3 md:col-span-2">
        <div className="relative aspect-square w-full">
          <Image
            src={stockData.backInStock.mainImage}
            quality={100}
            width={500}
            height={600}
            alt={stockData.backInStock.alt}
            className="left-0 top-0 h-full w-full object-cover"
            sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
          />
        </div>
        <div className="my-2 flex items-center gap-2 hover:underline">
          <span>{stockData.bagsLink}</span>
          <span>
            <FaArrowRightLong className="transform font-thin text-customBlack transition-transform duration-300 hover:scale-110" />
          </span>
        </div>
      </Link>
      {/* 2 images section */}
      <div className="col-span-3 flex h-full w-full gap-2 md:col-span-1 md:flex-col">
        <Link
          href={`/product/${createSlugFromName(showEddieBagInStock.name)}`}
          className="h-28 w-full md:flex md:h-full md:flex-col"
        >
          <div className="relative h-full w-full">
            <Image
              src={showEddieBagInStock.availableColors[0].imageUrl[0]}
              quality={75}
              className="left-0 top-0 h-full w-full object-cover"
              sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
              alt={showEddieBagInStock.name}
              fill
            />
          </div>
          <div className="my-3 flex flex-col gap-2">
            <span className="truncate text-xs text-customBlack group-hover:underline sm:text-[13px]">
              {showEddieBagInStock.name}
            </span>
            <span>
              {selectedLocation.currencySymbol}
              {convertPriceToCurrency(
                showEddieBagInStock.prices.regular,
                exchangeRate
              )}
              {selectedLocation.currency}
            </span>
          </div>
        </Link>
        {/*second image*/}
        <Link href="/shoes" className="h-full w-full md:flex md:flex-col">
          <div className="relative h-28 w-full md:h-full">
            <Image
              src={stockData.shoeCollection.image}
              alt={stockData.shoeCollection.alt}
              quality={75}
              className="left-0 top-0 h-full w-full object-cover"
              sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
              fill
            />
          </div>
          <div className="my-2 flex items-center gap-2 hover:underline">
            <span>{stockData.shoesLink}</span>
            <span>
              <FaArrowRightLong className="transform font-thin text-customBlack transition-transform duration-300 hover:scale-110" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BackInStock;
