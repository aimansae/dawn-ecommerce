"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Logo from "../public/assets/images/logo.png";
import data from "../app/data/header.json";
import { FiUser } from "react-icons/fi";
import SearchInput from "./SearchInput";
import MobileNav from "./MobileNav";
import { useCart } from "@/app/context/CartContext";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState("");
  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const { getTotalQuantity } = useCart();
  const quantity = getTotalQuantity();
  return (
    <>
      <header
        className={`z-50 relative py-[14px] px-[30px] lg:px-[50px] border-t border-b border-gray-200 md:max-w-7xl md:mx-auto  ${""}`}
      >
        {query ? (
          setShowSearchBar && (
            <div className="">
              <SearchInput
                onClose={() => setShowSearchBar(false)}
                onSearch={setQuery}
              ></SearchInput>
            </div>
          )
        ) : (
          <p></p>
        )}
        <nav className="items-center grid grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_5fr_1fr]  ">
          <div className="lg:hidden flex items-center justify-start md:items-center  selection:">
            <button className=" " onClick={() => setIsMobile((prev) => !prev)}>
              <span>
                {isMobile ? (
                  <RiCloseLargeFill
                    size={26}
                    className="transition-transform transform hover:scale-110 duration-300"
                  />
                ) : (
                  <RxHamburgerMenu
                    size={26}
                    className="text-customBlack transition-transform transform hover:scale-110 duration-300 lg:hidden"
                  />
                )}
              </span>
            </button>
          </div>
          <div className="flex items-center   justify-center lg:justify-start lg:block  ">
            <h1 className="p-[7.5px]">
              <Link href="/">
                <Image
                  src={Logo}
                  alt={data.header.logo.alt}
                  width={data.header.logo.width}
                  height={data.header.logo.height}
                />
              </Link>
            </h1>
          </div>
          <div className="hidden lg:flex">
            <ul className="flex text-sm list-none px-[30px] items-start justify-between gap-6 z-10  ">
              {data.menuItems.map((item, i) => (
                <li key={i} className=" text-darkGray py-4">
                  <button className="flex gap-1 justify-center items-center">
                    <span className=""> {item.label}</span>
                    <span>
                      <IoIosArrowDown />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-end gap-6">
            <IoIosSearch
              onClick={handleShowSearchBar}
              size={26}
              className=" text-customBlack transition-transform transform hover:scale-110 duration-300"
            />
            <FiUser
              className="transition-transform transform hover:scale-110 duration-300 hidden md:block"
              size={26}
            />
            <Link href={"/cart"} className=" relative">
              <IoBagHandleOutline
                onClick={() => console.log("cart is clicked")}
                size={26}
                className=" transition-transform transform hover:scale-110 duration-300"
              />
            </Link>
            {quantity && (
              <span className="text-white right-7 bottom-4 absolute text-[9px] bg-black  px-1 rounded-full">
                {quantity}
              </span>
            )}
          </div>
        </nav>
      </header>

      {isMobile && <MobileNav />}
    </>
  );
};

export default Header;
