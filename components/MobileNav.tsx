"use client";

import React, { useState } from "react";
import data from "../app/data/header.json";
import { FaArrowRightLong } from "react-icons/fa6";
import MobileFooter from "./MobileFooter";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";

type MobileProps = {
  onClose: () => void;
};
const MobileNav = ({ onClose }: MobileProps) => {
  const [selectedLinkItem, setSelectedLinkItem] = useState<string | null>(null);
  const handleItemClick = (label: string) => {
    setSelectedLinkItem(label);
  };

  const { handleCategoryClick } = useCollectionFilters();

  return (
    <div className="grid-rows-2-[1fr_auto] fixed left-0 z-50 grid h-full w-full bg-white md:w-2/4 lg:hidden">
      <div className="flex w-full list-none flex-col text-lg">
        {data.menuItems.map((item, i) => (
          <div key={i} className="w-full">
            {selectedLinkItem === item.label ? (
              <div className="">
                <button
                  onClick={() => setSelectedLinkItem(null)}
                  className="flex w-full items-center gap-1 bg-lightGray px-[30px] py-3"
                >
                  <IoIosArrowRoundBack
                    size={30}
                    className="transform font-thin capitalize text-customBlack transition-transform duration-300 hover:scale-110"
                  />
                  <span className="capitalize"> {item.label}</span>
                </button>
                {/* Scrollable Options List */}
                <ul className="flex max-h-[200px] w-full flex-col overflow-y-auto md:h-full md:overflow-y-hidden">
                  {item.options?.map((option, j) => (
                    <li
                      key={j}
                      className="flex w-full items-center justify-between px-[30px] py-3 hover:bg-lightGray"
                    >
                      <button
                        onClick={() => {
                          handleCategoryClick(option.href);
                          onClose();
                        }}
                        className="flex w-full items-center justify-between"
                      >
                        <span className="capitalize">{option.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : selectedLinkItem !== "bags" && selectedLinkItem !== "shoes" ? (
              <ul className="flex w-full flex-col">
                <li className="flex w-full items-center justify-between px-[30px] py-4 hover:bg-lightGray">
                  <button
                    onClick={() => handleItemClick(item.label)}
                    className="flex w-full items-center justify-between"
                  >
                    <span className="capitalize">{item.label}</span>
                    <FaArrowRightLong className="transform font-thin text-customBlack transition-transform duration-300 hover:scale-110" />
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
