"use client ";
import { useEffect, useState } from "react";
import { IoShareOutline } from "react-icons/io5";
import type { IconType } from "react-icons";
import content from "../app/data/productList.json";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaBox,
  FaRulerCombined,
  FaShippingFast,
  FaInfoCircle,
  FaBrush,
  FaFacebookF,
  FaWhatsapp,
  FaLinkedin,
  FaCheck,
} from "react-icons/fa";
import { LiaCopy } from "react-icons/lia";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { BiLogoGmail } from "react-icons/bi";

const ProductInfoAccordion = ({ product }: { product: string }) => {
  const [toggleAccordion, setToggleAccordion] = useState<string | null>(null);
  const handleToggleAccordion = (key: string) => {
    setToggleAccordion(prev => (prev === key ? null : key));
  };
  const [fullURL, setFullURl] = useState("");
  const [copied, setCopied] = useState(false);

  const pathName = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}+${pathName}+?${searchParams.toString()}`;
      setFullURl(url);
    }
  }, [pathName, searchParams]);

  const iconMap: { [key: string]: IconType } = {
    material: FaBrush,
    shipping: FaShippingFast,
    dimensions: FaRulerCombined,
    care: FaBox,
  };
  const handleCopyURL = () => {
    navigator.clipboard.writeText(fullURL);
    setCopied(true);
    console.log(fullURL, "copy fullURL", fullURL);
  };
  const shareIcons = [
    {
      label: "facebook",
      icon: FaFacebookF,
      href: "http://facebook.com/",
    },
    { label: "twitter", icon: FaXTwitter, href: "http://twitter.com/" },
    { label: "whatsApp", icon: FaWhatsapp, href: "http://whatsapp.com/" },
    { label: "gmail", icon: BiLogoGmail, href: "http://gmail.com/" },
    { label: "linkedin", icon: FaLinkedin, href: "http://linkedin.com/" },
  ];
  const [showSharePopUp, setShowSharePopUp] = useState(false);

  const handleShare = () => {
    setShowSharePopUp(prev => !prev);
  };
  return (
    <div>
      <ul className="flex flex-col">
        {content.moreInfo.map((item, index) => {
          const [key, value] = Object.entries(item)[0];
          const Icon = iconMap[key as keyof typeof iconMap] || FaInfoCircle;
          console.log(Icon);
          return (
            <li
              key={index}
              className="flex w-full flex-col border-b border-t border-gray-200"
            >
              {key !== "share" ? (
                <button
                  className="flex items-center justify-between p-2 capitalize hover:bg-gray-100"
                  onClick={() => handleToggleAccordion(key)}
                >
                  <span className="flex">
                    <Icon className="mr-2 mt-1 h-5 w-5 transform text-lg text-gray-600 transition duration-200 ease-in-out hover:scale-125 hover:font-bold" />
                    {key}
                  </span>
                  <span
                    className={`${toggleAccordion === key ? "rotate-180" : ""}`}
                  >
                    <MdKeyboardArrowUp />
                  </span>
                </button>
              ) : (
                <button
                  className="flex transform items-center p-2 capitalize hover:bg-gray-100"
                  onClick={handleShare}
                >
                  <IoShareOutline className="mr-2 h-5 w-5" />
                  <span className="hover:underline">{key}</span>
                </button>
              )}
              {toggleAccordion === key && (
                <div>
                  <h4 className="p-4 text-sm text-gray-700">{value}</h4>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {/*share modal*/}
      {showSharePopUp && (
        <section
          onClick={() => setShowSharePopUp(false)}
          className="z-60 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <div className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-4 shadow-lg sm:max-w-md md:max-w-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">Share</h1>
              <button
                onClick={() => setShowSharePopUp(false)}
                className="hover:border"
              >
                <IoCloseOutline size={25} />
              </button>
            </div>
            <div className="flex justify-between gap-2 border-b border-gray-300 pb-2 text-xs">
              <h2 className="truncate">{product} </h2>
              <button
                className="flex items-center text-blue-700"
                onClick={handleCopyURL}
              >
                {copied ? (
                  <button className="flex items-center">
                    <FaCheck className="text-xs text-green-700" />
                    <span className="text-green-700">Copied!</span>
                  </button>
                ) : (
                  <button className="flex items-center">
                    <LiaCopy />
                    <span className="whitespace-nowrap">Copy link</span>
                  </button>
                )}
              </button>
            </div>
            <div className="">
              <h3 className="mb-2 text-sm font-semibold">Share with others</h3>
              <ul className="flex flex-wrap gap-4">
                {shareIcons.map(item => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="p-2 hover:bg-gray-200">
                      <Link target="_blank" href={item.href}>
                        <Icon size={35} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductInfoAccordion;
