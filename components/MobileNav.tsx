import React, { useState } from "react";
import data from "../app/data/header.json";
import { FaArrowRightLong } from "react-icons/fa6";
import MobileFooter from "./MobileFooter";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const MobileNav = () => {
  const [selectedLinkItem, setSelectedLinkItem] = useState<string | null>(null);

  const handleItemClick = (label: string) => {
    console.log("BGSSSSSSS", selectedLinkItem?.toLowerCase());
    setSelectedLinkItem(label);
  };
  return (
    <div className="fixed bg-white left-0 w-full md:w-2/4 z-50 grid grid-rows-2-[1fr_auto] h-full  lg:hidden">
      <div className="flex flex-col text-lg list-none  w-full ">
        {data.menuItems.map((item, i) => (
          <div key={i} className=" w-full ">
            {selectedLinkItem === item.label ? (
              <div className="">
                <button
                  onClick={() => setSelectedLinkItem(null)}
                  className="px-[30px] w-full py-4 bg-lightGray  flex items-center gap-1"
                >
                  <IoIosArrowRoundBack
                    size={30}
                    className="capitalize transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin"
                  />
                  <span className="capitalize "> {item.label}</span>
                </button>
                <ul className="flex flex-col w-full">
                  {item.options?.map((option, j) => (
                    <li
                      key={j}
                      className="px-[30px]  hover:bg-lightGray w-full flex justify-between items-center py-4"
                    >
                      <Link
                        onClick={() => handleItemClick(option.label)}
                        className="flex w-full items-center justify-between"
                        href={option.href}
                      >
                        <span className="capitalize">{option.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : selectedLinkItem !== "bags" && selectedLinkItem !== "shoes" ? (
              <ul className="flex flex-col w-full  ">
                <li className="px-[30px] hover:bg-lightGray  w-full flex justify-between items-center py-4">
                  <button
                    onClick={() => handleItemClick(item.label)}
                    className="flex w-full items-center justify-between"
                  >
                    <span className="capitalize">{item.label}</span>
                    <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <MobileFooter />
    </div>
  );
};

export default MobileNav;
