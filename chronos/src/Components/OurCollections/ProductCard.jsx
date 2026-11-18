import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaShoppingBag, FaTimes } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <>
      {/* Product Card */}
      <div className="group border border-gray-200 bg-white">
        {/* Product Image Section */}
        <div className="relative aspect-[4/5] bg-white overflow-hidden">
          <img
            onClick={() => setShowPopup(true)}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-6 cursor-pointer transition-transform duration-500 group-hover:scale-105"
          />

          {/* Wishlist */}
          <button
            onClick={() => toast.info("Wishlist feature coming soon!")}
            className="absolute top-5 right-5 text-[#D9A900] text-3xl hover:scale-110 transition"
          >
            <FaRegHeart />
          </button>

          {/* Action Buttons */}
          <div className="absolute bottom-7 left-0 right-0 flex items-center justify-center gap-3 px-5">
            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              className="w-[65%] flex-none bg-[#FFC900] text-black py-2.5 text-xs font-medium hover:bg-[#e6b500] transition"
            >
              BUY NOW
            </button>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-10 h-10 shrink-0 bg-[#EEEEEE] text-[#421713] flex items-center justify-center hover:bg-[#dddddd] transition"
              title="Add to Cart"
            >
              <FaShoppingBag size={15} />
            </button>
          </div>
        </div>

        {/* Product Information - Right Side */}
        <div className="text-center px-3 py-3">
          <h3
            onClick={() => setShowPopup(true)}
            className="text-base tracking-wide text-[#222222] cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-base font-semibold text-gray-500 mt-2">
            ${Number(product.price).toLocaleString("en-US")}
          </p>
        </div>
      </div>

      {/* Product Popup */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 w-full max-w-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-3 shadow-md text-[#421713] hover:bg-[#421713] hover:text-white"
            >
              <FaTimes />
            </button>

            {/* Product Image */}
            <div className="bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full min-h-[300px] object-contain p-5"
              />
            </div>

            {/* Product Description */}
            <div className="flex items-center p-8 md:p-10">
              <p className="text-gray-600 text-base leading-8">
                {product.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
