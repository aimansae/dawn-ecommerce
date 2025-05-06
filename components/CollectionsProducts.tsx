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
import YouMayAlsoLike from "./YouMayAlsoLike";
import { transformProduct } from "@/app/utils/transformProduct";
import data from "../app/data/productList.json";
import content from "@/app/data/collectionFilter.json";
import { useSearchParams } from "next/navigation";

const CollectionsProducts = ({
  products,
  query,
}: {
  products: ProductType[];
  query?: string;
}) => {
  const { selectedLocation } = useCountry();
  const { handleClearFilters } = useCollectionFilters();
  const transformedProducts = data.products.map(transformProduct);
  const searchParams = useSearchParams();

  const selectedColorParam = searchParams.get("colors");
  const selectedColor = selectedColorParam
    ? selectedColorParam.split(",").map(c => c.toLowerCase().trim())
    : [];
  const productsForPage = transformedProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
  return (
    <>
      {products.length === 0 ? (
        <div className="flex flex-col gap-4 md:py-16">
          <div className="mx-auto flex flex-col items-center justify-center gap-2 lg:max-w-5xl">
            <h2 className="whitespace-nowrap text-xl font-medium text-gray-500 md:text-2xl">
              {content.noMatch} &quot;{query}&quot;
            </h2>
            <p className="text-center text-sm">{content.adjustFilters}</p>
            <button
              onClick={handleClearFilters}
              className="mt-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-black hover:text-black"
            >
              {content.reset}
            </button>
          </div>
          <YouMayAlsoLike
            title={"You may also like"}
            productsForPage={productsForPage}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {products.map(product => {
            const productColor =
              product.availableColors.find(color => {
                const colorName = (color.color || "").toLowerCase().trim();
                const colorCategory = (color.colorCategory || "")
                  .toLowerCase()
                  .trim();

                const matchesSelected =
                  selectedColor.length > 0 &&
                  selectedColor.includes(colorCategory);

                const matchesQuery = query
                  ? colorName.includes(query.toLowerCase().trim()) ||
                    colorCategory.includes(query.toLowerCase())
                  : false;

                const matched = matchesSelected || matchesQuery;

                return matched;
              }) || product.availableColors[0];
            return (
              <Link
                href={`/product/${createSlugFromName(product.name)}?color=${encodeURIComponent(
                  productColor.color
                )}`}
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
                  />
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
                  <div className="items-center gap-4 md:flex">
                    {product.prices.sale && (
                      <p className="text-customBlack">
                        {`${selectedLocation.currencySymbol} ${convertPriceToCurrency(Number(product.prices.sale))} ${selectedLocation.currency}`}
                      </p>
                    )}
                    <p
                      className={`text-base ${
                        product.prices.sale
                          ? "text-sm text-gray-400 line-through"
                          : "text-black"
                      }`}
                    >
                      {`${selectedLocation.currencySymbol} ${convertPriceToCurrency(Number(product.prices.regular))} ${selectedLocation.currency}`}
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
