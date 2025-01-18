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
const ImageDuplicate = () => {
  const { selectedLocation, exchangeRate } = useCountry();
  const transformedProducts = allProducts.products.map(transformProduct);

  const showEddieBagInStock = transformedProducts.find(
    (product) => product.id === "9"
  );

  if (!showEddieBagInStock) {
    return <div>Product not found</div>;
  }
  return (
    <div className="relative    aspect-[7/5] bg-yellow-200 w-full">
      <Image
        src={stockData.backInStock.mainImage}
        quality={100}
        fill
        className="w-3/4 h-full top-0 left-0 object-fit "
        alt=""
        sizes="(max-width:375px) 80vw, (max-width:768px) 60vw, (max-width:1024px) 60vw, 25vw"
      />
    </div>
  );
};

export default ImageDuplicate;
