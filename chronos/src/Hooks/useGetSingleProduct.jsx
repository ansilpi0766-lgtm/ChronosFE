import { useState, useEffect } from "react";
import { api } from "../Services/api";

const useGetSingleProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        setError(error.response?.data?.message || "Product not found");
      } finally {
        setIsLoading(false);
      }
    };

    getProduct();
  }, [id]);

  return { product, isLoading, error };
};

export default useGetSingleProduct;
