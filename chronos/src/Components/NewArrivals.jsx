import React from "react";
import { FaArrowRight } from "react-icons/fa";

import Frame1 from "../assets/Frame3.png";
import Frame2 from "../assets/Frame2.png";
import Frame3 from "../assets/Frame1.png";

const products = [
  {
    image: Frame1,
  },
  {
    image: Frame2,
  },
  {
    image: Frame3,
  },
];

const NewArrivals = () => {
  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[39px] pt-8 pb-10">
      {/* Heading Section */}
      <div className="flex items-end justify-between mb-3">
        <div>
          {/* First P */}
          <p className="ml-6 text-[14px] tracking-[1.5px] text-black uppercase">
            Just Arrived
          </p>

          {/* H2 */}
          <h2 className="ml-6 mt-1 font-serif text-[25px] md:text-[27px] font-semibold text-[#171717] leading-tight">
            New Arrivals
          </h2>

          {/* Second P */}
          <p className="ml-6 text-gray-500 text-[15px] mt-2 leading-[15px]">
            The latest additions to our collection, fresh from the world's most
            <br />
            prestigious ateliers.
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
                alt={product.name}
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

export default NewArrivals;
