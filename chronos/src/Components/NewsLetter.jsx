import React from "react";
import { Send } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="w-full bg-white border-t border-gray-200 py-28 px-6">
      <div className="max-w-[700px] mx-auto text-center">
        {/* Small Heading */}
        <p className="text-[11px] tracking-wide text-[#333] mb-3">
          STAY CONNECTED
        </p>

        {/* Main Heading */}
        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#333]">
          Join Our Inner Circle
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-400">
          Be the first to know about new acquisitions, private sales, and
          exclusive events.
        </p>

        {/* Subscribe Form */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-[300px] h-[30px] bg-[#eeeeee] px-4 text-[10px] text-gray-700 outline-none placeholder:text-gray-500"
          />

          {/* Subscribe Button */}
          <button className="w-full sm:w-[165px] h-[30px] bg-[#ffc400] text-black text-[10px] flex items-center justify-center gap-2 hover:bg-[#eab500] transition">
            <Send size={11} />
            SUBSCRIBE
          </button>
        </div>

        {/* Privacy Text */}
        <p className="mt-3 text-[9px] text-gray-400">
          By subscribing, you agree to our Privacy Policy and consent to receive
          updates.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
