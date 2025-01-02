import React from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

type QuantitySelectorType = {
  quantity: number;
  onChangeQuantity: (change: number) => void;
};
const QuantitySelector = ({
  quantity,
  onChangeQuantity,
}: QuantitySelectorType) => {
  return (
    <div className="flex flex-col w-36 mb-2">
      <span className="text-darkGray text-sm py-1">Quantity</span>
      <div className="flex border border-darkGray items-center justify-between p-3 px-4">
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
