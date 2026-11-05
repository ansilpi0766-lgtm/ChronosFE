import React, { useState } from "react";

import CheckoutStep from "../Components/Components/CheckoutStep";
import ShippingForm from "../Components/Components/ShippingForm";
import PaymentForm from "../Components/Components/PaymentForm";
import OrderSummery from "../Components/Components/OrderSummery";

import { useCart } from "../Context/CartContext";
import useCreateOrder from "../Hooks/useCreateOrder";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState(null);

  const { cart, clearCart } = useCart();
  const { createOrder, isLoading } = useCreateOrder();

  const handlePlaceOrder = async () => {
    if (!shipping || cart.length === 0) return;

    const order = await createOrder(cart, shipping);

    if (order) {
      clearCart();
      setStep(1);
      setShipping(null);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Breadcrumb */}
        <p className="mb-8 text-sm text-gray-400">
          Home &gt; <span className="text-gray-600">Checkout</span>
        </p>

        {/* Heading */}
        <h1 className="mb-6 text-3xl font-medium">Secure Checkout</h1>

        {/* Steps */}
        <div className="mb-12">
          <CheckoutStep step={step} />
        </div>

        {/* Checkout Layout */}
        <div className="flex items-start justify-between gap-12">
          {/* Left Section */}
          <div className="w-full max-w-[360px]">
            {step === 1 && (
              <ShippingForm
                onNext={() => setStep(2)}
                onShippingChange={setShipping}
              />
            )}

            {step === 2 && (
              <PaymentForm
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <div className="w-full">
                <button
                  onClick={() => setStep(2)}
                  className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600"
                >
                  <span>←</span>
                  Back
                </button>

                <h2 className="mb-5 text-xl font-medium">♧ Shipping To:</h2>

                {shipping && (
                  <div className="mb-8 text-sm leading-7 text-gray-600">
                    <p>
                      {shipping.firstName} {shipping.lastName}
                    </p>
                    <p>{shipping.email}</p>
                    <p>{shipping.phone}</p>
                    <p>
                      {shipping.city}, {shipping.postalCode}
                    </p>
                    <p>{shipping.country}</p>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={isLoading || cart.length === 0}
                  className="flex h-12 w-full items-center justify-center gap-2 bg-yellow-400 text-sm font-semibold hover:bg-yellow-500 disabled:opacity-50"
                >
                  {isLoading ? "PLACING ORDER..." : "PLACE ORDER"}
                  <span>🔒</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Section - Order Summary */}
          <div className="w-full max-w-[350px] shrink-0">
            <OrderSummery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
