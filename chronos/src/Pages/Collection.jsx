import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import CollectionHeader from "../Components/OurCollections/CollectionHeader";
import CollectionFilters from "../Components/OurCollections/CollectionFilters";
import CollectionSidebar from "../Components/OurCollections/CollectionSidebar";
import ProductGrid from "../Components/OurCollections/ProductGrid";

import { api } from "../Services/api";

const normalize = (value) => {
  if (value && typeof value === "object") {
    value = value.name || value.categoryName || value.title || "";
  }

  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
};

const categoryMatches = (productCategory, selectedCategory) => {
  const productValue = normalize(productCategory);
  const selectedValue = normalize(selectedCategory);

  if (!productValue || !selectedValue) return false;

  const aliases = {
    watches: ["watch", "watches", "timepiece", "timepieces"],
    bags: ["bag", "bags", "handbag", "handbags"],
    travelbags: ["travelbag", "travelbags", "luggage"],
    fineart: ["fineart", "art", "artwork"],
    wintercollection: ["winter", "wintercollection"],
    burgundyroom: ["burgundy", "burgundyroom"],
  };

  const group = aliases[selectedValue];

  return group ? group.includes(productValue) : productValue === selectedValue;
};

const genderMatches = (product, selectedGender) => {
  const value = normalize(
    product.gender || product.targetAudience || product.audience,
  );

  if (selectedGender === "Her") {
    return ["her", "women", "woman", "female"].includes(value);
  }

  if (selectedGender === "His") {
    return ["his", "men", "man", "male"].includes(value);
  }

  if (selectedGender === "Unisex") {
    return value === "unisex";
  }

  return true;
};

const Collection = () => {
  const [searchParams] = useSearchParams();

  const urlCategory = searchParams.get("category");
  const urlGender = searchParams.get("gender");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState(urlCategory || "All Collections");

  const [gender, setGender] = useState(urlGender || "All");

  const [collection, setCollection] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);

  // Synchronize URL filters
  useEffect(() => {
    setCategory(urlCategory || "All Collections");
    setGender(urlGender || "All");
  }, [urlCategory, urlGender]);

  // Fetch all products
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

        console.log("TOTAL PRODUCTS:", productList.length);
        console.log("PRODUCT DATA:", productList);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle category changes
  const handleCategoryChange = (value) => {
    setCategory(value);

    if (value === "All Collections") {
      setGender("All");
      setSearch("");
      setCollection("");
    }
  };

  // Handle gender changes
  const handleGenderChange = (value) => {
    setGender(value);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // All Collections means no category restriction
    if (category && category !== "All Collections") {
      result = result.filter((product) =>
        categoryMatches(product.category, category),
      );
    }

    // Gender filter
    if (gender && gender !== "All") {
      result = result.filter((product) => genderMatches(product, gender));
    }

    // New Arrivals
    if (collection === "New Arrivals") {
      result.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
      );
    }

    // Featured
    if (collection === "Featured") {
      result = result.filter(
        (product) =>
          product.isFeatured === true || product.isFeatured === "true",
      );
    }

    // Best Sellers
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
    result = result.filter((product) => Number(product.price || 0) <= maxPrice);

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          String(product.name || "")
            .toLowerCase()
            .includes(searchValue) ||
          String(product.brand || "")
            .toLowerCase()
            .includes(searchValue) ||
          normalize(product.category).includes(normalize(searchValue)) ||
          String(product.description || "")
            .toLowerCase()
            .includes(searchValue),
      );
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

  console.log("SELECTED CATEGORY:", category);
  console.log("SELECTED GENDER:", gender);
  console.log("FILTERED PRODUCTS:", filteredProducts.length);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-white text-[#421713]">
      <CollectionHeader />

      <div className="grid grid-cols-1 lg:grid-cols-[25%_minmax(0,1fr)]">
        <aside className="w-full min-w-0 border-r border-gray-200">
          <CollectionSidebar
            activeCollection={collection}
            onCollectionChange={setCollection}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </aside>

        <main className="w-full min-w-0">
          <CollectionFilters
            activeCategory={category}
            activeGender={gender}
            onCategoryChange={handleCategoryChange}
            onGenderChange={handleGenderChange}
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
