import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <ShoppingBag size={45} strokeWidth={1} className="text-gray-400 mb-5" />

        <h1 className="text-2xl font-semibold text-[#421713]">
          Your Cart is Empty
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Explore our collection and find your perfect timepiece.
        </p>

        <button
          onClick={() => navigate("/collections")}
          className="mt-6 bg-[#421713] text-white px-7 py-3 text-xs tracking-wider hover:bg-[#f2c035] hover:text-black transition"
        >
          EXPLORE COLLECTION
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-5 md:px-10 py-10 text-[#421713]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[3px] text-gray-400">
              YOUR SELECTION
            </p>

            <h1 className="text-2xl md:text-3xl font-serif mt-2">
              Shopping Cart
            </h1>
          </div>

          <p className="text-xs text-gray-500">
            {cart.length} {cart.length === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <div
                key={item.cartItemId || `${item._id}-${item.size || "NO_SIZE"}`}
                className="flex gap-4 md:gap-6 border-b border-gray-200 pb-6"
              >
                {/* PRODUCT IMAGE */}
                <div className="w-28 h-28 md:w-36 md:h-36 shrink-0 bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-3"
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-[9px] tracking-[2px] text-gray-400 uppercase">
                        {item.brand || "CHRONOS"}
                      </p>

                      <h2 className="text-sm md:text-base font-semibold mt-2 uppercase">
                        {item.name || item.productName}
                      </h2>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.cartItemId ||
                            `${item._id}-${item.size || "NO_SIZE"}`,
                        )
                      }
                      className="text-gray-400 hover:text-red-600 transition h-fit"
                      aria-label="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* SELECTED SIZE */}
                  {item.size && (
                    <p className="text-xs text-gray-500 mt-2">
                      Size:{" "}
                      <span className="font-semibold text-[#421713]">
                        {item.size}
                      </span>
                    </p>
                  )}

                  {/* PRICE */}
                  <p className="text-sm font-semibold mt-3">
                    {formatPrice(item.price)}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId ||
                              `${item._id}-${item.size || "NO_SIZE"}`,
                            item.quantity - 1,
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="px-3 py-2 text-sm disabled:opacity-30"
                      >
                        −
                      </button>

                      <span className="text-xs px-3 min-w-[35px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(
                            item.cartItemId ||
                              `${item._id}-${item.size || "NO_SIZE"}`,
                            item.quantity + 1,
                          )
                        }
                        disabled={
                          Number(item.stock) > 0 &&
                          item.quantity >= Number(item.stock)
                        }
                        className="px-3 py-2 text-sm disabled:opacity-30"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-semibold">
                      {formatPrice(Number(item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-[#f8f6f2] p-6 h-fit">
            <h2 className="text-lg font-serif mb-6">Order Summary</h2>

            <div className="flex justify-between text-xs mb-4">
              <span className="text-gray-500">Subtotal</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>

            <div className="flex justify-between text-xs mb-4">
              <span className="text-gray-500">Shipping</span>
              <span className="text-green-700">Complimentary</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between">
              <span className="font-semibold text-sm">Total</span>

              <span className="font-semibold text-base">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#421713] text-white py-4 mt-7 text-[10px] tracking-[2px] flex items-center justify-center gap-3 hover:bg-[#f2c035] hover:text-black transition"
            >
              PROCEED TO CHECKOUT
              <ArrowRight size={14} />
            </button>

            <button
              onClick={() => navigate("/collections")}
              className="w-full border border-gray-300 py-3 mt-3 text-[10px] tracking-wider hover:border-[#421713] transition"
            >
              CONTINUE SHOPPING
            </button>

            <p className="text-[9px] text-gray-400 text-center mt-5 leading-5">
              Secure checkout · Authentic products · Complimentary shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
