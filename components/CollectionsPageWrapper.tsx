/* eslint-disable indent */
"use client";
import React, { Suspense } from "react";
import Loading from "../app/collections/loading";
import data from "../app/data/productList.json";
import content from "../app/data/collectionFilter.json";
import { transformProduct } from "../app/utils/transformProduct";
import CollectionsProducts from "@/components/CollectionsProducts";
import AppliedCollectionFilters from "@/components/AppliedCollectionFilters";
import CollectionsFilters from "@/components/CollectionsFilters";
import Pagination from "@/components/Pagination";
import { ProductType } from "@/app/types/types";
import { useSearchParams } from "next/navigation";

const CollectionsPageWrapper = () => {
  const searchParams = useSearchParams();
  const allProducts: ProductType[] = data.products.map(transformProduct);
  const page = Number(searchParams.get("page")) || 1;
  const query = searchParams.get("query") || "";
  const inStockParams = searchParams.get("inStock") === "true";
  const outOfStockParams = searchParams.get("outOfStock") === "true";
  const colorParams = searchParams.get("colors");
  const colors = colorParams
    ? colorParams.split(",").map(c => c.toLowerCase().trim())
    : [];
  const sortByParams = searchParams.get("sort_by") || "";

  const isFiltering =
    query || inStockParams || outOfStockParams || colors.length > 0;

  const filteredProducts = isFiltering
    ? allProducts.filter(product => {
        const isInStock = product.status === "inStock";
        const isOutOfStock = product.status === "outOfStock";

        const matchesStock =
          (!inStockParams && !outOfStockParams) ||
          (inStockParams && isInStock) ||
          (outOfStockParams && isOutOfStock);

        const matchesColor =
          colors.length === 0 ||
          product.availableColors.some(
            color =>
              colors.includes(color.colorCategory.toLowerCase().trim()) ||
              colors.includes(color.color.toLowerCase().trim())
          );

        const matchesQuery =
          !query ||
          product.name
            .toLowerCase()
            .includes((query as string).toLowerCase()) ||
          product.category.some(cat =>
            cat.toLowerCase().includes((query as string).toLowerCase())
          ) ||
          product.availableColors?.some(
            color =>
              color.color
                .toLowerCase()
                .includes((query as string).toLowerCase()) ||
              color.colorCategory
                .toLowerCase()
                .includes((query as string).toLowerCase())
          );
        return matchesQuery && matchesStock && matchesColor;
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
      return Number(a.prices.regular) - Number(b.prices.regular);
    }
    if (sortByParams?.includes("Price: High to Low")) {
      return Number(b.prices.regular) - Number(a.prices.regular);
    }
    if (sortByParams?.includes("Date: Old to new")) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortByParams?.includes("Date: New to old")) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });
  // pagination
  const productsPerPage = 8;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);
  console.log(colors, "**");
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-between bg-white p-4 lg:max-w-6xl lg:px-10">
      <div>
        <h1
          className={`${query ? "text-md text-wrap font-bold" : "text-[30px]"} my-[25px] capitalize text-darkGray`}
        >
          {query
            ? filteredProducts.length > 0
              ? `Results for "${query}"`
              : ``
            : content.title}
        </h1>

        {filteredProducts.length > 0 && (
          <>
            <CollectionsFilters
              totalProducts={productCount}
              filteredProducts={filteredProducts}
            />
            <AppliedCollectionFilters />
          </>
        )}
        <Suspense fallback={<Loading />}>
          <CollectionsProducts query={query} products={paginatedProducts} />
          <Pagination
            products={filteredProducts}
            productsPerPage={productsPerPage}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default CollectionsPageWrapper;
