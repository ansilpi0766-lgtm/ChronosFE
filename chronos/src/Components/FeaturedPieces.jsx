import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { api } from "../Services/api";

const FeaturedPieces = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        const productData =
          response.data.products ||
          response.data.data ||
          (Array.isArray(response.data) ? response.data : []);

        // Display only the first 3 products
        setProducts(productData.slice(0, 3));
      } catch (err) {
        console.error("Featured products error:", err);
        setError("Unable to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[39px] pt-8 pb-10">
      {/* Heading Section */}
      <div className="flex items-end justify-between mb-4">
        <div className="ml-6">
          <p className="text-[13px] tracking-[1.5px] text-black uppercase">
            CURATED SELECTION
          </p>

          <h2 className="mt-2 font-serif text-[25px] md:text-[27px] font-semibold text-[#171717] leading-tight">
            Featured Pieces
          </h2>

          <p className="text-gray-500 text-[15px] mt-3 leading-[15px]">
            Handpicked by our curators for their exceptional craftsmanship,
            rarity,
            <br />
            and investment potential
          </p>
        </div>

        <Link
          to="/Collection"
          className="hidden md:flex items-center gap-3 text-[12px] text-[#222] hover:text-[#a67c00] transition mb-1"
        >
          View All
          <FaArrowRight className="text-[10px]" />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-16 text-center text-gray-500">
          Loading featured products...
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="py-12 text-center text-red-500">{error}</p>
      )}

      {/* No Products */}
      {!loading && !error && products.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          No products available yet.
        </p>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group relative"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-gray-200 bg-white">
                <img
                  src={product.image}
                  alt={product.name || "CHRONOS watch"}
                  className="h-full w-full object-contain p-7 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="text-center pt-5">
                <h3 className="text-base tracking-wide text-[#222]">
                  {product.name}
                </h3>

                <p className="text-base font-semibold text-gray-500 mt-2">
                  ₹{Number(product.price || 0).toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Mobile View All */}
      <div className="flex md:hidden justify-center mt-6">
        <Link
          to="/Collection"
          className="flex items-center gap-2 text-sm text-[#222]"
        >
          View All
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPieces;
