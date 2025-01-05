"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Location = {
  country: string;
  currency: string;
  currencySymbol?: string;
};

type LocationContextType = {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
};

const defaultLocation: Location = {
  country: "Canada",
  currency: "CAD",
  currencySymbol: "$",
};

const CountryContext = createContext<LocationContextType | undefined>(
  undefined
);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  return (
    <CountryContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </CountryContext.Provider>
  );
};

export function useCountry(): LocationContextType {
  const context = useContext(CountryContext);

  if (!context) {
    throw new Error("use Country must be used within provider");
  }
  return context;
}
