import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword.tsx";
import Home from "./pages/Home/Home.tsx";
import ContactUs from "./pages/Contactus/ContactUs.tsx";
import ProductDetials from "./pages/ProductDetial/ProductDetials.tsx";
import Category from "./pages/Category/Category.tsx";
import Order from "./pages/Orders/Orders.tsx";
import Setting from "./pages/Setting/Setting.tsx";
import Wishlist from "./pages/Wishlist/Wishlist.tsx";
import DashBoard from "./pages/Dasboard/Dashboard.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";
import { store } from "./lib/store/store.ts";
import Layout from "./pages/Layout/Layout.tsx";
import MainDashboar from "./pages/MainDashboar/MainDashboar.tsx";
import OrdersDashboard from "./pages/OrdersDashboard/OrdersDashboard.tsx";
import ProductDashboard from "./pages/ProductDashboard/ProductDashboard.tsx";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard.tsx";
import CouponDashbard from "./pages/CopunDashbard/CopunDashbard.tsx";
import CategoriesDashboard from "./pages/CategoriesDashboard/CategoriesDashboard.tsx";
import AllProduct from "./pages/Products/Product.tsx";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails.tsx";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import CheckOut from "./pages/CheckOut/CheckOut.tsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      {
        path: "dashboard",
        element: <DashBoard />,
        children: [
          { index: true, element: <MainDashboar /> },
          { path: "maindashboard", element: <MainDashboar /> },
          { path: "orders", element: <OrdersDashboard /> },
          { path: "products", element: <ProductDashboard /> },
          { path: "customer", element: <CustomerDashboard /> },
          { path: "coupons", element: <CouponDashbard /> },
          { path: "categories", element: <CategoriesDashboard /> },
        ],
      },
      {
        path: "product",
        element: <AllProduct />,
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
        path: "category/:name",
        element: <CategoryDetails />,
      },
      {
        path: "orders",
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
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}

export default App;
