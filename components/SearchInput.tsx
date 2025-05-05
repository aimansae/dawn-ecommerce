import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import data from "@/app/data/header.json";

type SearchInputProps = {
  onClose: () => void;
  onSearch: (query: string) => void;
  className?: string;
};

const SearchInput = ({ onClose, onSearch, className }: SearchInputProps) => {
  const [search, setSearch] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 md:gap-1 ${className}`}
    >
      <div className="relative flex w-[90%] md:sticky md:z-50 md:w-full">
        <label className="sr-only" htmlFor="search">
          {data.header.searchLabel}
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
        <button
          className={`${
            search
              ? "absolute right-2 top-3 rounded-full border p-1"
              : "absolute right-0 top-0 p-2"
          }`}
        >
          <span>
            {search ? (
              <TfiClose
                onClick={() => setSearch("")}
                size={10}
                className="transform text-darkGray transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <IoIosSearch
                size={23}
                className="transform text-darkGray transition-transform duration-300 hover:scale-110 md:hidden"
              />
            )}
          </span>
        </button>
      </div>
      <div>
        <button onClick={onClose} className="flex">
          <TfiClose
            size={22}
            className="mt-1 transform text-darkGray transition-transform duration-300 hover:scale-110"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
