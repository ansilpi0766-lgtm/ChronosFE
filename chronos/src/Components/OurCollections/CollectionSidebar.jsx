import React from "react";
import { ShieldCheck, Truck, Award, RefreshCcw } from "lucide-react";

const CollectionSidebar = ({
  activeCollection = "",
  onCollectionChange,
  maxPrice = 35000,
  onMaxPriceChange,
}) => {
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
      <div className="border-b border-gray-100 px-12 py-7">
        <h3 className="mb-5 text-sm font-semibold">COLLECTIONS</h3>

        <div className="flex flex-wrap gap-2">
          {collections.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                onCollectionChange?.(activeCollection === item ? "" : item)
              }
              className={`px-3 py-2 text-sm font-medium transition ${
                activeCollection === item
                  ? "bg-[#f2c035] text-black"
                  : "bg-gray-100 hover:bg-[#f2c035]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-100 px-12 py-7">
        <h3 className="mb-5 text-sm font-semibold">PRICE RANGE</h3>

        <input
          type="range"
          min="0"
          max="35000"
          step="100"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange?.(Number(e.target.value))}
          className="h-1 w-full cursor-pointer accent-black"
        />

        <div className="mt-3 flex justify-between text-xs">
          <span>$0</span>
          <span>$35,000</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="rounded-full border border-gray-200 px-3 py-2 text-xs">
            $0.00
          </span>

          <span className="text-xs text-gray-400">To</span>

          <span className="rounded-full border border-gray-200 px-3 py-2 text-xs">
            ${maxPrice.toLocaleString("en-US")}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onMaxPriceChange?.(35000)}
          className="mt-3 text-xs text-gray-500 underline hover:text-black"
        >
          Reset price
        </button>
      </div>

      {/* Shipping and Delivery */}
      <div className="px-12 py-7">
        <h3 className="mb-6 text-sm font-semibold">SHIPPING & DELIVERY</h3>

        <div className="space-y-7">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div key={index} className="flex items-start gap-3">
                <Icon
                  size={19}
                  strokeWidth={1.5}
                  className="shrink-0 text-black"
                />

                <div>
                  <p className="text-xs font-semibold tracking-wide">
                    {service.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
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
