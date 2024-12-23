"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProductType } from "./ProductList";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { GoPlus } from "react-icons/go";

import { FiMinus } from "react-icons/fi";

type SingleProduct = {
  product: ProductType;
};
//py-7 px-4 lg:px-[50px] bg-green-300  flex flex-col justify-center items-center gap-4 lg:flex-row mx-auto
const SingleProduct = ({ product }: SingleProduct) => {
  const searchParams = useSearchParams();
  console.log("searchParams:", searchParams);
  const pathName = usePathname();
  const router = useRouter();
  console.log("router:", searchParams, "pathname", pathName, "router", router);

  const [selectedColor, setSelectedColor] = useState(
    searchParams.get("color") || ""
  );

  const [quantity, setQuantity] = useState(
    Number(searchParams.get("quantity")) || 1
  );

  const updateURLParams = (color?: string, quantity?: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (color) newParams.set("color", color);
    if (quantity !== undefined) newParams.set("quantity", quantity.toString());
    router.push(`${pathName}?${newParams.toString().toLowerCase()}`);
  };
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setQuantity(1);
    updateURLParams(color, quantity);
  };
  const onItemBuy = (item: any) => {
    console.log("buy", item);
    console.log("quantity is", quantity);
    const productForCart = { ...item, quantity, selectedColor };

    console.log("prodcutCard after click", productForCart);
    return productForCart;
  };
  console.log("quantity is", quantity);

  return (
    <section className="py-7 px-4 md:px-[50px] grid gap-2 grid-cols-1 md:grid-cols-2 items-center mx-auto lg:max-w-7xl lg:grid-cols-[2fr_1fr] md:gap-4">
      <div className="  w-full relative aspect-square  ">
        <Image
          src={product.image}
          alt={product.name}
          quality={75}
          fill
          className="w-full h-full top-0 left-0 object-cover"
          sizes="(max-width:375px) 100vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
        />
      </div>
      {/*info section*/}

      <div className=" flex flex-col justify-center gap-4">
        <div className="text-darkGray  mt-4 flex items-center justify-center gap-4">
          <button>
            <span>
              <MdOutlineKeyboardArrowLeft />
            </span>
          </button>
          <span className="text-[10px]">1/10</span>
          <button>
            <span>
              <MdOutlineKeyboardArrowRight />
            </span>
          </button>
        </div>
        <div className=" items-start justify-center">
          <h1 className="text-[30px] ">{product.name}</h1>
          <div>
            <h2>{product.prices.regular}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-darkGray">Color</span>

          <div className="flex flex-wrap gap-2">
            {product.colors?.map((color, index) => (
              <button
                onClick={() => handleColorClick(color)}
                key={index}
                className={`border capitalize py-1 rounded-2xl px-5 ${
                  selectedColor === color ? "bg-black text-white" : ""
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-[50%] md:w-2/6 mb-2">
          <span className="text-darkGray text-sm py-1">Quantity</span>
          <div className="flex border border-darkGray items-center justify-between p-3 px-4 ">
            <button
              disabled={quantity < 1}
              onClick={() => setQuantity((prev) => prev - 1)}
            >
              <FiMinus className={`${quantity === 1 ? "text-darkGray" : ""}`} />
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>
              <GoPlus />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 ">
          <button className="border border-darkGray w-full sm:w-4/5  p-3 ">
            Sold Out
          </button>
          <button
            onClick={() => onItemBuy(product)}
            className="border border-darkGray w-full sm:w-4/5  p-3 bg-black text-white "
          >
            Buy Now
          </button>
        </div>

        <div>
          <h3 className="text-darkGray">{product.description}</h3>
        </div>
      </div>

      <div>Cart is</div>
    </section>
  );
};

export default SingleProduct;
