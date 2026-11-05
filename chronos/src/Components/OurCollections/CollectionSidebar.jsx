import React from "react";
import { ShieldCheck, Truck, BadgeCheck, Award } from "lucide-react";

const CollectionSidebar = () => {
  return (
    <aside className="hidden md:block w-[200px] shrink-0 border-r pr-6">
      {/* Collections */}
      <div className="pb-8">
        <h3 className="text-xs font-medium mb-4">COLLECTIONS</h3>

        <div className="space-y-3 text-xs text-black">
          <p className="cursor-pointer hover:text-black">Best Sellers</p>
          <p className="cursor-pointer hover:text-black">New Arrivals</p>
          <p className="cursor-pointer hover:text-black">Featured</p>
        </div>
      </div>

      {/* Price */}
      <div className="border-t pt-8 pb-8">
        <h3 className="text-xs font-medium mb-4">PRICE RANGE</h3>

        <input
          type="range"
          min="0"
          max="35000"
          defaultValue="35000"
          className="w-full accent-black cursor-pointer"
        />

        <div className="flex justify-between mt-3 text-[10px] text-black">
          <span>$0</span>
          <span>$35,000</span>
        </div>
      </div>

      {/* Shipping & Delivery */}
      <div className="border-t pt-8">
        <h3 className="text-xs font-medium mb-5">SHIPPING & DELIVERY</h3>

        <div className="space-y-5 text-[10px] text-gray-500">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="text-black shrink-0" />
            <div>
              <p className="font-medium text-black">AUTHENTICITY GUARANTEED</p>
              <p>Every price verified by our experts</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck size={20} className="text-black shrink-0" />
            <div>
              <p className="font-medium text-black">WHITE GLOVE DELIVERY</p>
              <p>Complimentary worldwide shipping</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BadgeCheck size={20} className="text-black shrink-0" />
            <div>
              <p className="font-medium text-black">30-DAY RETURNS</p>
              <p>No questions asked returns</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award size={20} className="text-black shrink-0" />
            <div>
              <p className="font-medium text-black">WARRANTY</p>
              <p>Coverage on all timepieces</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CollectionSidebar;
