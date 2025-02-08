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
    ? sortedLocations.filter(location =>
        location.country.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      )
    : sortedLocations;

  return (
    <div>
      <SearchInput onClose={onClose} onSearch={setQuery} />
      <ul className="mt-4 flex flex-col items-center justify-between">
        {filteredData.length > 0 ? (
          filteredData.map((location, index) => (
            <li
              key={index}
              className="flex w-full items-center justify-between gap-2 p-2 md:p-3"
            >
              <button
                className="relative flex w-full items-center justify-between gap-2 text-gray-500 hover:text-black hover:underline"
                onClick={() => {
                  setSelectedLocation(location);
                  onClose();
                }}
              >
                {location.country === selectedLocation.country && (
                  <span className="absolute left-[-18px] top-1">
                    <BsCheck2 size={15} />
                  </span>
                )}

                <span className="flex items-center text-sm font-medium">
                  {location.country}
                </span>
                <span className="text-sm font-medium">
                  {location.currency} {location.currencySymbol}
                </span>
              </button>
            </li>
          ))
        ) : (
          <span className="my-2 text-center text-sm">No results found</span>
        )}
      </ul>
    </div>
  );
};

export default SelectCountries;
