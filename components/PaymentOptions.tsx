import React from "react";
import Visa from "../public/assets/images/paymentMethods/visa.svg";
import Mastercard from "../public/assets/images/paymentMethods/mastercard.svg";
import Amex from "../public/assets/images/paymentMethods/american-express.svg";
import Paypal from "../public/assets/images/paymentMethods/paypal.svg";
import Diners from "../public/assets/images/paymentMethods/diners.svg";
import Discover from "../public/assets/images/paymentMethods/discover.svg";
import Image from "next/image";
import paymentData from "../app/data/footer.json";

type PaymentOptionsProps = {
  selectedPayment: string;
  setSelectedPayment: React.Dispatch<React.SetStateAction<string>>;
};

const PaymentOptions = ({
  selectedPayment,
  setSelectedPayment,
}: PaymentOptionsProps) => {
  const paymentIcons: Record<string, string> = {
    Visa,
    Mastercard,
    Amex,
    Discover,
    Paypal,
    Diners,
  };
  return (
    <>
      <h2 className="my-4 font-bold md:text-[21px]">Choose a payment method</h2>
      <div className="grid grid-cols-1 items-center border-gray-100 bg-gray-100 sm:grid-cols-2">
        {paymentData.paymentOptions.map((option, index) => (
          <label
            key={index}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded border p-3 transition-colors duration-200 ${
              selectedPayment === option.label
                ? "border-black bg-blue-200"
                : "border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value={option.label}
                name={option.label}
                id={option.label}
                checked={selectedPayment === option.label}
                onChange={() => setSelectedPayment(option.label)}
              />
              <label
                className="mr-1 whitespace-nowrap text-sm"
                htmlFor={option.label}
              >
                {option.label}
              </label>
            </div>
            <div className="h-6 w-10 shrink-0">
              <Image
                width={40}
                height={24}
                quality={100}
                src={paymentIcons[option.src]}
                alt={option.src}
                className="h-full w-full object-contain"
              />
            </div>
          </label>
        ))}
      </div>
    </>
  );
};

export default PaymentOptions;
