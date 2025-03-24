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
            className="z-[-1] object-cover"
            quality={100}
            placeholder="blur"
            fill
          />
        </div>
        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4 bg-transparent p-4 text-white">
            <h1 className="text-center text-[40px] font-normal md:text-6xl">
              {hero.content.heading}
            </h1>
            <span className="text-white opacity-80">
              {hero.content.subheading}
            </span>
            <button className="mt-4 border border-white bg-transparent px-6 py-3 text-white hover:border-2">
              <Link href="/collections/">{hero.content.button.text}</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="my-4 flex flex-col items-center justify-center gap-6 px-10 py-4 text-center md:px-32">
        <h2 className="text-3xl text-customBlack md:text-[40px]">
          {hero.content.description.title}
        </h2>
        <h3 className="text-darkGray">{hero.content.description.body}</h3>
      </div>
    </>
  );
};

export default Hero;
