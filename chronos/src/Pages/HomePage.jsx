import React from "react";

import Hero from "../Components/Hero";
import FeaturedPieces from "../Components/FeaturedPieces";
import Categories from "../Components/Categories";
import NewArrivals from "../Components/NewArrivals";
import Membership from "../Components/MemberShip";
import Testimonial from "../Components/Testimonial";
import Newsletter from "../Components/NewsLetter";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedPieces />
      <Categories />
      <NewArrivals />
      <Membership />
      <Testimonial />
      <Newsletter />
    </>
  );
};

export default HomePage;
