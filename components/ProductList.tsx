/* eslint-disable indent */
"use client";
import React from "react";
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
  // const category = searchParams.get("category") || "";

  const productsForMainPage: ProductType[] = transformedProducts
    .sort(() => 0.5)
    .slice(0, 8);
  const { selectedLocation, exchangeRate } = useCountry();
  const filteredProducts = query.trim().toLocaleLowerCase()
    ? transformedProducts.filter(product => {
        const lowerCaseQuery = query.toLocaleLowerCase();
        // Check if the name matches the query
        const nameMatches = product.name
          .toLocaleLowerCase()
          .includes(lowerCaseQuery);
        // Check if any category matches the query
        const categoryMatches = product.category.some(category =>
          category.toLocaleLowerCase().includes(lowerCaseQuery)
        );
        // Check if any available color matches the query

        const colorMatches = product.availableColors.some(color =>
          color.color.toLocaleLowerCase().includes(lowerCaseQuery)
        );
        return nameMatches || categoryMatches || colorMatches;
      })
    : productsForMainPage;

  return (
    <section className="mx-auto w-full max-w-7xl p-4">
      {filteredProducts.length === 0 ? (
        <div>
          <p className="my-6 text-center">
            No results found for
            <span className="font-semibold italic">&quot;{query} &quot;</span>
          </p>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {productsForMainPage.map(product => (
              <Link
                href={`/product/${createSlugFromName(product.name)}`}
                key={product.id}
                className="group flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden hover:shadow-md">
                  <Image
                    src={product.availableColors[0]?.imageUrl?.[0]}
                    alt={product.name}
                    quality={75}
                    fill
                    className="left-0 top-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                  />
                  <div className="absolute bottom-2 left-4">
                    <AvailabilityTag
                      availability={product.availability || "available"}
                    />
                  </div>
                </div>
                <div className="my-2 gap-2">
                  <span className="truncate whitespace-normal text-xs text-customBlack group-hover:underline sm:text-[13px]">
                    {product.name}
                  </span>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <span
                      className={`${
                        product.prices.sale ? "text-darkGray line-through" : ""
                      }`}
                    >
                      {selectedLocation.currencySymbol}
                      {convertPriceToCurrency(
                        Number(parseFloat(product.prices.regular).toFixed(2)),
                        exchangeRate
                      )}
                      {selectedLocation.currency}
                    </span>
                    {product.prices.sale && (
                      <span>
                        {selectedLocation.currencySymbol}{" "}
                        {convertPriceToCurrency(
                          Number(product.prices.sale),
                          exchangeRate
                        )}
                        {selectedLocation.currency}
                      </span>
                    )}
                    :
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {filteredProducts.map(product => (
            <Link
              href={`/product/${createSlugFromName(product.name)}`}
              key={product.id}
              className="group flex flex-col capitalize"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={product.availableColors?.[0]?.imageUrl?.[0]}
                  alt={product.name}
                  quality={75}
                  fill
                  className="left-0 top-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                />
                <div className="absolute bottom-2 left-4">
                  <AvailabilityTag availability={product.availability} />
                </div>
              </div>
              <div className="my-2 flex flex-col gap-2">
                <h2 className="truncate text-xs text-customBlack group-hover:underline sm:text-[13px]">
                  {product.name}
                </h2>
                <div className="flex   gap-1 text-sm  md:gap-2">
                  <span
                    className={`${
                      product.prices.sale ? "text-darkGray line-through" : ""
                    } mr-2`}
                  >
                    {selectedLocation.currencySymbol}{" "}
                    {convertPriceToCurrency(
                      Number(parseFloat(product.prices.regular).toFixed(2)),
                      exchangeRate
                    )}
                    {selectedLocation.currency}
                  </span>

                  <span
                    className={`${product.availability === "sold out" ? "hidden" : "md:block"}}`}
                  >
                    {product.prices.sale !== undefined && (
                      <span>
                        {selectedLocation.currencySymbol}{" "}
                        {convertPriceToCurrency(
                          Number(parseFloat(product.prices.sale).toFixed(2)),
                          exchangeRate
                        )}
                        {selectedLocation.currency}
                      </span>
                    )}
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
