import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { useCart } from "../../Context/CartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  if (!product) return null;

  // Open Product Details Page
  const handleProductClick = () => {
    if (!product._id) {
      toast.error("Product ID not found!");
      return;
    }

    navigate(`/product/${product._id}`);
  };

  // Add to Cart
  const handleAddToCart = () => {
    addToCart(product);

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  // Buy Now
  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="group border border-gray-200 bg-white">
      {/* Product Image */}
      <div className="relative h-[240px] sm:h-[260px] md:h-[280px] bg-white overflow-hidden">
        <img
          onClick={handleProductClick}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 scale-110 cursor-pointer transition-transform duration-500 group-hover:scale-115"
        />

        {/* Wishlist */}
        <button
          onClick={() => toast.info("Wishlist feature coming soon!")}
          className="absolute top-3 right-3 z-10 text-[#D9A900] text-2xl hover:scale-110 transition"
        >
          <FaRegHeart />
        </button>

        {/* Action Buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 px-4 opacity-0 translate-y-3 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
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

      {/* Product Information */}
      <div className="text-center px-3 py-3">
        <h3
          onClick={handleProductClick}
          className="text-base tracking-wide text-[#222222] cursor-pointer hover:text-[#8B6914] transition"
        >
          {product.name}
        </h3>

        <p className="text-base font-semibold text-gray-500 mt-2">
          ${Number(product.price).toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
