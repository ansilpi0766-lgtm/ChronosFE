import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useCart } from "../Context/CartContext";
import picture from "../assets/picture.png";

const CartDrawer = ({ onClose }) => {
  const navigate = useNavigate();

  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price) =>
    "₹" + Number(price || 0).toLocaleString("en-IN");

  const handleCheckout = () => {
    if (cart.length === 0) return;

    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 z-[100] bg-black/40" />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-[101] flex h-screen w-full max-w-[380px] flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-serif text-sm font-semibold text-[#421713]">
            Shopping Bag ({cart.length})
          </h2>

          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Products */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
              <p className="font-serif text-lg text-[#421713]">
                Your Bag is Empty
              </p>

              <button
                onClick={() => {
                  onClose();
                  navigate("/Collection");
                }}
                className="mt-5 border-b border-[#421713] pb-1 text-xs uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-4 border-b border-gray-200 px-5 py-6"
              >
                {/* Product Image */}
                <div className="h-[75px] w-[70px] shrink-0 border border-gray-200 p-1">
                  <img
                    src={item.image || picture}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = picture;
                    }}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#292929]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[11px] text-gray-400">
                        {item.brand || "CHRONOS"}
                      </p>

                      {/* Selected Size */}
                      {item.size && (
                        <p className="mt-1 text-[11px] text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center text-gray-400 transition hover:text-red-500"
                      aria-label={`Remove ${item.name} from shopping bag`}
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <p className="mt-1 text-xs font-semibold">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-3 flex h-7 w-[85px] items-center justify-between border border-gray-300 px-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="text-gray-500 disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="text-xs">{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.cartItemId, item.quantity + 1)
                      }
                      className="text-gray-500"
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-2 text-[11px] text-gray-500">
                    Total: {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Section */}
        <div className="shrink-0 border-t border-gray-200 px-5 pb-8 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Subtotal</span>

            <span className="text-sm font-semibold">
              {formatPrice(cartTotal)}
            </span>
          </div>

          <p className="mt-3 text-[10px] text-gray-400">
            Taxes and shipping calculated at checkout
          </p>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="mt-4 w-full bg-[#FFC400] py-3 text-[10px] font-semibold uppercase tracking-wider text-black hover:bg-[#e8b300] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/Collection");
            }}
            className="mt-5 w-full text-center text-xs text-gray-700 hover:underline"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
