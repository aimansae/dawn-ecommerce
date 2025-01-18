"use client";

import React, { ChangeEvent, useState } from "react";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import productsData from "@/app/data/productList.json";
import { TfiClose } from "react-icons/tfi";
import content from "../app/data/filter.json";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ProductType } from "@/app/types/types";
import { transformProduct } from "@/app/utils/transformProduct";

type collectionFilterProps = {
  setFilteredProducts: (products: ProductType[]) => void;
  filteredProducts: ProductType[];
  availabilityFilter: {
    inStock: boolean;
    outOfStock: boolean;
  };
  setAvailabilityFilter: React.Dispatch<
    React.SetStateAction<{ inStock: boolean; outOfStock: boolean }>
  >;
};

const CollectionsFilter = ({
  setFilteredProducts,
  setAvailabilityFilter,
  availabilityFilter,
  filteredProducts,
}: collectionFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    availability: false,
    color: false,
  });

  const handleFilterChange = (filterType: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType], // Toggle the state of the filter
    }));
  };
  const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAvailabilityFilter((prev) => {
      const updatedFilter = { ...prev, [name]: checked };
      const transformedProducts = productsData.products.map(transformProduct);

      //all products
      let products = [...transformedProducts];

      if (updatedFilter.inStock && updatedFilter.outOfStock) {
        setFilteredProducts(products);
      } else {
        //in stock products
        if (updatedFilter.inStock) {
          products = products.filter(
            (product) => product.status === "in stock"
          );
        }
        if (updatedFilter.outOfStock) {
          products = products.filter(
            (product) => product.status === "out of stock"
          );
        }
        setFilteredProducts(products);
      }
      return updatedFilter;
    });
  };
  // In-stock and out-of-stock product counts

  const inStock = productsData.products.filter(
    (product) => product.status === "in stock"
  );
  const outOfStock = productsData.products.filter(
    (product) => product.status === "out of stock"
  );

  console.log("Products in stock", productsData.products, inStock, outOfStock);
  return (
    <>
      <aside className="py-3 flex text-darkGray items-center justify-between">
        <button>
          <PiSlidersHorizontalThin onClick={() => setShowFilters(true)} />
        </button>
        <h2 className="text-[15px]">{content.title}</h2>
        <span className="text-sm">
          {filteredProducts.length} {content.products}
        </span>
      </aside>
      {showFilters && (
        <section className="flex flex-col bg-white  py-3 justify-between">
          <div className="flex items-center justify-between px-[15px]">
            <div>
              <h2 className="text-sm ">{content.title}</h2>
              <p className="text-sm text-darkGray">
                {productsData.products.length} {content.products}
              </p>
            </div>
            <button>
              <TfiClose onClick={() => setShowFilters(false)} />
            </button>
          </div>

          {/* <div className="py-3 px-[15px] border-y border-gray-500 my-2"> */}
          <ul></ul>
          <div className="flex flex-col gap-2 ">
            <button
              className="flex items-center gap-2"
              onClick={() => {
                console.log("click to go back");
              }}
            >
              <FaArrowLeftLong />
              <span> </span>
            </button>
            {/*Availability filters*/}
          </div>
          {/* {activeFilter === "availability" ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 py-3">
                          <input
                            name="inStock"
                            id="inStock"
                            type="checkbox"
                            checked={availabilityFilter.inStock}
                            onChange={handleAvailabilityChange}
                          />
                          <label htmlFor="inStock">
                            {content.filterBy.availability.options.inStock} ( (
                            {inStock.length})
                          </label>
                        </div>
                        <div className="flex items-center gap-2 py-3">
                          <input
                            name="outOfStock"
                            id="outOfStock"
                            type="checkbox"
                            checked={availabilityFilter.outOfStock}
                            onChange={handleAvailabilityChange}
                          />
                          <label htmlFor="outOfStock">
                            {content.filterBy.availability.options.outOfStock} (
                            {outOfStock.length})
                          </label>
                        </div>
                      </div>
                    ) : (
                      <p>color info</p>
                    )}
                  </div>
                </div>
              ) : (
                content.filterBy.map((item, i) => (
                  <li
                    key={i}
                    className="hover:bg-lightGray w-full flex items-center py-2"
                  >
                    <button
                      className=" flex justify-between w-full "
                      onClick={() =>
                        handleAvailabilityFilter(
                          item as "availability" | "color"
                        )
                      }
                    >
                      <span className="flex items-center gap-2">
                        {item}

                        <FaArrowRightLong className="text-gray-500 transition-transform transform hover:scale-110 duration-300 font-thin" />
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="flex items-center justify-between gap-2 px-[15px]">
            <button className="hover:underline text-left">
              {activeFilter ? content.clear : content.remove}
            </button>
            <button
              className="text-white bg-black p-3 px-6"
              onClick={() => setShowFilters(false)}
            >
              {content.apply}
            </button>
          </div> */}
        </section>
      )}
    </>
  );
};

export default CollectionsFilter;
//"use client";

// import React from "react";
// import Image from "next/image";
// import stockData from "../app/data/stock.json";
// import Link from "next/link";
// import { FaArrowRightLong } from "react-icons/fa6";
// import {
//   convertPriceToCurrency,
//   createSlugFromName,
// } from "@/app/utils/functions";
// import { useCountry } from "@/app/context/CountryContext";
// import { transformProduct } from "@/app/utils/transformProduct";
// import allProducts from "@/app/data/productList.json";
// const BackInStock = () => {
//   const { selectedLocation, exchangeRate } = useCountry();
//   const transformedProducts = allProducts.products.map(transformProduct);

//   const showEddieBagInStock = transformedProducts.find(
//     (product) => product.id === "9"
//   );

//   if (!showEddieBagInStock) {
//     return <div>Product not found</div>;
//   }
//   return (
//     <section className="py-[36px] mx-auto px-4 md:px-[50px] items-center grid grid-cols-2 md:grid-cols-4 gap-4 lg:max-w-6xl">
//       <div className="col-span-4">
//         <h2 className="my-4">{stockData.title}</h2>
//       </div>
//       <div className="col-span-4 md:col-span-3 flex flex-col  h-full bg-yellow-300">
//         <Link href="/bags" className=" relative w-full h-full">
//           <Image
//             src={stockData.backInStock.mainImage}
//             quality={100}
//             fill
//             className="w-full h-full object-fit"
//             sizes="(max-width:375px)80vw,(max-width:560px)60vw, (max-width:768px) 80vw, 33vw"
//             alt=""
//           />
//         </Link>

//         <Link
//           href="/bags"
//           className=" flex items-center gap-2 hover:underline my-4"
//         >
//           <span>{stockData.bagsLink}</span>
//           <span>
//             <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
//           </span>
//         </Link>
//       </div>

//       {/* 2 images section */}
//       <div className="col-span-4 md:col-span-1 flex flex-col gap-2 h-full  ">
//         <Link
//           href={`/product/${createSlugFromName(showEddieBagInStock.name)}`}
//           className="w-full h-full relative"
//         >
//           <Image
//             src={showEddieBagInStock.availableColors[0].imageUrl}
//             alt=""
//             fill
//             sizes="(max-width:375px)80vw, (max-width:560px)60vw, (max-width:768px) 80vw, 33vw"
//             className="object-cover"
//           />
//         </Link>
//         <div className="relative gap-2 my-2 flex flex-col  ">
//           <span className="text-customBlack text-xs truncate sm:text-[13px] group-hover:underline">
//             {showEddieBagInStock.name}
//           </span>
//           <span>
//             {selectedLocation.currencySymbol}
//             {convertPriceToCurrency(
//               showEddieBagInStock.prices.regular,
//               exchangeRate
//             )}{" "}
//             {selectedLocation.currency}
//           </span>
//         </div>
//         <Link href="/shoes" className="w-full h-full relative">
//           <Image
//             src={stockData.shoeCollection.image}
//             alt={stockData.shoeCollection.alt}
//             fill
//             sizes="(max-width:375px)80vw, (max-width:560px)60vw, (max-width:768px) 80vw, 33vw"
//             className="object-cover"
//           />
//         </Link>
//         <div className="flex items-center gap-2 my-2 hover:underline">
//           <span>{stockData.shoesLink}</span>
//           <span>
//             <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BackInStock;
