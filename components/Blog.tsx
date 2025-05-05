import React from "react";
import content from "@/app/data/blog.json";
import Image from "next/image";
const Blog = () => {
  return (
    <section className="mx-auto w-full max-w-7xl px-7 py-9 lg:max-w-6xl lg:px-10">
      <h1 className="my-6 text-2xl md:text-3xl">News</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {content.news.map((item, index) => (
          <div
            key={index}
            className={`space-y-4 ${index === 0 ? "md:col-span-2" : ""}`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover"
                quality={100}
              />
            </div>
            <p className="text-sm text-gray-500">{item.date}</p>
            <h2 className="text-lg font-semibold text-black">{item.title}</h2>
            <p className="text-sm text-darkGray">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
