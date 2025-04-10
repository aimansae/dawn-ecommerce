"use client";
import React, { useEffect, useState } from "react";
import data from "../app/data/footer.json";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { FaArrowRightLong } from "react-icons/fa6";
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

const paymentIcons = [
  { label: "Visa", src: Visa },
  { label: "Mastercard", src: Mastercard },
  { label: "Amex", src: Amex },
  { label: "Paypal", src: Paypal },
  { label: "Diners", src: Diners },
  { label: "Discover", src: Discover },
];
export type Location = {
  country: string;
  currency: string;
  language?: string;
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
    <footer className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 px-7 pt-9">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-3">
        {/*Links section*/}
        <section className="flex flex-1 flex-col gap-2">
          <h3>{data.footer.quickLinks.title}</h3>
          <ul className="text-sm text-darkGray">
            {data.footer.quickLinks.links.map((item, index) => (
              <li key={index} className="md:hover-underline my-4 py-1">
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-1 flex-col gap-2">
          <h3 className="">{data.footer.info.title}</h3>
          <ul className="text-sm text-darkGray">
            {data.footer.info.links.map((item, index) => (
              <li key={index} className="md:hover-underline my-4 py-1">
                <Link href={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-1 flex-col gap-2">
          <h3 className="mb-4">{data.footer.mission.title}</h3>
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
          {paymentIcons.map(icon => (
            <div key={icon.label} className="rounded-md border">
              <Image
                src={icon.src}
                alt={icon.label}
                width={25}
                height={20}
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
