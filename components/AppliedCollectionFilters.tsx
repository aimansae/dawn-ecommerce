/* eslint-disable indent */
"use client";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import { IoCloseOutline } from "react-icons/io5";
import data from "../app/data/productList.json";

const AppliedCollectionFilters = () => {
  const { filters, removeAppliedFilter, sortBy } = useCollectionFilters();
  const validColors = Array.from(
    new Set(
      data.products.flatMap(product =>
        product.availableColors.map(color => color.colorCategory.toLowerCase())
      )
    )
  );

  return (
    <div className="flex flex-wrap gap-4 pb-4">
      <ul className="flex flex-wrap gap-2 text-darkGray">
        {filters.availability &&
          typeof filters.availability.inStock === "boolean" &&
          filters.availability?.inStock && (
            <li className="space-between flex items-center gap-2 rounded-md border px-1 text-xs shadow-md">
              <span>Availability: In Stock</span>
              <button
                className="transform text-customBlack transition-transform duration-200 hover:scale-110"
                onClick={e => {
                  e.stopPropagation();
                  removeAppliedFilter("inStock");
                }}
              >
                <IoCloseOutline />
              </button>
            </li>
          )}
        {filters.availability.outOfStock &&
          typeof filters.availability.outOfStock === "boolean" &&
          filters.availability?.outOfStock && (
            <li className="space-between flex items-center gap-2 rounded-md border px-1 text-xs shadow-md">
              <span>Availability: Out of Stock</span>
              <button
                className="border:customBlack transform text-customBlack transition-transform duration-200 hover:scale-110 hover:border"
                onClick={() => removeAppliedFilter("outOfStock")}
              >
                <IoCloseOutline />
              </button>
            </li>
          )}
        {/* colors */}
        {filters.colors &&
          filters.colors.length > 0 &&
          filters.colors
            .filter(color => validColors.includes(color.toLowerCase()))
            .map(color => (
              <li
                key={color}
                className="space-between flex items-center gap-1 rounded-md border px-1 text-xs shadow-md"
              >
                <span className="capitalize">Color: {color}</span>
                <button
                  className="border:customBlack transform text-customBlack transition-transform duration-200 hover:scale-110 hover:border"
                  onClick={() => removeAppliedFilter("colors", color)}
                >
                  <IoCloseOutline />
                </button>
              </li>
            ))}
        {/* sort by*/}
        {sortBy && (
          <div className="space-between flex items-center gap-1 rounded-md border px-1 text-xs shadow-md">
            <span className="capitalize">Sort by: {sortBy}</span>
            <button
              className="border:customBlack transform text-customBlack transition-transform duration-200 hover:scale-110 hover:border"
              onClick={() => removeAppliedFilter("sortBy", sortBy)}
            >
              <IoCloseOutline />
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default AppliedCollectionFilters;
