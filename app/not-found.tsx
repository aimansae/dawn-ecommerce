import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-7 md:py-14">
      <h1 className="text-lg font-bold">Page not found</h1>
      <Link
        className="bg-black px-8 py-2 text-center text-xs text-white md:w-1/3"
        href="/"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default notFound;
