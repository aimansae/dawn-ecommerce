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
    <section className="py-[36px] mx-auto px-4 md:px-[50px] items-center grid grid-cols-3 lg:max-w-6xl">
      <div className="col-span-3 ">
        <h2 className=" ">{stockData.title}</h2>
      </div>

      {/*main image*/}
      <Link href="/bags" className="col-span-3 md:col-span-2">
        <div className=" w-full relative aspect-square">
          <Image
            src={stockData.backInStock.mainImage}
            quality={100}
            width={500}
            height={600}
            alt={stockData.backInStock.alt}
            className="w-full h-full top-0 left-0 object-cover"
            sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
          />
        </div>

        <div className="gap-2 flex items-center bg-fuchsia-300 hover:underline  ">
          <span>{stockData.bagsLink}</span>
          <span>
            <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
          </span>{" "}
        </div>
      </Link>

      {/* 2 images section */}
      <div className="gap-2 flex items-center w-full h-full bg-orange-300 col-span-3 md:col-span-1 ">
        <Link
          href={`/product/${createSlugFromName(showEddieBagInStock.name)}`}
          className=" "
        >
          <div className="w-full h-full  relative aspect-square">
            <Image
              src={showEddieBagInStock.availableColors[0].imageUrl[0]}
              className=" object-cover"
              sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
              alt={""}
              fill
            />
          </div>
          <div className=" gap-2 my-2 flex flex-col  ">
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
        </Link>

        {/*second image*/}

        <Link href="/shoes">
          <div className="w-full relative aspect-square">
            <Image
              src={stockData.shoeCollection.image}
              alt={stockData.shoeCollection.alt}
              className="w-full h-full top-0 left-0 object-cover"
              sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
              fill
            />
          </div>
          <div className="flex items-center gap-2 my-2 hover:underline">
            <span>{stockData.shoesLink}</span>
            <span>
              <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
            </span>
          </div>{" "}
        </Link>
      </div>
    </section>
  );
};

export default BackInStock;
