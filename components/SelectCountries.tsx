"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { Location } from "./MobileFooter";
import { BsCheck2 } from "react-icons/bs";

type SelectCountriesProps = {
  onSelectCountry: (location: Location) => void;
  onClose: () => void;
  currentlySelectedLocation: string;
};
import data from "../app/data/header.json";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import SearchInput from "./SearchInput";

const SelectCountries = ({
  onSelectCountry,
  onClose,
  currentlySelectedLocation,
}: SelectCountriesProps) => {
  const [query, setQuery] = useState("");
  // const [isOpen, setIsOpen] = useState(true);

  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   const handleClick = (e: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(e.target as Node)) {
  //       setIsOpen(false);
  //       console.log("div open");
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);
  const sortLocations = (locations: Location[]) => {
    return locations.sort((a, b) => {
      if (a.country < b.country) {
        return -1;
      } else return 2;
    });
  };
  const sortedLocations = sortLocations(data.footer.locations);

  // const countries = data.footer.locations.map((country) => country.country);
  // console.log("logging countries", countries);

  const filteredLocations = query
    ? sortedLocations.filter((location) =>
        location.country.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    : sortedLocations;

  console.log(filteredLocations, "filtered");
  return (
    <>
      <div className="absolute z-50 bg-white w-full top-0 left-0 min-h-screen p-[30px] ">
        <SearchInput onClose={onClose} onSearch={setQuery} />

        <ul className=" flex flex-col items-center justify-between ">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location, index) => (
              <li
                key={index}
                className="w-full p-2 relative flex justify-between items-center"
              >
                <button
                  className=" flex gap-2 text-gray-500  hover:text-black w-full justify-between items-center hover:underline"
                  onClick={() => onSelectCountry(location)}
                >
                  {location.country === currentlySelectedLocation && (
                    <span className="absolute left-[-12px] top-2">
                      <BsCheck2 />{" "}
                    </span>
                  )}

                  <span className="text-sm  font-medium flex items-center">
                    {" "}
                    {location.country}
                  </span>
                  <span className="text-sm font-medium">
                    {location.currency}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <span className=" text-sm  my-2 text-center">No results found</span>
          )}
        </ul>
      </div>
    </>
  );
};

export default SelectCountries;
