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

  // Fetch products from CHRONOS backend
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (category !== "All Collections") {
      result = result.filter((product) => {
        const productCategory =
          typeof product.category === "object"
            ? product.category?.name
            : product.category;

        return (
          String(productCategory || "")
            .toLowerCase()
            .trim() === category.toLowerCase().trim()
        );
      });
    }

    // Gender filter
    if (gender !== "All") {
      result = result.filter((product) => {
        const productGender =
          product.gender || product.targetAudience || product.audience || "";

        return String(productGender).toLowerCase() === gender.toLowerCase();
      });
    }

    // Sidebar collection filter
    if (collection === "New Arrivals") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime(),
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

    // Maximum price
    result = result.filter((product) => Number(product.price) <= maxPrice);

    // Search by product name, brand or category
    if (search.trim()) {
      const searchValue = search.toLowerCase().trim();

      result = result.filter((product) => {
        const productCategory =
          typeof product.category === "object"
            ? product.category?.name
            : product.category;

        return (
          product.name?.toLowerCase().includes(searchValue) ||
          product.brand?.toLowerCase().includes(searchValue) ||
          String(productCategory || "")
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
      result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sort === "name-desc") {
      result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    }

    return result;
  }, [products, category, gender, collection, maxPrice, search, sort]);

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
