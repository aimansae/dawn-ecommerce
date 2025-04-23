"use client";
import React, { useEffect, useRef, useState } from "react";
import content from "../app/data/collectionFilter.json";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import {
  IoIosArrowDown,
  IoIosArrowRoundBack,
  IoIosArrowRoundForward,
} from "react-icons/io";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import data from "../app/data/productList.json";
import { TfiClose } from "react-icons/tfi";
import { AvailabilityFilter } from "./AvailabilityFilter";
import { ColorFilter } from "./ColorFilter";
import { SortByFilter } from "./SortByFilter";
import { ProductType } from "@/app/types/types";

//close filters if clicked on X from parent
type Props = {
  totalProducts: number;
  filteredProducts: ProductType[];
};

const CollectionsFilters = ({ totalProducts, filteredProducts }: Props) => {
  const {
    filters,
    handleAvailabilityFilterChange,
    handleColorSelection,
    handleSortByChange,
    sortBy,
    handleClearFilters,
  } = useCollectionFilters();
  // For desktop
  const [activeFilters, setActiveFilters] = useState({
    availability: false,
    colors: false,
  });
  const [activeMobilePanel, setActiveMobilePanel] = useState<
    "availability" | "colors" | null
  >(null);

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const mobileFilterRef = useRef<HTMLElement | null>(null);
  const availabilityRefDesktop = useRef<HTMLDivElement | null>(null);
  const colorsRefDesktop = useRef<HTMLDivElement | null>(null);
  //For desktop
  const toggleDesktopFilter = (filterType: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      availability: false,
      colors: false,
      [filterType]: !prev[filterType],
    }));
  };
  // close mobile filters if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileFilterRef.current &&
        !mobileFilterRef.current.contains(event.target as Node)
      ) {
        setShowMobileFilters(false);
      }
    };

    if (showMobileFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileFilters]);

  // If mobile filter are open make background not scrollable
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

  // Desktop: close filters if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickOutsideAvailability =
        availabilityRefDesktop.current &&
        !availabilityRefDesktop.current.contains(e.target as Node);
      const clickOutsideColors =
        colorsRefDesktop.current &&
        !colorsRefDesktop.current.contains(e.target as Node);

      if (activeFilters.availability && clickOutsideAvailability) {
        setActiveFilters(prev => ({ ...prev, availability: false }));
      }
      if (activeFilters.colors && clickOutsideColors) {
        setActiveFilters(prev => ({ ...prev, colors: false }));
      }
    };
    if (activeFilters.availability || activeFilters.colors) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeFilters.availability, activeFilters.colors]);

  const inStockCount =
    filteredProducts.filter(product => product.status === "inStock")?.length ??
    0;
  const outOfStockCount =
    filteredProducts.filter(product => product.status === "outOfStock")
      ?.length ?? 0;
  //color count
  const colorCategoryCounts = filteredProducts.reduce(
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

  const uniqueColorCategory = [...new Set(allColors)];
  const selectedAvailabilityCount = Object.values(filters.availability).filter(
    Boolean
  ).length;

  const selectedColorCount = filters.colors.length;
  return (
    <div>
      <aside className="flex w-full items-center justify-between gap-2 py-3 text-[15px] text-darkGray">
        {/*mobile*/}
        <div className="flex items-center justify-between md:hidden">
          <button
            className="flex items-center gap-1 hover:underline"
            onClick={() => setShowMobileFilters(prev => !prev)}
          >
            <PiSlidersHorizontalThin />
            <h2 className="text-sm sm:text-[15px]">
              {content.titleSmallDevices}
            </h2>
          </button>
        </div>
        {/*desktop left content*/}
        <div className="hidden w-full items-center gap-12 capitalize md:flex">
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
          ))}
          {/* Middle: Sort By Dropdown */}
          <div className="mr-2">
            <SortByFilter
              handleSortByChange={handleSortByChange}
              sortBy={sortBy || ""}
            />
          </div>
        </div>
        <div className="flex gap-1 text-sm sm:text-[15px]">
          <span>{totalProducts}</span>
          <span>{totalProducts > 1 ? " Products" : " Product"}</span>
        </div>
      </aside>
      {/* dark overlay for mobile */}
      {showMobileFilters && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-60"></div>
      )}
      {showMobileFilters && (
        <section
          ref={mobileFilterRef}
          className="absolute right-0 top-0 z-50 flex h-screen w-2/3 flex-col bg-white text-customBlack md:hidden"
        >
          <div className="flex items-center justify-between px-[25px] py-[10px] text-sm">
            <div className="flex-grow text-center">
              <h2 className="text-[15px]">{content.titleSmallDevices}</h2>
              <p className="text-darkGray">
                {totalProducts} {content.products}
              </p>
            </div>
            <button
              onClick={() => {
                setShowMobileFilters(prev => !prev);
                setActiveMobilePanel(null);
              }}
            >
              <TfiClose className="text-darkGray" size={22} />
            </button>
          </div>
          {/* Default Panel mobile */}
          {!activeMobilePanel && (
            <ul className="flex flex-grow flex-col gap-2 border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray sm:text-sm">
              {content.filterBy.map(filter => (
                <li
                  key={filter.name}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <button
                    onClick={() =>
                      setActiveMobilePanel(
                        filter.name as "availability" | "colors"
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
          {/* Availability Panel */}
          {activeMobilePanel === "availability" && (
            <div className="flex-grow border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
              <button
                className="flex w-full items-center justify-start py-3"
                onClick={() => setActiveMobilePanel(null)}
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
          {/*  Colors Panel */}
          {activeMobilePanel === "colors" && (
            <div className="flex-grow overflow-y-auto border-y border-gray-300 px-[25px] py-3 text-[15px] text-darkGray">
              <button
                className="flex w-full items-center justify-start py-3"
                onClick={() => setActiveMobilePanel(null)}
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
          {/*Footer buttons*/}
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
                setActiveMobilePanel(null);
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
