"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCountry } from "@/app/context/CountryContext";
import { transformProduct } from "@/app/utils/transformProduct";
import {
  createSlugFromName,
  convertPriceToCurrency,
} from "@/app/utils/functions";
import { PiSlidersHorizontalThin } from "react-icons/pi";
import content from "../app/data/filter.json";
import { IoIosArrowDown } from "react-icons/io";
import CollectionFilters from "./CollectionFilters";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ProductType } from "@/app/types/types";
import productsData from "../app/data/productList.json";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Collections = () => {
  const { selectedLocation } = useCountry();
  const allProducts = productsData.products.map(transformProduct);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // for navigation
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  //for pagination
  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentURLPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(currentURLPage);
  useEffect(() => {
    if (currentURLPage !== currentPage) {
      setCurrentPage(currentURLPage);
    }
  }, [searchParams]);

  //
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);

      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      const newUrl = `${pathName}?${params.toString().toLowerCase()}`;

      router.push(newUrl);

      console.log("UPDATE", newUrl);
    }
  };

  // disable scrollbar if filters are open
  useEffect(() => {
    if (showFilters) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [showFilters]);
  // get the params
  console.log("logging searchparams", searchParams.toString());
  useEffect(() => {
    const getFiltersFromURL = () => {
      const inStock = searchParams.get("instock");
      const outOfStock = searchParams.get("outofstock");
      const colors = searchParams.get("colors")
        ? searchParams.get("colors")!.split(",")
        : [];

      return {
        availability: {
          inStock,
          outOfStock,
        },
        colors,
      };
    };

    const filters = getFiltersFromURL();
    let filtered = [...allProducts];

    if (filters.availability.inStock || filters.availability.outOfStock) {
      filtered = filtered.filter((product) =>
        filters.availability.inStock &&
        product.status?.toLowerCase() === "in stock"
          ? true
          : filters.availability.outOfStock &&
            product.status?.toLowerCase() === "out of stock"
          ? true
          : false
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) =>
        product.availableColors.some((color) =>
          filters.colors.includes(color.colorCategory)
        )
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset pagination when filters change
  }, [searchParams]);

  // calculate total pages total products/productsPerPage
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  return (
    <section className="lg:max-w-6xl bg-white mx-auto px-[25px] md:px-[50px] ">
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300 md:hidden"
          onClick={() => setShowFilters(false)}
        ></div>
      )}
      <h1 className="text-[30px] sm:text-[40px] my-[25px]">{content.title}</h1>

      {/*Show all the applied Filters*/}
      <aside className="py-3 flex text-darkGray items-center justify-between  ">
        <button className="flex gap-1 items-center md:hidden hover:underline">
          <PiSlidersHorizontalThin
            onClick={() => setShowFilters((prev) => !prev)}
          />
          <h2 className="text-[15px]">{content.titleSmallDevices}</h2>{" "}
        </button>

        <div className="hidden md:flex items-center   capitalize ">
          <div className="flex gap-6">
            <h2 className="text-[15px]">{content.titleMediumDevices}:</h2>
            <button className="flex items-center  gap-2">
              <span className="hover:underline capitalize">
                {content.filterBy[0].name}{" "}
              </span>
              <span>
                <IoIosArrowDown />
              </span>
            </button>
            <button className="flex items-center  gap-2">
              <span className="hover:underline capitalize">
                {content.filterBy[1].name}{" "}
              </span>
              <span>
                <IoIosArrowDown />
              </span>
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center  ">
          <div className="flex gap-4">
            Sort by:
            <div>Alphabetically A-Z</div>
          </div>
        </div>
        <div className="d">
          <span className="text-sm">
            {allProducts.length} {content.products}
          </span>
        </div>
      </aside>

      {showFilters && (
        <CollectionFilters
          toggleFilters={() => setShowFilters(false)}
        ></CollectionFilters>
      )}

      {/*Products*/}
      <div className=" grid grid-cols-2 lg:grid-cols-4  gap-2">
        {currentProducts.map((product) => {
          return (
            <Link
              href={`product/${createSlugFromName(product.name)}`}
              key={product.id}
              className="group  flex flex-col "
            >
              <div className="w-full relative aspect-square">
                <Image
                  src={product.availableColors[0].imageUrl[0]}
                  alt={`${product.name}`}
                  quality={75}
                  fill
                  className="w-full h-full top-0 left-0 object-cover"
                  sizes="(max-width:375px)100vw,(max-width:560px)80vw, (max-width:768px) 60vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-2 my-2">
                <span className="text-darkGray text-sm md:text-base truncate sm:text-[13px] group-hover:underline">
                  {product.name}
                </span>
                <span className="text-sm  md:text-base">
                  {selectedLocation.currencySymbol}{" "}
                  {convertPriceToCurrency(Number(product.prices.regular))}{" "}
                  {selectedLocation.currency}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      {/*Pagination*/}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage > 1 && (
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            )}
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={
                  currentPage === index + 1
                    ? "font-bold underline text-primary"
                    : ""
                }
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            {currentPage !== totalPages && (
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Collections;
