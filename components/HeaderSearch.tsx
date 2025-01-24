"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
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
    console.log(term, "****");
    setSearch(term.toLocaleLowerCase());
    setTerm(term.toLocaleLowerCase());
  };

  const handleSubmit = () => {
    if (search.trim()) {
      router.push(`/?query=${encodeURIComponent(search.toString())}`);
    }
    console.log;
    onClose();
  };

  const handleCloseSearch = () => {
    setSearch("");
    setTerm("");
    router.push(pathname);

    console.log("pathname");
    onClose();
  };
  return (
    <div className="flex justify-between items-center gap-2 md:gap-1">
      <div className="w-[90%] md:w-full flex relative md:sticky md:z-50 ">
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          type="text"
          className="p-2 border border-black w-full"
          placeholder="Search"
          value={search}
          id={search}
          name={search}
          onChange={handleInput}
        />
        <button className="flex items-center bg-gray-400">
          <div className="flex items-center gap-2 absolute right-3 ">
            <span className="pr-2 border-r border-gray-400">
              {search && (
                <TfiClose
                  onClick={() => {
                    setSearch(""), setTerm("");
                  }}
                  size={20}
                  className="text-darkGray border border-gray rounded-full  transition-transform p-1 transform hover:scale-110 duration-300"
                />
              )}
            </span>
            <span>
              <IoIosSearch
                size={23}
                className="text-darkGray transition-transform transform hover:scale-110 duration-300"
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
            className="text-darkGray md:hidden transition-transform transform hover:scale-110 duration-300 mt-1"
            onClick={handleCloseSearch}
          />
        </button>
      </div>
    </div>
  );
};

export default HeaderSearch;
