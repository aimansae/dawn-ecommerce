import React from "react";
import data from "../app/data/productList.json";
import Image from "next/image";
import Link from "next/link";
import { createSlugFromName } from "@/app/utils/functions";
import { transformProduct } from "@/app/utils/transformProduct";

const ProductList = () => {
  const transformedProducts = data.products.map(transformProduct);

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4  gap-2 lg:max-w-7xl   mx-auto px-4 md:px-[50px] ">
      {transformedProducts.map((product) => (
        <Link
          href={`/product/${createSlugFromName(product.name)}`}
          key={product.id}
          className="group  flex flex-col "
        >
          <div className="bg-red-400 w-full relative aspect-square  ">
            <Image
              src={product.availableColors[0].imageUrl}
              alt={product.name}
              quality={75}
              fill
              className="w-full h-full top-0 left-0 object-cover"
              sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
            />
          </div>
          <div className="flex flex-col gap-2 my-2  ">
            <span className="text-customBlack text-xs  truncate sm:text-[13px] group-hover:underline">
              {product.name}
            </span>
            <span className="">{product.prices.regular.toFixed(2)}</span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default ProductList;
