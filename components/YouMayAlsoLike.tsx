import React from "react";
import ProductList from "./ProductList";
import { ProductType } from "@/app/types/types";
import Link from "next/link";

type YouMayAlsoLikeProps = {
  productsForPage: ProductType[];
  title: string;
};
const YouMayAlsoLike = ({ productsForPage, title }: YouMayAlsoLikeProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h1 className="my-5 text-left text-xl md:text-2xl">{title}</h1>
      <ProductList productsForPage={productsForPage} />
      <div className="flex items-center justify-center">
        <Link
          className="block whitespace-nowrap bg-black px-8 py-3 text-sm capitalize text-white"
          href="/collections"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default YouMayAlsoLike;
