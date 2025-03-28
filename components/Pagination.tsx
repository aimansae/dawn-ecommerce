"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { ProductType } from "@/app/types/types";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type PaginationProps = {
  products: ProductType[];
  productsPerPage: number;
};
const Pagination = ({ products, productsPerPage = 6 }: PaginationProps) => {
  const totalPages = Math.ceil(products.length / productsPerPage);
  console.log("totalPages", totalPages);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pahName = usePathname();
  const currentPage = Number(searchParams.get("page") || 1);

  console.log(currentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      router.push(`${pahName}?${params.toString()}`);
      console.log("current pages", currentPage);
    }
  };

  const getPageNumber = () => {
    if (totalPages <= 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    if (currentPage <= 2) {
      return [1, 2];
    }

    return [currentPage - 1, currentPage, currentPage + 1];
  };

  if (totalPages <= 1) return null;

  return (
    <div className="text-md my-6 flex items-center justify-center gap-2">
      {/*Previous Page*/}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${currentPage === 1 ? "cursor-not-allowed text-gray-500" : "text-customBlack"}`}
      >
        <MdOutlineNavigateBefore
          size={20}
          className="transition-transform duration-200 hover:scale-125"
        />
      </button>
      {/*Current Page*/}

      {getPageNumber().map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`${currentPage === page ? "font-bold" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Ellipsis */}
      {totalPages > 3 && currentPage < totalPages - 1 && <span>...</span>}
      {/*Next Page*/}

      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`${currentPage === totalPages ? "cursor-not-allowed text-gray-500" : "text-customBlack"}`}
      >
        <MdOutlineNavigateNext
          size={20}
          className="transition-transform duration-200 hover:scale-125"
        />{" "}
      </button>
    </div>
  );
};

export default Pagination;
