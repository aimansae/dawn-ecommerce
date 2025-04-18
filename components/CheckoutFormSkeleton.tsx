import React from "react";

const CheckoutFormSkeleton = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl animate-pulse flex-col justify-between">
      {/* Header Block */}
      <div className="h-16 bg-gray-200 md:grid md:grid-cols-2 md:items-start"></div>

      {/* Form Block */}
      <div className="bg-gray-100 px-4 py-6 md:px-7">
        {/* Section Title */}
        <div className="mb-4 h-6 w-1/2 rounded bg-gray-300"></div>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 rounded bg-gray-300"></div>
          ))}

          {/* Country and city block */}
          <div className="flex flex-col gap-3 md:flex-row md:justify-between">
            <div className="h-12 w-full rounded bg-gray-300"></div>
            <div className="h-12 w-full rounded bg-gray-300"></div>
          </div>

          {/* Shipping */}
          <div className="my-4 h-6 w-1/3 rounded bg-gray-300"></div>
          <div className="rounded-md border border-gray-200 bg-gray-100 p-4">
            <div className="mb-2 h-12 rounded bg-gray-300"></div>
            <div className="h-12 rounded bg-gray-200"></div>
          </div>

          {/* Payment methods */}
          <div className="my-4 h-6 w-1/3 rounded bg-gray-300"></div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-16 w-full rounded bg-gray-300"
              ></div>
            ))}
          </div>

          {/* Button */}
          <div className="my-6 flex items-center justify-center">
            <div className="h-12 w-1/3 rounded bg-gray-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutFormSkeleton;
