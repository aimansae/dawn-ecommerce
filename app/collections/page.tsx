/* eslint-disable indent */
import React, { Suspense } from "react";
import Loading from "./loading";
import data from "../data/productList.json";
import content from "../data/collectionFilter.json";
import { transformProduct } from "../utils/transformProduct";

import CollectionsProducts from "@/components/CollectionsProducts";
import { ProductType } from "../types/types";
import AppliedCollectionFilters from "@/components/AppliedCollectionFilters";
import CollectionsFilters from "@/components/CollectionsFilters";
const CollectionsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const totalProducts = data.products.length;
  const allProducts: ProductType[] = data.products.map(transformProduct);
  console.log(allProducts, totalProducts);
  // const { selectedLocation } = useCountry();
  const inStockParams = searchParams.inStock === "true";
  const outOfStockParams = searchParams.outOfStock === "true";
  const colors = Array.isArray(searchParams.colors)
    ? searchParams.colors.map(c => c.toLowerCase().trim())
    : searchParams.colors
      ? searchParams.colors.split(",").map(c => c.toLowerCase().trim())
      : [];

  const sortByParams = searchParams.sort_by || undefined;
  console.log("Colors Filter:", colors);

  const isFiltering = inStockParams || outOfStockParams || colors.length > 0;

  const filteredProducts = isFiltering
    ? allProducts.filter(product => {
        const isInStock = product.status === "inStock";
        const isOutOfStock = product.status === "outOfStock";

        const matchesStock =
          (inStockParams && isInStock) || (outOfStockParams && isOutOfStock);

        const matchesColor =
          colors.length === 0 ||
          product.availableColors.some(color =>
            colors.includes(color.colorCategory.toLowerCase().trim())
          );
        console.log({ matchesStock, matchesColor, product });
        return inStockParams || outOfStockParams
          ? matchesStock
          : true && (colors.length > 0 ? matchesColor : true);
      })
    : allProducts;

  const productCount = isFiltering
    ? filteredProducts.length
    : allProducts.length;
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortByParams?.includes("Alphabetically A-Z")) {
      return a.name.localeCompare(b.name);
    }
    if (sortByParams?.includes("Alphabetically Z-A")) {
      return b.name.localeCompare(a.name);
    }

    if (sortByParams?.includes("Price: Low to high")) {
      return a.prices.regular - b.prices.regular;
    }
    if (sortByParams?.includes("Price: High to Low")) {
      return b.prices.regular - a.prices.regular;
    }
    // if (sortByParams?.includes("Date: Old to new")) {
    //   return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    // }
    // if (sortByParams?.includes("Date: New to old")) {
    //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // }
    return 0;
  });

  return (
    <section className="mx-auto bg-white px-[25px] md:px-[50px] lg:max-w-6xl">
      <h1 className="my-[25px] text-[30px] capitalize sm:text-[40px]">
        {content.title}
      </h1>
      <Suspense fallback={<Loading />}>
        <CollectionsFilters totalProducts={productCount} />
      </Suspense>
      <AppliedCollectionFilters />
      <CollectionsProducts
        products={sortedProducts}
        selectedColor={colors[0] || ""}
      />
    </section>
  );
};

export default CollectionsPage;
