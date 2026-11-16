import React from "react";
import picture from "../../assets/picture.png";
import { useCart } from "../../Context/CartContext";

const OrderSummery = () => {
  const { cart } = useCart();

  // Calculate subtotal from actual cart products
  const subtotal = cart.reduce((total, item) => {
    return total + Number(item.price || 0) * Number(item.quantity || 0);
  }, 0);

  // Keep the existing 15% tax
  const tax = subtotal * 0.15;

  const shipping = 0;
  const total = subtotal + tax + shipping;

  const formatPrice = (price) => {
    return `$${Number(price || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="h-fit w-full max-w-[350px] bg-gray-200 p-5">
      {/* Heading */}
      <h2 className="mb-5 text-base font-semibold">
        Order Summary
        <span className="ml-2 text-sm font-normal text-gray-500">
          ({cart.length} {cart.length === 1 ? "item" : "items"})
        </span>
      </h2>

      {/* Cart Products */}
      <div className="max-h-[280px] space-y-4 overflow-y-auto">
        {cart.length === 0 ? (
          <p className="py-5 text-center text-sm text-gray-500">
            Your cart is empty.
          </p>
        ) : (
          cart.map((item, index) => {
            const productName = item.name || item.productName || "Product";

            const productImage = item.image || item.images?.[0] || picture;

            return (
              <div
                key={item.cartItemId || `${item._id}-${item.size || index}`}
                className="flex gap-3 border-b border-gray-400 pb-4"
              >
                {/* Product Image */}
                <img
                  src={productImage}
                  alt={productName}
                  onError={(e) => {
                    e.currentTarget.src = picture;
                  }}
                  className="h-16 w-16 shrink-0 bg-white object-contain p-1"
                />

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold uppercase">
                    {productName}
                  </h3>

                  {item.brand && (
                    <p className="mt-1 text-xs text-gray-500">{item.brand}</p>
                  )}

                  {item.size && (
                    <p className="mt-1 text-xs text-gray-600">
                      Size: {item.size}
                    </p>
                  )}

                  <p className="mt-1 text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Price Details */}
      <div className="mt-5 space-y-3 border-b border-gray-400 pb-4 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium text-green-700">Free</span>
        </div>

        <div className="flex justify-between">
          <span>Tax (15%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="mt-4 flex items-center justify-between text-sm font-semibold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {/* Secure Checkout */}
      <p className="mt-4 text-center text-[10px] text-gray-500">
        Secure checkout · Your order is protected
      </p>
    </div>
  );
};

export default OrderSummery;
