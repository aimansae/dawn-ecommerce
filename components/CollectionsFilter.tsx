"use client";

import React, { ChangeEvent, useState } from "react";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import productsData from "@/app/data/productList.json";
import { TfiClose } from "react-icons/tfi";
import content from "../app/data/filter.json";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ProductType } from "@/app/types/types";
import { IoIosArrowDown } from "react-icons/io";

type collectionFilterProps = {
  setFilteredProducts: (products: ProductType[]) => void;
  filteredProducts: ProductType[];
  filters: {
    availability: {
      inStock: boolean;
      outOfStock: boolean;
    };
    colors: Set<string>;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      availability: {
        inStock: boolean;
        outOfStock: boolean;
      };
      colors: Set<string>;
    }>
  >;
  applyFilters: () => void;
};
const CollectionsFilter = ({
  filteredProducts,
  filters,
  setFilters,
  applyFilters,
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
  const handleColorChange = (color: string) => {
    setFilters((prevFilters) => {
      const updatedColors = new Set(prevFilters.colors);
      if (updatedColors.has(color)) {
        updatedColors.delete(color);
      } else {
        updatedColors.add(color);
      }
      return { ...prevFilters, colors: updatedColors };
    });
  };
  const handleAvailabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      availability: { ...prevFilters.availability, [name]: checked },
    }));
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
    if (filters.availability.inStock) {
      count += inStock.length;
    }
    if (filters.availability.outOfStock) {
      count += outOfStock.length;
    }
    return count;
  };
  const uniqueColors = [
    ...new Set(
      productsData.products.flatMap((product) =>
        product.availableColors.map((color) => color.color)
      )
    ),
  ];

  const getSingleColorCount = (color: string) => {
    let count = 0;

    productsData.products.forEach((product) => {
      const colorExists = product.availableColors.some(
        (availableColor) => availableColor.color === color
      );
      if (colorExists) {
        count++;
      }
    });
    console.log("COUNT IS", count);
    return count;
  };

  const getFilteredProductCount = () => {
    let availabilityCount = 0;
    let colorCount = 0;

    // Adjust count if filters are applied
    if (filters.availability.inStock || filters.availability.outOfStock) {
      availabilityCount = getAvailabilityCount();
      console.log("log Availability", availabilityCount);
    }

    if (filters.colors.size > 0) {
      colorCount = getColorsCount(filters.colors);
      console.log("Colors", colorCount);
    }

    return availabilityCount + colorCount;
  };

  const getColorsCount = (selectedColors: Set<string>) => {
    let count = 0;

    productsData.products.forEach((product) => {
      // Check if any of the selected colors match the product's available colors
      if (
        product.availableColors.some((availableColor) =>
          selectedColors.has(availableColor.color)
        )
      ) {
        count++;
      }
    });

    return count;
  };

  const handleClear = () => {
    // setFilters((prevFilter) => ({
    //   ...prevFilter,
    //   availability: {
    //     inStock: false,
    //     outOfStock: false,
    //   },
    //   colors: new Set(),
    // }));
    console.log("sdf");
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
      <aside className="py-3 flex text-darkGray items-center justify-between  ">
        <div className="flex gap-2 items-center   md:hidden ">
          <button>
            <PiSlidersHorizontalThin onClick={() => setShowAllFilters(true)} />
          </button>
          <h2 className="text-[15px]">{content.titleSmallDevices}</h2>
        </div>
        <div className="hidden md:flex items-center   capitalize ">
          <div className="flex gap-6 bg-blue-400">
            <h2 className="text-[15px]">{content.titleMediumDevices}:</h2>
            <button className="flex items-center  gap-2">
              <span className="hover:underline">
                {content.filterBy[0].name}{" "}
              </span>
              <span>
                <IoIosArrowDown />
              </span>
            </button>
            <button className="flex items-center  gap-2">
              <span className="hover:underline">
                {content.filterBy[1].name}{" "}
              </span>
              <span>
                <IoIosArrowDown />
              </span>
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center  ">
          <div className="flex gap-4">
            Sort by:
            <div>Alphabelically A-Z</div>
          </div>
        </div>
        <div className="d">
          <span className="text-sm">
            {getFilteredProductCount()
              ? getFilteredProductCount()
              : filteredProducts.length}{" "}
            {content.products}
          </span>
        </div>
      </aside>
      {showAllFilters && (
        <section className="flex flex-col bg-white  py-3 justify-between">
          <div className="flex items-center justify-between px-[15px]">
            <div>
              <h2 className="text-sm ">{content.titleSmallDevices}</h2>
              <p className="text-sm text-darkGray">
                {getFilteredProductCount()
                  ? getFilteredProductCount()
                  : filteredProducts.length}
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
                  checked={filters.availability.inStock}
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
                    checked={filters.availability.outOfStock}
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
              <div className="flex flex-col items-start gap-2 py-4 text-sm">
                {uniqueColors.map((color) => (
                  <div key={color} className="flex gap-2 ">
                    <input
                      id={color}
                      type="checkbox"
                      checked={filters.colors.has(color)}
                      onChange={() => handleColorChange(color)}
                      className="hover:underline hover:text-customDark"
                    />
                    <label htmlFor={color}>
                      {color} ({getSingleColorCount(color)})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!activeFilters["availability"] && !activeFilters["colors"] && (
            <ul className=" flex flex-col py-3 px-[15px] border-y border-gray-500 my-2  text-sm text-darkGray ">
              {content.filterBy.map((filter) => (
                <>
                  <li
                    key={filter.name}
                    className=" py-3 flex justify-between gap-4"
                  >
                    <button
                      className="w-full flex justify-between"
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
            <button
              className="hover:underline text-left "
              onClick={handleClear}
            >
              {activeFilters ? content.clear : content.remove}
            </button>
            <button
              className="text-white bg-black p-2 px-8"
              onClick={() => {
                applyFilters();
                setShowAllFilters(false);
              }}
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
