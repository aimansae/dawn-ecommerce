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
import Pagination from "@/components/Pagination";
const CollectionsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const allProducts: ProductType[] = data.products.map(transformProduct);
  // const { selectedLocation } = useCountry();
  const page = Number(searchParams.page) || 1;
  console.log(page?.toString(), "page from page.tsx");
  const searchQuery = searchParams.query;
  console.log(searchQuery, "Query term");
  const inStockParams = searchParams.inStock === "true";
  const outOfStockParams = searchParams.outOfStock === "true";
  const colors = Array.isArray(searchParams.colors)
    ? searchParams.colors.map(c => c.toLowerCase().trim())
    : searchParams.colors
      ? searchParams.colors.split(",").map(c => c.toLowerCase().trim())
      : [];

  const sortByParams = searchParams.sort_by || undefined;

  const isFiltering =
    searchQuery || inStockParams || outOfStockParams || colors.length > 0;

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
          product.availableColors.some(color =>
            colors.includes(color.colorCategory.toLowerCase().trim())
          );

        const matchesQuery =
          !searchQuery ||
          product.name
            .toLowerCase()
            .includes((searchQuery as string).toLowerCase()) ||
          product.category.some(cat =>
            cat.toLowerCase().includes((searchQuery as string).toLowerCase())
          ) ||
          product.availableColors.some(
            color =>
              color.color
                .toLowerCase()
                .includes((searchQuery as string).toLowerCase()) ||
              color.colorCategory
                .toLowerCase()
                .includes((searchQuery as string).toLowerCase())
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
      return new Date(a.createdAt).getDate() - new Date(b.createdAt).getDate();
    }
    if (sortByParams?.includes("Date: New to old")) {
      return new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate();
    }
    return 0;
  });
  // pagination
  const productsPerPage = 8;
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col justify-between bg-white p-4">
      <div>
        <h1
          className={`${searchQuery ? "text-wrap" : ""} my-[25px] text-[30px] capitalize sm:text-[40px]`}
        >
          {searchQuery ? `Search for "${searchQuery}"` : `${content.title}`}
        </h1>
        <CollectionsFilters totalProducts={productCount} />
        <AppliedCollectionFilters />
        <Suspense fallback={<Loading />}>
          <CollectionsProducts
            products={paginatedProducts}
            selectedColor={colors[0] || ""}
          />
        </Suspense>
      </div>
      <Pagination
        products={filteredProducts}
        productsPerPage={productsPerPage}
      />
    </section>
  );
};

export default CollectionsPage;
