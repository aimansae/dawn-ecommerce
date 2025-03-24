"use client";

import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import { IoCloseOutline } from "react-icons/io5";

const AppliedCollectionFilters = () => {
  const { filters, removeAppliedFilter } = useCollectionFilters();

  return (
    <div className="flex flex-wrap gap-4 pb-4">
      <ul className="flex flex-wrap gap-2 text-darkGray">
        {filters.availability?.inStock && (
          <li className="space-between flex items-center gap-2 rounded-md border px-1 text-xs shadow-md">
            <span className="">Availability: In Stock</span>
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
        {filters.availability?.outOfStock && (
          <li className="space-between flex items-center gap-2 rounded-md border px-1 text-xs shadow-md">
            <span className="">Availability: Out of Stock</span>
            <button
              className="border:customBlack transform text-customBlack transition-transform duration-200 hover:scale-110 hover:border"
              onClick={() => removeAppliedFilter("outOfStock")}
            >
              <IoCloseOutline />
            </button>
          </li>
        )}
        {filters.colors &&
          filters.colors.length > 0 &&
          filters.colors.map(color => (
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
      </ul>
    </div>
  );
};

export default AppliedCollectionFilters;
