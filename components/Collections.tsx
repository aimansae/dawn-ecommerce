"use client";

import React, { useEffect, useState } from "react";
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
  const [filters, setFilters] = useState({
    availability: {
      inStock: false,
      outOfStock: false,
    },
    colors: new Set<string>(), // Holds selected colors
  });

  const applyFilters = () => {
    let products = filteredProducts;

    // Filter by availability
    if (filters.availability.inStock) {
      products = products.filter((product) => product.status === "in stock");
    }
    if (filters.availability.outOfStock) {
      products = products.filter(
        (product) => product.status === "out of stock"
      );
    }
    if (filters.colors.size > 0) {
      products = products.filter((product) =>
        product.availableColors.some((color) => filters.colors.has(color.color))
      );
    }

    setFilteredProducts(products);
  };

  const activeFiltersSummary = () => {
    const filterList: string[] = [];

    // Check availability filters

    const { inStock, outOfStock } = filters.availability;
    if (inStock) filterList.push("Availability: In Stock");
    if (outOfStock) filterList.push("Availability: Out of Stock");
    // Check color filters
    if (filters.colors.size > 0) {
      filters.colors.forEach((color) => {
        filterList.push(`Color: ${color}`);
      });
    }

    return filterList;
  };

  const removeFilter = (filterType: string, filterValue: string) => {
    console.log("sdfvgbh");
  };
  const { selectedLocation } = useCountry();

  return (
    <section className="lg:max-w-6xl mx-auto px-[25px] md:px-[50px] ">
      <h1 className="text-[30px] sm:text-[40px] my-[25px]">
        {data.collections.title}
      </h1>
      <CollectionsFilter
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
      />
      {/*Show applied Filters*/}
      {activeFiltersSummary().length > 0 && (
        <div className="flex gap-2 my-3">
          {activeFiltersSummary().map((filter, index) => {
            const [filterType, filterValue] = filter.split(": ");
            return (
              <>
                <div
                  key={index}
                  className="flex items-center gap-1 border rounded-3xl px-1 text-[10px] border-gray-400 hover:border-black"
                >
                  <span>{filter}</span>

                  <TfiClose
                    size={7}
                    onClick={() => {
                      removeFilter(filterType.toLowerCase(), filterValue); // Immediately apply the filters after removing
                    }}
                  />
                </div>
              </>
            );
          })}
        </div>
      )}

      <div className=" grid grid-cols-2 lg:grid-cols-4  gap-2">
        {filteredProducts.map((product) => (
          <Link
            href={`/product/${createSlugFromName(product.name)}`}
            key={product.id}
            className="group  flex flex-col "
          >
            <div className="  w-full relative aspect-square  ">
              <Image
                src={product.availableColors?.[0]?.imageUrl?.[0]}
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
