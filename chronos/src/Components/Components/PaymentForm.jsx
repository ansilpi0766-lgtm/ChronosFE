import React from "react";

const PaymentForm = ({ onNext, onBack }) => {
  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1 text-[8px] text-gray-400 hover:text-gray-600"
      >
        <span className="text-[10px]">←</span>
        Back
      </button>

      {/* Payment Details Heading */}
      <h2 className="mb-4 flex items-center gap-2 text-[9px] font-medium">
        <span className="text-[11px]">▣</span>
        Payment Details
      </h2>

      {/* Name on Card */}
      <input
        type="text"
        placeholder="Name on Card"
        className="mb-2 h-6 w-full bg-gray-200 px-3 text-[8px] outline-none"
      />

      {/* Card Number */}
      <input
        type="text"
        placeholder="Card Number"
        className="mb-2 h-6 w-full bg-gray-200 px-3 text-[8px] outline-none"
      />

      {/* Expiry + CVV */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="MM/YY"
          className="h-6 w-1/2 bg-gray-200 px-3 text-[8px] outline-none"
        />

        <input
          type="text"
          placeholder="CVV"
          className="h-6 w-1/2 bg-gray-200 px-3 text-[8px] outline-none"
        />
      </div>

      {/* Review Order Button */}
      <button
        onClick={onNext}
        className="h-6 w-full bg-yellow-400 text-[7px] font-medium hover:bg-yellow-500"
      >
        REVIEW ORDER
      </button>
    </div>
  );
};

export default PaymentForm;
