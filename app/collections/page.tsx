import React, { Suspense } from "react";
import Collections from "@/components/Collections";
import Loading from "./loading";

const CollectionsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Collections />
    </Suspense>
  );
};

export default CollectionsPage;
