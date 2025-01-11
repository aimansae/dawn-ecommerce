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
  const [showAllFilters, setShowAllFilters] = useState(false);
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

  const getAvailabilityCount = () => {
    let count = 0;
    if (availabilityFilter.inStock) {
      count += inStock.length;
    }
    if (availabilityFilter.outOfStock) {
      count += outOfStock.length;
    }
    return count;
  };

  const handleGoBack = () => {
    setActiveFilters({
      availability: false,
      colors: false,
    });
  };
  console.log("Products in stock", productsData.products, inStock, outOfStock);
  return (
    <>
      <aside className="py-3 flex text-darkGray items-center justify-between">
        <button>
          <PiSlidersHorizontalThin onClick={() => setShowAllFilters(true)} />
        </button>
        <h2 className="text-[15px]">{content.title}</h2>
        <span className="text-sm">
          {filteredProducts.length} {content.products}
        </span>
      </aside>
      {showAllFilters && (
        <section className="flex flex-col bg-white  py-3 justify-between">
          <div className="flex items-center justify-between px-[15px]">
            <div>
              <h2 className="text-sm ">{content.title}</h2>
              <p className="text-sm text-darkGray">
                {/* Show total count initially, and filtered count if filters are applied */}
                {activeFilters.availability || activeFilters.colors
                  ? getAvailabilityCount()
                  : filteredProducts.length}{" "}
                {content.products}
              </p>
            </div>
            <button>
              <TfiClose onClick={() => setShowAllFilters(false)} />
            </button>
          </div>

          {/*Availability div*/}
          {activeFilters["availability"] && (
            <div className=" py-4 px-[15px] border-y border-gray-500 my-2 text-darkGray   ">
              <button
                className="flex items-center gap-2"
                onClick={handleGoBack}
              >
                <FaArrowLeftLong />
                <span className="text-sm text-customBlack">
                  {content.filterBy[0].label}
                </span>
              </button>
              <div className="flex items-center gap-2 py-4 text-sm">
                <input
                  name="inStock"
                  id="inStock"
                  type="checkbox"
                  checked={availabilityFilter.inStock}
                  onChange={handleAvailabilityChange}
                  className="hover:underline hover:text-customDark"
                />
                <label htmlFor="inStock">
                  {
                    content.filterBy.find((f) => f.name === "availability")
                      ?.options?.inStock
                  }{" "}
                  ({inStock.length})
                </label>
              </div>
              <div>
                <div className="flex items-center gap-2 py-4 text-sm">
                  <input
                    name="outOfStock"
                    id="outOfStock"
                    type="checkbox"
                    checked={availabilityFilter.outOfStock}
                    onChange={handleAvailabilityChange}
                    className="hover:underline hover:text-customDark"
                  />
                  <label htmlFor="outOfStock">
                    {
                      content.filterBy.find((f) => f.name === "availability")
                        ?.options?.outOfStock
                    }{" "}
                    ({outOfStock.length})
                  </label>
                </div>
              </div>
            </div>
          )}
          {/*Colors div*/}
          {activeFilters["colors"] && (
            <div className=" py-4 px-[15px] border-y border-gray-500 my-2 text-darkGray   ">
              <button
                className="flex items-center gap-2"
                onClick={handleGoBack}
              >
                <FaArrowLeftLong />
                <span className="text-sm text-customBlack">
                  {content.filterBy[1].label}
                </span>
              </button>
              <div className="flex items-center gap-2 py-4 text-sm">
                <input
                  name="inStock"
                  id="inStock"
                  type="checkbox"
                  checked={availabilityFilter.inStock}
                  onChange={handleAvailabilityChange}
                  className="hover:underline hover:text-customDark"
                />
                <label htmlFor="inStock">
                  {
                    content.filterBy.find((f) => f.name === "availability")
                      ?.options?.inStock
                  }{" "}
                  ({inStock.length})
                </label>
              </div>
            </div>
          )}
          {!activeFilters["availability"] && !activeFilters["color"] && (
            <ul className=" flex flex-col py-3 px-[15px] border-y border-gray-500 my-2  text-sm text-darkGray ">
              {content.filterBy.map((filter) => (
                <>
                  <li
                    key={filter.name}
                    className=" py-3 flex justify-between gap-4"
                  >
                    <button
                      className=" w-full flex   justify-between"
                      onClick={() =>
                        handleFilterChange(
                          filter.name as "availability" | "colors"
                        )
                      }
                    >
                      <span>{filter.label} </span>
                      <FaArrowRightLong />
                    </button>
                  </li>
                </>
              ))}
              <div className="my-2 ">
                <span> {content.sortBy}:</span>
              </div>
            </ul>
          )}
          {/*clear and apply  buttons*/}
          <div className="my-2 flex items-center justify-between text-sm gap-2 px-[15px]">
            <button className="hover:underline text-left ">
              {activeFilters ? content.clear : content.remove}
            </button>
            <button
              className="text-white bg-black p-2 px-8"
              onClick={() => setShowAllFilters(false)}
            >
              {content.apply}
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default CollectionsFilter;
