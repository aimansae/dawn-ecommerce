import React from "react";

const LookbookLoadingSkeleton = () => {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col px-7 md:gap-6 lg:max-w-6xl lg:px-10">
      <h1 className="first-line: my-5 bg-gray-400 text-left"> </h1>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] w-full animate-pulse bg-gray-200"
          />
        ))}
      </div>
    </div>
  );
};

export default LookbookLoadingSkeleton;
