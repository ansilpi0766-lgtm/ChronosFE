import { useState, useEffect } from "react";
import { api } from "../Services/api";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products, isLoading, error, getProducts };
};

export default useGetProducts;
