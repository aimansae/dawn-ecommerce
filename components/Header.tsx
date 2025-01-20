"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
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

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState("");

  const filterProductByQuery = products.products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
  const filteredSuggestions = data.header.suggestions.filter((suggestion) =>
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
    setShowSearchBar((prev) => !prev);
  };
  const [selectedLinkItem, setSelectedLinkItem] = useState<string | null>(null);
  const handleItemClick = (label: string) => {
    console.log("item clicked in header", selectedLinkItem?.toLowerCase());
    setSelectedLinkItem((prev) => (prev === label ? null : label));
  };
  const { getTotalQuantity } = useCart();
  const quantity = getTotalQuantity() || 0;
  console.log("logging query", query.length);
  return (
    <>
      <header
        className={`z-50 py-[14px] lg:px-[50px] sticky lg:relative bg-white top-0 border-t border-b border-gray-200 md:max-w-6xl md:mx-auto ${
          showSearchBar ? "px-[15px] py-2" : "px-[30px]"
        }`}
      >
        {showSearchBar ? (
          <div className="relative">
            <SearchInput
              onClose={() => setShowSearchBar(false)}
              onSearch={setQuery}
            />
            {query && (
              <div>
                {filterProductByQuery.length === 0 ? (
                  <div className="px-2 flex items-center justify-between">
                    <span className="py-2">
                      Search for: &quot;{query}&quot;
                    </span>
                    <button className="flex">
                      <Link href="">
                        <FaArrowRight />
                      </Link>
                    </button>
                  </div> //suggestions
                ) : (
                  <div className="fixed left-0    bg-white z-50 h-2/3 md:h-auto w-full md:absolute md:mx-auto md:pt-4   overflow-y-scroll md:overflow-y-auto">
                    <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
                      {filteredSuggestions.length > 0 && (
                        <div className="flex flex-col ">
                          <h1 className="py-2 text-darkGray uppercase  text-[10px] px-[15px]  border-b border-gray-200">
                            Suggestions
                          </h1>
                          {filteredSuggestions.map((suggestion, i) => (
                            <ul key={i} className=" ">
                              <li className="text-xs px-[15px] hover:bg-gray-100 w-full ">
                                <Link
                                  href={link.bags}
                                  className="flex py-[10px]  gap-2 hover:underline"
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
                        <h1 className="py-2 text-darkGray uppercase  text-[10px] px-[15px]  border-b border-gray-200">
                          Products
                        </h1>
                        {filterProductByQuery.map((product) => (
                          <ul key={product.id} className="py-4">
                            <li className="text-xs px-[15px] hover:bg-gray-100 w-full ">
                              <Link
                                href={`/product/${createSlugFromName(
                                  product.name
                                )}`}
                                className="flex items-center gap-2 hover:underline"
                                onClick={() => setShowSearchBar(false)}
                              >
                                <Image
                                  src={product.availableColors[0].imageUrl[0]}
                                  alt={product.name}
                                  width={50}
                                  height={40}
                                  className="object-fit"
                                />
                                <h4 className="mt-2 text-customBlack text-[12px]">
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
          <nav className="items-center grid grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_5fr_1fr]">
            <div className="lg:hidden flex items-center justify-start">
              <button onClick={() => setIsMobile((prev) => !prev)}>
                {isMobile ? (
                  <IoCloseOutline
                    size={30}
                    className="transition-transform transform hover:scale-110 duration-300"
                  />
                ) : (
                  <RxHamburgerMenu
                    size={26}
                    className="text-customBlack transition-transform transform hover:scale-110 duration-300 lg:hidden"
                  />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start lg:block">
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
              <ul className=" flex text-sm list-none items-start justify-between gap-6 z-10">
                {data.menuItems.map((item, i) => (
                  <li key={i} className="text-darkGray py-4">
                    <button
                      onClick={() => handleItemClick(item.label)}
                      className={`  hover:underline flex gap-1 justify-center items-center ${
                        selectedLinkItem === item.label
                          ? "underline relative"
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
                      <div className="bg-gray-100 absolute top-[60px] mt-2 p-4 w-1/5">
                        <ul className="capitalize text-darkGray text-sm flex flex-col gap-2">
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

              {/*so options*/}
            </div>
            <div className="flex items-center justify-end gap-6">
              <AiOutlineSearch
                onClick={handleShowSearchBar}
                size={26}
                className="text-customBlack transition-transform transform hover:scale-110 duration-300"
              />
              <FiUser
                className="transition-transform transform hover:scale-110 duration-300 hidden md:block"
                size={26}
              />
              <Link href={link.cart} className="relative">
                <IoBagHandleOutline
                  size={26}
                  className="transition-transform transform hover:scale-110 duration-300"
                />
                {quantity > 0 && (
                  <span className="absolute right-0 bottom-0 text-white bg-black px-1 text-[9px] rounded-full">
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
            className="fixed top-16 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 lg:hidden"
          ></div>
          <MobileNav />
        </>
      )}
    </>
  );
};

export default Header;
