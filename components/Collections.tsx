"use client";

import React, { useState } from "react";
import data from "@/app/data/collections.json";
import productsData from "@/app/data/productList.json";
import Link from "next/link";
import Image from "next/image";
import { useCountry } from "@/app/context/CountryContext";
import { transformProduct } from "@/app/utils/transformProduct";

import {
  createSlugFromName,
  convertPriceToCurrency,
} from "@/app/utils/functions";
import CollectionsFilter from "./CollectionsFilter";
import { TfiClose } from "react-icons/tfi";

const Collections = () => {
  const transformedProducts = productsData.products.map(transformProduct);

  const [filteredProducts, setFilteredProducts] = useState(transformedProducts);
  const [availabilityFilter, setAvailabilityFilter] = useState({
    inStock: false,
    outOfStock: false,
  });

  const { selectedLocation } = useCountry();
  return (
    <section className=" lg:max-w-7xl mx-auto px-[25px] md:px-[50px] ">
      <h1 className="text-[30px] sm:text-[40px] my-[25px]">
        {data.collections.title}
      </h1>

      <CollectionsFilter
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        availabilityFilter={availabilityFilter}
        setAvailabilityFilter={setAvailabilityFilter}
      />
      {/*Filters*/}

      <div className=" flex  my-4">
        <button
          onClick={() => console.log("filter")}
          className="text-[10px] border rounded-full px-2 gap-1 flex items-center justify-between "
        >
          <span className="whitespace-nowrap">Availability:</span>
          <span>
            {" "}
            <TfiClose onClick={() => {}} size={8} />
          </span>
        </button>
      </div>

      <div className=" grid grid-cols-2 lg:grid-cols-4  gap-2">
        {filteredProducts.map((product) => (
          <Link
            href={`/product/${createSlugFromName(product.name)}`}
            key={product.id}
            className="group  flex flex-col "
          >
            <div className="  w-full relative aspect-square  ">
              <Image
                src={product.availableColors[0]?.imageUrl}
                alt={product.name}
                quality={75}
                fill
                className="w-full h-full top-0 left-0 object-cover"
                sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
              />
            </div>
            <div className="flex flex-col gap-2 my-2  ">
              <span className="text-customBlack text-xs  truncate sm:text-[13px] group-hover:underline">
                {product.name}
              </span>
              <span>
                {selectedLocation.currencySymbol}{" "}
                {convertPriceToCurrency(Number(product.prices.regular))}{" "}
                {selectedLocation.currency}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Collections;
