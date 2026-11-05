import React from "react";

// React Icons
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-[#421713] text-[#FFEDD0] px-6 md:px-12 py-12 overflow-hidden">
      {/* Main Footer Box */}
      <div className="relative max-w-[1200px] mx-auto border border-[#743027] rounded-[28px] px-8 md:px-14 pt-10 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* CHRONOS */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wide">
              CHRONOS
            </h2>

            <p className="mt-3 max-w-[280px] text-[11px] leading-5 text-[#e4cfc0]">
              Curating the world's finest timepieces, accessories, and art since
              1892. Each piece tells a story of uncompromising craftsmanship.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-6 h-6 rounded-full bg-[#2b100d] flex items-center justify-center hover:bg-[#FFEDD0] hover:text-[#421713] transition"
              >
                <FaFacebookF size={10} />
              </a>

              <a
                href="#"
                className="w-6 h-6 rounded-full bg-[#2b100d] flex items-center justify-center hover:bg-[#FFEDD0] hover:text-[#421713] transition"
              >
                <FaXTwitter size={10} />
              </a>

              <a
                href="#"
                className="w-6 h-6 rounded-full bg-[#2b100d] flex items-center justify-center hover:bg-[#FFEDD0] hover:text-[#421713] transition"
              >
                <FaLinkedinIn size={10} />
              </a>

              <a
                href="#"
                className="w-6 h-6 rounded-full bg-[#2b100d] flex items-center justify-center hover:bg-[#FFEDD0] hover:text-[#421713] transition"
              >
                <FaInstagram size={11} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-medium mb-4">Collections</h3>

            <ul className="space-y-2 text-[10px] text-[#dfc8b8]">
              <li>
                <a href="#" className="hover:text-white transition">
                  Timepieces
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Fine Art
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Featured
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-medium mb-4">Services</h3>

            <ul className="space-y-2 text-[10px] text-[#dfc8b8]">
              <li>
                <a href="#" className="hover:text-white transition">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Warranty
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium mb-4">Contact Us</h3>

            <div className="space-y-3 text-[9px] text-[#dfc8b8]">
              {/* Location */}
              <p>
                ◉ Sheikh Zayed Road, Dubai,
                <br />
                &nbsp;&nbsp;&nbsp;United Arab Emirates
              </p>

              {/* Phone */}
              <p className="flex gap-2 items-center">
                <FaPhone size={9} />
                +971 4 123 4567
              </p>

              {/* Email */}
              <p className="flex gap-2 items-center">
                <FaEnvelope size={9} />
                concierge@chronos.ae
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-[#743027] mt-10 pt-7">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Copyright */}
            <p className="text-[10px] text-[#dfc8b8]">
              © 2026 CHRONOS. All rights reserved.
            </p>

            {/* Bottom Links */}
            <div className="flex gap-6 text-[10px] text-[#dfc8b8]">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background CHRONOS */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-[100px] md:text-[150px] font-serif tracking-widest text-[#64241e] opacity-60 pointer-events-none whitespace-nowrap">
        CHRONOS
      </div>
    </footer>
  );
};

export default Footer;
