import React from "react";

const AvailabilityTag = ({ availability }: { availability: string }) => {
  let availabilityClass = "";

  if (availability === "sold out") {
    availabilityClass = "bg-black  "; // Black background for sold out
  } else if (availability === "sale") {
    availabilityClass = "bg-blue-700  "; // Blue background for sale
  }

  return (
    <span
      className={`py-1 px-3 text-sm text-white capitalize  rounded-full ${availabilityClass}`}
    >
      {availability}
    </span>
  );
};

export default AvailabilityTag;
