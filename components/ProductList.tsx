"use client";
import React, { useState } from "react";
import data from "../app/data/productList.json";
import Image from "next/image";
import Link from "next/link";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
import { transformProduct } from "@/app/utils/transformProduct";
import { useCountry } from "../app/context/CountryContext";
import AvailabilityTag from "../components/AvailabilityTag";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/app/types/types";

const ProductList = () => {
  const transformedProducts = data.products.map(transformProduct);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  console.log("query for productList", query);
  const productsForMainPage: ProductType[] = transformedProducts
    .sort(() => 0.5)
    .slice(0, 8);
  const { selectedLocation, exchangeRate } = useCountry();

  const filteredProducts = query.trim().toLocaleLowerCase()
    ? transformedProducts.filter((product) => {
        const lowerCaseQuery = query.toLocaleLowerCase();

        // Check if the name matches the query
        const nameMatches = product.name
          .toLocaleLowerCase()
          .includes(lowerCaseQuery);

        // Check if any category matches the query
        const categoryMatches = product.category.some((category) =>
          category.toLocaleLowerCase().includes(lowerCaseQuery)
        );

        // Check if any available color matches the query
        const colorMatches = product.availableColors.some((color) =>
          color.color.toLocaleLowerCase().includes(lowerCaseQuery)
        );

        return nameMatches || categoryMatches || colorMatches;
      })
    : productsForMainPage;

  return (
    <section className=" lg:max-w-6xl   mx-auto px-4 md:px-[50px] ">
      {filteredProducts.length === 0 ? (
        <div>
          <p className="text-center my-6">
            No results found for
            <span className=" italic  font-semibold ">
              {" "}
              &quot;{query} &quot;
            </span>
          </p>

          <div className=" grid grid-cols-2 lg:grid-cols-4  gap-2   ">
            {productsForMainPage.map((product) => (
              <Link
                href={`/product/${createSlugFromName(product.name)}`}
                key={product.id}
                className="group flex flex-col"
              >
                <div className="w-full relative aspect-square">
                  <Image
                    src={product.availableColors[0]?.imageUrl?.[0]}
                    alt={product.name}
                    quality={75}
                    fill
                    className="w-full h-full top-0 left-0 object-cover"
                    sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                  />
                  <div className="absolute bottom-2 left-4">
                    <AvailabilityTag availability={product.availability} />
                  </div>
                </div>
                <div className="flex flex-row gap-2 my-2">
                  <span className="text-customBlack text-xs truncate sm:text-[13px] group-hover:underline">
                    {product.name}
                  </span>
                  <div className=" flex gap-1 md:gap-2 ">
                    <span
                      className={`${
                        product.prices.sale ? "line-through text-darkGray" : ""
                      }`}
                    >
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
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className=" grid grid-cols-2 lg:grid-cols-4  gap-2 ">
          {filteredProducts.map((product) => (
            <Link
              href={`/product/${createSlugFromName(product.name)}`}
              key={product.id}
              className="group  flex flex-col capitalize   "
            >
              <div className="w-full relative aspect-square  ">
                <Image
                  src={product.availableColors?.[0]?.imageUrl?.[0]}
                  alt={product.name}
                  quality={75}
                  fill
                  className="w-full h-full top-0 left-0 object-cover"
                  sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                />
                <div className="absolute bottom-2 left-4 ">
                  <AvailabilityTag availability={product.availability} />
                </div>
              </div>
              <div className="flex flex-col gap-2 my-2   ">
                <span className="text-customBlack text-xs  truncate sm:text-[13px] group-hover:underline">
                  {product.name}
                </span>
                <div className="gap-1 md:gap-2 text-sm flex flex-col sm:flex-row ">
                  <span
                    className={`${
                      product.prices.sale ? "line-through text-darkGray" : ""
                    }  mr-2`}
                  >
                    {selectedLocation.currencySymbol}{" "}
                    {convertPriceToCurrency(
                      Number(product.prices.regular.toFixed(2)),
                      exchangeRate
                    )}{" "}
                    {selectedLocation.currency}
                  </span>
                  <span>
                    {product.prices.sale !== undefined && (
                      <span>
                        {selectedLocation.currencySymbol}{" "}
                        {convertPriceToCurrency(
                          Number(product.prices.sale.toFixed(2)),
                          exchangeRate
                        )}{" "}
                        {selectedLocation.currency}
                      </span>
                    )}{" "}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
