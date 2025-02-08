"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Logo from "../public/assets/images/logo.png";
import data from "../app/data/header.json";
import { FiUser } from "react-icons/fi";
import SearchInput from "./SearchInput";
import MobileNav from "./MobileNav";
import { useCart } from "@/app/context/CartContext";
import products from "@/app/data/productList.json";
import { createSlugFromName } from "@/app/utils/functions";
import { FaArrowRight } from "react-icons/fa6";
import { link } from "../app/utils/functions";
import HeaderSearch from "./HeaderSearch";
import { useRouter, useSearchParams } from "next/navigation";
import ShippingBanner from "./ShippingBanner";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedLinkItem, setSelectedLinkItem] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  console.log("query is", query);
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]);

  const filterProductByQuery = products.products
    .filter(
      product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.some(category =>
          category.toLowerCase().includes(query.toLowerCase())
        )
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
  const filteredSuggestions = data.header.suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isMobile || showSearchBar) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }
  });

  const handleShowSearchBar = () => {
    setShowSearchBar(prev => !prev);
  };
  const handleItemClick = (label: string) => {
    console.log("item clicked in header", selectedLinkItem?.toLowerCase());
    setSelectedLinkItem(prev => (prev === label ? null : label));
  };
  const { getTotalQuantity } = useCart();
  const quantity = getTotalQuantity() || 0;
  console.log(
    "logging query",
    query.length,
    "productLength",
    filterProductByQuery.length
  );

  const handleGeneralSearch = (query: string) => {
    console.log(query, "general");
    if (query.trim().toLowerCase()) {
      router.push(`/?query=${encodeURIComponent(query.toString())}`);
    }
    setShowSearchBar(false);
  };

  return (
    <>
      <ShippingBanner />
      <header
        className={`top-0 z-50 border-b border-t border-gray-200 bg-white py-[14px] md:mx-auto md:max-w-6xl lg:relative lg:px-[50px] ${
          showSearchBar ? "px-[15px] py-2" : "px-[30px]"
        }`}
      >
        {showSearchBar ? (
          <div className="relative">
            <HeaderSearch
              onClose={() => setShowSearchBar(false)}
              term={query}
              setTerm={setQuery}
            />
            {query && (
              <div>
                {filterProductByQuery.length === 0 || query.length === 0 ? (
                  <div className="flex items-center justify-between px-2">
                    <span className="py-2">
                      Search for: &quot;{query}&quot;
                    </span>
                    <button
                      className="flex"
                      onClick={() => handleGeneralSearch(query)}
                    >
                      <Link href="">
                        <FaArrowRight />
                      </Link>
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
                                  href={`/?query=${suggestion}`}
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
                        {filterProductByQuery.map(product => (
                          <ul key={product.id} className="bg-yellow py-4">
                            <li className="w-full px-[15px] text-xs hover:bg-gray-100">
                              <Link
                                href={`/product/${createSlugFromName(
                                  product.name
                                )}`}
                                className="flex items-center gap-2 capitalize hover:underline"
                                onClick={() => setShowSearchBar(false)}
                              >
                                <Image
                                  src={product.availableColors[0].imageUrl[0]}
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
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <nav className="grid grid-cols-[1fr_2fr_1fr] items-center lg:grid-cols-[1fr_5fr_1fr]">
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
            <div className="hidden lg:flex">
              <ul className="z-10 flex list-none items-start justify-between gap-6 text-sm">
                {data.menuItems.map((item, i) => (
                  <li key={i} className="py-4 text-darkGray">
                    <button
                      onClick={() => handleItemClick(item.label)}
                      className={`flex items-center justify-center gap-1 hover:underline ${
                        selectedLinkItem === item.label
                          ? "relative underline"
                          : ""
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>
                        <IoIosArrowDown
                          className={`transition-transform duration-300 ${
                            selectedLinkItem === item.label
                              ? "rotate-180"
                              : "rotate-0"
                          } `}
                        />
                      </span>
                    </button>
                    {selectedLinkItem === item.label && (
                      <div className="absolute top-[60px] mt-2 w-1/5 bg-gray-100 p-4">
                        <ul className="flex flex-col gap-2 text-sm capitalize text-darkGray">
                          {item.options?.map((option, j) => (
                            <li key={j} className="hover:underline">
                              {option.label}
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
            className="fixed bottom-0 left-0 right-0 top-[107px] z-40 bg-black bg-opacity-50 lg:hidden"
          />
          <MobileNav />
        </>
      )}
    </>
  );
};

export default Header;
