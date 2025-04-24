import React from "react";
import Image from "next/image";
import YouMayAlsoLike from "./YouMayAlsoLike";
import { transformProduct } from "@/app/utils/transformProduct";
import data from "../app/data/productList.json";
const imageGroup = [
  {
    src: "/assets/images/lookbook/beige-bag.png",
    alt: "beige-bag",
    colSpan: "col-span-1 md:col-span-2",
    aspect: "aspect-square md:aspect-[2/3]",
  },
  {
    src: "/assets/images/lookbook/helix-bag.png",
    alt: "helix",
    colSpan: "col-span-1",
    aspect: "aspect-square md:aspect-[1/3]",
  },
  {
    src: "/assets/images/lookbook/blue-bag.png",
    alt: "helix-bag",
    colSpan: "col-span-1",
    aspect: "aspect-square md:aspect-[1/3]",
  },
  {
    src: "https://www.youtube.com/embed/JbeuTrPSV2w?autoplay=1&mute=1&loop=1&playlist=JbeuTrPSV2w",
    alt: "video1",
    isVideo: true,
    colSpan: "col-span-1 md:col-span-2",
    aspect: "aspect-square md:aspect-[2/3]",
  },
  {
    src: "/assets/images/lookbook/fence.png",
    alt: "fence",
    colSpan: "col-span-2 md:col-span-2 md:row-span-2",
    aspect: "aspect-square md:aspect-[3/4]",
  },
  {
    src: "/assets/images/lookbook/black-white-bag.png",
    alt: "black bag",
    colSpan: "col-span-1",
    aspect: "aspect-square md:aspect-[3/4]",
  },
  {
    src: "https://www.youtube.com/embed/PbEXxU6aW6o?autoplay=1&mute=1&loop=1&playlist=PbEXxU6aW6o",
    alt: "video2",
    isVideo: true,
    colSpan: "col-span-1",
    aspect: "aspect-square md:aspect-[3/4]",
  },
  {
    src: "/assets/images/lookbook/3-bags.png",
    alt: "3 bags",
    colSpan: "col-span-2 md:col-span-1",
    aspect: "aspect-square md:aspect-[1/3]",
  },
  {
    src: "/assets/images/lookbook/sera-tote-blue.png",
    alt: "sera tote",
    colSpan: "col-span-2",
    aspect: "aspect-square md:aspect-[2/3]",
  },
  {
    src: "/assets/images/lookbook/pink-cropped.png",
    alt: "pink",
    colSpan: "col-span-2 md:col-span-2",
    aspect: "aspect-square md:aspect-[2/3]",
  },
  {
    src: "/assets/images/lookbook/rounded-light-blue-bag.png",
    alt: "rounded blue",
    colSpan: "col-span-2 md:col-span-1",
    aspect: "aspect-square md:aspect-[1/3]",
  },
];

const Lookbook = () => {
  const transformedProducts = data.products.map(transformProduct);

  const productsForPage = transformedProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-7 md:gap-6 lg:max-w-6xl lg:px-10">
      <h1 className="my-5 text-left text-xl md:text-2xl">Summer Inspiration</h1>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
        {imageGroup.map((item, index) => (
          <div
            key={index}
            className={`relative w-full ${item.colSpan} ${item.aspect} `}
          >
            {item.isVideo ? (
              <iframe
                src={item.src}
                title={item.alt}
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 h-full w-full rounded-md"
              ></iframe>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
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
