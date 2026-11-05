import React from "react";
import ProductCard from "./ProductCard";

import picture1 from "../../assets/picture1.png";
import picture2 from "../../assets/picture2.png";
import picture3 from "../../assets/picture3.png";
import picture4 from "../../assets/picture4.png";
import picture5 from "../../assets/picture5.png";
import picture6 from "../../assets/picture6.png";

const products = [
  {
    image: picture1,
  },
  {
    image: picture2,
  },
  {
    image: picture3,
  },
  {
    image: picture4,
  },
  {
    image: picture5,
  },
  {
    image: picture6,
  },
];

const ProductGrid = () => {
  return (
    <div className="flex-1 min-w-0">
      {/* Search and Sort */}
      <div className="flex justify-end items-center gap-3 mb-5">
        <input
          type="text"
          placeholder="⌕ Search here"
          className="w-40 md:w-52 border border-gray-200 px-3 py-2 text-[9px] outline-none"
        />

        <select className="border border-gray-200 px-3 py-2 text-[9px] outline-none">
          <option>Sort by</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-10">
        <button className="bg-[#f2c035] px-7 py-2 text-[9px]">LOAD MORE</button>
      </div>
    </div>
  );
};

export default ProductGrid;
