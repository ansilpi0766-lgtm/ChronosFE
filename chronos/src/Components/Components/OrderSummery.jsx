import React from "react";
import picture from "../../assets/picture.png";

const OrderSummery = () => {
  return (
    <div className="h-fit w-[200px] bg-gray-200 p-3">
      {/* Heading */}
      <h2 className="mb-3 text-[8px] font-semibold">Order Summary</h2>

      {/* Product */}
      <div className="flex gap-2 border-b border-gray-400 pb-3">
        <img
          src={picture}
          alt="Royal Chronograph Elite"
          className="h-7 w-7 object-contain"
        />

        <div>
          <h3 className="text-[6px] font-semibold">ROYAL CHRONOGRAPH ELITE</h3>

          <p className="text-[6px] text-gray-500">Qty: 1</p>

          <p className="text-[7px]">$12,500</p>
        </div>
      </div>

      {/* Price Details */}
      <div className="mt-3 space-y-1.5 text-[6px] text-gray-500">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>$12,500</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (15%)</span>
          <span>$625</span>
        </div>
      </div>

      {/* Total */}
      <div className="mt-3 flex justify-between border-t border-gray-400 pt-2 text-[7px] font-medium">
        <span>Total</span>
        <span>$13,125</span>
      </div>
    </div>
  );
};

export default OrderSummery;
