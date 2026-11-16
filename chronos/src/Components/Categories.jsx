import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../Services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const [categoryResponse, productResponse] = await Promise.all([
          api.get("/categories"),
          api.get("/products"),
        ]);

        const categoryData =
          categoryResponse.data.categories ||
          categoryResponse.data.data ||
          (Array.isArray(categoryResponse.data) ? categoryResponse.data : []);

        const productData =
          productResponse.data.products ||
          productResponse.data.data ||
          (Array.isArray(productResponse.data) ? productResponse.data : []);

        setCategories(categoryData);
        setProducts(productData);
      } catch (err) {
        console.error("Categories fetch error:", err);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get product count for each category
  const getProductCount = (category) => {
    return products.filter((product) => {
      const productCategory = product.category;

      if (!productCategory) return false;

      if (typeof productCategory === "object") {
        return (
          productCategory._id === category._id ||
          productCategory.name?.toLowerCase() === category.name?.toLowerCase()
        );
      }

      return (
        productCategory.toLowerCase() === category.name?.toLowerCase() ||
        productCategory === category._id
      );
    }).length;
  };

  return (
    <section className="w-full bg-white px-6 pb-20 pt-1">
      {/* Top Line */}
      <div className="mx-auto max-w-[1044px] border-t border-[#e6e6e6]" />

      {/* Heading */}
      <div className="mt-[64px] text-center">
        <p className="mb-[8px] text-[11px] font-normal text-[#333]">
          OUR COLLECTIONS
        </p>

        <h2 className="font-serif text-[30px] font-semibold leading-[1.1] text-[#171717]">
          Explore Categories
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-12 text-center text-gray-500">Loading categories...</p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="mt-12 text-center text-red-500">{error}</p>
      )}

      {/* Empty Categories */}
      {!loading && !error && categories.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No categories available.
        </p>
      )}

      {/* Category Cards */}
      {!loading && !error && categories.length > 0 && (
        <div className="mx-auto mt-[49px] grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[60px]">
          {categories.map((category) => (
            <Link
              to={`/Collection?category=${encodeURIComponent(category.name)}`}
              key={category._id}
              className="group relative h-[200px] overflow-hidden rounded-[15px] bg-[#171717] shadow-md"
            >
              {/* Category Image */}
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

              {/* Category Details */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>

                  <p className="mt-2 max-w-[230px] text-xs leading-5 text-white/75">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/90">
                    {getProductCount(category)} items
                  </span>

                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
