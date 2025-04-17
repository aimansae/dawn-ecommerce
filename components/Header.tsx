/* eslint-disable indent */
"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Logo from "../public/assets/images/logo.png";
import data from "../app/data/header.json";
import { FiUser } from "react-icons/fi";
import MobileNav from "./MobileNav";
import { useCart } from "@/app/context/CartContext";
import products from "@/app/data/productList.json";
import { createSlugFromName } from "@/app/utils/functions";
import { FaArrowRight } from "react-icons/fa6";
import { link } from "../app/utils/functions";
import HeaderSearch from "./HeaderSearch";
import { useRouter, useSearchParams } from "next/navigation";
import ShippingBanner from "./ShippingBanner";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedLinkItem, setSelectedLinkItem] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const desktopCategoryRef = useRef<HTMLDivElement | null>(null);
  const { getTotalQuantity } = useCart();
  const quantity = getTotalQuantity() || 0;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopCategoryRef.current &&
        !desktopCategoryRef.current.contains(e.target as Node)
      ) {
        setSelectedLinkItem(null);
      }
    };

    if (selectedLinkItem) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedLinkItem]);

  useEffect(() => {
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, [searchParams]);

  const filterProductByQuery = products.products
    .filter(
      product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.some(category =>
          category.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        product.availableColors.some(
          colorOption =>
            colorOption.color
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            colorOption.colorCategory
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  const filteredSuggestions = data.header.suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleShowSearchBar = () => {
    setShowSearchBar(prev => !prev);
  };
  const handleItemClick = (label: string) => {
    setSelectedLinkItem(prev => (prev === label ? null : label));
  };

  const { handleCategoryClick } = useCollectionFilters();

  const handleGeneralSearch = (query: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      currentParams.set("query", query);
      router.push(
        `/collections?query=${encodeURIComponent(currentParams.toString())}`
      );
    }
    setShowSearchBar(false);
  };

  useEffect(() => {
    if (isMobile || showSearchBar) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, showSearchBar]);

  // calculate header height for dark overlay
  const [overLayTop, setOverLayTop] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateOverlayTop = () => {
      const bannerHeight = bannerRef.current?.offsetHeight || 0;
      const headerHeight = headerRef.current?.offsetHeight || 0;
      const queryHeight = queryRef.current ? queryRef.current.offsetHeight : 0;

      setOverLayTop(bannerHeight + headerHeight + queryHeight);
    };

    calculateOverlayTop();
    window.addEventListener("resize", calculateOverlayTop);
    return () => window.removeEventListener("resize", calculateOverlayTop);
  }, [showSearchBar, searchQuery]);

  return (
    <>
      <ShippingBanner bannerHeightRef={bannerRef} />
      <header
        ref={headerRef}
        className={`relative top-0 z-50 mx-auto w-full max-w-7xl border-b border-t border-gray-200 bg-white ${
          showSearchBar ? "px-2 py-2" : "px-7"
        }`}
      >
        {showSearchBar ? (
          <>
            <div
              onClick={() => setShowSearchBar(false)}
              className="fixed left-0 right-0 z-40 bg-black bg-opacity-50"
              style={{ top: `${overLayTop}px`, bottom: 0 }}
            ></div>
            <div className="relative">
              <HeaderSearch
                onClose={() => setShowSearchBar(false)}
                term={searchQuery}
                setTerm={setSearchQuery}
              />

              {searchQuery && (
                <div>
                  {filterProductByQuery.length === 0 ||
                  searchQuery.length === 0 ? (
                    <div
                      ref={queryRef}
                      className="flex items-center justify-between px-2"
                    >
                      <span className="">
                        Search for: &quot;{searchQuery}&quot;
                      </span>
                      <button
                        className="flex"
                        onClick={() => handleGeneralSearch(searchQuery)}
                      >
                        <FaArrowRight />
                      </button>
                    </div> //suggestions
                  ) : (
                    <div className="fixed left-0 z-50 h-2/3 w-full overflow-y-scroll bg-white md:absolute md:mx-auto md:h-auto md:overflow-y-auto md:pt-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {filteredSuggestions.length > 0 && (
                          <div className="flex flex-col">
                            <h1 className="border-b border-gray-200 px-[15px] py-2 text-[10px] uppercase text-darkGray">
                              Suggestions
                            </h1>
                            {filteredSuggestions.map((suggestion, i) => (
                              <ul key={i} className=" ">
                                <li className="w-full px-[15px] text-xs hover:bg-gray-100">
                                  <Link
                                    href={{
                                      pathname: "/collections",
                                      query: {
                                        ...Object.fromEntries(
                                          searchParams.entries()
                                        ), // existing filters
                                        query: suggestion, // new query
                                      },
                                    }}
                                    className="flex gap-2 py-[10px] hover:underline"
                                    onClick={() => setShowSearchBar(false)}
                                  >
                                    {suggestion}
                                  </Link>
                                </li>
                              </ul>
                            ))}
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <h1 className="border-b border-gray-200 px-[15px] py-2 text-[10px] uppercase text-darkGray">
                            Products
                          </h1>
                          {filterProductByQuery.map(product => {
                            const matchingColor = product.availableColors.find(
                              colorOption =>
                                colorOption.color
                                  .toLowerCase()
                                  .includes(searchQuery.trim()) ||
                                colorOption.colorCategory
                                  .toLowerCase()
                                  .includes(searchQuery.trim())
                            );
                            const colorImage = matchingColor
                              ? matchingColor.imageUrl[0]
                              : product.availableColors[0].imageUrl[0];

                            return (
                              <ul key={product.id} className="py-4">
                                <li className="w-full px-[15px] text-xs hover:bg-gray-100">
                                  <Link
                                    href={`/product/${createSlugFromName(
                                      product.name
                                    )}`}
                                    className="flex items-center gap-2 capitalize hover:underline"
                                    onClick={() => setShowSearchBar(false)}
                                  >
                                    <Image
                                      src={colorImage}
                                      alt={product.name}
                                      width={50}
                                      height={40}
                                      className="object-fit"
                                    />
                                    <h4 className="mt-2 text-[12px] text-customBlack">
                                      {product.name}
                                    </h4>
                                  </Link>
                                </li>
                              </ul>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <nav className="grid grid-cols-[1fr_2fr_1fr] items-center py-4 lg:grid-cols-[1fr_5fr_1fr]">
            <div className="flex items-center justify-start lg:hidden">
              <button onClick={() => setIsMobile(prev => !prev)}>
                {isMobile ? (
                  <IoCloseOutline
                    size={30}
                    className="transform transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <RxHamburgerMenu
                    size={26}
                    className="transform text-customBlack transition-transform duration-300 hover:scale-110 lg:hidden"
                  />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center lg:block lg:justify-start">
              <h1 className="p-[7.5px]">
                <Link href={link.home}>
                  <Image
                    src={Logo}
                    alt={data.header.logo.alt}
                    width={data.header.logo.width}
                    height={data.header.logo.height}
                    quality={100}
                  />
                </Link>
              </h1>
            </div>
            {/*desktop mav*/}
            <div className="hidden lg:flex">
              <ul className="z-10 flex list-none items-start justify-between gap-6 text-sm">
                {data.menuItems.map((item, i) => (
                  <li key={i} className="flex items-center py-4 text-darkGray">
                    <button
                      onClick={() => handleItemClick(item.label)}
                      className={`flex items-center justify-center gap-1 hover:underline ${
                        selectedLinkItem === item.label
                          ? "relative underline"
                          : ""
                      }`}
                    >
                      <span className="capitalize">{item.label}</span>
                      <span>
                        <IoIosArrowDown
                          size={15}
                          className={`transition-transform duration-300 ${
                            selectedLinkItem === item.label
                              ? "rotate-180"
                              : "rotate-0"
                          } `}
                        />
                      </span>
                    </button>

                    {selectedLinkItem === item.label && (
                      <div
                        ref={desktopCategoryRef}
                        className="absolute top-[60px] z-50 mt-2 w-1/5 border border-darkGray border-gray-200 bg-white p-4"
                      >
                        <ul className="flex flex-col gap-2 text-sm capitalize text-darkGray">
                          {item.options?.map((option, j) => (
                            <li key={j} className="p-1 hover:cursor-pointer">
                              <Link
                                className="hover:underline"
                                onClick={() => handleCategoryClick(option.href)}
                                href={`/collections/${option.href.replace(" ", "_")}`}
                              >
                                {option.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end gap-3 md:gap-6">
              <AiOutlineSearch
                onClick={handleShowSearchBar}
                size={26}
                className="transform text-customBlack transition-transform duration-300 hover:scale-110"
              />
              <FiUser
                className="hidden transform transition-transform duration-300 hover:scale-110 md:block"
                size={26}
              />
              <Link href={link.cart} className="relative">
                <IoBagHandleOutline
                  size={26}
                  className="transform transition-transform duration-300 hover:scale-110"
                />
                {quantity > 0 && (
                  <span className="absolute bottom-0 right-0 rounded-full bg-black px-1 text-[9px] text-white">
                    {quantity}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        )}
      </header>
      {isMobile && (
        <>
          <div
            onClick={() => setIsMobile(false)}
            className="fixed bottom-0 left-0 right-0 z-30 bg-black bg-opacity-60 lg:hidden"
            style={{ top: `${overLayTop}px` }}
          />
          <MobileNav
            topOffset={overLayTop}
            onClose={() => setIsMobile(false)}
          />
        </>
      )}
    </>
  );
};

export default Header;
