import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../Context/CartContext";

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
  Check,
} from "lucide-react";

const API_URL = "https://chronosbe.onrender.com/api/v1";

const parseProductSizes = (size) => {
  if (!size) return [];

  if (Array.isArray(size)) {
    return size.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof size === "string") {
    try {
      const parsed = JSON.parse(size);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => String(item).trim()).filter(Boolean);
      }
    } catch {
      return size
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
};

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedVariantSku, setSelectedVariantSku] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("DESCRIPTION");
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const productName = product?.name || product?.productName || "Product";

  // VARIANTS
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const hasVariants = variants.length > 0;

  const selectedVariant = hasVariants
    ? variants.find((variant) => variant.sku === selectedVariantSku) || null
    : null;

  const stock = hasVariants
    ? Number(selectedVariant?.stock) || 0
    : Number(product?.stock) || 0;

  const availableSizes = parseProductSizes(product?.size);
  const requiresSize = !hasVariants && availableSizes.length > 0;

  const getVariantImages = (variant) =>
    Array.isArray(variant?.images)
      ? variant.images
          .map((image) => (typeof image === "string" ? image : image?.url))
          .filter(Boolean)
      : [];

  const getVariantLabel = (variant) => {
    const optionLabel = Array.isArray(variant?.options)
      ? variant.options
          .map((option) => `${option.name}: ${option.value}`)
          .join(" / ")
      : "";

    return optionLabel || variant?.sku || "Variant";
  };

  // PRICE
  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "Price unavailable";
    }

    if (typeof price === "string" && /[₹$€£]/.test(price)) {
      return price;
    }

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // PRODUCT IMAGES
  const baseProductImages = product
    ? Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.image
        ? [product.image]
        : []
    : [];

  const variantImages = getVariantImages(selectedVariant);

  const productImages =
    hasVariants && variantImages.length > 0 ? variantImages : baseProductImages;

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setQuantity(1);
        setSelectedSize("");
        setSelectedVariantSku("");
        setCartMessage("");

        const response = await axios.get(`${API_URL}/products/${id}`);
        const data = response.data;

        const fetchedProduct =
          data.product || data.data?.product || data.data || data;

        if (!fetchedProduct?._id) {
          throw new Error("Product not found");
        }

        setProduct(fetchedProduct);

        const fetchedVariants = Array.isArray(fetchedProduct.variants)
          ? fetchedProduct.variants
          : [];

        const firstAvailableVariant =
          fetchedVariants.find((variant) => Number(variant.stock) > 0) ||
          fetchedVariants[0];

        setSelectedVariantSku(firstAvailableVariant?.sku || "");

        const firstVariantImage =
          firstAvailableVariant?.images?.[0]?.url ||
          (typeof firstAvailableVariant?.images?.[0] === "string"
            ? firstAvailableVariant.images[0]
            : "");

        const images = firstVariantImage
          ? [firstVariantImage]
          : Array.isArray(fetchedProduct.images) &&
              fetchedProduct.images.length > 0
            ? fetchedProduct.images
            : fetchedProduct.image
              ? [fetchedProduct.image]
              : [];

        setSelectedImage(images[0] || "");

        // RELATED PRODUCTS
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
            .filter(
              (item) =>
                item._id !== fetchedProduct._id && item.isActive !== false,
            )
            .slice(0, 3);

          setRelatedProducts(related);
        } catch (relatedError) {
          console.error("Related products error:", relatedError);
        }
      } catch (err) {
        console.error("Product fetching error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load this product.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // VALIDATE SELECTION
  const validateSelection = () => {
    if (!product) return false;

    if (hasVariants && !selectedVariant) {
      setCartMessage("Please select a variant before continuing.");
      return false;
    }

    if (stock <= 0) {
      setCartMessage("This selection is currently out of stock.");
      return false;
    }

    if (requiresSize && !selectedSize) {
      setCartMessage("Please select a size before continuing.");
      return false;
    }

    if (quantity > stock) {
      setCartMessage(`Only ${stock} pieces are available.`);
      return false;
    }

    return true;
  };

  // CART PRODUCT
  const getCartProduct = () => ({
    ...product,
    name: productName,
    image: selectedImage || variantImages[0] || baseProductImages[0] || "",
    price: Number(product.price),
    size: selectedSize || "",
    selectedVariant: selectedVariant
      ? {
          sku: selectedVariant.sku,
          stock: Number(selectedVariant.stock) || 0,
          options: selectedVariant.options || [],
          images: selectedVariant.images || [],
        }
      : null,
    sku: selectedVariant?.sku || "",
    variantOptions: selectedVariant?.options || [],
  });

  // ADD TO CART
  const handleAddToCart = () => {
    if (!validateSelection()) return;

    addToCart(getCartProduct(), quantity);
    setCartMessage("Product added to your cart!");
  };

  // BUY NOW
  const handleBuyNow = () => {
    if (!validateSelection()) return;

    addToCart(getCartProduct(), quantity);
    navigate("/checkout");
  };

  // SERVICES
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

  // SPECIFICATIONS
  const specifications = {
    Brand: product.brand,
    Category: product.category,
    Stock: hasVariants
      ? variants.reduce(
          (total, variant) => total + (Number(variant.stock) || 0),
          0,
        )
      : product.stock,
    ...(hasVariants
      ? { Variants: variants.map(getVariantLabel).join(", ") }
      : {}),
    ...(requiresSize ? { Sizes: availableSizes.join(", ") } : {}),
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
          <span className="text-[#421713]">{productName}</span>
        </p>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* IMAGE GALLERY */}
          <div className="flex gap-3">
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
                    alt={`${productName} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            <div className="relative flex-1 border border-gray-100 aspect-square bg-white">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={productName}
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

          {/* PRODUCT INFORMATION */}
          <div className="flex flex-col justify-center">
            <div>
              <span
                className={`text-white text-[9px] px-3 py-1 ${
                  stock > 0 ? "bg-green-700" : "bg-red-600"
                }`}
              >
                {stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            <p className="text-[10px] tracking-[2px] text-gray-400 mt-5 uppercase">
              {product.brand || "CHRONOS COLLECTION"}
            </p>

            <h1 className="text-xl md:text-2xl font-semibold tracking-[1px] mt-2 uppercase">
              {productName}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex text-[#a18a55]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={12}
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
            <div className="mt-4">
              <span className="text-xl font-medium">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-500 mt-4 leading-6">
              {product.description ||
                "Discover timeless design and exceptional craftsmanship with this CHRONOS collection piece."}
            </p>

            {/* STOCK */}
            <p className="text-[10px] mt-3 text-gray-500">
              {stock > 0
                ? `${stock} pieces available`
                : "Currently unavailable"}
            </p>

            {/* VARIANT SELECTION */}
            {hasVariants ? (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-semibold tracking-widest">
                    SELECT VARIANT
                  </p>

                  {selectedVariant && (
                    <p className="text-[10px] text-gray-500">
                      Selected: {getVariantLabel(selectedVariant)}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {variants.map((variant, index) => {
                    const isSelected = selectedVariantSku === variant.sku;

                    const variantStock = Number(variant.stock) || 0;

                    return (
                      <button
                        key={variant.sku || index}
                        type="button"
                        disabled={variantStock <= 0}
                        onClick={() => {
                          setSelectedVariantSku(variant.sku);
                          setQuantity(1);
                          setCartMessage("");

                          const images = getVariantImages(variant);

                          setSelectedImage(
                            images[0] || baseProductImages[0] || "",
                          );
                        }}
                        className={`border px-3 py-3 text-left transition ${
                          isSelected
                            ? "border-[#421713] bg-[#421713] text-white"
                            : "border-gray-200 text-[#421713] hover:border-[#421713]"
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                      >
                        <span className="block text-[10px] font-semibold">
                          {getVariantLabel(variant)}
                        </span>

                        <span
                          className={`block text-[9px] mt-1 ${
                            isSelected ? "text-white/80" : "text-gray-500"
                          }`}
                        >
                          SKU: {variant.sku || "N/A"} · {variantStock} available
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              requiresSize && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-semibold tracking-widest">
                      SELECT SIZE
                    </p>

                    {selectedSize && (
                      <p className="text-[10px] text-gray-500">
                        Selected: {selectedSize}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setSelectedSize(size);
                          setCartMessage("");
                        }}
                        className={`min-w-[42px] h-[40px] px-3 border text-[10px] font-medium transition ${
                          selectedSize === size
                            ? "bg-[#421713] text-white border-[#421713]"
                            : "border-gray-300 text-[#421713] hover:border-[#421713]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}

            {/* QUANTITY AND CART */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="px-3 py-3 disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus size={12} />
                </button>

                <span className="text-xs px-3 min-w-[35px] text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(stock, prev + 1))
                  }
                  disabled={quantity >= stock}
                  className="px-3 py-3 disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus size={12} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={stock <= 0}
                className="flex-1 min-w-[110px] bg-[#f2c035] text-black py-3 text-[10px] font-semibold hover:bg-[#421713] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>

              <button
                onClick={handleAddToCart}
                disabled={stock <= 0}
                className="border border-gray-200 p-3 hover:bg-[#f2c035] transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Add to cart"
                title="Add to cart"
              >
                <ShoppingBag size={15} />
              </button>
            </div>

            {/* CART MESSAGE */}
            {cartMessage && (
              <div
                className={`flex items-center justify-between gap-3 mt-4 border px-4 py-3 ${
                  cartMessage.includes("Please select") ||
                  cartMessage.includes("out of stock") ||
                  cartMessage.includes("Only ")
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    cartMessage.includes("Please select") ||
                    cartMessage.includes("out of stock") ||
                    cartMessage.includes("Only ")
                      ? "text-red-700"
                      : "text-green-700"
                  }`}
                >
                  <Check size={15} />
                  <p className="text-[10px]">{cartMessage}</p>
                </div>

                {!(
                  cartMessage.includes("Please select") ||
                  cartMessage.includes("out of stock") ||
                  cartMessage.includes("Only ")
                ) && (
                  <Link
                    to="/cart"
                    className="text-[10px] font-semibold underline text-green-800"
                  >
                    VIEW CART
                  </Link>
                )}
              </div>
            )}

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
          {activeTab === "DESCRIPTION" && (
            <p className="text-[10px] leading-6 text-gray-500 max-w-[700px]">
              {product.description || "No description available."}
            </p>
          )}

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
          {relatedProducts.map((item) => {
            const itemName = item.name || item.productName;
            const itemImage = item.image || item.images?.[0];

            return (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="group"
              >
                <div className="relative aspect-square border border-gray-100 overflow-hidden bg-white">
                  {itemImage ? (
                    <img
                      src={itemImage}
                      alt={itemName}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}

                  <span className="absolute top-3 left-3 bg-[#421713] text-white text-[8px] px-2 py-1">
                    CHRONOS
                  </span>
                </div>

                <div className="text-center pt-3">
                  <h3 className="text-[10px] font-medium uppercase">
                    {itemName}
                  </h3>

                  <p className="text-[10px] text-gray-500 mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            );
          })}

          {relatedProducts.length === 0 && (
            <p className="col-span-full text-center text-xs text-gray-400 py-8">
              No related products available.
            </p>
          )}
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
