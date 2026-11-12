import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Award,
  Star,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";

const API_URL = "https://chronosbe.onrender.com/api/v1";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH PRODUCT FROM MONGODB
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(`${API_URL}/products/${id}`);

        const data = response.data;

        const fetchedProduct =
          data.product || data.data?.product || data.data || data;

        if (!fetchedProduct?._id) {
          throw new Error("Product not found");
        }

        setProduct(fetchedProduct);

        const images =
          Array.isArray(fetchedProduct.images) &&
          fetchedProduct.images.length > 0
            ? fetchedProduct.images
            : fetchedProduct.image
              ? [fetchedProduct.image]
              : [];

        setSelectedImage(images[0] || "");

        // FETCH OTHER PRODUCTS
        try {
          const productsResponse = await axios.get(`${API_URL}/products`);

          const productsData = productsResponse.data;

          const allProducts = Array.isArray(productsData)
            ? productsData
            : productsData.products ||
              productsData.data?.products ||
              productsData.data ||
              [];

          const related = allProducts
            .filter((item) => item._id !== fetchedProduct._id)
            .slice(0, 3);

          setRelatedProducts(related);
        } catch (relatedError) {
          console.error("Related products error:", relatedError);
        }
      } catch (err) {
        console.error("Product fetching error:", err);

        setError(err.response?.data?.message || "Unable to load this product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const services = [
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
      icon: RefreshCcw,
      title: "30-DAY RETURNS",
      description: "No questions asked returns",
    },
    {
      icon: Award,
      title: "WARRANTY",
      description: "Coverage on all timepieces",
    },
  ];

  const tabs = ["DESCRIPTION", "SPECIFICATIONS", "REVIEWS"];

  // PRICE FORMAT
  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "Price unavailable";
    }

    if (typeof price === "string" && price.includes("$")) {
      return price;
    }

    return `$${Number(price).toLocaleString("en-US")}`;
  };

  // PRODUCT IMAGES
  const productImages =
    product?.images?.length > 0
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading product details...</p>
      </div>
    );
  }

  // ERROR
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-sm">{error || "Product not found"}</p>

        <Link
          to="/collections"
          className="bg-[#421713] text-white px-6 py-3 text-xs"
        >
          BACK TO COLLECTION
        </Link>
      </div>
    );
  }

  // PRODUCT SPECIFICATIONS
  const specifications = {
    Brand: product.brand,
    Category: product.category,
    Stock: product.stock,
    ...(product.specification || {}),
  };

  return (
    <div className="bg-white text-[#421713] min-h-screen">
      {/* BREADCRUMB */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-8">
        <p className="text-[10px] text-gray-400">
          <Link to="/">Home</Link>

          <span className="mx-1">›</span>

          <Link to="/collections">Collections</Link>

          <span className="mx-1">›</span>

          <span>{product.category || "Products"}</span>

          <span className="mx-1">›</span>

          <span className="text-[#421713]">{product.name}</span>
        </p>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT IMAGE GALLERY */}
          <div className="flex gap-3">
            {/* THUMBNAILS */}
            <div className="flex flex-col gap-2 w-[55px] shrink-0">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`w-full aspect-square border p-1 ${
                    selectedImage === image
                      ? "border-[#421713]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative flex-1 border border-gray-100 aspect-square bg-white">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain p-5"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                  No product image available
                </div>
              )}

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={19}
                  strokeWidth={1}
                  className={
                    isFavorite ? "fill-red-500 text-red-500" : "text-[#421713]"
                  }
                />
              </button>
            </div>
          </div>

          {/* RIGHT PRODUCT INFORMATION */}
          <div className="flex flex-col justify-center">
            {/* CATEGORY */}
            <div>
              <span className="bg-red-500 text-white text-[9px] px-3 py-1">
                {product.stock > 0 ? "AVAILABLE" : "SALE"}
              </span>
            </div>

            {/* PRODUCT NAME */}
            <h1 className="text-sm font-semibold tracking-[1px] mt-5 uppercase">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-[#a18a55]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={11}
                    fill={
                      star <= Math.round(product.rating || 0)
                        ? "#a18a55"
                        : "none"
                    }
                    strokeWidth={1}
                  />
                ))}
              </div>

              <span className="text-[10px] text-gray-500">
                {product.rating || 0} ({product.totalReviews || 0} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-base font-medium">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-[10px] text-gray-500 mt-2">
              {product.description}
            </p>

            {/* QUANTITY AND CART */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-2 py-2"
                >
                  <Minus size={10} />
                </button>

                <span className="text-[10px] px-2">{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(product.stock || 99, prev + 1),
                    )
                  }
                  disabled={quantity >= product.stock && product.stock > 0}
                  className="px-2 py-2"
                >
                  <Plus size={10} />
                </button>
              </div>

              <button
                disabled={!product.stock}
                className="flex-1 bg-[#f2c035] text-black py-3 text-[10px] font-medium hover:bg-[#421713] hover:text-white transition disabled:opacity-50"
              >
                BUY NOW
              </button>

              <button
                disabled={!product.stock}
                className="border border-gray-200 p-3 hover:bg-[#f2c035] transition disabled:opacity-50"
                aria-label="Add to cart"
              >
                <ShoppingBag size={13} />
              </button>
            </div>

            {/* PRODUCT BENEFITS */}
            <div className="grid grid-cols-3 border-t border-gray-200 mt-6 pt-5">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={15} />
                <p className="text-[7px] tracking-wide text-gray-500">
                  AUTHENTICITY GUARANTEED
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={15} />
                <p className="text-[7px] tracking-wide text-gray-500">
                  FREE SHIPPING
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCcw size={15} />
                <p className="text-[7px] tracking-wide text-gray-500">
                  30-DAY RETURNS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT TABS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-8">
        <div className="flex gap-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-[9px] py-3 transition ${
                activeTab === tab
                  ? "border-b-2 border-[#421713] text-[#421713] font-semibold"
                  : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-5 min-h-[100px]">
          {/* DESCRIPTION */}
          {activeTab === "DESCRIPTION" && (
            <p className="text-[10px] leading-5 text-gray-500 max-w-[700px]">
              {product.description || "No description available."}
            </p>
          )}

          {/* SPECIFICATIONS */}
          {activeTab === "SPECIFICATIONS" && (
            <div className="max-w-[600px] text-[10px] text-gray-500 space-y-3">
              {Object.entries(specifications)
                .filter(
                  ([key, value]) =>
                    value !== undefined && value !== null && value !== "",
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b pb-2 gap-4"
                  >
                    <span>{key}</span>

                    <span className="text-right">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value)}
                    </span>
                  </div>
                ))}
            </div>
          )}

          {/* REVIEWS */}
          {activeTab === "REVIEWS" && (
            <div className="text-[10px] text-gray-500">
              <p className="font-medium text-[#421713]">Customer Reviews</p>

              <p className="mt-2">
                {product.rating || 0} out of 5 based on{" "}
                {product.totalReviews || 0} reviews.
              </p>

              <p className="mt-3">
                Customer review details will appear here once the review API is
                connected.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 mt-12 mb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif">You May Also Like</h2>

          <Link
            to="/collections"
            className="flex items-center gap-2 text-[9px] hover:text-[#c49a25]"
          >
            View All
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {relatedProducts.map((item) => (
            <Link to={`/product/${item._id}`} key={item._id} className="group">
              <div className="relative aspect-square border border-gray-100 overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition duration-500"
                  />
                )}

                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-3 right-3 text-[#e8b52d]"
                >
                  <Heart size={15} strokeWidth={1} />
                </button>
              </div>

              <div className="text-center pt-3">
                <h3 className="text-[9px] font-medium">{item.name}</h3>

                <p className="text-[9px] text-gray-500 mt-1">
                  {formatPrice(item.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SHIPPING BENEFITS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-2"
              >
                <Icon size={16} strokeWidth={1.5} />

                <h3 className="text-[8px] font-semibold tracking-wide">
                  {service.title}
                </h3>

                <p className="text-[8px] text-gray-400">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
