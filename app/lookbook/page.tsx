import Lookbook from "@/components/Lookbook";
import React from "react";

export default async function LookBookPage() {
  await new Promise(res => setTimeout(res, 1000));
  return <Lookbook />;
}
