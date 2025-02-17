import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
};

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  //track the selected page
  const [selectedPage, setSelectedPage] = useState(currentPage);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > totalPages || page < 1) return;
    setSelectedPage(page);

    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathName}?${params.toString()}`);
  };
  if (totalPages <= 1) return null;
  return (
    <div className="my-8 flex items-center justify-center gap-4">
      {/*previous Page*/}
      {selectedPage > 1 && (
        <button
          className="flex items-center"
          onClick={() => handlePageChange(selectedPage - 1)}
        >
          <MdOutlineNavigateBefore className="transition-transform duration-200 hover:scale-125" />
        </button>
      )}
      {/*numbers for pages*/}

      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        return (
          <button
            className={`${selectedPage === pageNumber ? "font-bold" : ""} transition-transform duration-200 hover:scale-90`}
            key={i}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}
      {selectedPage < totalPages && (
        <button onClick={() => handlePageChange(selectedPage + 1)}>
          <MdOutlineNavigateNext className="transition-transform duration-200 hover:scale-125" />
        </button>
      )}
    </div>
  );
};

export default Pagination;
