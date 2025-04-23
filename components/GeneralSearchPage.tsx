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
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-4 md:max-w-5xl lg:max-w-4xl">
      <h1 className="my-4 text-center text-xl md:text-2xl">Search Results </h1>
      <HeaderSearch
        onClose={() => {
          console.log("clicked");
        }}
        onHandleSearch={handleGeneralSearch}
        term={searchQuery}
        setTerm={setSearchQuery}
        className="w-full"
        showCloseIcon={false}
        handleClearFilters={handleClearFilters}
      />
    </div>
  );
};

export default GeneralSearchPage;
