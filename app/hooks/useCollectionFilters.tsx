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
  const [sortBy, setSortBy] = useState<string | null>("");
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
    setFilters(prev => {
      const updatedColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];

      console.log("Updated Colors:", updatedColors); // Debugging line

      return { ...prev, colors: updatedColors };
    });
  };
  const searchparams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // first get the filter from URL when component mounts
  useEffect(() => {
    const inStock = searchparams.get("inStock") === "true";
    const outOfStock = searchparams.get("outOfStock") === "true";
    const colorsParam = searchparams.get("colors");
    const colors = colorsParam ? colorsParam.split(",") : [];
    const sortByParams = searchparams.get("sort_by") || "";
    setFilters({
      availability: { inStock, outOfStock },
      colors,
    });
    if (sortByParams) setSortBy(sortByParams);
  }, []);

  // update url
  useEffect(() => {
    const params = new URLSearchParams();

    // ✅ Always update colors
    if (filters.colors.length > 0) {
      params.set("colors", filters.colors.join(","));
    } else {
      params.delete("colors");
    }

    if (filters.availability.inStock) params.set("inStock", "true");
    else params.delete("inStock");

    if (filters.availability.outOfStock) params.set("outOfStock", "true");
    else params.delete("outOfStock");
    if (sortBy) {
      params.set("sort_by", sortBy);
    } else {
      params.delete("sort_by");
    }
    const queryString = decodeURIComponent(params.toString().toLowerCase());
    console.log("Updated URL Params:", queryString);
    router.push(`${pathname}?${queryString}`);
  }, [filters, sortBy]);
  // sort by

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);
    console.log("handleSortBy", selectedOption);
    const params = new URLSearchParams(searchparams.toString());
    params.set("sort_by", selectedOption);

    router.push(`${pathname}?${decodeURIComponent(params.toString())}`);
  };
  // clear all filters
  const handleClearFilters = () => {
    setFilters({
      availability: { inStock: false, outOfStock: false },
      colors: [],
    });
    setSortBy("");

    router.push(`${pathname}`);
  };
  const removeAppliedFilter = (
    type: "inStock" | "outOfStock" | "colors",
    value?: string
  ) => {
    setFilters(prev => {
      if (type === "colors") {
        return { ...prev, colors: prev.colors.filter(c => c !== value) };
      } else {
        return {
          ...prev,
          availability: { ...prev.availability, [type]: false },
        };
      }
    });
  };

  return {
    filters,
    handleAvailabilityFilterChange,
    handleColorSelection,
    sortBy,
    handleSortByChange,
    handleClearFilters,
    removeAppliedFilter,
  };
};
