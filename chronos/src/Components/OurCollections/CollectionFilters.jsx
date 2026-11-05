import React from "react";

const CollectionFilters = () => {
  const categories = [
    "All Collections",
    "Timepieces",
    "Accessories",
    "Fine Art",
  ];

  return (
    <div className="flex items-center border-b px-6 md:px-10 py-4">
      <p className="text-xs font-medium ">FILTERS</p>

      <div className="flex items-center gap-6 ml-78">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`px-4 py-2 text-[10px] border whitespace-nowrap ${
              index === 0
                ? "bg-[#f2c035] border-[#f2c035]"
                : "bg-white border-gray-200"
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
