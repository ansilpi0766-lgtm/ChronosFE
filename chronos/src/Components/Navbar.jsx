import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Globe, Search, ShoppingCart, User, X } from "lucide-react";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
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

        {/* Cart */}
        <ShoppingCart size={18} className="cursor-pointer" />

        {/* User */}
        <User size={18} className="cursor-pointer" />
      </div>

      {/* Search Box */}
      {searchOpen && (
        <div className="absolute right-8 top-20 w-80 bg-black/90 border border-[#FFEDD0] rounded-lg p-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full bg-transparent border-b border-[#FFEDD0] px-2 py-3 text-white outline-none placeholder:text-white/60"
          />

          <p className="mt-3 text-sm text-[#FFEDD0]">
            Searching for: {searchText}
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
