import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { api } from "../Services/api";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch latest products from backend
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        const productData =
          response.data.products ||
          response.data.data ||
          (Array.isArray(response.data) ? response.data : []);

        // Sort newest products first
        const latestProducts = [...productData].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );

        setProducts(latestProducts.slice(0, 3));
      } catch (err) {
        console.error("New arrivals error:", err);
        setError("Unable to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="w-full bg-white px-6 md:px-10 lg:px-[39px] pt-8 pb-10">
      {/* Heading Section */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <p className="ml-6 text-[14px] tracking-[1.5px] text-black uppercase">
            Just Arrived
          </p>

          <h2 className="ml-6 mt-1 font-serif text-[25px] md:text-[27px] font-semibold text-[#171717] leading-tight">
            New Arrivals
          </h2>

          <p className="ml-6 text-gray-500 text-[15px] mt-2 leading-[15px]">
            The latest additions to our collection, fresh from the world's most
            <br />
            prestigious ateliers.
          </p>
        </div>

        {/* View All */}
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
        <p className="py-16 text-center text-gray-500">
          Loading new arrivals...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="py-12 text-center text-red-500">{error}</p>
      )}

      {/* Empty Products */}
      {!loading && !error && products.length === 0 && (
        <p className="py-12 text-center text-gray-500">
          No new products available.
        </p>
      )}

      {/* Products */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="relative group"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-gray-200 bg-white">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name || "CHRONOS product"}
                  className="w-full h-full object-contain p-7 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Details */}
              <div className="text-center pt-3">
                <h3 className="text-[14px] tracking-wide text-[#222]">
                  {product.name}
                </h3>

                <p className="text-[14px] font-semibold text-gray-500 mt-1.5">
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

export default NewArrivals;
