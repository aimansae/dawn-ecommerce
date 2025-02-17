import React from "react";
import Input from "./Input";
const page = ({
  searchParams,
}: {
  searchParams: { key: string | string[] } | undefined;
}) => {
  const products = [
    {
      id: 1,
      name: "Blue T-Shirt",
      size: ["s", "m", "l"],
      color: "blue",
      price: 19.99,
    },
    {
      id: 2,
      name: "Red Hoodie",
      size: ["m", "l", "xl"],
      color: "red",
      price: 39.99,
    },
    {
      id: 3,
      name: "Yellow Sweatshirt",
      size: ["xs", "s", "m"],
      color: "yellow",
      price: 29.99,
    },
    {
      id: 4,
      name: "Blue Jeans",
      size: ["s", "m", "l", "xl"],
      color: "blue",
      price: 49.99,
    },
    {
      id: 5,
      name: "Red Jacket",
      size: ["l", "xl", "xxl"],
      color: "red",
      price: 59.99,
    },
  ];

  const selectedSize = searchParams?.size
    ? Array.isArray(searchParams.size)
      ? searchParams.size
      : [searchParams.size]
    : [];

  const selectedColor = searchParams?.color
    ? Array.isArray(searchParams.color)
      ? searchParams.color
      : [searchParams.color]
    : [];
  const filteredProducts = products.filter(product => {
    const matchesSize =
      selectedSize.length === 0 ||
      product.size.some(size => selectedSize.includes(size));
    const matchedColor =
      selectedColor.length === 0 || selectedColor.includes(product.color);

    return matchedColor && matchesSize;
  });
  return (
    <div className="px-[40px]">
      <Input />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id} className="rounded-lg border p-4 shadow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">Color: {product.color}</p>
              <p className="text-gray-600">Sizes: {product.size.join(", ")}</p>
              <p className="mt-2 text-lg font-bold">
                €{product.price.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-gray-500">
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
