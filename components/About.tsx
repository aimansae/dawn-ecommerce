import React from "react";
import data from "@/app/data/about.json";
import img1 from "@/public/assets/images/about/aboutImage1.png";
import img2 from "@/public/assets/images/about/aboutImage2.png";
import img3 from "@/public/assets/images/about/aboutImage3.png";
import Image from "next/image";

const images = [
  { src: img1, alt: "Bag" },
  { src: img2, alt: "Flowers" },
  { src: img3, alt: "Bag 2" },
];
const About = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-7 py-9 lg:max-w-6xl lg:px-10">
      <div className="my-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden bg-green-200"
          >
            <Image
              src={img.src}
              fill
              alt={img.alt}
              className="h-auto w-full object-fill"
              quality={100}
            />
          </div>
        ))}
      </div>
      <div className="w-full md:mx-auto md:max-w-3xl md:items-center md:justify-center">
        <h1 className="mb-4 text-3xl capitalize sm:my-5">
          {data.about.heading}
        </h1>
        <div className="text[15px] my-6 flex flex-col gap-4 text-darkGray md:text-base">
          <p>{data.about.p1}</p>
          <p>{data.about.p2}</p>
          <p>{data.about.p3}</p>
          <p>{data.about.p4}</p>
        </div>
      </div>
      <div className="text[15px] text-dark-gray mt-8 flex flex-col bg-gray-100 p-4 text-center text-darkGray md:p-16 md:text-base">
        <h2 className="font-semibold">{data.about.qualityInfo.title}</h2>
        <p className="my-4">{data.about.qualityInfo.description}</p>
      </div>
    </section>
  );
};

export default About;
