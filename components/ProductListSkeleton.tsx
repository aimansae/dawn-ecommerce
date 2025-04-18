import React from "react";

const ProductListSkeleton = () => {
  return (
    <div className="my-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col">
          <div className="relative aspect-square w-full rounded-md bg-gray-200">
            {/* Simulated Image */}
          </div>

          <div className="my-2 flex flex-col gap-2">
            {/* Simulated Title */}
            <div className="h-4 w-3/4 rounded bg-gray-200" />

            {/* Simulated Prices */}
            <div className="flex items-center gap-4">
              <div className="h-4 w-1/4 rounded bg-gray-200" />
              <div className="h-4 w-1/4 rounded bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
