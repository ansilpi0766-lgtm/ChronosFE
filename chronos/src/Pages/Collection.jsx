import React from "react";

import CollectionHeader from "../Components/OurCollections/CollectionHeader";
import CollectionFilters from "../Components/OurCollections/CollectionFilters";
import CollectionSidebar from "../Components/OurCollections/CollectionSidebar";
import ProductGrid from "../Components/OurCollections/ProductGrid";

const Collection = () => {
  return (
    <div className="min-h-screen bg-white text-[#421713]">
      {/* Page Header */}
      <CollectionHeader />

      {/* Filter Bar */}
      <CollectionFilters />

      {/* Main Content */}
      <div className="grid grid-cols-[220px_minmax(0,1fr)]">
        {/* Sidebar */}
        <CollectionSidebar />

        {/* Products */}
        <ProductGrid />
      </div>
    </div>
  );
};

export default Collection;
