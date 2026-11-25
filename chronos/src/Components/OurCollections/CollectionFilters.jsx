import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const CollectionFilters = ({
  activeCategory = "All Collections",
  activeGender = "All",
  onCategoryChange,
  onGenderChange,
  onSearch,
  onSortChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);

  const [selectedGender, setSelectedGender] = useState(activeGender);

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

  useEffect(() => {
    setSelectedCategory(activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    setSelectedGender(activeGender);
  }, [activeGender]);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    onCategoryChange?.(category);

    // Reset gender when All Collections is selected
    if (category === "All Collections") {
      setSelectedGender("All");
      onGenderChange?.("All");

      setSearchTerm("");
      onSearch?.("");
    }
  };

  const handleGender = (gender) => {
    setSelectedGender(gender);
    onGenderChange?.(gender);
  };

  const handleSearch = () => {
    onSearch?.(searchTerm);
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-gray-200 px-8 py-5 md:px-12">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => handleCategory(category)}
            className={`shrink-0 whitespace-nowrap border px-5 py-3 text-base transition ${
              selectedCategory === category
                ? "border-[#f2c035] bg-[#f2c035] text-black"
                : "border-gray-200 bg-white text-gray-600 hover:border-[#f2c035] hover:text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gender */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-8 py-5 md:px-12">
        {genders.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleGender(item)}
            className={`border px-5 py-2.5 text-base transition ${
              selectedGender === item
                ? "border-[#f2c035] bg-[#f2c035] text-black"
                : "border-gray-200 bg-white text-gray-600 hover:border-[#f2c035]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col items-stretch gap-3 px-8 py-8 md:flex-row md:items-center md:px-12">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-lg border border-gray-300 px-4">
          <Search size={19} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);

              if (!value.trim()) {
                onSearch?.("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            placeholder="Search products..."
            className="w-full text-base text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="h-12 rounded-lg bg-[#f2c035] px-7 text-base font-medium text-black transition hover:bg-[#e5b52d]"
        >
          Search
        </button>

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            onSortChange?.(e.target.value);
          }}
          className="h-12 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-700 outline-none md:w-[180px]"
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
