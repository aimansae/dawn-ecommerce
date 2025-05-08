import React from "react";

const ShippingOptions = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="my-6 flex items-center justify-center">
      <button
        className="w-full rounded-md border border-black bg-[#334FB4] p-3 px-4 py-2 font-bold text-white hover:bg-[#2c4499]"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Place Order"}
      </button>
    </div>
  );
};

export default ShippingOptions;
