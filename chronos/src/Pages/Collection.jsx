import React from "react";

import CollectionHeader from "../Components/OurCollections/CollectionHeader";
import CollectionFilters from "../Components/OurCollections/CollectionFilters";
import CollectionSidebar from "../Components/OurCollections/CollectionSidebar";
import ProductGrid from "../Components/OurCollections/ProductGrid";

const Collection = () => {
  return (
    <div className="min-h-screen w-full bg-white text-[#421713] overflow-hidden">
      {/* Page Header */}
      <CollectionHeader />

      {/* Main Collection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[25%_minmax(0,1fr)]">
        {/* LEFT SIDEBAR */}
        <aside className="w-full min-w-0 border-r border-gray-200">
          <CollectionSidebar />
        </aside>

        {/* RIGHT CONTENT */}
        <main className="w-full min-w-0">
          {/* Collection Categories + Gender + Search */}
          <CollectionFilters />

          {/* Products */}
          <div className="w-full min-w-0">
            <ProductGrid />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Collection;
