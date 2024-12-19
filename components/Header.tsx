"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { PiShoppingBag } from "react-icons/pi";
import { RiCloseLargeFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import Image from "next/image";
import Logo from "../public/assets/images/logo.png";
import data from "../app/data/header.json";
import Footer from "./MobileFooter";
import MobileFooter from "./MobileFooter";

const Header = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <header className="z-50 relative py-[10px] px-[30px] border-b border-gray-200 ">
      <nav className="items-center grid grid-cols-[1fr_2fr_1fr]">
        <div className="flex items-center justify-start">
          <button onClick={() => setIsMobile((prev) => !prev)}>
            <span>
              {isMobile ? (
                <RiCloseLargeFill
                  size={26}
                  className="transition-transform transform hover:scale-110 duration-300"
                />
              ) : (
                <RxHamburgerMenu
                  size={26}
                  className="transition-transform transform hover:scale-110 duration-300"
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
        <div className="flex items-center justify-end gap-6">
          <IoIosSearch
            size={26}
            className="transition-transform transform hover:scale-110 duration-300"
          />
          <IoIosSearch size={26} className="hidden md:block" />
          <PiShoppingBag
            size={26}
            className="transition-transform transform hover:scale-110 duration-300"
          />
        </div>
      </nav>

      {isMobile && (
        <>
          {/* Mobile Menu */}
          <div className="absolute left-0 top-full w-full h-[calc(100vh)] md:w-2/4 grid grid-rows-[2fr_1fr] bg-white z-50">
            <ul className="flex flex-col py-12 text-lg list-none px-[30px] items-start justify-evenly  bg-yellow-400 ">
              {data.menuItems.map((item, i) => (
                <button
                  key={i}
                  className="w-full flex justify-between items-center"
                >
                  <li>{item.label}</li>
                  <span>
                    <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300" />
                  </span>
                </button>
              ))}
            </ul>
            <MobileFooter />
          </div>
        </>
      )}

      {isMobile && (
        <div
          className="fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-black bg-opacity-60 z-40"
          onClick={() => setIsMobile((prev) => !prev)}
        ></div>
      )}
    </header>
  );
};

export default Header;