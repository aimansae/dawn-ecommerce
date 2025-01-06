"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Location = {
  country: string;
  currency: string;
  currencySymbol?: string;
  exchangeRate?: number;
};

type LocationContextType = {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
};

const defaultLocation: Location = {
  country: "USA",
  currency: "USD",
  currencySymbol: "$",
  exchangeRate: 1,
};

const CountryContext = createContext<LocationContextType | undefined>(
  undefined
);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  return (
    <CountryContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
      }}
    >
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
