"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

type HeaderSearchProps = {
  onHandleSearch: (query: string, onFinish?: () => void) => void;
  onClose: () => void;
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
      className={`${className} flex items-center ${showCloseIcon ? "justify-between gap-2" : ""}`}
    >
      <div className="relative flex w-[90%] md:sticky md:z-50 md:w-full">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          className="w-full border border-black p-2 hover:border"
          placeholder="Search"
          value={term}
          id={search}
          name={search}
          onChange={handleInput}
        />
        <button className="flex items-center bg-gray-400">
          <div className="absolute right-3 flex items-center">
            <span className="border-r border-gray-400 pr-2">
              {search && (
                <TfiClose
                  onClick={handleClearFilters}
                  size={20}
                  className="border-gray transform rounded-full border p-1 text-darkGray transition-transform duration-300 hover:scale-110"
                />
              )}
            </span>
            <span>
              <IoIosSearch
                size={23}
                className="transform text-darkGray transition-transform duration-300 hover:scale-110"
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
              size={20}
              className={`${className} mt-1 transform text-darkGray transition-transform duration-300 hover:scale-110 md:hidden`}
              onClick={handleCloseSearch}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
