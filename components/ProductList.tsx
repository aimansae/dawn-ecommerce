import React from "react";
import data from "../app/data/productList.json";
import Image from "next/image";
import Link from "next/link";
import { createSlugFromName } from "@/app/utils/functions";
type ProductType = {
  id: number;
  name: string;
  image: string;
  prices: {
    regular: string;
    sale?: string;
  };
  category: string;
};
const ProductList = () => {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4  gap-2 lg:max-w-7xl   mx-auto px-4 md:px-[50px] ">
      {data.products.map((product: ProductType) => (
        <Link
          href={`/product/${createSlugFromName(product.name)}`}
          key={product.id}
          className="group  flex flex-col "
        >
          <div className="bg-red-400 w-full relative aspect-square  ">
            <Image
              src={product.image}
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
            <span className="">{product.prices.regular}</span>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default ProductList;
