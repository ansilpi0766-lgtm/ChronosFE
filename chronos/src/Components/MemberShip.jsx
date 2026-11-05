import React from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  UserRoundPlus,
} from "lucide-react";

const Membership = () => {
  return (
    <section className="w-full bg-white border-t border-gray-200 px-6 py-20">
      {/* Top Content */}
      <div className="max-w-[700px] mx-auto text-center">
        {/* Small Red Heading */}
        <p className="text-[11px] text-red-500 tracking-wide mb-3">
          EXCLUSIVE MEMBERSHIP
        </p>

        {/* Main Heading */}
        <h2 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-[#333]">
          Join the Circle of
          <br />
          <span className="text-[#666]">Distinguished Collectors</span>
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm leading-5 text-gray-400 max-w-[600px] mx-auto">
          Gain access to private viewings, first looks at rare acquisitions, and
          <br className="hidden md:block" />
          exclusive events in the world's finest venues.
        </p>

        {/* Button */}
        <button
          className="mt-5 bg-[#ffc400] text-black text-[10px]
          px-5 py-3 flex items-center gap-2 mx-auto
          hover:bg-[#eab500] transition"
        >
          <UserRoundPlus size={12} />
          REQUEST MEMBERSHIP
        </button>
      </div>

      {/* Benefits */}
      <div className="max-w-[1100px] mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Benefit 1 */}
        <div className="text-center">
          <ShieldCheck
            size={22}
            strokeWidth={1.5}
            className="mx-auto text-black"
          />

          <h3 className="mt-5 text-[11px] font-semibold tracking-widest text-[#333]">
            AUTHENTICITY GUARANTEED
          </h3>

          <p className="mt-2 text-[10px] text-gray-400">
            Every piece verified by our experts
          </p>
        </div>

        {/* Benefit 2 */}
        <div className="text-center">
          <Truck size={22} strokeWidth={1.5} className="mx-auto text-black" />

          <h3 className="mt-5 text-[11px] font-semibold tracking-widest text-[#333]">
            WHITE GLOVE DELIVERY
          </h3>

          <p className="mt-2 text-[10px] text-gray-400">
            Complimentary worldwide shipping
          </p>
        </div>

        {/* Benefit 3 */}
        <div className="text-center">
          <RotateCcw
            size={22}
            strokeWidth={1.5}
            className="mx-auto text-black"
          />

          <h3 className="mt-5 text-[11px] font-semibold tracking-widest text-[#333]">
            30-DAY RETURNS
          </h3>

          <p className="mt-2 text-[10px] text-gray-400">
            No questions asked returns
          </p>
        </div>

        {/* Benefit 4 */}
        <div className="text-center">
          <Award size={22} strokeWidth={1.5} className="mx-auto text-black" />

          <h3 className="mt-5 text-[11px] font-semibold tracking-widest text-[#333]">
            WARRANTY
          </h3>

          <p className="mt-2 text-[10px] text-gray-400">
            Coverage on all timepieces
          </p>
        </div>
      </div>
    </section>
  );
};

export default Membership;
