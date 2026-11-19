import React from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  UserRoundPlus,
} from "lucide-react";

const Membership = () => {
  const benefits = [
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
      icon: RotateCcw,
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
    <section
      id="about"
      className="w-full scroll-mt-20 border-t border-gray-200 bg-white px-6 py-20 md:py-24"
    >
      <div className="mx-auto max-w-[700px] text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[3px] text-red-500">
          EXCLUSIVE MEMBERSHIP
        </p>

        <h2 className="font-serif text-3xl font-semibold leading-tight text-[#333] md:text-4xl">
          Join the Circle of
          <br />
          <span className="text-[#666]">Distinguished Collectors</span>
        </h2>

        <p className="mx-auto mt-5 max-w-[600px] text-sm leading-7 text-gray-400">
          Gain access to private viewings, first looks at rare acquisitions, and
          exclusive events in the world's finest venues.
        </p>

        <button
          type="button"
          className="mx-auto mt-7 flex items-center gap-2 bg-[#ffc400] px-6 py-3 text-[11px] font-semibold tracking-wider text-black transition duration-300 hover:bg-[#eab500]"
        >
          <UserRoundPlus size={14} />
          REQUEST MEMBERSHIP
        </button>
      </div>

      {/* Benefits */}
      <div className="mx-auto mt-16 grid max-w-[1100px] grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <div key={index} className="text-center">
              <Icon
                size={26}
                strokeWidth={1.5}
                className="mx-auto text-black"
              />

              <h3 className="mt-5 text-xs font-semibold tracking-widest text-[#333]">
                {benefit.title}
              </h3>

              <p className="mt-3 text-xs leading-6 text-gray-400">
                {benefit.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Membership;
