import AppliedCollectionFilters from "@/components/AppliedCollectionFilters";
import CollectionsFilters from "@/components/CollectionsFilters";
import CollectionsProducts from "@/components/CollectionsProducts";
import React from "react";
import data from "../../data/productList.json";
import { transformProduct } from "@/app/utils/transformProduct";
import { ProductType } from "@/app/types/types";

const page = ({ params }: { params: { category: string } }) => {
  const allProducts: ProductType[] = data.products.map(transformProduct);
  const formattedCategory = decodeURIComponent(params.category)
    .replaceAll("-", " ")
    .toLowerCase();
  const products = allProducts.filter(p =>
    p.category.some(c => c.toLowerCase() === formattedCategory)
  );
  const totalProducts = products.length;
  return (
    <section className="mx-auto bg-white px-[25px] md:px-[50px] lg:max-w-6xl">
      <h1 className="my-[25px] text-[30px] capitalize sm:text-[40px]">
        {formattedCategory}
      </h1>
      <CollectionsFilters totalProducts={totalProducts} />
      <AppliedCollectionFilters />
      <CollectionsProducts products={products} selectedColor={""} />
    </section>
  );
};

export default page;
