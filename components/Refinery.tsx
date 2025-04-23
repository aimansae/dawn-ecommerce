import React from "react";
import Image from "next/image";
import RefineryLogo from "../public/assets/images/refineryLogo.png";
import content from "../app/data/footer.json";
import TheCutLogo from "../public/assets/images/theCutLogo.png";

const Refinery = () => {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 sm:py-9 md:flex-row lg:max-w-6xl lg:px-10">
      <div className="flex flex-col items-center">
        <div className="relative h-[80px] w-[150px] text-center sm:h-[100px] sm:w-[200px]">
          <Image
            src={RefineryLogo}
            alt="Refinery logo"
            fill
            quality={100}
            className="object-contain"
          />
        </div>
        <div className="text-center sm:p-6">
          <h2 className="text-sm leading-loose text-darkGray sm:text-base">
            &quot;{content.footer.refinery.description}&quot;
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="relative h-[40px] w-[150px] sm:h-[100px] sm:w-[200px]">
          <Image
            src={TheCutLogo}
            alt="The cut logo"
            fill
            quality={100}
            className="object-contain"
          />
        </div>
        <div className="text-center sm:p-6">
          <h2 className="text-sm leading-loose text-darkGray sm:text-base">
            &quot;{content.footer.theCut.description}&apos;
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Refinery;
