import React from "react";
import content from "@/app/data/shippingPolicy.json";
const ShippingPolicy = () => {
  return (
    <section className="mx-auto w-full max-w-5xl px-7 py-9">
      <h1 className="my-4 text-3xl">{content.shipping.heading}</h1>
      <div className="space-y-4 text-darkGray">
        {content.shipping.paragraphs.map((par, index) => (
          <p key={index}>{par}</p>
        ))}
      </div>
    </section>
  );
};

export default ShippingPolicy;
