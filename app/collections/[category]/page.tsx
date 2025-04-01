import AppliedCollectionFilters from "@/components/AppliedCollectionFilters";
import CollectionsFilters from "@/components/CollectionsFilters";
import CollectionsProducts from "@/components/CollectionsProducts";
import React from "react";
import data from "../../data/productList.json";
import { transformProduct } from "@/app/utils/transformProduct";
import { ProductType } from "@/app/types/types";
import Pagination from "@/components/Pagination";

const page = ({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string[] | undefined };
}) => {
  const allProducts: ProductType[] = data.products.map(transformProduct);
  const formattedCategory = decodeURIComponent(params.category)
    .replaceAll("-", " ")
    .toLowerCase();
  const filteredProducts = allProducts.filter(p =>
    p.category.some(c => c.toLowerCase() === formattedCategory)
  );
  const totalProducts = filteredProducts.length;
  // pagination
  const currentPage = Number(searchParams.page) || 1;
  const productsPerPage = 8;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <section className="mx-auto bg-white px-[25px] md:px-[50px] lg:max-w-6xl">
      <h1 className="my-[25px] text-[30px] capitalize sm:text-[40px]">
        {formattedCategory}
      </h1>
      <CollectionsFilters totalProducts={totalProducts} />
      <AppliedCollectionFilters />
      <CollectionsProducts products={paginatedProducts} selectedColor={""} />
      <Pagination productsPerPage={8} products={filteredProducts}></Pagination>
    </section>
  );
};

export default page;
