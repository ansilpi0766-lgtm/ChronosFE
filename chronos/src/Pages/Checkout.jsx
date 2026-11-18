import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

import CheckoutStep from "../Components/Components/CheckoutStep";
import ShippingForm from "../Components/Components/ShippingForm";
import PaymentForm from "../Components/Components/PaymentForm";
import OrderSummery from "../Components/Components/OrderSummery";

import { useCart } from "../Context/CartContext";
import useCreateOrder from "../Hooks/useCreateOrder";

const Checkout = () => {
  const navigate = useNavigate();

  // Restore checkout details after login redirect
  const [step, setStep] = useState(() => {
    return Number(sessionStorage.getItem("checkoutStep")) || 1;
  });

  const [shipping, setShipping] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("checkoutShipping")) || null;
    } catch {
      return null;
    }
  });

  const { cart, clearCart } = useCart();
  const { createOrder, isLoading } = useCreateOrder();

  const handlePlaceOrder = async () => {
    if (!shipping || cart.length === 0) return;

    const token = localStorage.getItem("token");

    // Save checkout details before redirecting to login
    if (!token) {
      sessionStorage.setItem("checkoutShipping", JSON.stringify(shipping));
      sessionStorage.setItem("checkoutStep", "3");

      navigate("/login", {
        state: { from: "/checkout" },
      });

      return;
    }

    // Create order after login
    const order = await createOrder(cart, shipping);

    if (order) {
      clearCart();

      setStep(1);
      setShipping(null);

      sessionStorage.removeItem("checkoutShipping");
      sessionStorage.removeItem("checkoutStep");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Breadcrumb */}
        <p className="mb-8 text-sm text-gray-400">
          Home &gt; <span className="text-gray-600">Checkout</span>
        </p>

        {/* Heading */}
        <h1 className="mb-6 text-3xl font-medium">Secure Checkout</h1>

        {/* Checkout Steps */}
        <div className="mb-12">
          <CheckoutStep step={step} />
        </div>

        {/* Main Checkout Layout */}
        <div className="flex items-start justify-between gap-12">
          {/* Left Side */}
          <div
            className={`w-full ${
              step === 1 ? "max-w-[750px]" : "max-w-[660px]"
            }`}
          >
            {/* Shipping Form */}
            {step === 1 && (
              <ShippingForm
                onNext={() => setStep(2)}
                onShippingChange={setShipping}
              />
            )}

            {/* Payment Form */}
            {step === 2 && (
              <PaymentForm
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}

            {/* Order Review */}
            {step === 3 && (
              <div className="w-full">
                <button
                  onClick={() => setStep(2)}
                  className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600"
                >
                  <span>←</span>
                  Back
                </button>

                <h2 className="mb-5 flex items-center gap-2 text-xl font-medium">
                  <FaMapMarkerAlt className="text-[#421713]" />
                  Shipping To:
                </h2>

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

          {/* Right Side - Order Summary */}
          <div className="w-full max-w-[350px] shrink-0">
            <OrderSummery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
