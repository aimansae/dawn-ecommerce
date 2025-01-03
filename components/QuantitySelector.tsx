import React from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

type QuantitySelectorType = {
  quantity: number;
  onChangeQuantity: (change: number) => void;
  label?: string;
  className?: string;
};
const QuantitySelector = ({
  quantity,
  onChangeQuantity,
  label,
  className,
}: QuantitySelectorType) => {
  // {*w-36*/}
  return (
    <div className={`flex flex-col mb-2 ${className}`}>
      <span className="text-darkGray text-sm py-1">{label}</span>
      <div className="flex border border-darkGray items-center justify-between py-2 px-3">
        <button disabled={quantity < 1} onClick={() => onChangeQuantity(-1)}>
          <FiMinus className={`${quantity === 1 ? "text-darkGray" : ""}`} />
        </button>
        <span>{quantity}</span>
        <button onClick={() => onChangeQuantity(1)}>
          <GoPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
