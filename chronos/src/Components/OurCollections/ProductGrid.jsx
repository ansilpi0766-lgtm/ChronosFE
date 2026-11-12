import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const API_URL = "https://chronosbe.onrender.com/api/v1";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/products`);

        // Handle different backend response formats
        const data = response.data;

        const productList = Array.isArray(data)
          ? data
          : data.products || data.data?.products || data.data || [];

        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search and sort products
  const filteredProducts = products
    .filter((product) =>
      (product.name || "").toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "low") {
        return Number(a.price) - Number(b.price);
      }

      if (sort === "high") {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

  return (
    <div className="min-w-0 flex-1">
      {/* Search and Sort */}
      <div className="flex justify-end items-center gap-3 mb-0 border-b border-gray-100 px-5 py-3">
        <div className="border border-gray-200 px-2 py-1 flex items-center">
          <span className="text-gray-500 text-xs">⌕</span>

          <input
            type="text"
            placeholder="Search here"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(4);
            }}
            className="w-28 md:w-36 text-[9px] outline-none px-1"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-200 px-2 py-1 text-[9px] outline-none bg-white"
        >
          <option value="">Sort by</option>
          <option value="low">Price Low to High</option>
          <option value="high">Price High to Low</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-sm text-gray-400 py-16">
          Loading products...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="text-center text-sm text-red-500 py-16">{error}</p>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 p-5">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* No Products */}
          {filteredProducts.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-16">
              No products found.
            </p>
          )}

          {/* Load More */}
          {visibleCount < filteredProducts.length && (
            <div className="flex justify-center py-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-[#f2c035] px-8 py-3 text-[9px] hover:bg-black hover:text-white transition"
              >
                LOAD MORE
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
