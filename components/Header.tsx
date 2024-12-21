"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { PiShoppingBag } from "react-icons/pi";
import { RiCloseLargeFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Logo from "../public/assets/images/logo.png";
import data from "../app/data/header.json";
import MobileFooter from "./MobileFooter";
import { FiUser } from "react-icons/fi";
import SearchInput from "./SearchInput";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState("");
  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <header
        className={`z-50 relative py-[12px] px-[30px] border-t border-b border-gray-200 md:max-w-7xl md:mx-auto  ${""}`}
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
        <nav className="items-center grid grid-cols-[1fr_2fr_1fr] ">
          <div className="md:hidden flex items-center justify-start md:items-center md:justify-center">
            <button
              className="md:hidden"
              onClick={() => setIsMobile((prev) => !prev)}
            >
              <span>
                {isMobile ? (
                  <RiCloseLargeFill
                    size={26}
                    className="transition-transform transform hover:scale-110 duration-300"
                  />
                ) : (
                  <RxHamburgerMenu
                    size={26}
                    className="text-customBlack transition-transform transform hover:scale-110 duration-300 md:hidden"
                  />
                )}
              </span>
            </button>
          </div>
          <div className="flex items-center justify-center">
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
          <div className="hidden md:flex">
            <ul className=" flex text-lg list-none px-[30px] items-center justify-between gap-6 z-10  ">
              {data.menuItems.map((item, i) => (
                <li key={i} className=" text-gray-600 py-4">
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
          <div className="flex items-center justify-end md:justify-start gap-6">
            <IoIosSearch
              onClick={handleShowSearchBar}
              size={26}
              className=" text-customBlack transition-transform transform hover:scale-110 duration-300"
            />
            <FiUser
              className="transition-transform transform hover:scale-110 duration-300 hidden md:block"
              size={26}
            />
            <PiShoppingBag
              size={26}
              className="transition-transform transform hover:scale-110 duration-300"
            />
          </div>
        </nav>

        {isMobile && (
          <>
            {/* Mobile Menu */}
            <div
              className={
                "absolute left-0 top-full w-full h-[calc(100vh)] md:w-2/4 grid grid-rows-[2fr_1fr] bg-white"
              }
            >
              <ul className="flex flex-col py-12 text-lg list-none px-[30px] items-start  z-10  ">
                {data.menuItems.map((item, i) => (
                  <li
                    key={i}
                    className=" hover:bg-gray-200 w-full flex justify-between items-center py-4"
                  >
                    <button>
                      <span className="italic"> {item.label}</span>
                    </button>
                    <span>
                      <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300" />
                    </span>
                  </li>
                ))}
              </ul>
              <MobileFooter />
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
