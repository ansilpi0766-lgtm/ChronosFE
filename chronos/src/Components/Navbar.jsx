import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, ShoppingCart, User, X } from "lucide-react";

import CartDrawer from "./CartDrawer";
import { useCart } from "../Context/CartContext";
import { api } from "../Services/api";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  // Fetch products when search is opened
  useEffect(() => {
    if (!searchOpen) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        // Supports common API response formats
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
        console.error("Product search error:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchOpen]);

  // Filter products based on search text
  const filteredProducts = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) return [];

    return products.filter((product) => {
      return (
        product.name?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        product.category?.toLowerCase().includes(search)
      );
    });
  }, [products, searchText]);

  return (
    <>
      <nav className="absolute top-0 left-0 z-50 w-full flex items-center justify-between px-8 py-5 text-[#FFEDD0]">
        {/* Left Navigation */}
        <div className="flex items-center gap-7 ml-10">
          <Link to="/Collection" className="cursor-pointer text-sm">
            Collections
          </Link>

          <Link to="/timepieces" className="cursor-pointer text-sm">
            Timepieces
          </Link>

          <Link to="/accessories" className="cursor-pointer text-sm">
            Accessories
          </Link>

          <Link to="/fine-art" className="cursor-pointer text-sm">
            Fine Art
          </Link>
        </div>

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-2xl font-normal tracking-widest">CHRONOS</h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Globe size={17} />
            <p className="text-sm">English</p>
          </div>

          {/* Search Button */}
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              setSearchText("");
            }}
            className="cursor-pointer"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>

          {/* Shopping Cart */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative cursor-pointer"
          >
            <ShoppingCart size={18} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFC400] text-[9px] text-black">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          <Link to="/login">
            <User size={18} />
          </Link>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <div className="absolute right-8 top-20 w-80 rounded-lg border border-[#FFEDD0]/30 bg-black/95 p-4 shadow-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
              className="w-full border-b border-[#FFEDD0] bg-transparent px-2 py-3 text-white outline-none placeholder:text-white/60"
            />

            <div className="mt-3 max-h-80 overflow-y-auto">
              {!searchText.trim() && (
                <p className="text-sm text-white/60">
                  Search by product name, brand or category.
                </p>
              )}

              {loading && (
                <p className="py-3 text-sm text-white/70">
                  Loading products...
                </p>
              )}

              {error && <p className="py-3 text-sm text-red-400">{error}</p>}

              {!loading &&
                !error &&
                searchText.trim() &&
                filteredProducts.length === 0 && (
                  <p className="py-3 text-sm text-white/70">
                    No products found.
                  </p>
                )}

              {!loading &&
                filteredProducts.map((product) => (
                  <Link
                    key={product._id || product.id}
                    to={`/product/${product._id || product.id}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchText("");
                    }}
                    className="flex items-center gap-3 border-b border-white/10 p-3 transition hover:bg-white/10"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-14 rounded object-cover"
                    />

                    <div>
                      <p className="text-sm text-[#FFEDD0]">{product.name}</p>

                      <p className="mt-1 text-xs text-white/60">
                        {product.brand}
                      </p>

                      <p className="mt-1 text-sm text-[#FFC400]">
                        ₹{product.price}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </nav>

      {/* Shopping Bag Drawer */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Navbar;
