"use client";
import React, { useEffect, useState } from "react";
import data from "../app/data/footer.json";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import SelectCountries from "./SelectCountries";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import { useCountry } from "@/app/context/CountryContext";
import Visa from "../public/assets/images/paymentMethods/visa.svg";
import Mastercard from "../public/assets/images/paymentMethods/mastercard.svg";
import Amex from "../public/assets/images/paymentMethods/american-express.svg";
import Paypal from "../public/assets/images/paymentMethods/paypal.svg";
import Diners from "../public/assets/images/paymentMethods/diners.svg";
import Discover from "../public/assets/images/paymentMethods/discover.svg";
import SubscribersForm from "./SubscribersForm";

export type Location = {
  country: string;
  currency: string;
  language?: string;
};
export const paymentIcons: Record<string, string> = {
  Visa,
  Mastercard,
  Amex,
  Paypal,
  Diners,
  Discover,
};
const Footer = () => {
  const [showLocations, setShowLocations] = useState(false);
  const { selectedLocation, setSelectedLocation } = useCountry();
  const handleCountryChange = (newLocation: Location) => {
    setSelectedLocation(newLocation);
    setShowLocations(false);
  };
  //  background content not scrollable if select country div is open
  useEffect(() => {
    if (showLocations) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLocations]);

  return (
    <footer className="mx-auto grid w-full max-w-7xl grid-cols-1 px-4 pt-9 sm:mt-12 sm:px-7 lg:max-w-6xl lg:px-10">
      <div className="flex flex-col justify-between gap-3 sm:gap-6 md:flex-row md:gap-3">
        {/*Links section*/}
        <section className="flex flex-1 flex-col gap-2">
          <h3>{data.footer.quickLinks.title}</h3>
          <ul className="text-sm text-darkGray">
            {data.footer.quickLinks.links.map((item, index) => (
              <li key={index} className="md:hover-underline my-2 py-1 sm:my-4">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-1 flex-col gap-2">
          <h3>{data.footer.info.title}</h3>
          <ul className="text-sm text-darkGray">
            {data.footer.info.links.map((item, index) => (
              <li key={index} className="md:hover-underline my-2 py-1 sm:my-4">
                <Link href={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-1 flex-col gap-2">
          <h3 className="mb-4 text-center sm:text-left">
            {data.footer.mission.title}
          </h3>
          <h4 className="text-ellipsis text-sm leading-7 text-darkGray md:text-base">
            {data.footer.mission.text}
          </h4>
        </section>
      </div>
      {/*Subscribe and Social media*/}
      <section className="my-8 flex flex-col items-center justify-center pb-4 md:flex-row md:items-end md:justify-between">
        <div className="md:w-[50%] lg:w-1/3">
          <h3 className="my-4 text-center md:text-start">
            {data.footer.subscribe.title}
          </h3>
          {/*Subscribers form*/}
          <SubscribersForm />
        </div>
        <div className="mt-4">
          <SocialMedia />
        </div>
      </section>
      <hr className="mb-4 w-full border-t border-gray-300" />
      {/*Country section*/}
      <section className="lg: relative flex flex-col items-center justify-center gap-6 md:flex-row md:flex-wrap md:items-end md:justify-between md:md:py-8">
        <div>
          <h3 className="my-4 text-xs text-darkGray">
            {data.footer.country.title}
          </h3>
          <button
            className="flex w-full items-center justify-center gap-2 border border-gray-400 px-6 py-3 text-sm"
            onClick={() => setShowLocations(!showLocations)}
          >
            <span className="whitespace-nowrap text-xs hover:underline">
              {selectedLocation.country} | {selectedLocation.currency}{" "}
              {selectedLocation.currencySymbol}
            </span>
            <IoIosArrowDown className="transform transition-transform duration-300 hover:scale-110" />
          </button>
          {showLocations && (
            <>
              {/*dark overlay*/}
              <div
                onClick={() => setShowLocations(false)}
                className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black bg-opacity-50 lg:hidden"
              />
              <div className="fixed bottom-0 left-0 z-50 h-3/4 w-full overflow-y-auto bg-white p-[15px] md:absolute md:bottom-[9rem] md:h-full md:w-auto md:border">
                <SelectCountries
                  onSelectCountry={handleCountryChange}
                  onClose={() => setShowLocations(false)}
                  currentlySelectedLocation={selectedLocation.country}
                />
              </div>
            </>
          )}
        </div>
        {/*Payment icons*/}
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {data.paymentOptions.map(option => (
            <div key={option.label} className="rounded-md border">
              <Image
                src={paymentIcons[option.src]}
                alt={option.label}
                width={36}
                height={22}
                className="object-fill"
                quality={100}
              />
            </div>
          ))}
        </div>
        <div className="lg:w-full">
          <p className="text-center lg:text-left">
            <small className="text-xs text-darkGray">
              {data.footer.copyright.description}
            </small>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
