import React from "react";

const ShippingBanner = ({
  bannerHeightRef,
}: {
  bannerHeightRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="bg-white py-3 text-center" ref={bannerHeightRef}>
      <p className="text-xs text-customBlack">
        Free shipping available on all orders!
      </p>
    </div>
  );
};

export default ShippingBanner;
