import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  const productId = product._id || product.id;

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
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F0E8]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          onClick={() => toast.info("Wishlist feature coming soon!")}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-[#421713] hover:text-white transition"
        >
          <FaRegHeart />
        </button>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 left-4 right-4 bg-[#421713] text-white py-3 flex items-center justify-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#5c2923]"
        >
          <FaShoppingBag />
          ADD TO CART
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-4">
        <p className="text-xs uppercase tracking-widest text-gray-500">
          {product.brand}
        </p>

        <h3 className="text-base font-medium text-[#421713] mt-1">
          {product.name}
        </h3>

        <p className="text-lg font-semibold text-[#421713] mt-2">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        {/* Buy Now */}
        <button
          onClick={handleBuyNow}
          className="mt-3 w-full border border-[#421713] text-[#421713] py-2 text-sm hover:bg-[#421713] hover:text-white transition"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
