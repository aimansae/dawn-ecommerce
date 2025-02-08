import SingleProduct from "@/components/SingleProduct";
import React from "react";
import data from "@/app/data/productList.json";
import { createSlugFromName } from "@/app/utils/functions";
import { transformProduct } from "@/app/utils/transformProduct";

const page = ({ params }: { params: { slug: string } }) => {
  const getProductBySlug = (slug: string) => {
    return data.products.find(
      product => createSlugFromName(product.name) === slug
    );
  };

  const product = getProductBySlug(params.slug);

  if (!product) return <p>Product not found</p>;
  const transformedProduct = transformProduct(product);
  return <SingleProduct product={transformedProduct}></SingleProduct>;
};

export default page;
