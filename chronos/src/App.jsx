import React, { useEffect, useRef } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
import FAQ from "./Pages/FAQ";

// Main Layout
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const skipNextReset = useRef(false);

  useEffect(() => {
    // Disable browser automatic scroll restoration
    window.history.scrollRestoration = "manual";

    // Skip the scroll reset after clearing navigation state
    if (skipNextReset.current) {
      skipNextReset.current = false;
      return;
    }

    const sectionId =
      location.pathname === "/" ? location.state?.scrollTo : null;

    // If navigating from another page to About or Contact
    if (sectionId) {
      let attempts = 0;
      let animationFrame;

      const scrollToSection = () => {
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          // Clear navigation state so refreshing starts at the top
          skipNextReset.current = true;

          navigate("/", {
            replace: true,
            state: null,
          });

          return;
        }

        attempts++;

        if (attempts < 60) {
          animationFrame = requestAnimationFrame(scrollToSection);
        } else {
          window.scrollTo(0, 0);
        }
      };

      animationFrame = requestAnimationFrame(scrollToSection);

      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }

    // Normal page navigation or refresh: start at the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.key]);

  return (
    <>
      <Navbar />

      <Outlet />

      {/* Global Footer */}
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
        element: <HomePage />,
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
