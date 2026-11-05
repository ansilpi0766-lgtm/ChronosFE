import React from "react";
import { useCart } from "../Context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Your Cart is Empty</h1>
        <p className="mt-3 text-gray-500">
          Explore our collection and find your perfect timepiece.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-6 border-b pb-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>

                <p className="text-gray-500">{item.brand}</p>

                <p className="mt-2">Quantity: {item.quantity}</p>

                <p className="font-semibold mt-2">
                  ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 mt-3"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-semibold">₹{cartTotal}</span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
