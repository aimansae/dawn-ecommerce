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
    (product) => product.id === "9"
  );

  if (!showEddieBagInStock) {
    return <div>Product not found</div>;
  }
  return (
    <section className="py-[36px] mx-auto px-4 md:px-[50px] items-center grid  grid-cols-2  lg:max-w-6xl">
      <div className="col-span-2  ">
        <h2 className=" ">{stockData.title}</h2>
      </div>
      <Link href="/bags" className=" flex flex-col ">
        <div className="relative  w-full h-[300px]  bg-green-400">
          <Image
            src={stockData.backInStock.mainImage}
            quality={100}
            fill
            className="w-full h-full object-fit "
            alt=""
            sizes="(max-width:375px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        </div>
      </Link>

      <Link
        href="/bags"
        className="col-span-4  flex items-center gap-2 hover:underline my-4"
      >
        <span>{stockData.bagsLink}</span>
        <span>
          <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
        </span>
      </Link>

      {/* 2 images section */}
      <div className="col-span-4   flex flex-col gap-2 h-full  ">
        <Link
          href={`/product/${createSlugFromName(showEddieBagInStock.name)}`}
          className="w-full h-full relative"
        >
          <Image
            src={showEddieBagInStock.availableColors[0].imageUrl}
            alt=""
            fill
            sizes="(max-width:375px)80vw, (max-width:560px)60vw, (max-width:768px) 80vw, 33vw"
            className="object-cover"
          />
        </Link>
        <div className="relative gap-2 my-2 flex flex-col  ">
          <span className="text-customBlack text-xs truncate sm:text-[13px] group-hover:underline">
            {showEddieBagInStock.name}
          </span>
          <span>
            {selectedLocation.currencySymbol}
            {convertPriceToCurrency(
              showEddieBagInStock.prices.regular,
              exchangeRate
            )}{" "}
            {selectedLocation.currency}
          </span>
        </div>
        <Link href="/shoes" className="w-full h-full relative">
          <Image
            src={stockData.shoeCollection.image}
            alt={stockData.shoeCollection.alt}
            fill
            sizes="(max-width:375px)80vw, (max-width:560px)60vw, (max-width:768px) 80vw, 33vw"
            className="object-cover"
          />
        </Link>
        <div className="flex items-center gap-2 my-2 hover:underline">
          <span>{stockData.shoesLink}</span>
          <span>
            <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default BackInStock;
