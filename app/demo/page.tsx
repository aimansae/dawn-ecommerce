import React from "react";
import Input from "./Input";
import Swap from "@/components/Swap";
import SingleProductSkeleton from "@/components/SingleProductSkeleton";
import CheckoutFormSkeleton from "@/components/CheckoutFormSkeleton";

const page = ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const products = [
    {
      id: 1,
      name: "Cropped T-shirt",
      size: ["xs", "m"],
      colors: ["white", "black", "red"],
    },
    {
      id: 2,
      name: "Normal T-shirt",
      size: ["m"],
      colors: ["black", "red"],
    },
    {
      id: 3,
      name: "Just T-shirt",
      size: ["s", "xl"],
      colors: ["red"],
    },
  ];

  const selectedSizes =
    typeof searchParams.size === "string"
      ? searchParams.size.split(",").map(size => size.toLowerCase().trim()) // Convert single string to array
      : Array.isArray(searchParams.size)
        ? searchParams.size.map(size => size.toLowerCase()) // Convert each value to lowercase
        : [];

  const selectedColors =
    typeof searchParams.color === "string"
      ? searchParams.color.split(",").map(color => color.toLowerCase().trim())
      : Array.isArray(searchParams.color)
        ? searchParams.color.map(color => color.toLowerCase())
        : [];

  const filteredProducts = products.filter(product => {
    const sizeMatch =
      selectedSizes.length === 0 ||
      selectedSizes.some(selectedSize => product.size.includes(selectedSize));

    const colorMatch =
      selectedColors.length === 0 ||
      selectedColors.some(selectedColor =>
        product.colors.includes(selectedColor)
      );

    return sizeMatch && colorMatch;
  });
  return (
    <div className="px-11">
      <h2>Get info from URL:</h2>
      <p>{JSON.stringify(searchParams)}</p>
      <p>Selected Sizes: {selectedSizes.join(", ")}</p> {/* ✅ Debugging */}
      <h2>Filtered Products:</h2>
      {filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <div key={product.id}>
            <p>Name: {product.name}</p>
            <p>Sizes: {product.size.join(", ")}</p>
            <p>Colors: {product.colors.join(", ")}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No products match your filter.</p>
      )}
      <Input />
      <Swap></Swap>
      <CheckoutFormSkeleton></CheckoutFormSkeleton>
    </div>
  );
};
export default page;
