" use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useFilter = () => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sizeParamsFromURL = searchParams?.get("size");
    const colorParamsFromURL = searchParams?.get("color");
    setSelectedSizes(sizeParamsFromURL ? sizeParamsFromURL.split(",") : []);
    setSelectedColors(colorParamsFromURL ? colorParamsFromURL.split(",") : []);
  }, [searchParams]);

  const updateParams = (sizes: string[], colors: string[]) => {
    const params = new URLSearchParams(searchParams);
    if (sizes.length) {
      params.set("size", sizes.join(","));
    } else {
      params.delete("size");
    }
    if (colors.length) {
      params.set("color", colors.join(","));
    } else {
      params.delete("color");
    }
    router.push(`${pathname}?${decodeURIComponent(params.toString())}`);
  };
  useEffect(() => {
    updateParams(selectedSizes, selectedColors);
  }, [selectedSizes, selectedColors]);

  const handleColorSelection = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };
  const handleSizeSelection = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    console.log("Selected", size);
  };
  return {
    selectedSizes,
    selectedColors,
    handleSizeSelection,
    handleColorSelection,
  };
};
