import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const getAvailableStock = (product) => {
  if (product.selectedVariant?.stock !== undefined) {
    return Number(product.selectedVariant.stock);
  }

  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.reduce(
      (total, variant) => total + Math.max(0, Number(variant.stock) || 0),
      0,
    );
  }

  return Number(product.stock);
};

// Unique ID for each product and variant
const getCartItemId = (product) => {
  const variantId =
    product.selectedVariant?.sku ||
    product.selectedVariant?.id ||
    product.selectedVariant?.options
      ?.map((option) => `${option.name}-${option.value}`)
      .join("-") ||
    product.size ||
    "DEFAULT";

  return `${product._id}-${variantId}`;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("chronosCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("chronosCart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product, quantity = 1) => {
    if (!product?._id) return false;

    const cartItemId = getCartItemId(product);

    const requestedQuantity = Math.max(1, Number(quantity) || 1);

    const availableStock = getAvailableStock(product);

    if (Number.isFinite(availableStock) && availableStock <= 0) {
      toast.error("This product is out of stock.");
      return false;
    }

    // Check whether product already exists
    const existingProduct = cart.find((item) => item.cartItemId === cartItemId);

    if (existingProduct) {
      toast.info("Product is already in your cart.");
      return false;
    }

    const finalQuantity = Number.isFinite(availableStock)
      ? Math.min(requestedQuantity, availableStock)
      : requestedQuantity;

    setCart((prevCart) => [
      ...prevCart,
      {
        ...product,
        cartItemId,
        cartStock: Number.isFinite(availableStock) ? availableStock : null,
        quantity: finalQuantity,
      },
    ]);

    toast.success("Product added to cart!");

    return true;
  };

  // REMOVE PRODUCT
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  // UPDATE QUANTITY MANUALLY
  const updateQuantity = (cartItemId, newQuantity) => {
    const quantity = Number(newQuantity);

    if (!Number.isFinite(quantity) || quantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId !== cartItemId) return item;

        const stock = item.cartStock;

        return {
          ...item,
          quantity:
            Number.isFinite(stock) && stock > 0
              ? Math.min(quantity, stock)
              : quantity,
        };
      }),
    );
  };

  // TOTAL PRICE
  const cartTotal = cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0,
  );

  // TOTAL ITEM QUANTITY
  const cartCount = cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
