"use client";

import Lookbook from "@/components/Lookbook";
import React, { Suspense } from "react";

export default function LookbookWrapper() {
  return (
    <Suspense fallback={<div>Loading Lookbook...</div>}>
      <Lookbook />
    </Suspense>
  );
}
