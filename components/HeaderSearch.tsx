"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

type HeaderSearchProps = {
  onClose: () => void;
  term: string;
  setTerm: (term: string) => void;
};

const HeaderSearch = ({ onClose, term, setTerm }: HeaderSearchProps) => {
  const [search, setSearch] = useState(term || "");
  const router = useRouter();
  const pathname = usePathname();
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    setSearch(term.toLocaleLowerCase());
    setTerm(term.toLocaleLowerCase());
  };

  const handleSubmit = () => {
    if (search.trim()) {
      router.push(
        `/collections/?query=${encodeURIComponent(search.toString())}`
      );
    }

    onClose();
  };

  const handleCloseSearch = () => {
    setSearch("");
    setTerm("");
    router.push(pathname);

    onClose();
  };

  return (
    <div className="flex items-center justify-between gap-2 md:gap-1">
      <div className="relative flex w-[90%] md:sticky md:z-50 md:w-full">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          className="w-full border border-black p-2"
          placeholder="Search"
          value={search}
          id={search}
          name={search}
          onChange={handleInput}
        />
        <button className="flex items-center bg-gray-400">
          <div className="absolute right-3 flex items-center gap-2">
            <span className="border-r border-gray-400 pr-2">
              {search && (
                <TfiClose
                  onClick={() => {
                    setSearch("");
                    setTerm("");
                  }}
                  size={20}
                  className="border-gray transform rounded-full border p-1 text-darkGray transition-transform duration-300 hover:scale-110"
                />
              )}
            </span>
            <span>
              <IoIosSearch
                size={23}
                className="transform text-darkGray transition-transform duration-300 hover:scale-110"
                onClick={handleSubmit}
              />
            </span>
          </div>
        </button>
      </div>
      <div>
        <button>
          <TfiClose
            size={22}
            className="mt-1 transform text-darkGray transition-transform duration-300 hover:scale-110 md:hidden"
            onClick={handleCloseSearch}
          />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
