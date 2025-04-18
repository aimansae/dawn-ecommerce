/* eslint-disable indent */
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
import { useCountry } from "../app/context/CountryContext";
import AvailabilityTag from "../components/AvailabilityTag";
import { ProductType } from "@/app/types/types";

type ProductsProps = {
  productsForPage: ProductType[];
};

const ProductList = ({ productsForPage }: ProductsProps) => {
  const { selectedLocation, exchangeRate } = useCountry();

  return (
    <section className="mx-auto w-full max-w-7xl p-4">
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {productsForPage.map(product => (
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
            <div className="my-2 flex flex-col gap-1 sm:gap-2">
              <h2 className="truncate text-xs text-customBlack group-hover:underline sm:text-[13px]">
                {product.name}
              </h2>
              <div className="gap-4 text-sm sm:text-base md:flex md:items-center">
                {/*sale price*/}
                {product.prices.sale !== undefined && (
                  <p>
                    {`${selectedLocation.currencySymbol} ${convertPriceToCurrency(
                      Number(parseFloat(product.prices.sale).toFixed(2)),
                      exchangeRate
                    )} ${selectedLocation.currency}`}
                  </p>
                )}
                {/*regular price*/}
                <p
                  className={`${
                    product.prices.sale
                      ? "text-xs text-darkGray line-through sm:text-sm"
                      : "text-sm sm:text-base"
                  } `}
                >
                  {`${selectedLocation.currencySymbol}
                    ${convertPriceToCurrency(
                      Number(parseFloat(product.prices.regular).toFixed(2)),
                      exchangeRate
                    )}
                    ${selectedLocation.currency}`}
                </p>
                <span
                  className={`${product.availability === "sold out" ? "hidden" : "md:block"}}`}
                ></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
