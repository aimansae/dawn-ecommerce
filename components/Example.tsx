"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Example = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const product = {
    id: "1",
    name: "Small Convertible Flex Bag",
    availableColors: [
      {
        color: "cappuccino",
        imageUrl: "/assets/images/flexBag/flex-bag-cappuccino.png",
      },
      {
        color: "clay",
        imageUrl: "/assets/images/flexBag/flex-bag-clay.png",
      },
    ],
  };

  const [selectedColor, setSelectedColor] = useState(
    product.availableColors[0].color
  );
  const [selectedImage, setSelectedImage] = useState(
    product.availableColors[0].imageUrl
  );
  useEffect(() => {
    const colorFromUrl = searchParams.get("color");
    if (colorFromUrl) {
      const colorExistsInProducts = product.availableColors.find(
        (color) => color.color === colorFromUrl
      );

      const image = product.availableColors.find(
        (color) => color.color === colorFromUrl
      )?.imageUrl;

      if (image) {
        setSelectedImage(image);
      }
      if (colorExistsInProducts) setSelectedColor(colorFromUrl);
    }
  }, [searchParams]);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);

    router.push(`?color=${color.toLocaleLowerCase()}`);
    console.log(selectedColor, "LOGGING SELECTED COLOR");
  };

  return (
    <div>
      <img src={selectedImage} className="" />
      Image
      {product.availableColors.map((colors) => (
        <button
          onClick={() => handleColorClick(colors.color)}
          className={`flex border my-5 ${
            colors.color === selectedColor ? "bg-black text-white" : ""
          }`}
        >
          {colors.color}
        </button>
      ))}
    </div>
  );
};

export default Example;
