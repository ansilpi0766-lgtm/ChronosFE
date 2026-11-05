import React from "react";
import { FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  // Safety check
  if (!product) return null;

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden border border-gray-100 bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-5"
        />

        <button className="absolute top-3 right-3 text-[#f2c035]">
          <FaRegHeart size={14} />
        </button>
      </div>

      {/* Product Details */}
      <div className="text-center pt-4">
        <h3 className="text-xs font-medium">{product.name}</h3>

        <p className="text-[11px] text-gray-500 mt-1">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
