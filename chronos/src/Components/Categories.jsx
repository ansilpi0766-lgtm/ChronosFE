import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../Services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/categories");

        const categoryData =
          response.data.categories ||
          response.data.data ||
          (Array.isArray(response.data) ? response.data : []);

        setCategories(categoryData);
      } catch (err) {
        console.error("Categories fetch error:", err);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full bg-white px-4 pb-20 pt-[55px] sm:px-6">
      {/* Heading */}
      <div className="mt-4 text-center">
        <h2 className="font-serif text-[32px] font-semibold leading-tight text-black sm:text-[40px] md:text-[44px]">
          Explore Categories
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <p className="mt-16 text-center text-gray-500">Loading categories...</p>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="mt-16 text-center text-red-500">{error}</p>
      )}

      {/* Empty Categories */}
      {!loading && !error && categories.length === 0 && (
        <p className="mt-16 text-center text-gray-500">
          No categories available.
        </p>
      )}

      {/* Category Cards */}
      {!loading && !error && categories.length > 0 && (
        <div className="mx-auto mt-[65px] w-full max-w-[1482px] px-2 sm:px-4">
          <div className="grid grid-cols-1 gap-x-[60px] gap-y-[60px] sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                to={`/Collection?category=${encodeURIComponent(category.name)}`}
                key={category._id}
                className="
                  group
                  flex
                  h-[230px]
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-[6px]
                  border-[3px]
                  border-[#B89445]
                  bg-[#421713]
                  px-5
                  text-center
                  shadow-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                {/* Category Name */}
                <h3 className="font-serif text-[25px] font-medium text-white transition-colors duration-300 group-hover:text-[#D9B96E] sm:text-[29px]">
                  {category.name}
                </h3>

                {/* Golden Divider */}
                <div className="my-[17px] h-[1px] w-[60px] bg-[#C5A45D]" />

                {/* Category Description */}
                <p className="text-[15px] font-normal text-white sm:text-[17px]">
                  {category.description || `Luxury ${category.name} Collection`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Categories;
