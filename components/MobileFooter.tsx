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
    <footer className="fixed bottom-0 z-50 flex w-full flex-col items-start gap-6 bg-lightGray p-[30px] text-lg md:w-2/4">
      <button className="flex w-full gap-2">
        <FiUser
          className="transform transition-transform duration-300 hover:scale-110"
          size={26}
        />
        <Link href={data.footer.userSection.login.href}>
          <span className="text-sm">{data.footer.userSection.login.label}</span>
        </Link>
      </button>
      <div>
        <button
          className="flex items-center justify-center gap-2 text-sm"
          onClick={() => setShowLocations(!showLocations)}
        >
          <span className="hover:underline">
            {selectedLocation.country} | {selectedLocation.currency}
          </span>
          <IoIosArrowDown className="transform transition-transform duration-300 hover:scale-110" />
        </button>
        {showLocations && (
          <>
            <div
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black bg-opacity-50 md:left-1/2 md:top-[104px] lg:hidden"
              onClick={() => {
                setShowLocations(false);
              }}
            ></div>

            <div className="fixed bottom-0 left-0 z-50 h-3/4 w-full overflow-y-auto bg-white p-[15px] md:bottom-24 md:left-5 md:h-2/5 md:w-auto md:border">
              <SelectCountries
                onSelectCountry={handleCountryChange}
                onClose={() => setShowLocations(false)}
                currentlySelectedLocation={selectedLocation.country}
              />
            </div>
          </>
        )}
      </div>
      <ul className="flex items-center justify-between gap-6">
        {data.footer.socialLinks.map((item: SocialLink, index: number) => {
          const Icon = iconMap[item.icon];
          console.log(Icon);
          return (
            <li key={index}>
              <Link href={item.link} target="_blank">
                <Icon
                  className="transform transition-transform duration-300 hover:scale-110"
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
