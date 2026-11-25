import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { api } from "../Services/api";

const Categories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // POPUP STATE
  const [selectedCategory, setSelectedCategory] = useState(null);

  // FETCH CATEGORIES
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

  // CLOSE POPUP WITH ESCAPE
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSelectedCategory(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // OPEN POPUP
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // CLOSE POPUP
  const closePopup = () => {
    setSelectedCategory(null);
  };

  // NAVIGATE TO COLLECTION
  const handleCollectionSelect = (gender = "") => {
    if (!selectedCategory) return;

    const params = new URLSearchParams();

    params.set("category", selectedCategory.name);

    if (gender) {
      params.set("gender", gender);
    }

    navigate(`/Collection?${params.toString()}`);

    setSelectedCategory(null);
  };

  return (
    <section className="w-full bg-white px-4 pb-20 pt-[55px] sm:px-6">
      {/* HEADING */}
      <div className="mt-4 text-center">
        <h2 className="font-serif text-[32px] font-semibold leading-tight text-black sm:text-[40px] md:text-[44px]">
          Explore Categories
        </h2>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="mt-16 text-center text-gray-500">Loading categories...</p>
      )}

      {/* ERROR */}
      {!loading && error && (
        <p className="mt-16 text-center text-red-500">{error}</p>
      )}

      {/* EMPTY CATEGORIES */}
      {!loading && !error && categories.length === 0 && (
        <p className="mt-16 text-center text-gray-500">
          No categories available.
        </p>
      )}

      {/* CATEGORY CARDS */}
      {!loading && !error && categories.length > 0 && (
        <div className="mx-auto mt-[65px] w-full max-w-[1482px] px-2 sm:px-4">
          <div className="grid grid-cols-1 gap-x-[60px] gap-y-[60px] sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <button
                type="button"
                onClick={() => handleCategoryClick(category)}
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
                {/* CATEGORY NAME */}
                <h3 className="font-serif text-[25px] font-medium text-white transition-colors duration-300 group-hover:text-[#D9B96E] sm:text-[29px]">
                  {category.name}
                </h3>

                {/* GOLD DIVIDER */}
                <div className="my-[17px] h-[1px] w-[60px] bg-[#C5A45D]" />

                {/* CATEGORY DESCRIPTION */}
                <p className="text-[15px] font-normal text-white sm:text-[17px]">
                  {category.description || `Luxury ${category.name} Collection`}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =====================================
          COLLECTION SELECTION POPUP
      ===================================== */}

      {selectedCategory && (
        <div
          onClick={closePopup}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-black/60
            px-4
            py-8
            backdrop-blur-md
            animate-[fadeIn_0.3s_ease]
          "
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={closePopup}
            aria-label="Close popup"
            className="
              absolute
              right-6
              top-6
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-white/10
              text-white
              transition
              hover:rotate-90
              hover:bg-white/20
              sm:right-8
              sm:top-8
            "
          >
            <X size={21} />
          </button>

          {/* POPUP CONTENT */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              w-full
              max-w-[590px]
              text-center
              animate-[popupIn_0.35s_ease]
            "
          >
            {/* CATEGORY NAME */}
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[4px] text-[#D9B96E]">
              {selectedCategory.name}
            </p>

            {/* POPUP HEADING */}
            <h2
              className="
              mb-10
              font-serif
              text-[32px]
              font-medium
              text-[#FFEDD0]
              sm:text-[42px]
            "
            >
              Shop by Collection
            </h2>

            {/* GOLD DIVIDER */}
            <div className="mx-auto mb-12 h-[1px] w-[65px] bg-[#C5A45D]" />

            {/* HIS AND HER COLLECTION */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* HIS COLLECTION */}
              <button
                type="button"
                onClick={() => handleCollectionSelect("His")}
                className="
                  flex
                  min-h-[170px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[6px]
                  border-[3px]
                  border-[#B89445]
                  bg-[#421713]
                  px-4
                  py-7
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#57221B]
                  hover:shadow-xl
                "
              >
                <h3 className="font-serif text-[25px] font-medium text-[#FFEDD0] sm:text-[27px]">
                  His Collection
                </h3>

                <div className="my-4 h-[1px] w-[55px] bg-[#C5A45D]" />

                <p className="font-serif text-[15px] text-[#FFEDD0]">
                  Explore Collection
                </p>
              </button>

              {/* HER COLLECTION */}
              <button
                type="button"
                onClick={() => handleCollectionSelect("Her")}
                className="
                  flex
                  min-h-[170px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[6px]
                  border-[3px]
                  border-[#B89445]
                  bg-[#421713]
                  px-4
                  py-7
                  text-center
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#57221B]
                  hover:shadow-xl
                "
              >
                <h3 className="font-serif text-[25px] font-medium text-[#FFEDD0] sm:text-[27px]">
                  Her Collection
                </h3>

                <div className="my-4 h-[1px] w-[55px] bg-[#C5A45D]" />

                <p className="font-serif text-[15px] text-[#FFEDD0]">
                  Explore Collection
                </p>
              </button>
            </div>

            {/* VIEW ALL PRODUCTS */}
            <button
              type="button"
              onClick={() => handleCollectionSelect()}
              className="
                mt-10
                border-b
                border-white/50
                pb-1
                text-[13px]
                font-medium
                tracking-[2px]
                text-white/80
                transition
                hover:border-[#D9B96E]
                hover:text-[#D9B96E]
              "
            >
              VIEW ALL PRODUCTS
            </button>
          </div>

          {/* ANIMATIONS */}
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes popupIn {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.96);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default Categories;
