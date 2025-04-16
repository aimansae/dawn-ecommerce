import React from "react";

const AvailabilityTag = ({ availability }: { availability: string }) => {
  if (availability === "available") return null;
  let availabilityClass = "";
  if (availability === "sold out") {
    availabilityClass = "bg-black  "; // Black background for sold out
  } else if (availability === "sale") {
    availabilityClass = "bg-blue-700  "; // Blue background for sale
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs text-white ${availabilityClass}`}
    >
      {availability}
    </span>
  );
};

export default AvailabilityTag;
