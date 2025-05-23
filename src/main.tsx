import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";
import Home from "./pages/Home.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import Product from "./pages/Product.tsx";
import ProductDetials from "./pages/ProductDetials.tsx";
import Category from "./pages/Category.tsx";
import Order from "./pages/Order.tsx";
import Setting from "./pages/Setting.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import DashBoard from "./pages/Dashboard.tsx";
import Cart from "./pages/Carts.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "dashboard",
    element: <DashBoard />,
  },
  {
    path: "product",
    element: <Product />,
  },
  {
    path: "product/:id",
    element: <ProductDetials />,
  },
  {
    path: "Carts",
    element: <Cart />,
  },
  {
    path: "category",
    element: <Category />,
  },
  {
    path: "order",
    element: <Order />,
  },
  {
    path: "setting",
    element: <Setting />,
  },
  {
    path: "Wishlist",
    element: <Wishlist />,
  },
  {
    path: "Contactus",
    element: <ContactUs />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
