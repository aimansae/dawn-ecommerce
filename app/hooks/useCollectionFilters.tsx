"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
export type FiltersType = {
  availability: { inStock: boolean; outOfStock: boolean };
  colors: string[];
};
export const useCollectionFilters = () => {
  const [filters, setFilters] = useState<FiltersType>({
    availability: { inStock: false, outOfStock: false },
    colors: [],
  });
  const handleAvailabilityFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("checked");
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [name]: checked,
      },
    }));
    console.log(
      `User clicked on: ${name} - ${checked ? "Enabled" : "Disabled"}`
    );
  };
  const handleColorSelection = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }));
    console.log(color);
  };
  const searchparams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // first get the filter from URL when component mounts
  useEffect(() => {
    const inStock = searchparams.get("inStock") === "true";
    const outOfStock = searchparams.get("outOfStock") === "true";
    const colors = searchparams.getAll("colors");
    setFilters(prev => ({
      ...prev,
      availability: { inStock, outOfStock },
      colors,
    }));
  }, [searchparams]);

  // update url
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters.availability).forEach(([key, value]) => {
      if (value) {
        params.set(key, "true");
      } else {
        params.delete(key);
      }
    });
    filters.colors.forEach(color =>
      params.append("colors", color.toLowerCase())
    );
    router.push(`${pathname}?${decodeURIComponent(params.toString())}`);
  }, [filters, pathname, router]);

  // clear all filters
  const handleClearFilters = () => {
    setFilters({
      availability: { inStock: false, outOfStock: false },
      colors: [],
    });

    router.push(`${pathname}`);
  };

  return {
    filters,
    handleAvailabilityFilterChange,
    handleColorSelection,
    handleClearFilters,
  };
};
