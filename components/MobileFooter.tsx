"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import data from "../app/data/header.json";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IconType } from "react-icons";
import SelectCountries from "./SelectCountries";
import { useCountry } from "@/app/context/CountryContext";

const iconMap: { [jey: string]: IconType } = {
  FaFacebook: FaFacebook,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaYoutube: FaYoutube,
};

type SocialLink = {
  platform: string;
  link: string;
  icon: keyof typeof iconMap;
};
export type Location = {
  country: string;
  currency: string;
  currencySymbol?: string;
  language?: string;
};

const MobileFooter = () => {
  const [showLocations, setShowLocations] = useState(false);
  const { selectedLocation, setSelectedLocation } = useCountry();

  const handleCountryChange = (newLocation: Location) => {
    console.log(newLocation, "CHange of location");

    setSelectedLocation(newLocation);
    setShowLocations(false);
  };

  return (
    <footer className="fixed w-full md:w-2/4 bottom-0 bg-lightGray text-lg flex flex-col  gap-6 items-start z-50 p-[30px]     ">
      <button className="flex gap-2 w-full ">
        <FiUser
          className="transition-transform transform hover:scale-110 duration-300"
          size={26}
        />
        <Link href={data.footer.userSection.login.href}>
          <span className="text-sm">{data.footer.userSection.login.label}</span>
        </Link>
      </button>
      <div>
        <button
          className="flex gap-2 items-center justify-center text-sm"
          onClick={() => setShowLocations(!showLocations)}
        >
          <span className="hover:underline">
            {selectedLocation.country} | {selectedLocation.currency}
          </span>
          <IoIosArrowDown className="transition-transform transform hover:scale-110 duration-300" />
        </button>
        {showLocations && (
          <>
            <div
              className="fixed top-[85px] md:top-[106px] left-0 md:left-1/2 right-0 bottom-0  bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => {
                setShowLocations(false);
              }}
            ></div>

            <div className="fixed w-full p-[15px]    left-0   bottom-0 md:bottom-24 md:left-5  bg-white z-50 md:w-auto h-3/4  md:h-2/5 overflow-y-auto md:border">
              <SelectCountries
                onSelectCountry={handleCountryChange}
                onClose={() => setShowLocations(false)}
                currentlySelectedLocation={selectedLocation.country}
              />
            </div>
          </>
        )}
      </div>
      <ul className="flex  items-center justify-between gap-6">
        {data.footer.socialLinks.map((item: SocialLink, index: number) => {
          const Icon = iconMap[item.icon];
          console.log(Icon);
          return (
            <li key={index}>
              <Link href={item.link} target="_blank">
                <Icon
                  className="transition-transform transform hover:scale-110 duration-300"
                  size={20}
                ></Icon>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default MobileFooter;
