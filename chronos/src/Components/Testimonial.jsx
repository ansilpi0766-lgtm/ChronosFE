import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonial = () => {
  return (
    <section className="w-full bg-[#f5f5f5] py-20 px-6">
      <div className="max-w-[800px] mx-auto text-center">
        {/* Quote Icon */}
        <div className="text-[#d5a73b] text-5xl font-serif leading-none mb-5">
          “
        </div>

        {/* Review */}
        <p className="font-serif font-semibold text-[#292929] text-lg md:text-xl leading-[1.1] max-w-[700px] mx-auto">
          "The Royal Chronograph exceeded every expectation. The attention to
          detail and the personalized service from Chronos made this acquisition
          truly special. A masterpiece for my collection."
        </p>

        {/* Stars */}
        <div className="flex justify-center gap-[2px] mt-7 text-[#ffc400] text-sm">
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>

        {/* Customer Name */}
        <h3 className="mt-2 text-[12px] font-medium text-[#222]">
          Alexander Rothschild
        </h3>

        {/* Customer Type */}
        <p className="text-[9px] text-gray-400 mt-0.5">
          Private Collector, Geneva
        </p>

        {/* Slider Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="text-gray-400 hover:text-gray-700 transition">
            <ChevronLeft size={12} />
          </button>

          {/* Dots */}
          <div className="flex gap-1.5 items-center">
            <span className="w-1 h-1 rounded-full bg-[#d5a73b]"></span>

            <span className="w-1 h-1 rounded-full bg-gray-300"></span>

            <span className="w-1 h-1 rounded-full bg-gray-300"></span>

            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
          </div>

          <button className="text-gray-400 hover:text-gray-700 transition">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
