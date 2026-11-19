import React, { useState } from "react";
import { Search } from "lucide-react";

const CollectionFilters = ({
  onCategoryChange,
  onGenderChange,
  onSearch,
  onSortChange,
}) => {
  const [activeCategory, setActiveCategory] = useState("All Collections");
  const [activeGender, setActiveGender] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");

  const categories = [
    "All Collections",
    "Watches",
    "Bags",
    "Travel Bags",
    "Fine Art",
    "Winter Collection",
    "Burgundy Room",
  ];

  const genders = ["All", "Her", "His"];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  const handleGenderChange = (gender) => {
    setActiveGender(gender);
    onGenderChange?.(gender);
  };

  const handleSearch = () => {
    onSearch?.(searchTerm);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      {/* Collection Categories */}
      <div className="flex items-center gap-2 px-8 md:px-12 py-5 overflow-x-auto border-b border-gray-200">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`shrink-0 border px-5 py-3 text-base whitespace-nowrap transition ${
              activeCategory === category
                ? "bg-[#f2c035] border-[#f2c035] text-black"
                : "bg-white border-gray-200 text-gray-600 hover:border-[#f2c035] hover:text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gender Filters */}
      <div className="flex items-center gap-3 px-8 md:px-12 py-5 border-b border-gray-200">
        {genders.map((gender) => (
          <button
            key={gender}
            onClick={() => handleGenderChange(gender)}
            className={`border px-5 py-2.5 text-base transition ${
              activeGender === gender
                ? "bg-[#f2c035] border-[#f2c035] text-black"
                : "bg-white border-gray-200 text-gray-600 hover:border-[#f2c035]"
            }`}
          >
            {gender}
          </button>
        ))}
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 px-8 md:px-12 py-8">
        {/* Search Input */}
        <div className="flex flex-1 items-center gap-3 border border-gray-300 rounded-lg px-4 h-12">
          <Search size={19} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search products..."
            className="w-full outline-none text-base text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="h-12 px-7 rounded-lg bg-[#f2c035] text-black text-base font-medium hover:bg-[#e5b52d] transition"
        >
          Search
        </button>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="h-12 w-full md:w-[115px] rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-700 outline-none cursor-pointer"
        >
          <option value="">Sort</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default CollectionFilters;
