"use client";
import { useCollectionFilters } from "@/app/hooks/useCollectionFilters";
import HeaderSearch from "./HeaderSearch";

const GeneralSearchPage = () => {
  const {
    searchQuery,
    setSearchQuery,
    handleGeneralSearch,
    handleClearFilters,
  } = useCollectionFilters();

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-7 md:px-7">
      <h1 className="my-4 text-center">Search Results </h1>
      <HeaderSearch
        onClose={() => {
          console.log("clicked");
        }}
        onHandleSearch={handleGeneralSearch}
        term={searchQuery}
        setTerm={setSearchQuery}
        className="w-3/4"
        showCloseIcon={false}
        handleClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default GeneralSearchPage;
