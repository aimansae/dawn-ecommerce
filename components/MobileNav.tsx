import React from "react";
import data from "../app/data/header.json";
import { FaArrowRightLong } from "react-icons/fa6";
import MobileFooter from "./MobileFooter";

const MobileNav = () => {
  return (
    <div className="fixed left-0 w-full h-screen md:w-2/4 bg-yellow-400 z-50 flex flex-col  ">
      <ul className="flex flex-col py-8 text-lg list-none items-start bg-red-400 ">
        {data.menuItems.map((item, i) => (
          <li
            key={i}
            className="hover:bg-lightGray px-5 w-full flex justify-between items-center py-2"
          >
            <button>
              <span>{item.label}</span>
            </button>
            <span>
              <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
            </span>
          </li>
        ))}
      </ul>

      <MobileFooter />
    </div>
  );
};

export default MobileNav;
