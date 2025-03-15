import React, { Suspense } from "react";
import Loading from "./loading";
import data from "../data/productList.json";
import CollectionPage from "@/components/CollectionPage";
const CollectionsPage = () => {
  const totalProducts = data.products.length;
  return (
    <Suspense fallback={<Loading />}>
      <CollectionPage />
    </Suspense>
  );
};

export default CollectionsPage;
