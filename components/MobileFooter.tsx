"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import data from "../app/data/header.json";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IconType } from "react-icons";

type Location = {
  country: string;
  currency: string;
  language: string;
};
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

const Footer = () => {
  const [showLocations, setShowLocations] = useState(false);

  const sortLocations = (locations: Location[]) => {
    return locations.sort((a, b) => {
      if (a.country < b.country) {
        return -1;
      } else return 2;
    });
  };
  const sortedLocations = sortLocations(data.footer.locations);

  return (
    <footer className="bg-gray-200 text-lg flex flex-col p-[30px] gap-4 justify-evenly items-start">
      <button className="flex gap-2 items-center">
        <FiUser className="transition-transform transform hover:scale-110 duration-300" />
        <Link href={data.footer.userSection.login.href}>
          <span className="text-sm">{data.footer.userSection.login.label}</span>
        </Link>
      </button>
      <div className="div">
        <button
          className="flex gap-2 items-center justify-center text-sm"
          onClick={() => setShowLocations(!showLocations)}
        >
          <span>Canada | US</span>
          <span className="text-sm">
            <IoIosArrowDown className="transition-transform transform hover:scale-110 duration-300" />
          </span>{" "}
        </button>

        {showLocations && (
          <div className="bg-purple-300">
            {sortedLocations.map((location, index) => (
              <div key={index}>
                <span className="text-sm">
                  {" "}
                  {location.country} | {location.currency}
                </span>
              </div>
            ))}
          </div>
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
                  size={26}
                ></Icon>
              </Link>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
