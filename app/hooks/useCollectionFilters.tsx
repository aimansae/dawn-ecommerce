"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
export type FiltersType = {
  availability: { inStock: boolean; outOfStock: boolean };
  colors: string[];
};
export const useCollectionFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");

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
    updateURL(updatedFilters, sortBy, searchQuery);
  };
  const handleColorSelection = (color: string) => {
    const updatedColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    const updatedFilters = { ...filters, colors: updatedColors };
    setFilters(updatedFilters);
    updateURL(updatedFilters, sortBy, searchQuery);
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
    const queryParams = searchparams.get("query") || "";
    setFilters({
      availability: { inStock, outOfStock },
      colors,
    });
    if (sortByParams) setSortBy(sortByParams.toLowerCase());
    setSearchQuery(queryParams);
  }, [searchparams.toString()]);

  // update url
  const updateURL = (
    newFilters: FiltersType,
    newSortBy: string | null,
    query?: string
  ) => {
    const params = new URLSearchParams(searchparams.toString());

    // Always update colors
    if (newFilters.colors.length > 0) {
      params.set("colors", newFilters.colors.join(","));
    } else {
      params.delete("colors");
    }

    if (newFilters.availability.inStock) {
      params.set("inStock", "true");
    } else {
      params.delete("inStock");
    }

    if (newFilters.availability.outOfStock) {
      params.set("outOfStock", "true");
    } else {
      params.delete("outOfStock");
    }

    if (newSortBy) {
      params.set("sort_by", newSortBy);
    } else {
      params.delete("sort_by");
    }

    if (query !== undefined) {
      if (query.trim()) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
    }
    router.push(`${pathname}?${decodeURIComponent(params.toString())}`);
  };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption);

    updateURL(filters, selectedOption, searchQuery);
  };
  // clear all filters
  const handleClearFilters = () => {
    setFilters({
      availability: { inStock: false, outOfStock: false },
      colors: [],
    });
    setSortBy("");
    setSearchQuery("");
    router.push(pathname);
  };

  //check
  const removeAppliedFilter = (
    type: "inStock" | "outOfStock" | "colors",
    value?: string
  ) => {
    const updatedFilters = { ...filters };
    console.log(updatedFilters, "Logging updatedDilters");
    if (type === "colors" && value) {
      updatedFilters.colors = updatedFilters.colors.filter(c => c !== value);
    } else if (type === "inStock" || type === "outOfStock") {
      updatedFilters.availability[type] = false;
    }

    setFilters(updatedFilters);
    updateURL(updatedFilters, sortBy, searchQuery);
  };

  const handleGeneralSearch = (query: string, onFinish?: () => void) => {
    const currentParams = new URLSearchParams(searchparams.toString());
    if (query.trim()) {
      currentParams.set("query", query);
      router.push(`/search?query=${encodeURIComponent(query.toString())}`);
      setSearchQuery(query);
    }
    if (onFinish) onFinish();
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
    searchQuery,
    setSearchQuery,
    handleGeneralSearch,
  };
};
