import React, { useEffect, useMemo, useState } from "react";
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

// GET IMAGE URL
const getImageUrl = (image) => {
  if (typeof image === "string") return image;

  return image?.url || image?.secure_url || "";
};

// NORMALIZE OPTION NAME
const normalizeOptionName = (name) =>
  String(name || "")
    .trim()
    .toLowerCase();

// PARSE PRODUCT SIZES
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
  const [selectedOptions, setSelectedOptions] = useState({});

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const productName = product?.name || product?.productName || "Product";

  // PRODUCT VARIANTS
  const variants = Array.isArray(product?.variants) ? product.variants : [];

  const hasVariants = variants.length > 0;

  // MAIN PRODUCT IMAGES
  const baseProductImages = useMemo(() => {
    if (!product) return [];

    const images = [
      ...(Array.isArray(product.images) ? product.images : []),
      product.image,
    ];

    return [...new Set(images.map(getImageUrl).filter(Boolean))];
  }, [product]);

  // VARIANT IMAGES
  const getVariantImages = (variant) => {
    if (!Array.isArray(variant?.images)) return [];

    return [...new Set(variant.images.map(getImageUrl).filter(Boolean))];
  };

  // CREATE OPTION GROUPS
  const optionGroups = useMemo(() => {
    const groups = {};

    variants.forEach((variant) => {
      (variant.options || []).forEach((option) => {
        const name = String(option.name || "").trim();
        const value = String(option.value || "").trim();

        if (!name || !value) return;

        const key = normalizeOptionName(name);

        if (!groups[key]) {
          groups[key] = {
            name,
            values: [],
          };
        }

        if (!groups[key].values.includes(value)) {
          groups[key].values.push(value);
        }
      });
    });

    return Object.values(groups);
  }, [variants]);

  // IDENTIFY COLOR OPTIONS
  const isColorOption = (name) =>
    ["color", "colour", "colors", "colours"].includes(
      normalizeOptionName(name),
    );

  // IDENTIFY SIZE OPTIONS
  const isSizeOption = (name) =>
    ["size", "sizes", "shoe size"].includes(normalizeOptionName(name));

  // GET VARIANT OPTION VALUE
  const getVariantOptionValue = (variant, optionName) => {
    const option = (variant?.options || []).find(
      (item) =>
        normalizeOptionName(item.name) === normalizeOptionName(optionName),
    );

    return String(option?.value || "");
  };

  // FIND SELECTED VARIANT
  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null;

    if (optionGroups.length === 0) {
      return (
        variants.find((variant) => variant.sku === selectedOptions.__sku) ||
        variants.find((variant) => Number(variant.stock) > 0) ||
        variants[0] ||
        null
      );
    }

    const allSelected = optionGroups.every(
      (group) => selectedOptions[normalizeOptionName(group.name)],
    );

    if (!allSelected) return null;

    return (
      variants.find((variant) =>
        optionGroups.every((group) => {
          const selectedValue =
            selectedOptions[normalizeOptionName(group.name)];

          return getVariantOptionValue(variant, group.name) === selectedValue;
        }),
      ) || null
    );
  }, [variants, hasVariants, optionGroups, selectedOptions]);

  // SELECTED VARIANT STOCK
  const stock = hasVariants
    ? Number(selectedVariant?.stock) || 0
    : Number(product?.stock) || 0;

  // NORMAL PRODUCT SIZES
  const availableSizes = parseProductSizes(product?.size);

  const requiresSize = !hasVariants && availableSizes.length > 0;

  // SELECTED VARIANT IMAGES
  const variantImages = getVariantImages(selectedVariant);

  // SHOW ALL PRODUCT AND VARIANT IMAGES
  const productImages = [...new Set([...baseProductImages, ...variantImages])];

  // GET COLOR IMAGE
  const getColorImage = (colorValue, groupName) => {
    const matchingVariant = variants.find(
      (variant) =>
        getVariantOptionValue(variant, groupName) === colorValue &&
        getVariantImages(variant).length > 0,
    );

    const images = getVariantImages(matchingVariant);

    return images[0] || baseProductImages[0] || "";
  };

  // PRICE FORMAT
  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "Price unavailable";
    }

    if (typeof price === "string" && /[₹$€£]/.test(price)) {
      return price;
    }

    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // FETCH PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        setQuantity(1);
        setSelectedSize("");
        setSelectedOptions({});
        setSelectedImage("");
        setCartMessage("");
        setRelatedProducts([]);

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

        // SELECT FIRST AVAILABLE VARIANT
        const firstVariant =
          fetchedVariants.find((variant) => Number(variant.stock) > 0) ||
          fetchedVariants[0];

        // SELECT FIRST VARIANT OPTIONS
        if (firstVariant) {
          const initialOptions = {};

          (firstVariant.options || []).forEach((option) => {
            initialOptions[normalizeOptionName(option.name)] = String(
              option.value,
            );
          });

          if (!(firstVariant.options || []).length) {
            initialOptions.__sku = firstVariant.sku;
          }

          setSelectedOptions(initialOptions);
        }

        // INITIAL PRODUCT IMAGE
        const mainImages = [
          ...(Array.isArray(fetchedProduct.images)
            ? fetchedProduct.images
            : []),
          fetchedProduct.image,
        ]
          .map(getImageUrl)
          .filter(Boolean);

        const firstVariantImages = Array.isArray(firstVariant?.images)
          ? firstVariant.images.map(getImageUrl).filter(Boolean)
          : [];

        setSelectedImage(firstVariantImages[0] || mainImages[0] || "");

        // FETCH RELATED PRODUCTS
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

  // HANDLE COLOR, SIZE AND OTHER OPTION SELECTION
  const handleOptionChange = (groupName, value) => {
    const changedKey = normalizeOptionName(groupName);

    const matchingVariants = variants.filter(
      (variant) => getVariantOptionValue(variant, groupName) === value,
    );

    if (matchingVariants.length === 0) return;

    // KEEP OTHER SELECTED OPTIONS WHEN POSSIBLE
    let candidates = matchingVariants;

    optionGroups.forEach((group) => {
      const key = normalizeOptionName(group.name);

      if (key === changedKey) return;

      const currentValue = selectedOptions[key];

      if (!currentValue) return;

      const filtered = candidates.filter(
        (variant) =>
          getVariantOptionValue(variant, group.name) === currentValue,
      );

      if (filtered.length > 0) {
        candidates = filtered;
      }
    });

    // PREFER AN IN-STOCK VARIANT
    const nextVariant =
      candidates.find((variant) => Number(variant.stock) > 0) || candidates[0];

    // UPDATE ALL OPTIONS TO MATCH THE VARIANT
    const nextOptions = {};

    (nextVariant.options || []).forEach((option) => {
      nextOptions[normalizeOptionName(option.name)] = String(option.value);
    });

    setSelectedOptions(nextOptions);
    setQuantity(1);
    setCartMessage("");
  };

  // UPDATE MAIN IMAGE WHEN SELECTED VARIANT CHANGES
  useEffect(() => {
    if (!selectedVariant) return;

    const images = getVariantImages(selectedVariant);

    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [selectedVariant]);

  // CHECK IF OPTION VALUE HAS AVAILABLE STOCK
  const isOptionAvailable = (group, value) => {
    return variants.some((variant) => {
      if (Number(variant.stock) <= 0) return false;

      const matchesCurrentOption =
        getVariantOptionValue(variant, group.name) === value;

      if (!matchesCurrentOption) return false;

      return optionGroups.every((otherGroup) => {
        if (
          normalizeOptionName(otherGroup.name) ===
          normalizeOptionName(group.name)
        ) {
          return true;
        }

        const currentValue =
          selectedOptions[normalizeOptionName(otherGroup.name)];

        if (!currentValue) return true;

        return getVariantOptionValue(variant, otherGroup.name) === currentValue;
      });
    });
  };

  // VALIDATE SELECTION
  const validateSelection = () => {
    if (!product) return false;

    if (hasVariants && !selectedVariant) {
      setCartMessage("Please select an available combination of options.");
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

    images: productImages,

    price: Number(product.price),

    size: hasVariants
      ? optionGroups.find((group) => isSizeOption(group.name))
        ? selectedOptions[
            normalizeOptionName(
              optionGroups.find((group) => isSizeOption(group.name)).name,
            )
          ] || ""
        : ""
      : selectedSize,

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

    const added = addToCart(getCartProduct(), quantity);

    if (added === false) {
      setCartMessage("This product is already in your cart.");
      return;
    }

    setCartMessage("Product added to your cart!");
  };

  // BUY NOW
  const handleBuyNow = () => {
    if (!validateSelection()) return;

    const added = addToCart(getCartProduct(), quantity);

    if (added === false) {
      setCartMessage("This product is already in your cart.");
      return;
    }

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
        <p className="text-sm text-gray-500">{error || "Product not found"}</p>

        <Link
          to="/collections"
          className="bg-[#421713] text-white px-6 py-3 text-sm"
        >
          BACK TO COLLECTION
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#421713] min-h-screen">
      {/* BREADCRUMB */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-7">
        <p className="text-xs md:text-sm text-gray-500">
          <Link to="/">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/collections">Collections</Link>
          <span className="mx-2">›</span>
          <span>{product.category || "Products"}</span>
          <span className="mx-2">›</span>
          <span className="text-[#421713]">{productName}</span>
        </p>
      </div>

      {/* PRODUCT DETAILS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* IMAGE GALLERY */}
          <div className="flex flex-col-reverse md:flex-row gap-3">
            {/* LEFT THUMBNAILS */}
            <div className="flex md:flex-col gap-3 w-full md:w-[76px] shrink-0 overflow-x-auto md:overflow-y-auto md:overflow-x-hidden md:max-h-[600px] pr-1">
              {productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`w-[64px] h-[64px] md:w-full md:h-auto md:aspect-square min-w-[64px] border p-1 transition ${
                    selectedImage === image
                      ? "border-[#421713] border-2"
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

              {productImages.length === 0 && (
                <p className="text-xs text-gray-400">No images available</p>
              )}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative flex-1 min-w-0 border border-gray-100 aspect-square bg-white">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={productName}
                  className="w-full h-full object-contain p-4 md:p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                  No product image available
                </div>
              )}

              {/* WISHLIST */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4"
                aria-label="Add to wishlist"
                type="button"
              >
                <Heart
                  size={22}
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
            {/* STOCK STATUS */}
            <div>
              <span
                className={`text-white text-xs px-3 py-2 ${
                  stock > 0 ? "bg-green-700" : "bg-red-600"
                }`}
              >
                {stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            {/* BRAND */}
            <p className="text-xs md:text-sm tracking-[2px] text-gray-400 mt-5 uppercase">
              {product.brand || "CHRONOS COLLECTION"}
            </p>

            {/* PRODUCT NAME */}
            <h1 className="text-xl md:text-2xl font-semibold tracking-[1px] mt-3 uppercase leading-tight">
              {productName}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex text-[#a18a55]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={
                      star <= Math.round(product.rating || 0)
                        ? "#a18a55"
                        : "none"
                    }
                    strokeWidth={1}
                  />
                ))}
              </div>

              <span className="text-xs md:text-sm text-gray-500">
                {product.rating || 0} ({product.totalReviews || 0} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="mt-5">
              <span className="text-xl md:text-2xl font-medium">
                {formatPrice(product.price)}
              </span>
            </div>

            {/* DESCRIPTION BELOW PRICE */}
            <p className="text-sm md:text-base text-gray-600 mt-4 leading-7">
              {product.description ||
                "Discover timeless design and exceptional craftsmanship with this CHRONOS collection piece."}
            </p>

            {/* VARIANT OPTIONS */}
            {hasVariants && optionGroups.length > 0 && (
              <div className="mt-6 space-y-6">
                {optionGroups.map((group) => {
                  const selectedValue =
                    selectedOptions[normalizeOptionName(group.name)];

                  const colorOption = isColorOption(group.name);

                  return (
                    <div key={group.name}>
                      {/* OPTION TITLE */}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold tracking-widest uppercase">
                          Select {group.name}
                        </p>

                        {selectedValue && (
                          <p className="text-xs text-gray-500">
                            {selectedValue}
                          </p>
                        )}
                      </div>

                      {/* COLOR OPTIONS */}
                      {colorOption ? (
                        <div className="flex flex-wrap gap-3">
                          {group.values.map((value) => {
                            const colorImage = getColorImage(value, group.name);

                            const isSelected = selectedValue === value;

                            return (
                              <button
                                key={value}
                                type="button"
                                onClick={() =>
                                  handleOptionChange(group.name, value)
                                }
                                className={`flex items-center gap-2 border p-2 pr-4 transition ${
                                  isSelected
                                    ? "border-[#421713] text-[#421713]"
                                    : "border-gray-300 text-gray-500 hover:border-[#421713]"
                                }`}
                              >
                                {colorImage && (
                                  <img
                                    src={colorImage}
                                    alt={value}
                                    className="w-10 h-10 object-cover"
                                  />
                                )}

                                <span className="text-xs md:text-sm">
                                  {value}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        /* SIZE AND OTHER OPTIONS */
                        <div className="flex flex-wrap gap-2">
                          {group.values.map((value) => {
                            const isSelected = selectedValue === value;

                            const available = isOptionAvailable(group, value);

                            return (
                              <button
                                key={value}
                                type="button"
                                disabled={!available}
                                onClick={() =>
                                  handleOptionChange(group.name, value)
                                }
                                className={`min-w-[45px] h-[42px] px-4 border text-sm transition ${
                                  isSelected
                                    ? "bg-[#421713] text-white border-[#421713]"
                                    : "border-gray-300 text-[#421713] hover:border-[#421713]"
                                } disabled:opacity-30 disabled:cursor-not-allowed`}
                              >
                                {value}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* NORMAL PRODUCT SIZE OPTIONS */}
            {!hasVariants && requiresSize && (
              <div className="mt-6">
                <p className="text-sm font-semibold tracking-widest mb-3">
                  SELECT SIZE
                </p>

                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setSelectedSize(size);
                        setCartMessage("");
                      }}
                      className={`min-w-[45px] h-[42px] px-4 border text-sm transition ${
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
            )}

            {/* QUANTITY AND CART */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              {/* QUANTITY */}
              <div className="flex items-center border border-gray-200">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  className="px-3 py-3 disabled:opacity-30"
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>

                <span className="text-sm px-3 min-w-[35px] text-center">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) => Math.min(stock, prev + 1))
                  }
                  disabled={quantity >= stock}
                  className="px-3 py-3 disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* BUY NOW */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={stock <= 0}
                className="flex-1 min-w-[110px] bg-[#f2c035] text-black py-3 text-sm font-semibold hover:bg-[#421713] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                BUY NOW
              </button>

              {/* ADD TO CART */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={stock <= 0}
                className="border border-gray-200 p-3 hover:bg-[#f2c035] transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Add to cart"
                title="Add to cart"
              >
                <ShoppingBag size={18} />
              </button>
            </div>

            {/* CART MESSAGE */}
            {cartMessage && (
              <div
                className={`flex items-center justify-between gap-3 mt-4 border px-4 py-3 ${
                  cartMessage.includes("Please select") ||
                  cartMessage.includes("out of stock") ||
                  cartMessage.includes("Only ") ||
                  cartMessage.includes("already")
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    cartMessage.includes("Please select") ||
                    cartMessage.includes("out of stock") ||
                    cartMessage.includes("Only ") ||
                    cartMessage.includes("already")
                      ? "text-red-700"
                      : "text-green-700"
                  }`}
                >
                  <Check size={16} />

                  <p className="text-xs md:text-sm">{cartMessage}</p>
                </div>

                {!(
                  cartMessage.includes("Please select") ||
                  cartMessage.includes("out of stock") ||
                  cartMessage.includes("Only ") ||
                  cartMessage.includes("already")
                ) && (
                  <Link
                    to="/cart"
                    className="text-xs font-semibold underline text-green-800"
                  >
                    VIEW CART
                  </Link>
                )}
              </div>
            )}

            {/* PRODUCT BENEFITS */}
            <div className="grid grid-cols-3 border-t border-gray-200 mt-7 pt-5">
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={19} />

                <p className="text-[10px] md:text-xs tracking-wide text-gray-500">
                  AUTHENTICITY GUARANTEED
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={19} />

                <p className="text-[10px] md:text-xs tracking-wide text-gray-500">
                  FREE SHIPPING
                </p>
              </div>

              <div className="flex flex-col items-center text-center gap-2">
                <RefreshCcw size={19} />

                <p className="text-[10px] md:text-xs tracking-wide text-gray-500">
                  30-DAY RETURNS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 mt-12 mb-16">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-xl md:text-2xl font-serif">You May Also Like</h2>

          <Link
            to="/collections"
            className="flex items-center gap-2 text-xs md:text-sm hover:text-[#c49a25]"
          >
            View All
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {relatedProducts.map((item) => {
            const itemName = item.name || item.productName;

            const itemImages = [
              ...(Array.isArray(item.images) ? item.images : []),
              item.image,
            ];

            const itemImage = itemImages.map(getImageUrl).find(Boolean);

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
                      className="w-full h-full object-contain p-5 group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No image
                    </div>
                  )}

                  <span className="absolute top-3 left-3 bg-[#421713] text-white text-[10px] px-2 py-1">
                    CHRONOS
                  </span>
                </div>

                <div className="text-center pt-4">
                  <h3 className="text-xs md:text-sm font-medium uppercase">
                    {itemName}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-500 mt-2">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </Link>
            );
          })}

          {relatedProducts.length === 0 && (
            <p className="col-span-full text-center text-sm text-gray-400 py-8">
              No related products available.
            </p>
          )}
        </div>
      </section>

      {/* SHIPPING BENEFITS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-3"
              >
                <Icon size={20} strokeWidth={1.5} />

                <h3 className="text-xs md:text-sm font-semibold tracking-wide">
                  {service.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-500">
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
