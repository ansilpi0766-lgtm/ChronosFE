import React from "react";

import image1 from "../assets/image3.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image1.png";

const categories = [
  {
    title: "Timepieces",
    image: image1,
  },
  {
    title: "Accessories",
    image: image2,
  },
  {
    title: "Fine Art",
    image: image3,
  },
];

const Categories = () => {
  return (
    <section className="w-full bg-white px-6 pb-20 pt-1">
      {/* Top Line */}
      <div className="mx-auto max-w-[1044px] border-t border-[#e6e6e6]" />

      {/* Heading */}
      <div className="mt-[64px] text-center">
        <p className="mb-[8px] text-[11px] font-normal text-[#333]">
          OUR COLLECTIONS
        </p>

        <h2 className="font-serif text-[30px] font-semibold leading-[1.1] text-[#171717]">
          Explore Categories
        </h2>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-[49px] grid max-w-6xl grid-cols-3 gap-[100px]">
        {categories.map((category, index) => (
          <div key={index} className="h-[200px] overflow-hidden rounded-[15px]">
            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover scale-125"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
