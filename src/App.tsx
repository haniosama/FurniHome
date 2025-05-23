import "./App.css";

import {createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register.tsx";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword.tsx";
import Home from "./pages/Home/Home.tsx";
import ContactUs from "./pages/Contactus/ContactUs.tsx";
import Product from "./pages/Products/Product.tsx";
import ProductDetials from "./pages/ProductDetial/ProductDetials.tsx";
import Category from "./pages/Category/Category.tsx";
import Order from "./pages/Order/Order.tsx";
import Setting from "./pages/Setting/Setting.tsx";
import Wishlist from "./pages/Wishlist/Wishlist.tsx";
import DashBoard from "./pages/Dasboard/Dashboard.tsx";
import Cart from "./pages/Cart/Carts.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import { store } from "./lib/store/store.ts";

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
    path: "cart",
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
    path: "wishlist",
    element: <Wishlist />,
  },
  {
    path: "contactus",
    element: <ContactUs />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
