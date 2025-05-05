import React from "react";
import LookbookWrapper from "./LookbookWrapper";

export default async function LookBookPage() {
  await new Promise(res => setTimeout(res, 1000));
  return <LookbookWrapper />;
}
