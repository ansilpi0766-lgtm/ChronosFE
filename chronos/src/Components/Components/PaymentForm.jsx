import React from "react";
import { FaCreditCard } from "react-icons/fa";

const PaymentForm = ({ onNext, onBack }) => {
  return (
    <div className="relative -top-3 w-full min-h-[420px]">
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600"
      >
        <span className="text-base">←</span>
        Back
      </button>

      {/* Payment Details Heading */}
      <h2 className="mb-6 flex items-center gap-2 text-lg font-medium">
        <FaCreditCard className="text-base text-[#421713]" />
        Payment Details
      </h2>

      {/* Name on Card */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium text-gray-700">
          Name on Card
        </label>

        <input
          type="text"
          name="cardholderName"
          autoComplete="cc-name"
          placeholder="Enter name on card"
          className="h-11 w-full border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#421713]"
        />
      </div>

      {/* Card Number */}
      <div className="mb-4">
        <label className="mb-2 block text-xs font-medium text-gray-700">
          Card Number
        </label>

        <input
          type="text"
          name="cardNumber"
          autoComplete="cc-number"
          inputMode="numeric"
          placeholder="1234 5678 9012 3456"
          className="h-11 w-full border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#421713]"
        />
      </div>

      {/* Expiry + CVV */}
      <div className="mb-6 flex w-full gap-4">
        <div className="w-1/2">
          <label className="mb-2 block text-xs font-medium text-gray-700">
            Expiry Date
          </label>

          <input
            type="text"
            name="cardExpiry"
            autoComplete="cc-exp"
            inputMode="numeric"
            placeholder="MM/YY"
            className="h-11 w-full border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#421713]"
          />
        </div>

        <div className="w-1/2">
          <label className="mb-2 block text-xs font-medium text-gray-700">
            CVV
          </label>

          <input
            type="password"
            name="cardCvv"
            autoComplete="cc-csc"
            inputMode="numeric"
            placeholder="123"
            className="h-11 w-full border border-gray-300 bg-gray-50 px-4 text-sm outline-none focus:border-[#421713]"
          />
        </div>
      </div>

      {/* Review Order Button */}
      <button
        type="button"
        onClick={onNext}
        className="h-11 w-full bg-yellow-400 text-xs font-semibold tracking-wider text-black transition hover:bg-yellow-500"
      >
        REVIEW ORDER →
      </button>

      {/* Security Information */}
      <p className="mt-4 text-center text-xs text-gray-400">
        🔒 Your payment information is secure and encrypted.
      </p>
    </div>
  );
};

export default PaymentForm;
