import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../Services/api";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Return to checkout if registration started during checkout
  const redirectTo = location.state?.from || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Registration successful!");

      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDF8] px-5 py-12">
      <div className="w-full max-w-md bg-white p-8 md:p-10 shadow-xl rounded-xl">
        <h1 className="text-3xl font-bold text-[#421713] text-center tracking-widest">
          CHRONOS
        </h1>

        <h2 className="text-2xl font-semibold text-center mt-8 text-gray-800">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Join us and discover timeless style.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#421713]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#421713]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password (minimum 6 characters)"
            value={formData.password}
            onChange={handleChange}
            minLength={6}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#421713]"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#421713]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#421713] text-white py-3 rounded-lg font-semibold hover:bg-[#5a241e] transition disabled:opacity-50"
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-7">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ from: redirectTo }}
            className="text-[#421713] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
