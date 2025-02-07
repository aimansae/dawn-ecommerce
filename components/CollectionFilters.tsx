import React, { ChangeEvent, useEffect, useState } from "react";
import content from "../app/data/filter.json";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { TfiClose } from "react-icons/tfi";
import data from "../app/data/productList.json";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  toggleFilters: () => void;
};

type ColorKeys = keyof typeof data.colorClasses;
const CollectionFilters = ({ toggleFilters }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  // retrieve all colors
  const allColors = data.products.flatMap((product) =>
    product.availableColors.map((color) => color.colorCategory)
  );
  const colorCount = allColors.reduce((acc, color) => {
    acc[color] = (acc[color] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  // console.log(
  //   colorCount,
  //   "ALL*******************88",
  //   allColors,
  //   "REDUCED",
  //   colorCount
  // );

  const uniqueColors = [...new Set(allColors)];

  const [filters, setFilters] = useState<{
    availability: { inStock: boolean; outOfStock: boolean };
    colors: string[];
  }>({
    availability: { inStock: false, outOfStock: false },
    colors: [],
  });
  const [activeFilters, setActiveFilters] = useState({
    availability: false,
    colors: false,
  });

  const totalProductsCount = data.products.length;

  // availability input change
  const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters((prev) => {
      const updatedFilter = {
        ...prev,
        availability: {
          ...prev.availability,
          [name]: checked,
        },
      };
      return updatedFilter;
    });
    console.log("Logging", name, checked);
  };
  // color input change

  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFilters((prev) => {
      const updatedFilter = {
        ...prev,
        colors: checked
          ? [...prev.colors, name]
          : prev.colors.filter((color) => color !== name), // ✅ Remove color if unchecked
      };
      return updatedFilter;
    });
    console.log("COLOR", name, checked);
  };
  const handleGoBack = () => {
    setActiveFilters({ availability: false, colors: false });
  };
  const handleClearFilters = () => {
    setActiveFilters({ availability: false, colors: false });
    router.replace(pathName);
  };

  const handleFilterShow = (filterName: string) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterName,
    }));
    console.log(filterName, "clicked");
  };

  //add filters to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (filters.availability.inStock) {
      params.set("instock", "true");
    } else {
      params.delete("instock");
    }
    if (filters.availability.outOfStock) {
      params.set("outofstock", "true");
    } else {
      params.delete("outofstock");
    }

    if (
      filters.colors.length > 0 &&
      filters.colors.some((color) => color.trim() !== "")
    ) {
      params.set("colors", filters.colors.join(","));
    } else {
      params.delete("colors");
    }
    const newUrl = `${pathName}?${params.toString().toLowerCase()}`;
    if (searchParams.toString() !== params.toString()) {
      router.replace(newUrl);
    }
  }, [filters]);

  // count for filters
  const getFilteredProductCount = () => {
    const inStockProducts = data.products.filter(
      (product) => product.status.toLowerCase() === "in stock"
    );
    const inStockCount = inStockProducts.length;

    const outOfStockProducts = data.products.filter(
      (product) => product.status.toLowerCase() === "out of stock"
    );
    const outOfStockCount = outOfStockProducts.length;

    const inStockSelected = filters.availability?.inStock ?? false;
    // display all info for in stock products

    if (inStockSelected) {
      inStockProducts.forEach((prod) =>
        console.log(
          "LOG IN STOCK PRODUCT INFO",
          prod.name,
          prod.status,
          inStockCount
        )
      );
    }

    const outOfStockSelected = filters.availability.outOfStock ?? false;

    const colorSelected = filters.colors;

    console.log(colorSelected, "logging selected color");
    if (colorSelected.length > 0) {
      data.products.filter((product) =>
        product.availableColors.some((color) =>
          colorSelected.includes(color.colorCategory)
        )
      );
    }

    let selectedColorCount = 0;
    if (colorSelected.length > 0) {
      selectedColorCount = data.products.filter((product) =>
        product.availableColors.some((color) =>
          colorSelected.includes(color.colorCategory)
        )
      ).length;
    }

    console.log(selectedColorCount, "selectedColorCount");
    const totalProducts = data.products.length;
    let totalProduct = totalProducts;
    // Step 5: Adjust `totalProduct` based on selected filters
    const allFilters =
      colorSelected.length > 0 && inStockSelected && outOfStockSelected;
    if (allFilters) {
      const filteredProducts = data.products.filter(
        (product) =>
          // Stock filter: Matches either inStock or outOfStock based on selection
          ((inStockSelected && product.status.toLowerCase() === "in stock") ||
            (outOfStockSelected &&
              product.status.toLowerCase() === "out of stock")) &&
          // Color filter: Matches at least one of the selected colors
          (colorSelected.length === 0 ||
            product.availableColors.some((color) =>
              colorSelected.includes(color.colorCategory)
            ))
      );

      console.log("Filtered Products:", filteredProducts);

      console.log(totalProduct, inStockSelected, outOfStockSelected);
    } else if (colorSelected.length > 0) {
      totalProduct = selectedColorCount;
    } else if (inStockSelected && outOfStockSelected) {
      totalProduct = inStockCount + outOfStockCount;
    } else if (inStockSelected) {
      totalProduct = inStockCount;
    } else if (outOfStockSelected) {
      totalProduct = outOfStockCount;
    }

    return {
      totalProducts,
      inStockCount,
      outOfStockCount,
      totalProduct,
      selectedColorCount,
    };
  };

  // Destructure the returned object to get all filterable attributes
  const { inStockCount, outOfStockCount, totalProduct } =
    getFilteredProductCount();

  return (
    <section className="flex flex-col bg-white z-50 py-3 absolute top-0 right-0  w-2/3 h-screen md:hidden">
      <div className="  flex items-center justify-between px-[15px] mb-1 text-sm">
        <div className="flex-grow text-center">
          <h2 className="  ">{content.titleSmallDevices}</h2>
          <p className="text-darkGray">
            {totalProduct} {content.products}
          </p>
        </div>
        <button>
          <TfiClose onClick={toggleFilters} />
        </button>{" "}
      </div>
      {activeFilters.availability && (
        <div className="flex-grow  border-y border-gray-300 bg-red-300 text-darkGray py-3 px-[15px] ">
          <button className="flex items-center gap-2" onClick={handleGoBack}>
            <FaArrowLeftLong />
            <span className="text-sm text-customBlack my-4">
              {content.filterBy[0].label}
            </span>
          </button>
          <div className="flex items-start gap-2 py-4 text-xs">
            <input
              name="inStock"
              id="inStock"
              type="checkbox"
              checked={filters.availability.inStock}
              onChange={handleAvailabilityChange}
              className="appearance-none w-4 h-4  border-gray-400 border checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center checked:before:leading-4"
            />
            <label htmlFor="inStock" className="hover:underline">
              <span>
                {
                  content.filterBy.find((f) => f.name === "availability")
                    ?.options?.inStock
                }
              </span>
              <span> ({inStockCount}) </span>
            </label>
          </div>
          <div className="flex items-center gap-2 py-4 text-xs">
            <input
              name="outOfStock"
              id="outOfStock"
              type="checkbox"
              checked={filters.availability.outOfStock}
              onChange={handleAvailabilityChange}
              className="appearance-none w-4 h-4  border-gray-400 border checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center checked:before:leading-4"
            />
            <label htmlFor="outOfStock" className="hover:underline">
              {
                content.filterBy.find((f) => f.name === "availability")?.options
                  ?.outOfStock
              }
              <span> {outOfStockCount}</span>
            </label>
          </div>
        </div>
      )}
      {/*Colors div*/}
      {activeFilters.colors && (
        <div className="white-space-nowrap flex-grow overflow-y-auto border-y border-gray-300  text-darkGray py-3 px-[15px] ">
          <button className="flex items-center gap-2" onClick={handleGoBack}>
            <FaArrowLeftLong />
            <span className="text-sm text-customBlack my-4">
              {content.filterBy[1].label}
            </span>
          </button>
          <div className="flex-grow-0 flex flex-col items-start gap-6 py-4 text-sm ">
            {uniqueColors.map((color) => (
              <div className="flex gap-2 items-center ">
                <input
                  name={color}
                  id={color}
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={handleColorChange}
                  className={`appearance-none h-6 w-6 rounded-full checked:border checked:border-black  ${
                    data.colorClasses[color as ColorKeys]
                  }`}
                />
                <label
                  htmlFor={color}
                  className={`hover:underline capitalize ${
                    filters.colors.includes(color) ? "underline" : ""
                  }    `}
                >
                  {color} ({colorCount[color]})
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* when no filter is selected */}
      {!activeFilters.availability && !activeFilters.colors && (
        <ul className="flex-grow flex flex-col  py-3 px-[15px]    border-gray-500 my-2  text-sm text-darkGray gap-2 ">
          {content.filterBy.map((filter) => (
            <li
              key={filter.name}
              className=" py-3 flex justify-between items-center gap-4"
            >
              <button
                className="w-full flex items-center justify-between"
                onClick={() => handleFilterShow(filter.name)}
              >
                <span>{filter.label} </span>
                <FaArrowRightLong />
              </button>
            </li>
          ))}
          <div className="my-2 ">
            <span> {content.sortBy}:</span>
          </div>
        </ul>
      )}
      {/*clear and apply  buttons*/}
      <div className="bg-white sticky   flex items-center justify-between text-sm gap-2 py-2 px-[15px]">
        <button className="hover:underline flex" onClick={handleClearFilters}>
          {activeFilters ? content.clear : content.remove}
        </button>
        <button
          className="text-white bg-black p-2 px-4"
          onClick={toggleFilters}
        >
          {content.apply}
        </button>
      </div>
    </section>
  );
};

export default CollectionFilters;
