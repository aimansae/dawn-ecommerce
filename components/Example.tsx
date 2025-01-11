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
