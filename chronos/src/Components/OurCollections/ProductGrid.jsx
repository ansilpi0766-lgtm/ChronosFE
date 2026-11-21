import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products = [],
  loading,
  error,
  activeGender,
  activeCollection,
}) => {
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setVisibleCount(4);
  }, [products, activeGender, activeCollection]);

  if (loading) {
    return (
      <p className="py-16 text-center text-sm text-gray-400">
        Loading products...
      </p>
    );
  }

  if (error) {
    return <p className="py-16 text-center text-sm text-red-500">{error}</p>;
  }

  const missingDataMessage =
    activeGender !== "All"
      ? "Gender filtering needs a gender field in your product database."
      : activeCollection === "Featured"
        ? "Featured filtering needs an isFeatured field in your product database."
        : activeCollection === "Best Sellers"
          ? "Best Sellers needs sales information in your product database."
          : "";

  return (
    <div className="min-w-0 flex-1">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <p className="text-xs text-gray-500">
          {products.length} products found
        </p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-x-5 gap-y-8 p-5">
            {products.slice(0, visibleCount).map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>

          {visibleCount < products.length && (
            <div className="flex justify-center py-8">
              <button
                onClick={() => setVisibleCount((previous) => previous + 4)}
                className="bg-[#f2c035] px-8 py-3 text-[10px] transition hover:bg-black hover:text-white"
              >
                LOAD MORE
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="px-5 py-16 text-center">
          <p className="text-sm text-gray-500">No products found.</p>

          {missingDataMessage && (
            <p className="mt-3 text-xs text-gray-400">{missingDataMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
