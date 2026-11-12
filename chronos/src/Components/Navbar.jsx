import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, ShoppingCart, User, X } from "lucide-react";

import CartDrawer from "./CartDrawer";
import { useCart } from "../Context/CartContext";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0,
  );

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

          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
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
          <div className="absolute right-8 top-20 w-80 rounded-lg border border-[#FFEDD0] bg-black/90 p-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border-b border-[#FFEDD0] bg-transparent px-2 py-3 text-white outline-none placeholder:text-white/60"
            />

            <p className="mt-3 text-sm text-[#FFEDD0]">
              Searching for: {searchText}
            </p>
          </div>
        )}
      </nav>

      {/* Shopping Bag Drawer */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Navbar;
