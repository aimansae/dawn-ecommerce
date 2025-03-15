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
  return (
    <div className={`mb-2 flex flex-col ${className}`}>
      <span className="text-sm text-darkGray">{label}</span>
      <div className="flex items-center justify-between border border-darkGray px-3 py-2">
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
