import { ProductType } from "@/components/ProductList";
import SingleProduct from "@/components/SingleProduct";
import React from "react";
import data from "@/app/data/productList.json";
import { createSlugFromName } from "@/app/utils/functions";

const page = ({ params }: { params: { slug: string } }) => {
  const getProductBySlug = (slug: string) => {
    return data.products.find(
      (product) => createSlugFromName(product.name) === slug
    );
  };

  const product = getProductBySlug(params.slug);

  if (!product) return <p>Product not found</p>;
  console.log("current product", product?.image);
  return (
    <>
      {/* single product {params.slug} */}
      <SingleProduct product={product}></SingleProduct>
    </>
  );
};

export default page;
