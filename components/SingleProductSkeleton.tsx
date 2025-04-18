import React from "react";

const SingleProductSkeleton = () => {
  return (
    <section className="relative z-10 mx-auto grid w-full max-w-7xl animate-pulse grid-cols-1 items-start gap-2 p-4 md:grid-cols-3 md:gap-8 md:p-7">
      {/*Main Image*/}
      <div className="relative aspect-square w-full rounded-md bg-gray-200"></div>

      {/* grid section for md+ devices */}
      <div className="my-4 hidden gap-4 md:grid md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative aspect-square w-full rounded-md bg-gray-200"
          ></div>
        ))}
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-center">
        {/* Title */}
        <div className="my-4 h-6 w-1/3 rounded-md bg-gray-300" />
      </div>
      {/* Color options Selection */}
      <div className="my-12 flex h-4 w-20 rounded-md bg-gray-300">
        <div className="flex flex-col gap-2">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-8 w-16 rounded-2xl bg-gray-200"></div>
          ))}
        </div>
      </div>
      {/* Size options */}
      {/* <div className="h-4 w-20 rounded-md bg-gray-300"></div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-8 w-16 rounded-2xl bg-gray-200"></div>
        ))}
      </div> */}
      {/* Quantity Selection */}
      <div className="w-1/2 rounded-md bg-gray-300"></div>
      {/* Add to Cart and Buy Now */}
      <div className="my-6 flex w-full flex-col items-start justify-between gap-4">
        <div className="h-12 w-full rounded-md bg-gray-400"></div>
        <div className="h-12 w-full rounded-md bg-gray-400"></div>
      </div>
      {/*Accordion*/}
      <div className="h-10 w-full rounded-md bg-gray-200"></div>
    </section>
  );
};

export default SingleProductSkeleton;
