import React from "react";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  return (
    <div className="my-8 flex items-center justify-center gap-4">
      {currentPage > 1 && (
        <button
          className="flex items-center"
          onClick={e => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        >
          <MdOutlineNavigateBefore />
        </button>
      )}
      <button
        onClick={() => {
          handlePageChange(1);
        }}
        className={currentPage === 1 ? "font-Bold, underline" : ""}
      >
        1
      </button>
      {totalPages > 1 && (
        <button
          onClick={() => handlePageChange(2)}
          className={
            currentPage === 2 ? "text-primary font-bold underline" : ""
          }
        >
          2
        </button>
      )}
      {currentPage > 2 &&
        Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map(
          page =>
            page <= currentPage + 1 && (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page ? "text-primary font-bold underline" : ""
                }
              >
                {page}
              </button>
            )
        )}
      {currentPage !== totalPages && (
        <button
          onClick={e => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
        >
          <MdOutlineNavigateNext />
        </button>
      )}
    </div>
  );
};

export default Pagination;
