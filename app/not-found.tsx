import PageNotFound from "@/components/PageNotFound";
import React, { Suspense } from "react";

const notFound = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <PageNotFound />
    </Suspense>
  );
};

export default notFound;
