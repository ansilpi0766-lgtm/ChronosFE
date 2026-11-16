import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  LogOut,
  Package,
  CalendarDays,
  IndianRupee,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../Services/api";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch customer orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders/my-orders");

      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError(err.response?.data?.message || "Unable to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  // Order status styling
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] px-5 py-32">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* PROFILE DETAILS */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="bg-[#421713] px-8 py-10 text-center text-[#FFEDD0]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFEDD0] text-[#421713]">
              <User size={38} />
            </div>

            <h1 className="mt-4 text-2xl font-semibold">My Profile</h1>

            <p className="mt-2 text-sm text-[#FFEDD0]/70">Welcome to CHRONOS</p>
          </div>

          <div className="space-y-6 p-8">
            <div>
              <p className="mb-2 text-sm text-gray-500">Full Name</p>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <User size={20} className="text-[#421713]" />
                <p className="text-gray-800">
                  {user.name || "Name not available"}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-gray-500">Email Address</p>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
                <Mail size={20} className="text-[#421713]" />
                <p className="break-all text-gray-800">
                  {user.email || "Email not available"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#421713] py-3 font-semibold text-white transition hover:bg-[#5a241e]"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* MY ORDERS */}
        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#421713]">
                My Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Track your purchases and order history
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF4E8] text-[#421713]">
              <ShoppingBag size={23} />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-12 text-center">
              <RefreshCw
                className="mx-auto animate-spin text-[#421713]"
                size={28}
              />

              <p className="mt-3 text-gray-500">Loading your orders...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-lg bg-red-50 p-5 text-center">
              <p className="text-sm text-red-600">{error}</p>

              <button
                onClick={fetchOrders}
                className="mt-3 text-sm font-semibold text-[#421713] underline"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty Orders */}
          {!loading && !error && orders.length === 0 && (
            <div className="py-12 text-center">
              <Package size={45} className="mx-auto text-gray-300" />

              <h3 className="mt-4 text-lg font-semibold text-gray-700">
                No Orders Yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Your purchases will appear here.
              </p>

              <button
                onClick={() => navigate("/Collection")}
                className="mt-5 rounded-lg bg-[#421713] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5a241e]"
              >
                Explore Collections
              </button>
            </div>
          )}

          {/* Order List */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:border-[#D6A15C]"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
                    <div>
                      <p className="text-xs text-gray-500">Order ID</p>

                      <p className="mt-1 text-sm font-semibold text-[#421713]">
                        #{order._id?.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusStyle(order.status)}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {/* Order Date */}
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={16} />

                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "Date not available"}
                  </div>

                  {/* Products */}
                  <div className="mt-5 space-y-3">
                    {order.products?.map((item, index) => {
                      const product = item.product;

                      return (
                        <div
                          key={product?._id || index}
                          className="flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-800">
                              {product?.name || "Product unavailable"}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <p className="shrink-0 text-sm font-medium text-gray-700">
                            {product?.price != null
                              ? `₹${(
                                  product.price * item.quantity
                                ).toLocaleString("en-IN")}`
                              : ""}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <p className="text-sm font-semibold text-gray-600">
                      Total Amount
                    </p>

                    <p className="flex items-center gap-1 text-lg font-bold text-[#421713]">
                      <IndianRupee size={17} />

                      {(order.totalAmount || 0).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
