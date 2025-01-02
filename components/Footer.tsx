"use client";

import React, { useState } from "react";
import data from "../app/data/footer.json";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { FaArrowRightLong } from "react-icons/fa6";
import SelectCountries from "./SelectCountries";
import { IoIosArrowDown } from "react-icons/io";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";

export type Location = {
  country: string;
  currency: string;
  language?: string;
};

const Footer = () => {
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
    <footer className=" px-[30px] md:px-[50px] items-center  grid grid-cols-1 mt-16  xs:gap-8 sm:gap-0 lg:max-w-7xl mx-auto w-full">
      <div className="  flex flex-col md:flex-row justify-between gap-6 md:gap-3 ">
        {/*Links section*/}
        <section className="flex flex-col gap-2 flex-1  ">
          <h3>{data.footer.quickLinks.title}</h3>
          <ul className="text-darkGray text-sm">
            {data.footer.quickLinks.links.map((item, index) => (
              <li key={index} className="my-4 md:hover-underline py-1">
                <Link href={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2 flex-1">
          <h3 className="">{data.footer.info.title}</h3>
          <ul className="text-darkGray text-sm">
            {data.footer.info.links.map((item, index) => (
              <li key={index} className="my-4 md:hover-underline py-1">
                <Link href={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2 flex-1">
          <h3 className="mb-4">{data.footer.mission.title}</h3>
          <h4 className="text-darkGray text-sm md:text-base leading-7 text-ellipsis ">
            {data.footer.mission.text}
          </h4>
        </section>
      </div>
      {/*Subscribe section*/}
      <section className="pb-4 my-8 flex flex-col  md:flex-row items-center justify-center md:justify-between md:items-end  ">
        <div className="md:w-[50%] lg:w-1/3">
          <h3 className="my-4 md:text-start text-center">
            {data.footer.subscribe.title}
          </h3>

          <div className="flex  ">
            <input
              id="subscribe"
              type="email"
              placeholder="Email"
              className="w-full border-l border-y  border-gray-400 px-3 py-2  outline-none "
            />
            <button
              type="submit"
              className="pr-3 border-r border-y border-gray-400 hover:border-2 "
            >
              <span>
                <FaArrowRightLong className="transition-transform transform hover:scale-110 duration-300 text-customBlack font-thin" />
              </span>
            </button>
          </div>
        </div>
        <div className="mt-4 ">
          <SocialMedia />
        </div>
      </section>
      <hr className="w-full border-t border-gray-300 mb-4" />

      {/*Country section*/}
      <section className=" flex flex-col lg: md:flex-wrap   md:flex-row items-center justify-center md:justify-between md:items-end gap-6 md:md:py-8 ">
        <div className=" ">
          <h3 className="my-4 text-xs text-darkGray">
            {data.footer.country.title}
          </h3>
          <button
            className="flex px-6 gap-2 items-center justify-center text-sm w-full  border border-gray-400 py-3  "
            onClick={() => setShowLocations(!showLocations)}
          >
            <span className="hover:underline text-xs">
              {currentLocation.country} | {currentLocation.currency}
            </span>
            <IoIosArrowDown className="transition-transform transform hover:scale-110 duration-300" />
          </button>
          {showLocations && (
            <SelectCountries
              onSelectCountry={handleCountyChange}
              onClose={handleCountryDivClose}
              currentlySelectedLocation={currentLocation.country}
            ></SelectCountries>
          )}
        </div>
        {/*Payment icons*/}
        <div >
          <ul className="flex items-center justify-between gap-3">
            <li>
              <PaymentIcon type="Visa" format="logoBorder" width={35} />
            </li>
            <li>
              <PaymentIcon type="Mastercard" format="logoBorder" width={30} />
            </li>
            <li>
              <PaymentIcon type="Amex" format="flatRounded" width={30} />
            </li>
            <li>
              <PaymentIcon type="Paypal" format="flatRounded" width={30} />
            </li>
            <li>
              <PaymentIcon type="Diners" format="logoBorder" width={30} />
            </li>
            <li>
              <PaymentIcon type="Discover" format="logoBorder" width={30} />
            </li>
          </ul>
        </div>

        <div className="mb-4 lg:w-full">
          <p className="text-center lg:text-left">
            <small className="text-darkGray text-xs">
              © 2024, personal educational exercise project inspired by
              theme-dawn-demo
            </small>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
