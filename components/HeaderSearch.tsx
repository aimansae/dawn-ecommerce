"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import data from "../app/data/header.json";

type HeaderSearchProps = {
  onHandleSearch: (query: string, onFinish?: () => void) => void;
   term: string;
  setTerm: (term: string) => void;
  className?: string;
  showCloseIcon: boolean;
  handleClearFilters: () => void;
};

const HeaderSearch = ({
  onClose,
  term,
  setTerm,
  className,
  showCloseIcon = true,
  onHandleSearch,
  handleClearFilters,
}: HeaderSearchProps) => {
  const [search, setSearch] = useState(term || "");
  const router = useRouter();
  const pathname = usePathname();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearch(term.toLocaleLowerCase());
    setTerm(term.toLocaleLowerCase());
  };

  const handleCloseSearch = () => {
    setSearch("");
    setTerm("");
    router.push(pathname);
    onClose();
  };

  return (
    <div
      className={`${className} flex items-center gap-4 ${showCloseIcon ? "md:z-50" : ""}`}
    >
      <div className="relative flex w-full md:sticky">
        <label className="sr-only" htmlFor="search">
          {data.header.searchLabel}
        </label>
        <input
          type="text"
          className="w-full border border-black px-4 py-2 hover:border"
          placeholder="Search"
          value={term}
          id={search}
          name={search}
          onChange={handleInput}
        />
        <button className="flex items-center bg-gray-400">
          <div className="absolute right-3 flex items-center">
            <span className="border-r border-gray-200 pr-2 font-bold">
              {search && (
                <TfiClose
                  onClick={handleClearFilters}
                  size={18}
                  className="border-gray transform rounded-full border p-1 transition-transform duration-300 hover:scale-110"
                />
              )}
            </span>
            <span>
              <IoIosSearch
                size={18}
                className="ml-2 transform text-darkGray transition-transform duration-300 hover:scale-110"
                onClick={() => {
                  onHandleSearch(term);
                  onClose();
                }}
              />
            </span>
          </div>
        </button>
      </div>
      {showCloseIcon && (
        <div>
          <button>
            <TfiClose
              size={18}
              className={`${className} mr-2 mt-1 transform text-customBlack transition-transform duration-300 hover:scale-110`}
              onClick={handleCloseSearch}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
