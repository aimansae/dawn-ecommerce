"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export const useFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [selectedSize, setSelectedSize] = useState<string[]>(
    searchParams.get("size") ? searchParams.get("size")!.split(",") : []
  );
  const [selectedColor, setSelectedColor] = useState<string[]>(
    searchParams.get("color") ? searchParams.get("color")!.split(",") : []
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedSize.length > 0) {
      params.set("size", selectedSize.join(","));
    } else params.delete("size");

    if (selectedColor.length > 0) {
      params.set("color", selectedColor.join(","));
    } else {
      params.delete("color");
    }
    router.push(`${pathName}?${decodeURIComponent(params.toString())}`);
  }, [selectedSize, selectedColor]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedSize(prev => {
      const updatedSizes = checked
        ? [...prev, name]
        : prev.filter(size => size !== name);

      return updatedSizes;
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSelectedColor(prev => {
      const updatedColor = checked
        ? [...prev, name]
        : prev.filter(color => color !== name);
      return updatedColor;
    });
  };

  const clearFilter = (type: "color" | "size") => {
    const params = new URLSearchParams(searchParams);
    if (type === "size") {
      setSelectedSize([]);
      params.delete("size");
    }
    if (type === "color") {
      setSelectedColor([]);
      params.delete("color");
    }

    router.push(`${pathName}?${decodeURIComponent(params.toString())}`);
  };

  return {
    selectedSize: selectedSize ?? [],
    selectedColor: selectedColor ?? [],
    handleColorChange,
    handleSizeChange,
    clearFilter,
  };
};
