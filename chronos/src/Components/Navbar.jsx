import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Globe, Search, ShoppingCart, User, X } from "lucide-react";

import CartDrawer from "./CartDrawer";
import { useCart } from "../Context/CartContext";
import { api } from "../Services/api";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const isArabic = language === "Arabic";

  const translations = {
    English: {
      collections: "Collections",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      searchPlaceholder: "Search products...",
      searchMessage: "Search by product name, brand or category.",
      loading: "Loading products...",
      noProducts: "No products found.",
      error: "Unable to load products. Please try again.",
    },
    Arabic: {
      collections: "المجموعات",
      about: "من نحن",
      contact: "اتصل بنا",
      faq: "الأسئلة الشائعة",
      searchPlaceholder: "ابحث عن المنتجات...",
      searchMessage: "ابحث باسم المنتج أو العلامة التجارية أو الفئة",
      loading: "جارٍ تحميل المنتجات...",
      noProducts: "لم يتم العثور على منتجات.",
      error: "تعذر تحميل المنتجات. يرجى المحاولة مرة أخرى.",
    },
  };

  const t = translations[language];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { cart } = useCart();

  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

  // Navigate to About or Contact section
  const handleSectionNavigation = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/", {
        state: { scrollTo: sectionId },
      });
    }
  };

  // Fetch products when search is opened
  useEffect(() => {
    if (!searchOpen) return;

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
        console.error("Product search error:", err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchOpen, t.error]);

  // Filter products
  const filteredProducts = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) return [];

    return products.filter((product) => {
      const category =
        typeof product.category === "object"
          ? product.category?.name
          : product.category;

      return (
        product.name?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        category?.toLowerCase().includes(search)
      );
    });
  }, [products, searchText]);

  return (
    <>
      {/* Navbar */}
      <nav
        dir={isArabic ? "rtl" : "ltr"}
        className={`z-50 flex w-full items-center justify-between px-8 py-5 text-[#FFEDD0] ${
          isHomePage
            ? "absolute top-0 left-0 bg-transparent"
            : "relative bg-[#3D1613] shadow-sm"
        }`}
      >
        {/* Left Navigation */}
        <div
          className={`flex items-center gap-7 ${isArabic ? "mr-10" : "ml-10"}`}
        >
          {/* Collections */}
          <Link
            to="/Collection"
            className="cursor-pointer text-sm transition hover:text-[#D9B96E]"
          >
            {t.collections}
          </Link>

          {/* About */}
          <button
            type="button"
            onClick={() => handleSectionNavigation("about")}
            className="cursor-pointer text-sm transition hover:text-[#D9B96E]"
          >
            {t.about}
          </button>

          {/* Contact */}
          <button
            type="button"
            onClick={() => handleSectionNavigation("contact")}
            className="cursor-pointer text-sm transition hover:text-[#D9B96E]"
          >
            {t.contact}
          </button>

          {/* FAQ */}
          <Link
            to="/faq"
            className="cursor-pointer text-sm transition hover:text-[#D9B96E]"
          >
            {t.faq}
          </Link>
        </div>

        {/* Center Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2" dir="ltr">
          <h1 className="text-2xl font-normal tracking-widest">CHRONOS</h1>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5" dir="ltr">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <Globe size={17} />

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="cursor-pointer bg-transparent text-sm outline-none"
            >
              <option value="English" className="bg-[#3D1613] text-white">
                English
              </option>

              <option value="Arabic" className="bg-[#3D1613] text-white">
                العربية
              </option>
            </select>
          </div>

          {/* Search Button */}
          <button
            type="button"
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
            type="button"
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
          <Link to={isLoggedIn ? "/profile" : "/login"}>
            <User size={18} />
          </Link>
        </div>

        {/* Search Box */}
        {searchOpen && (
          <div
            dir={isArabic ? "rtl" : "ltr"}
            className={`absolute ${
              isArabic ? "left-8" : "right-8"
            } top-20 z-[60] w-80 rounded-lg border p-4 shadow-xl ${
              isHomePage
                ? "border-[#FFEDD0]/30 bg-black/95"
                : "border-[#FFEDD0]/20 bg-[#3D1613]"
            }`}
          >
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              autoFocus
              className={`w-full border-b border-[#FFEDD0] bg-transparent px-2 py-3 text-white outline-none placeholder:text-white/60 ${
                isArabic ? "text-right" : "text-left"
              }`}
            />

            <div className="mt-3 max-h-80 overflow-y-auto">
              {!searchText.trim() && (
                <p className="text-sm text-white/60">{t.searchMessage}</p>
              )}

              {loading && (
                <p className="py-3 text-sm text-white/70">{t.loading}</p>
              )}

              {error && <p className="py-3 text-sm text-red-400">{error}</p>}

              {!loading &&
                !error &&
                searchText.trim() &&
                filteredProducts.length === 0 && (
                  <p className="py-3 text-sm text-white/70">{t.noProducts}</p>
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
