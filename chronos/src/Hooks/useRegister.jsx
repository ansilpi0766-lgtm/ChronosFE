import { useState } from "react";
import { api } from "../Services/api";
import { toast } from "react-toastify";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const register = async (name, email, password) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registration successful!");

      return user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
};

export default useRegister;
