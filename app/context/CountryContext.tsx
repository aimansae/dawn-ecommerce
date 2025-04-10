"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchCurrencyRates from "../utils/fetchCurrencyRates";

type Location = {
  country: string;
  currency: string;
  currencySymbol?: string;
};

type LocationContextType = {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
  exchangeRate?: number | null;
};

const defaultLocation: Location = {
  country: "United States",
  currency: "USD",
  currencySymbol: "$",
};

const CountryContext = createContext<LocationContextType | undefined>(
  undefined
);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState(() => {
    if (typeof window !== "undefined") {
      const storedLocation = localStorage.getItem("location");
      return storedLocation ? JSON.parse(storedLocation) : defaultLocation;
    }
    return defaultLocation;
  });

  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  useEffect(() => {
    localStorage.setItem("location", JSON.stringify(selectedLocation));
  }, [selectedLocation]);

  // useEffect(() => {
  //   const fetchRate = async () => {
  //     const rate = await fetchCurrencyRates(selectedLocation.currency);

  //     if (rate) {
  //       setExchangeRate(rate);
  //     }
  //   };

  //   // fetchRate();
  // }, [selectedLocation]);
  return (
    <CountryContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        exchangeRate,
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
