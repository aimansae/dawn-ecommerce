"use client";
import {
  convertPriceToCurrency,
  createSlugFromName,
} from "@/app/utils/functions";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/app/types/types";
import { useCountry } from "@/app/context/CountryContext";
const CollectionsProducts = ({
  products,
  selectedColor,
}: {
  products: ProductType[];
  selectedColor: string;
}) => {
  const { selectedLocation } = useCountry();

  return (
    <>
      {products.length === 0 ? (
        <div className="flex py-10 text-lg text-gray-600">
          <p className="my-6 text-center">No results found</p>
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
            console.log("Selected Color:", selectedColor);
            console.log("Product Color:", productColor);
            console.log("Image URL:", productColor?.imageUrl);
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
                    className="left-0 top-0 h-full w-full object-cover"
                    sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                  />
                </div>
                <div className="my-2 flex flex-col gap-2">
                  <span className="truncate text-sm capitalize text-darkGray group-hover:underline sm:text-[13px] md:text-base">
                    {product.name}
                  </span>
                  <span className="text-sm md:text-base">
                    {selectedLocation.currencySymbol}{" "}
                    {convertPriceToCurrency(Number(product.prices.regular))}{" "}
                    {selectedLocation.currency}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* <Pagination currentPage={currentPage} totalPages={totalPages} /> */}
    </>
  );
};

export default CollectionsProducts;
