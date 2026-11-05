import React from "react";
import Home from "../assets/Home.jpg";
import watch from "../assets/watch.png";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img src={Home} alt="Chronos" className="w-full h-full object-cover" />

      {/* Hero Content */}
      <div className="absolute left-16 top-1/2 -translate-y-1/2 max-w-2xl">
        {/* Small Heading */}
        <p className="inline-block rounded-full border border-[#FFEDD0] px-5 py-2 text-sm tracking-normal text-[#FFEDD0] mb-2">
          Curated Excellence Since 1892
        </p>
        {/* Main Heading */}
        <h1
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-7xl font-semibold leading-tight mb-6 "
        >
          <span className="text-white">Not just another</span>

          <br />

          <span className="text-[#f2c035] italic text-8xl">luxury store.</span>
        </h1>
        {/* Description */}
        <p className="text-base leading-7 text-white/90 mb-5">
          Discover an extraordinary collection of luxury timepieces, bespoke
          <br />
          accessories, and museum-quality paintings crafted for the discerning
          <br />
          collector.
        </p>

        {/* Button */}
        <button className="border border-[#FFEDD0] text-[#fff7f7] px-8 py-3 rounded-full text-sm tracking-widest hover:bg-[#FFEDD0] hover:text-black transition duration-300">
          Explore Collection
        </button>
      </div>

      {/* Limited Edition Watch */}
      <div className="absolute bottom-16 right-28 flex flex-col items-center">
        {/* Watch Image */}
        <img
          src={watch}
          alt="Limited Edition Watch"
          className="w-50 h-50 object-cover"
        />

        {/* Limited Edition */}
        <p className="text-red-500 text-sm tracking-normal font-medium mt-3">
          LIMITED EDITION
        </p>

        {/* Watch Name */}
        <p className="text-white text-lg tracking-wider mt-2">
          Midnight Tourbillion
        </p>
      </div>
    </div>
  );
};

export default Hero;
