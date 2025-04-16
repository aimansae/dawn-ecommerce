"use client";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/app/types/types";
import { useCountry } from "@/app/context/CountryContext";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import AvailabilityTag from "./AvailabilityTag";
const CollectionsProducts = ({
  products,
  selectedColor,
}: {
  products: ProductType[];
  selectedColor: string;
}) => {
  const { selectedLocation } = useCountry();
  const { handleClearFilters } = useCollectionFilters();
  return (
    <>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.25 5.25a7.5 7.5 0 0011.4 11.4z"
            />
          </svg>
          <h2 className="text-2xl font-medium">Nothing matched your filters</h2>
          <p className="text-center text-sm">
            Try adjusting your filters or keywords and search again.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-black hover:text-black"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {products.map(product => {
            const productColor =
              product.availableColors.find(
                color =>
                  color.colorCategory.toLowerCase() ===
                  selectedColor?.toLowerCase()
              ) || product.availableColors[0];

            return (
              <Link
                href={`/product/${createSlugFromName(product.name)}`}
                key={product.id}
                className="group flex flex-col"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={productColor.imageUrl[0]}
                    alt={`${product.name}`}
                    quality={75}
                    fill
                    className="object-fit left-0 top-0 h-full w-full"
                    sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                  />{" "}
                  <div className="absolute bottom-2 left-4">
                    <AvailabilityTag
                      availability={product.availability || "available"}
                    />
                  </div>
                </div>
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="truncate text-sm capitalize text-darkGray group-hover:underline sm:text-[13px] md:text-base">
                    {product.name}
                  </h2>

                  <div className="flex flex-row items-center gap-2 bg-yellow-100 md:gap-4">
                    {product.prices.sale && (
                      <p className="text-customBlack">
                        {selectedLocation.currencySymbol}
                        {convertPriceToCurrency(Number(product.prices.sale))}
                        {selectedLocation.currency}
                      </p>
                    )}

                    <p
                      className={`text-sm md:text-base ${
                        product.prices.sale
                          ? "text-gray-400 line-through"
                          : "text-black"
                      }`}
                    >
                      {selectedLocation.currencySymbol}
                      {convertPriceToCurrency(
                        Number(product.prices.regular)
                      )}{" "}
                      {selectedLocation.currency}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CollectionsProducts;
