import React from "react";
import Image from "next/image";
import YouMayAlsoLike from "./YouMayAlsoLike";
import { transformProduct } from "@/app/utils/transformProduct";
import data from "../app/data/productList.json";
import content from "../app/data/lookbook.json";

const Lookbook = () => {
  const transformedProducts = data.products.map(transformProduct);
  const productsForPage = transformedProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
  const imageGroup = content.lookbook.imageGroup;
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-7 md:gap-6 lg:max-w-6xl lg:px-10">
      <h1 className="my-5 text-left text-xl md:text-2xl">
        {content.lookbook.heading}
      </h1>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
        {imageGroup.map(item => (
          <div
            key={item.src}
            className={`relative w-full ${item.colSpan} ${item.aspect} overflow-hidden`}
          >
            {item.isVideo ? (
              <iframe
                src={item.src}
                title={item.alt}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              ></iframe>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="transform object-cover duration-200 hover:scale-105"
              />
            )}
          </div>
        ))}
      </div>
      <YouMayAlsoLike title={"Featured"} productsForPage={productsForPage} />
    </div>
  );
};

export default Lookbook;
