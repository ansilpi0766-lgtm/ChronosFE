import { createContext, useContext, useState } from "react";

const CartContext = createContext();

// CREATE A UNIQUE ID FOR EACH PRODUCT SIZE
const getCartItemId = (product) => {
  return `${product._id}-${product.size || "NO_SIZE"}`;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ADD PRODUCT WITH SELECTED SIZE AND QUANTITY
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const requestedQuantity = Math.max(1, Number(quantity) || 1);
      const stock = Number(product.stock);

      if (Number.isFinite(stock) && stock <= 0) {
        return prevCart;
      }

      const cartItemId = getCartItemId(product);

      // FIND SAME PRODUCT WITH SAME SIZE
      const existingProduct = prevCart.find(
        (item) => item.cartItemId === cartItemId,
      );

      if (existingProduct) {
        return prevCart.map((item) => {
          if (item.cartItemId !== cartItemId) return item;

          const newQuantity = item.quantity + requestedQuantity;

          return {
            ...item,
            quantity:
              Number.isFinite(stock) && stock > 0
                ? Math.min(newQuantity, stock)
                : newQuantity,
          };
        });
      }

      const finalQuantity =
        Number.isFinite(stock) && stock > 0
          ? Math.min(requestedQuantity, stock)
          : requestedQuantity;

      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          quantity: finalQuantity,
        },
      ];
    });
  };

  // REMOVE PRODUCT USING UNIQUE CART ITEM ID
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId),
    );
  };

  // UPDATE QUANTITY USING UNIQUE CART ITEM ID
  const updateQuantity = (cartItemId, newQuantity) => {
    const quantity = Number(newQuantity);

    if (!Number.isFinite(quantity) || quantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartItemId !== cartItemId) return item;

        const stock = Number(item.stock);

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

  // CALCULATE CART TOTAL
  const cartTotal = cart.reduce(
    (total, item) => total + (Number(item.price) || 0) * item.quantity,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
