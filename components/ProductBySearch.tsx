import React from "react";
type ProductBySearchProps = { query: string };
const ProductBySearch = ({ query }: ProductBySearchProps) => {
  return <div>{query}</div>;
};

export default ProductBySearch;
