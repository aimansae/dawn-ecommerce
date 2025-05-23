/* eslint-disable indent */
"use client";
import React, { useState } from "react";
import data from "../app/data/header.json";
import { FaArrowRightLong } from "react-icons/fa6";
import MobileFooter from "./MobileFooter";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import Link from "next/link";

type MobileProps = {
  onClose: () => void;
  topOffset: number;
};

const MobileNav = ({ onClose, topOffset }: MobileProps) => {
  const [selectedLinkItem, setSelectedLinkItem] = useState<string | null>(null);
  const handleItemClick = (label: string) => {
    setSelectedLinkItem(label);
  };
  const { handleCategoryClick } = useCollectionFilters();

  return (
    <div
      style={{ top: `${topOffset}px` }}
      className={`grid-rows-2-[1fr_auto] absolute z-50 grid h-screen w-full overflow-y-auto bg-white md:w-2/4 lg:hidden`}
    >
      <div className="flex w-full list-none flex-col sm:text-lg">
        {data.menuItems.map((item, i) => (
          <div key={i} className="w-full">
            {selectedLinkItem === item.label ? (
              <div>
                <button
                  onClick={() => setSelectedLinkItem(null)}
                  className="flex w-full items-center gap-1 bg-lightGray px-[30px] py-3"
                >
                  <IoIosArrowRoundBack
                    size={30}
                    className="transform font-thin capitalize text-customBlack transition-transform duration-300 hover:scale-110"
                  />
                  <span className="capitalize">{item.label}</span>
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
            ) : (
              <ul className="flex w-full flex-col capitalize">
                <li className="flex w-full items-center justify-between px-[30px] py-4 hover:bg-lightGray">
                  {i === 2 ? (
                    <Link
                      href={item.href}
                      onClick={() => {
                        onClose();
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleItemClick(item.label)}
                      className="flex w-full items-center justify-between"
                    >
                      <span className="capitalize">{item.label}</span>

                      <FaArrowRightLong className="transform font-thin text-customBlack transition-transform duration-300 hover:scale-110" />
                    </button>
                  )}
                </li>
              </ul>
            )}
          </div>
        ))}
      </div>
      <MobileFooter />
    </div>
  );
};

export default MobileNav;
