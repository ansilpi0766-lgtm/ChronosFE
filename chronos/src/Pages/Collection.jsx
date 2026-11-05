import React from "react";
import CollectionHeader from "../Components/OurCollections/CollectionHeader";
import CollectionFilters from "../Components/OurCollections/CollectionFilters";
import CollectionSidebar from "../Components/OurCollections/CollectionSidebar";
import ProductGrid from "../Components/OurCollections/ProductGrid";
import ProductCard from "../Components/OurCollections/ProductCard";

const Collection = () => {
  return (
    <div className="min-h-screen bg-white text-[#421713]">
      {/* Page Header */}
      <CollectionHeader />

      {/* Filter Bar */}
      <CollectionFilters />

      {/* Main Content */}
      <div className="flex px-6 md:px-10 lg:px-16 py-8 gap-8">
        {/* Sidebar */}
        <CollectionSidebar />

        {/* Products */}
        <ProductGrid />

        <ProductCard />
      </div>
    </div>
  );
};

export default Collection;
