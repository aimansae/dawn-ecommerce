import Link from "next/link";
import React from "react";
import data from "../app/data/footer.json";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IconType } from "react-icons";

type SocialLink = {
  platform: string;
  link: string;
  icon: keyof typeof iconMap;
};

const iconMap: { [jey: string]: IconType } = {
  FaFacebook: FaFacebook,
  FaInstagram: FaInstagram,
  FaTwitter: FaTwitter,
  FaYoutube: FaYoutube,
};

const SocialMedia = () => {
  return (
    <ul className="flex items-center justify-between gap-6">
      {data.footer.socialLinks.map((item: SocialLink, index: number) => {
        const Icon = iconMap[item.icon];
        console.log(Icon);
        return (
          <li key={index}>
            <Link href={item.link} target="_blank">
              <Icon
                className="transform transition-transform duration-300 hover:scale-110"
                size={22}
              ></Icon>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialMedia;
