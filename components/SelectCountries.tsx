"use client";
import React, { useContext, useEffect, useState } from "react";
import { Location } from "./MobileFooter";
import { BsCheck2 } from "react-icons/bs";

type SelectCountriesProps = {
  onSelectCountry: (location: Location) => void;
  onClose: () => void;
  currentlySelectedLocation: string;
};
import data from "../app/data/header.json";

import SearchInput from "./SearchInput";
import { useCountry } from "@/app/context/CountryContext";

const SelectCountries = ({ onClose }: SelectCountriesProps) => {
  const [query, setQuery] = useState("");

  const { selectedLocation, setSelectedLocation } = useCountry();

  const sortLocations = (locations: Location[]) => {
    return locations.sort((a, b) => {
      if (a.country < b.country) {
        return -1;
      } else return 2;
    });
  };
  const sortedLocations = sortLocations(data.footer.locations);

  const filteredData = query
    ? sortedLocations.filter((location) =>
        location.country.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    : sortedLocations;

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   document.body.style.overflow = "hidden";
  //   document.body.style.paddingRight = "15px";

  //   const header = document.querySelector("header");
  //   if (header) {
  //     header.classList.add("fixed", "top-0", "left-0", "w-full", "z-50");
  //   }

  //   return () => {
  //     document.body.style.overflow = "auto";
  //     document.body.style.paddingRight = "0";
  //     if (header) {
  //       header.classList.remove("fixed", "top-0", "left-0", "w-full", "z-50");
  //     }
  //   };
  // }, []);
  return (
    <>
      {/* <div
        className="md:hidden fixed top-[106px] left-0 w-full h-full bg-black bg-opacity-50 z-40 md:w-auto"
        onClick={onClose} // Clicking the overlay closes the modal
      /> */}

      <div
        className={
          "fixed w-full p-[15px] md:absolute left-0   bottom-0 md:bottom-[9rem] bg-white z-50 md:w-auto h-3/4 md:h-full overflow-y-auto md:border"
        }
      >
        <SearchInput onClose={onClose} onSearch={setQuery} />

        <ul className="flex flex-col items-center justify-between  ">
          {filteredData.length > 0 ? (
            filteredData.map((location, index) => (
              <li
                key={index}
                className="w-full p-2 md:p-3   flex justify-between items-center"
              >
                <button
                  className=" relative flex gap-2 text-gray-500 hover:text-black w-full justify-between items-center hover:underline"
                  onClick={() => setSelectedLocation(location)}
                >
                  {location.country === selectedLocation.country && (
                    <span className="absolute left-[-18px] top-1">
                      <BsCheck2 />
                    </span>
                  )}

                  <span className="text-sm font-medium flex items-center">
                    {location.country}
                  </span>
                  <span className="text-sm font-medium">
                    {location.currency} {location.currencySymbol}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <span className="text-sm my-2 text-center">No results found</span>
          )}
        </ul>
      </div>
    </>
  );
};

export default SelectCountries;
