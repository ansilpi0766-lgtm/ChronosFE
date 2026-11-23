import React, { useEffect, useMemo, useState } from "react";

import CollectionHeader from "../Components/OurCollections/CollectionHeader";
import CollectionFilters from "../Components/OurCollections/CollectionFilters";
import CollectionSidebar from "../Components/OurCollections/CollectionSidebar";
import ProductGrid from "../Components/OurCollections/ProductGrid";

import { api } from "../Services/api";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All Collections");
  const [gender, setGender] = useState("All");
  const [collection, setCollection] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(35000);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        const data = response.data;

        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : Array.isArray(data.data)
              ? data.data
              : Array.isArray(data.data?.products)
                ? data.data.products
                : [];

        setProducts(productList);

        console.log("CHRONOS Collection Products:", productList);
      } catch (err) {
        console.error("Collection products error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load products. Please check your backend connection.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Normalize category names
  const normalizeCategory = (value) => {
    return String(typeof value === "object" ? value?.name || "" : value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, "");
  };

  // Category matching
  const categoryMatches = (productCategory, selectedCategory) => {
    const productValue = normalizeCategory(productCategory);
    const selectedValue = normalizeCategory(selectedCategory);

    if (!productValue || !selectedValue) return false;

    const categoryGroups = {
      watches: ["watch", "watches", "timepiece", "timepieces"],
      bags: ["bag", "bags", "handbag", "handbags"],
      travelbags: ["travelbag", "travelbags", "luggage"],
      fineart: ["fineart", "art", "artwork"],
      wintercollection: ["winter", "wintercollection"],
      burgundyroom: ["burgundy", "burgundyroom"],
    };

    const group = categoryGroups[selectedValue];

    if (group) {
      return group.includes(productValue);
    }

    return productValue === selectedValue;
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== "All Collections") {
      result = result.filter((product) =>
        categoryMatches(product.category, category),
      );
    }

    // Gender filter
    if (gender !== "All") {
      result = result.filter((product) => {
        const productGender =
          product.gender || product.targetAudience || product.audience || "";

        const value = String(productGender).toLowerCase().trim();

        if (gender === "Her") {
          return ["her", "women", "woman", "female"].includes(value);
        }

        if (gender === "His") {
          return ["his", "men", "man", "male"].includes(value);
        }

        return true;
      });
    }

    // Sidebar collections
    if (collection === "New Arrivals") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    if (collection === "Featured") {
      result = result.filter((product) => product.isFeatured === true);
    }

    if (collection === "Best Sellers") {
      result = result.filter(
        (product) =>
          Number(
            product.salesCount ?? product.soldCount ?? product.totalSales ?? 0,
          ) > 0,
      );

      result.sort(
        (a, b) =>
          Number(b.salesCount ?? b.soldCount ?? b.totalSales ?? 0) -
          Number(a.salesCount ?? a.soldCount ?? a.totalSales ?? 0),
      );
    }

    // Price filter
    result = result.filter((product) => Number(product.price) <= maxPrice);

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter((product) => {
        const productCategory =
          typeof product.category === "object"
            ? product.category?.name
            : product.category;

        return (
          String(product.name || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.brand || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(productCategory || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.description || "")
            .toLowerCase()
            .includes(searchValue)
        );
      });
    }

    // Sorting
    if (sort === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "name-asc") {
      result.sort((a, b) =>
        String(a.name || "").localeCompare(String(b.name || "")),
      );
    } else if (sort === "name-desc") {
      result.sort((a, b) =>
        String(b.name || "").localeCompare(String(a.name || "")),
      );
    }

    return result;
  }, [products, category, gender, collection, maxPrice, search, sort]);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white text-[#421713]">
      <CollectionHeader />

      <div className="grid grid-cols-1 lg:grid-cols-[25%_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="w-full min-w-0 border-r border-gray-200">
          <CollectionSidebar
            activeCollection={collection}
            onCollectionChange={setCollection}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </aside>

        {/* Main Collection */}
        <main className="w-full min-w-0">
          <CollectionFilters
            onCategoryChange={setCategory}
            onGenderChange={setGender}
            onSearch={setSearch}
            onSortChange={setSort}
          />

          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
            activeGender={gender}
            activeCollection={collection}
          />
        </main>
      </div>
    </div>
  );
};

export default Collection;
