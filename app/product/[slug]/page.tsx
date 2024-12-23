import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  return <div>single product {params.slug}</div>;
};

export default page;
