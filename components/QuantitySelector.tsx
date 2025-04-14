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
      <div className="flex items-center justify-between border border-darkGray p-3">
        <button disabled={quantity < 1} onClick={() => onChangeQuantity(-1)}>
          <FiMinus
            className={`${quantity === 1 ? "text-darkGray" : ""}transform transition duration-200 ease-in-out hover:scale-125 hover:font-bold`}
          />
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => onChangeQuantity(1)}
          className="transform transition duration-200 ease-in-out hover:scale-125 hover:font-bold"
        >
          <GoPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
