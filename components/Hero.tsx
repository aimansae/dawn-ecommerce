import React from "react";
import bgImage from "@/public/assets/images/hero.png";
import Image from "next/image";
import Link from "next/link";

import hero from "../app/data/hero.json";

const Hero = () => {
  return (
    <>
      <div className="relative h-[80vh] md:h-[40vh]">
        {/* Background Image */}
        <div className="absolute h-full w-full">
          <Image
            src={bgImage}
            alt="hero background"
            objectFit="cover"
            className="z-[-1]"
            quality={100}
            placeholder="blur"
            layout="fill"
          />
        </div>

        {/* Content Div */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="p-4 bg-transparent flex flex-col text-white items-center justify-center gap-4">
            <h1 className="font-normal text-[40px] text-center md:text-6xl">
              {hero.content.heading}
            </h1>
            <span className="text-white opacity-80">
              {hero.content.subheading}
            </span>
            <button className="mt-4 px-6 py-3 bg-transparent text-white border-white border">
              <Link href="/">{hero.content.button.text}</Link>
            </button>
          </div>
        </div>
      </div>

      {/* Additional Content Below */}
      <div className="text-center py-4 px-10 md:px-32 my-4 flex flex-col gap-6 justify-center items-center">
        <h2 className="text-customBlack text-3xl md:text-[40px]">
          {hero.content.description.title}
        </h2>
        <h3 className="text-darkGray">{hero.content.description.body}</h3>
      </div>
    </>
  );
};

export default Hero;
