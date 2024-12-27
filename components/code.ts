// "use client";

// import React from "react";
// import { FiMinus } from "react-icons/fi";
// import { GoPlus } from "react-icons/go";

// type QuantitySelectorProps = {
//   quantity: number;
//   onQuantityChange: (quantity: number) => void;
// };
// const QuantitySelector = ({
//   quantity,
//   onQuantityChange,
// }: QuantitySelectorProps) => {
//   const handleIncrease = () => {
//     onQuantityChange(quantity + 1);
//   };
//   const handleDecrease = () => {
//     if (quantity > 1) {
//       onQuantityChange(quantity - 1);
//     }
//   };
//   return (
//     <div className="flex flex-col w-36 mb-2">
//       <span className="text-darkGray text-sm py-1">Quantity</span>
//       <div className="flex border border-darkGray items-center justify-between p-3 px-4 ">
//         <button disabled={quantity <= 1} onClick={handleDecrease}>
//           <FiMinus className={`${quantity === 1 ? "text-darkGray" : ""}`} />
//         </button>
//         <span>{quantity}</span>
//         <button onClick={handleIncrease}>
//           <GoPlus />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuantitySelector;
