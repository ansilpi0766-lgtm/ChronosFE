import React from "react";
import { FaArrowRight } from "react-icons/fa";

import FrameA from "../assets/FrameA.png";
import FrameB from "../assets/FrameB.png";
import FrameC from "../assets/FrameC.png";

const products = [
  {
    image: FrameA,
  },
  {
    image: FrameB,
  },
  {
    image: FrameC,
  },
];

const FeaturedPieces = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[39px] pt-8 pb-10">
      {/* Heading Section */}
      <div className="flex items-end justify-between mb-4">
        {/* Move Heading Slightly Right */}
        <div className="ml-6">
          {/* First P */}
          <p className="text-[13px] tracking-[1.5px] text-black uppercase">
            CURATED SELECTION
          </p>

          {/* H1 */}
          <h2 className="mt-2 font-serif text-[25px] md:text-[27px] font-semibold text-[#171717] leading-tight">
            Featured Pieces
          </h2>

          {/* Second P */}
          <p className="text-gray-500 text-[15px] mt-3 leading-[15px]">
            Handpicked by our curators for their exceptional craftsmanship,
            rarity,
            <br />
            and investment potential
          </p>
        </div>

        {/* View All */}
        <button className="hidden md:flex items-center gap-3 text-[12px] text-[#222] hover:text-[#a67c00] transition mb-1">
          View All
          <FaArrowRight className="text-[10px]" />
        </button>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="relative">
            {/* Image Frame */}
            <div className="relative">
              {/* Heart */}
              <button className="absolute top-3 right-3 z-10"></button>

              <img
                src={product.image}
                alt="Featured product"
                className="w-full h-full object-contain p-7"
              />
            </div>

            {/* Product Details */}
            <div className="text-center pt-3">
              <h3 className="text-[11px] tracking-wide text-[#222]">
                {product.name}
              </h3>

              <p className="text-[11px] font-semibold text-gray-500 mt-1.5">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View All */}
      <div className="flex md:hidden justify-center mt-6">
        <button className="flex items-center gap-2 text-sm text-[#222]">
          View All
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedPieces;
