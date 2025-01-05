import React, { ChangeEvent, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";

type SearchInputProps = {
  onClose: () => void;
  onSearch: (query: string) => void;
};
const SearchInput = ({ onClose, onSearch }: SearchInputProps) => {
  const [search, setSearch] = useState("");
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  return (
    <div className="flex justify-between items-center gap-2 md:gap-0 pb-4">
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
        <button
          className={`${
            search
              ? "absolute right-2 top-3 border rounded-full p-1"
              : "absolute p-2 right-0"
          }`}
        >
          <span>
            {search ? (
              <TfiClose
                onClick={() => setSearch("")}
                size={12}
                className=" transition-transform transform hover:scale-110 duration-300"
              />
            ) : (
              <IoIosSearch
                size={26}
                className=" transition-transform transform hover:scale-110 duration-300 md:hidden"
              />
            )}
          </span>
        </button>
      </div>
      <div className="">
        <button onClick={onClose}>
          <TfiClose
            size={26}
            className="md:hidden transition-transform transform hover:scale-110 duration-300"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
