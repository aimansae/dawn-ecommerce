import React from "react";
import CollectionsPageWrapper from "@/components/CollectionsPageWrapper";
import GeneralSearchPage from "@/components/GeneralSearchPage";

const SearchPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div>
      <GeneralSearchPage />
      <CollectionsPageWrapper searchParams={searchParams} />
    </div>
  );
};

export default SearchPage;
