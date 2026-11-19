import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Membership from "./Components/Membership";

import HomePage from "./Pages/HomePage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Collection from "./Pages/Collection";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import FAQ from "./Pages/FAQ";
// Layout
const Layout = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />

      <Outlet />

      {/* Hide global Footer on Contact page */}
      {location.pathname !== "/contact" && <Footer />}

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
      {
        path: "about",
        element: <Membership />,
      },
      {
        path: "contact",
        element: <Footer />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
