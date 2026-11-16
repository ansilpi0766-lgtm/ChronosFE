import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Collection from "./Pages/Collection";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";

import Timepieces from "./Pages/Timepieces";
import Accessories from "./Pages/Accessories";
import FineArt from "./Pages/FineArt";

// Layout
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
};

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "Collection",
        element: <Collection />,
      },
      {
        path: "timepieces",
        element: <Timepieces />,
      },
      {
        path: "accessories",
        element: <Accessories />,
      },
      {
        path: "fine-art",
        element: <FineArt />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
