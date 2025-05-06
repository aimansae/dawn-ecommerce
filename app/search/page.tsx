import React, { Suspense } from "react";
import CollectionsPageWrapper from "@/components/CollectionsPageWrapper";
import GeneralSearchPage from "@/components/GeneralSearchPage";

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <GeneralSearchPage />
      <CollectionsPageWrapper />
    </Suspense>
  );
};

export default SearchPage;
