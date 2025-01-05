"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import data from "../app/data/header.json";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IconType } from "react-icons";
import SelectCountries from "./SelectCountries";

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
  const [currentLocation, setCurrentLocation] = useState<Location>({
    country: "Canada",
    currency: "US",
  });
  useState<string>("Canada");

  const handleCountyChange = (newLocation: Location) => {
    setCurrentLocation(newLocation);
    setShowLocations(false);
    console.log(newLocation);
  };

  const handleCountryDivClose = () => {
    setShowLocations(false);
    console.log("apply overlay");
  };

  return (
    <footer className="bg-lightGray text-lg flex flex-col justify-end items-start p-4 gap-6 z-50    ">
      <button className="flex gap-2 items-center">
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
          {" "}
          <span className="hover:underline">
            {currentLocation.country} | {currentLocation.currency}
          </span>
          <IoIosArrowDown className="transition-transform transform hover:scale-110 duration-300" />
        </button>
        {showLocations && (
          <SelectCountries
            onSelectCountry={handleCountyChange}
            onClose={() => handleCountryDivClose}
            currentlySelectedLocation={currentLocation.country}
          ></SelectCountries>
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
