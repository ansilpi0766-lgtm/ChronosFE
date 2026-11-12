import React, { useState } from "react";
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Award,
  RefreshCcw,
} from "lucide-react";

const CollectionSidebar = () => {
  const [price, setPrice] = useState(35000);

  const collections = ["Best Sellers", "New Arrivals", "Featured"];

  const services = [
    {
      icon: ShieldCheck,
      title: "AUTHENTICITY GUARANTEED",
      description: "Every piece verified by our experts",
    },
    {
      icon: Truck,
      title: "WHITE GLOVE DELIVERY",
      description: "Complimentary worldwide shipping",
    },
    {
      icon: RefreshCcw,
      title: "30-DAY RETURNS",
      description: "No questions asked returns",
    },
    {
      icon: Award,
      title: "WARRANTY",
      description: "Coverage on all timepieces",
    },
  ];

  return (
    <aside className="w-full border-r border-gray-100">
      {/* Collections */}
      <div className="px-12 py-7 border-b border-gray-100">
        <h3 className="text-[10px] font-medium mb-4">COLLECTIONS</h3>

        <div className="flex flex-wrap gap-2">
          {collections.map((item) => (
            <button
              key={item}
              className="bg-gray-100 hover:bg-[#f2c035] px-2 py-1 text-[9px] transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="px-12 py-7 border-b border-gray-100">
        <h3 className="text-[10px] font-medium mb-4">PRICE RANGE</h3>

        <input
          type="range"
          min="0"
          max="35000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-1 accent-black cursor-pointer"
        />

        <div className="flex justify-between text-[9px] mt-2">
          <span>$0</span>
          <span>$35,000</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="border border-gray-200 rounded-full px-2 py-1 text-[9px]">
            $0.00
          </span>

          <span className="text-[9px] text-gray-400">To</span>

          <span className="border border-gray-200 rounded-full px-2 py-1 text-[9px]">
            ${price.toLocaleString("en-US")}
          </span>
        </div>
      </div>

      {/* Shipping and Delivery */}
      <div className="px-12 py-7">
        <h3 className="text-[10px] font-medium mb-6">SHIPPING & DELIVERY</h3>

        <div className="space-y-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div key={index} className="flex items-start gap-3">
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  className="shrink-0 text-black"
                />

                <div>
                  <p className="text-[8px] font-semibold tracking-wide">
                    {service.title}
                  </p>

                  <p className="text-[8px] text-gray-400 mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CollectionSidebar;
