import { useState } from "react";
import { api } from "../Services/api";
import { toast } from "react-toastify";

const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (cart, shipping) => {
    try {
      setIsLoading(true);

      const shippingAddress = [
        shipping.firstName,
        shipping.lastName,
        shipping.city,
        shipping.postalCode,
        shipping.country,
        shipping.phone,
      ].join(", ");

      const orderData = {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        shippingAddress,
      };

      const response = await api.post("/orders", orderData);

      toast.success("Order placed successfully!");

      return response.data.order;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading };
};

export default useCreateOrder;
