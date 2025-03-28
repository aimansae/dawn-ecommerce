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
    const { name, checked } = e.target;
    const updatedFilters = {
      ...filters,
      availability: { ...filters.availability, [name]: checked },
    };
    setFilters(updatedFilters);
    updateURL(updatedFilters, sortBy);
    console.log("Checkbox clicked:", name, "checked:", checked); // 👈
  };
  const handleColorSelection = (color: string) => {
    const updatedColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    const updatedFilters = { ...filters, colors: updatedColors };
    setFilters(updatedFilters);
    updateURL(updatedFilters, sortBy);
  };
  const searchparams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchparams);
    router.push(
      `/collections/${category.toLowerCase()}?${decodeURIComponent(params.toString())}`
    );
  };

  // get initial filters from URL when component mounts
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
  }, [searchparams.toString()]);

  // update url
  const updateURL = (newFilters: FiltersType, newSortBy: string | null) => {
    const params = new URLSearchParams();

    // Always update colors
    if (newFilters.colors.length > 0) {
      params.set("colors", newFilters.colors.join(","));
    }

    if (newFilters.availability.inStock) {
      params.set("inStock", "true");
      console.log("FILTERSCHECK", newFilters.availability.inStock);
    }

    if (newFilters.availability.outOfStock) {
      params.set("outOfStock", "true");
    }
    if (newSortBy) {
      params.set("sort_by", newSortBy);
    }
    router.push(`${pathname}?${decodeURIComponent(params.toString())}`);
  };
  // sort by

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

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

  //check
  const removeAppliedFilter = (
    type: "inStock" | "outOfStock" | "colors",
    value?: string
  ) => {
    const updatedFilters = { ...filters };

    if (type === "colors" && value) {
      updatedFilters.colors = updatedFilters.colors.filter(c => c !== value);
    } else if (type === "inStock" || type === "outOfStock") {
      updatedFilters.availability = {
        ...updatedFilters.availability,
        [type]: false,
      };
    }

    setFilters(updatedFilters);
    updateURL(updatedFilters, sortBy);
  };
  return {
    handleCategoryClick,
    filters,
    handleAvailabilityFilterChange,
    handleColorSelection,
    sortBy,
    handleSortByChange,
    handleClearFilters,
    removeAppliedFilter,
  };
};
