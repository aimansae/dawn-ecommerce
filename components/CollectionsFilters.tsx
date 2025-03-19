"use client";

import React, { useEffect, useRef, useState } from "react";
import content from "../app/data/collectionFilter.json";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import {
  IoIosArrowDown,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from "react-icons/io";
import {
  FiltersType,
  useCollectionFilters,
} from "@/app/hooks/useCollectionFilters";
import data from "../app/data/productList.json";
import { TfiClose } from "react-icons/tfi";
type AvailabilityKeys = "inStock" | "outOfStock"; // Define exact keys

//close filters if clicked on X from parent
type Props = {
  totalProducts: number;
};
// toggleFilters: () => void;
const CollectionsFilters = ({ totalProducts }: Props) => {
  const {
    filters,
    handleAvailabilityFilterChange,
    handleColorSelection,
    handleSortByChange,
    sortBy,
    handleClearFilters,
  } = useCollectionFilters();

  const [activeFilters, setActiveFilters] = useState({
    availability: false,
    colors: false,
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const mobileFilterRef = useRef<HTMLElement | null>(null);
  const availabilityRefDesktop = useRef<HTMLDivElement | null>(null);
  const colorsRefDesktop = useRef<HTMLDivElement | null>(null);
  //for desktop
  const toggleDesktopFilter = (filterType: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      availability: false,
      colors: false,
      [filterType]: !prev[filterType],
    }));
  };

  // if mobile filter are open make background not scrollable
  useEffect(() => {
    if (showMobileFilters) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  // close filters when clicked outside

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       showMobileFilters &&
  //       mobileFilterRef.current &&
  //       !mobileFilterRef.current.contains(event.target as Node)
  //     ) {
  //       setShowMobileFilters(false); // Close the filter when clicking outside
  //     }

  //     if (
  //       activeFilters.availability &&
  //       availabilityRefDesktop.current &&
  //       !availabilityRefDesktop.current.contains(event.target as Node)
  //     ) {
  //       setActiveFilters(prev => ({ ...prev, availability: false }));
  //     }
  //     if (
  //       activeFilters.colors &&
  //       colorsRefDesktop.current &&
  //       !colorsRefDesktop.current.contains(event.target as Node)
  //     ) {
  //       setActiveFilters(prev => ({ ...prev, colors: false }));
  //     }
  //   };

  //   if (
  //     showMobileFilters ||
  //     activeFilters.availability ||
  //     activeFilters.colors
  //   ) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showMobileFilters, activeFilters]);
  //for mobile
  const toggleMobileFilters = (filterType: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
    console.log("user clicked on", filterType);
  };
  const handleGoBack = (filterType: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: false,
    }));
  };

  // const totalProducts = data.products.length;
  const inStockCount = data.products.filter(
    product => product.status === "inStock"
  ).length;
  // total of inStock products
  const outOfStockCount = data.products.filter(
    product => product.status === "outOfStock"
  ).length;
  //color count
  const colorCategoryCounts = data.products.reduce(
    (acc, product) => {
      product.availableColors.forEach(color => {
        const colorCategory = color.colorCategory;
        acc[colorCategory] = (acc[colorCategory] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );
  const allColors = data.products.flatMap(product =>
    product.availableColors.map(c => c.colorCategory)
  );
  console.log("COLOR fount", allColors);

  const uniqueColorCategory = [...new Set(allColors)];
  console.log("uniqueColorCategory", uniqueColorCategory);
  const selectedAvailabilityCount = Object.values(filters.availability).filter(
    Boolean
  ).length;

  const selectedColorCount = filters.colors.length;
  return (
    <div className="">
      <aside className="flex w-full items-center justify-between gap-2 py-3 text-[15px] text-darkGray">
        {/*mobile*/}
        <div className="flex items-center justify-between md:hidden">
          <button
            className="flex items-center gap-1 hover:underline"
            onClick={() => setShowMobileFilters(prev => !prev)}
          >
            <PiSlidersHorizontalThin />
            <h2 className="text-[15px]">{content.titleSmallDevices}</h2>
          </button>
        </div>
        {/*desktop left content*/}
        <div className="hidden w-full items-center justify-between capitalize md:flex">
          <h2 className="text-[15px]">{content.titleMediumDevices}:</h2>
          {content.filterBy.map((filter, index) => (
            <div className="relative" key={index}>
              <button
                className="flex items-center gap-2"
                onClick={() =>
                  toggleDesktopFilter(filter.name as keyof typeof activeFilters)
                }
              >
                <span className="capitalize hover:underline">
                  {filter.name}
                </span>
                <span>
                  <IoIosArrowDown />
                </span>
              </button>
              {/* Availability Filter */}
              {activeFilters[filter.name as keyof typeof activeFilters] && (
                <div
                  ref={availabilityRefDesktop}
                  className="absolute left-0 top-full z-50 border bg-white p-3 text-[14px] shadow-md"
                >
                  {filter.name === "availability" ? (
                    <div>
                      <div className="my-2 border-y border-darkGray">
                        <header className="flex items-center justify-between">
                          <h3 className="py-2">
                            {selectedAvailabilityCount} selected
                          </h3>
                          <button
                            className="capitalize text-customBlack hover:underline"
                            onClick={handleClearFilters}
                          >
                            reset
                          </button>
                        </header>
                      </div>
                      <AvailabilityFilter
                        className="w-max"
                        filters={filters}
                        handleAvailabilityFilterChange={
                          handleAvailabilityFilterChange
                        }
                        inStockCount={inStockCount}
                        outOfStockCount={outOfStockCount}
                      />
                    </div>
                  ) : (
                    <div ref={colorsRefDesktop}>
                      <div className="my-2 border-y border-darkGray">
                        <header className="flex items-center justify-between">
                          <h3 className="py-2">
                            {selectedColorCount} selected
                          </h3>
                          <button
                            className="text-customBlack hover:underline"
                            onClick={handleClearFilters}
                          >
                            Reset
                          </button>
                        </header>
                      </div>
                      <ColorFilter
                        uniqueColorCategory={uniqueColorCategory}
                        handleColorSelection={handleColorSelection}
                        filters={filters}
                        colorCategoryCounts={colorCategoryCounts}
                        className="h-[300px] w-max overflow-y-auto pr-2"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}{" "}
          {/* Middle: Sort By Dropdown */}
          <div className="mr-2">
            <SortByFilter
              handleSortByChange={handleSortByChange}
              sortBy={sortBy || ""}
            />
          </div>
        </div>

        <div className="flex gap-1 text-[15px]">
          <span>{totalProducts}</span>
          <span>{totalProducts > 1 ? " Products" : " Product"}</span>
        </div>
      </aside>

      {/*for mobile*/}
      {/* {showMobileFilters &&
        (activeFilters.availability || activeFilters.colors) && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-40"></div>
        )} */}
      {showMobileFilters && (
        <section
          // ref={mobileFilterRef}
          className="absolute right-0 top-0 z-50 flex h-screen w-2/3 flex-col bg-white text-customBlack md:hidden"
        >
          <div className="flex items-center justify-between px-[25px] py-[10px] text-sm">
            <div className="flex-grow text-center">
              <h2 className="text-[15px]">{content.titleSmallDevices}</h2>
              <p className="text-darkGray">
                {0} {content.products}
              </p>
            </div>
            <button onClick={() => setShowMobileFilters(prev => !prev)}>
              <TfiClose className="text-darkGray" size={22} />
            </button>
          </div>

          {/*show all filters*/}
          {!activeFilters.availability && !activeFilters.colors && (
            <ul className="flex flex-grow flex-col gap-2 border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
              {content.filterBy.map(filter => (
                <li
                  key={filter.name}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <button
                    onClick={() =>
                      toggleMobileFilters(
                        filter.name as keyof typeof activeFilters
                      )
                    }
                    className="flex w-full items-center justify-between"
                  >
                    <span className="capitalize">{filter.name} </span>
                    <IoIosArrowRoundForward size={25} />
                  </button>
                </li>
              ))}
              <li>
                <SortByFilter
                  handleSortByChange={handleSortByChange}
                  sortBy={sortBy || ""}
                />
              </li>
            </ul>
          )}
          {/* availability filters*/}
          {activeFilters.availability && (
            <div className="flex-grow border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
              <button
                className="flex w-full items-center justify-start py-3"
                onClick={() => handleGoBack("availability")}
              >
                <span>
                  <IoIosArrowRoundBack size={25} />
                </span>
                <span className="capitalize">
                  {
                    content.filterBy.find(
                      filter => filter.name === "availability"
                    )?.name
                  }
                </span>
              </button>
              <AvailabilityFilter
                filters={filters}
                handleAvailabilityFilterChange={handleAvailabilityFilterChange}
                inStockCount={inStockCount}
                outOfStockCount={outOfStockCount}
              />
            </div>
          )}
          {/* color filters */}
          {activeFilters.colors && (
            <div className="flex-grow overflow-y-auto border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
              <button
                className="flex w-full items-center justify-start py-3"
                onClick={() => handleGoBack("colors")}
              >
                <span>
                  <IoIosArrowRoundBack size={25} />
                </span>
                <span className="capitalize">
                  {
                    content.filterBy.find(filter => filter.name === "colors")
                      ?.name
                  }
                </span>
              </button>
              <ColorFilter
                uniqueColorCategory={uniqueColorCategory}
                handleColorSelection={handleColorSelection}
                filters={filters}
                colorCategoryCounts={colorCategoryCounts}
              />
            </div>
          )}

          {/*clear and apply  buttons*/}
          <div className="sticky flex items-center justify-between gap-2 bg-white px-[15px] py-2 text-sm">
            <button
              className="flex px-4 hover:underline hover:decoration-black"
              onClick={handleClearFilters}
            >
              {activeFilters ? content.clear : content.remove}
            </button>
            <button
              className="bg-black p-2 px-6 text-white"
              onClick={() => {
                setShowMobileFilters(false);
              }}
            >
              {content.apply}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CollectionsFilters;

//Availability filter
export const AvailabilityFilter = ({
  filters,
  handleAvailabilityFilterChange,
  inStockCount,
  outOfStockCount,
  className,
}: {
  filters: FiltersType;
  handleAvailabilityFilterChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  inStockCount: number;
  outOfStockCount: number;
  className?: string;
}) => {
  const availabilityFilter = content.filterBy.find(
    product => product.name === "availability"
  );
  return (
    <div className={`${className} flex-col items-start gap-2`}>
      {availabilityFilter?.options &&
        Object.entries(availabilityFilter.options).map(([key, name]) => (
          <div key={key} className="flex items-center gap-2 py-3 text-darkGray">
            <input
              className="h-4 w-4 appearance-none border border-gray-400 checked:before:block checked:before:text-center checked:before:leading-4 checked:before:text-black checked:before:content-['✔']"
              type="checkbox"
              name={key}
              id={name}
              onChange={handleAvailabilityFilterChange}
              checked={filters.availability[key as AvailabilityKeys] || false}
            />
            <label className="hover:underline" htmlFor={key}>
              {name} ({name === "In Stock" ? inStockCount : outOfStockCount})
            </label>
          </div>
        ))}
    </div>
  );
};
// Color filter

export const ColorFilter = ({
  uniqueColorCategory,
  handleColorSelection,
  filters,
  colorCategoryCounts,
  className,
}: {
  uniqueColorCategory: string[];
  handleColorSelection: (color: string) => void;
  filters: FiltersType;
  colorCategoryCounts: Record<string, number>;
  className?: string;
}) => {
  return (
    <div className={`${className} flex-col items-start gap-2`}>
      {uniqueColorCategory.map(color => (
        <div
          className="flex items-center gap-2 py-3 text-[14px] text-darkGray"
          key={color}
        >
          <input
            type="checkbox"
            name={color}
            id={color}
            onChange={() => handleColorSelection(color)}
            checked={filters.colors.includes(color)}
            className={`h-6 w-6 appearance-none rounded-full checked:border checked:border-black ${
              data.colorClasses[color as keyof typeof data.colorClasses] ||
              "bg-gray-200"
            }`}
          />
          <label
            className={`capitalize hover:underline ${filters.colors.includes(color) ? "font-bold" : ""}`}
            htmlFor={color}
          >
            {color} ({colorCategoryCounts[color]})
          </label>
        </div>
      ))}
    </div>
  );
};

export const SortByFilter = ({
  sortBy,
  handleSortByChange,
}: {
  sortBy?: string;
  handleSortByChange: React.ChangeEventHandler<HTMLSelectElement>;
}) => {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-[15px]">Sort By:</h2>
        <select
          value={sortBy || ""}
          onChange={handleSortByChange}
          className="py-1 text-xs hover:underline md:rounded md:border md:px-3 md:text-base"
        >
          {content.sortBy[0]?.options.map((option, index) => (
            <option key={index} value={option} className="text-xs">
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
