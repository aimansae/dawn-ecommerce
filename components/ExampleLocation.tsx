import React, { useState } from "react";
import data from "../app/data/header.json";
import SearchInput from "./SearchInput";

type Locations = {
  country: string;
  currency: string;
};

const ExampleLocation = () => {
  const [query, setQuery] = useState("");
  const sortedCountries = (locations: Locations[]) => {
    return locations.sort((a, b) => {
      if (a.country < b.country) return -1;
      if (a.country > b.country) return 1;
      return 0;
    });
  };

  const sorted = sortedCountries(data.footer.locations);
  const [showCountries, setShowCountries] = useState(false);

  const [selectCountry, setSelectCountry] = useState({
    country: data.footer.locations[0].country,
    currency: data.footer.locations[0].currency,
  });

  console.log("default is", selectCountry);
  const handleShowCountries = () => {
    setShowCountries(!showCountries);
  };

  const handleSelectCountry = (item: Locations) => {
    console.log("clicked", item);
    setSelectCountry(item);
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    console.log(query);
  };
  const filtered = sorted.filter((item) =>
    item.country.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
  return (
    <div>
      <button className="w-full border p-4 flex">
        <div>
          {selectCountry.country} {selectCountry.currency}{" "}
        </div>
        <div onClick={handleShowCountries}> V</div>
      </button>
      {showCountries && (
        <div>
          <SearchInput
            onClose={handleShowCountries}
            onSearch={handleSearch}
          ></SearchInput>
          <ul>
            {filtered.map((item, i) => (
              <li key={i}>
                <button
                  className="hover:bg-slate-400"
                  onClick={() => handleSelectCountry(item)}
                >
                  {item.country}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExampleLocation;
