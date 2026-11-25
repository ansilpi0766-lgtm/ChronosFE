import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const getAvailableStock = (product) => {
  // Selected variant stock
  if (product.selectedVariant?.stock !== undefined) {
    return Number(product.selectedVariant.stock);
  }

  // Product with multiple variants
  if (Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants.reduce(
      (total, variant) => total + Math.max(0, Number(variant.stock) || 0),
      0,
    );
  }

  // Normal product stock
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
  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("chronosCart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("chronosCart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product, quantity = 1) => {
    if (!product?._id) return false;

    const requestedQuantity = Math.max(1, Number(quantity) || 1);
    const availableStock = getAvailableStock(product);

    if (Number.isFinite(availableStock) && availableStock <= 0) {
      return false;
    }

    const cartItemId = getCartItemId(product);

    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingProduct) {
        return prevCart.map((item) => {
          if (item.cartItemId !== cartItemId) return item;

          const newQuantity = item.quantity + requestedQuantity;

          return {
            ...item,
            quantity: Number.isFinite(availableStock)
              ? Math.min(newQuantity, availableStock)
              : newQuantity,
          };
        });
      }

      const finalQuantity = Number.isFinite(availableStock)
        ? Math.min(requestedQuantity, availableStock)
        : requestedQuantity;

      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          cartStock: Number.isFinite(availableStock) ? availableStock : null,
          quantity: finalQuantity,
        },
      ];
    });

    return true;
  };

  // REMOVE PRODUCT
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  // UPDATE QUANTITY
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
