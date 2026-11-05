import { useState } from "react";
import { api } from "../Services/api";
import { toast } from "react-toastify";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save JWT token
      localStorage.setItem("token", token);

      // Save user details
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

      return user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
