import React, { useState } from "react";

const CollectionFilters = () => {
  const [activeCategory, setActiveCategory] = useState("All Collections");

  const categories = [
    "All Collections",
    "Timepieces",
    "Accessories",
    "Fine Art",
  ];

  return (
    <div className="grid grid-cols-[220px_minmax(0,1fr)] border-b border-gray-100">
      {/* Left Filter Heading */}
      <div className="flex items-center justify-between px-12 py-3 border-r border-gray-100">
        <p className="text-[10px] font-medium">FILTERS</p>

        <button
          onClick={() => setActiveCategory("All Collections")}
          className="text-[9px] text-gray-400 hover:text-black"
        >
          Reset
        </button>
      </div>

      {/* Category Navigation */}
      <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1 text-[9px] border whitespace-nowrap transition ${
              activeCategory === category
                ? "bg-[#f2c035] border-[#f2c035] text-black"
                : "bg-white border-gray-200 text-gray-500 hover:border-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionFilters;
