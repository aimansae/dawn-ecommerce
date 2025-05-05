import React, { Suspense } from "react";
import data from "@/app/data/productList.json";
import { createSlugFromName } from "@/app/utils/functions";
import { transformProduct } from "@/app/utils/transformProduct";
import Loading from "./loading";
import ProductDetails from "@/components/ProductDetails";

const ProductPage = ({ params }: { params: { slug: string } }) => {
  const getProductBySlug = (slug: string) => {
    return data.products.find(
      product => createSlugFromName(product.name) === slug
    );
  };

  const product = getProductBySlug(params.slug);

  if (!product) return <p>Product not found</p>;
  const transformedProduct = transformProduct(product);

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetails product={transformedProduct}></ProductDetails>
    </Suspense>
  );
};

export default ProductPage;
