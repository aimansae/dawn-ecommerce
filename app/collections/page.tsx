import React from "react";
import CollectionPageWrapper from "../../components/CollectionsPageWrapper";
const CollectionsPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <CollectionPageWrapper searchParams={searchParams} />;
};

export default CollectionsPage;
