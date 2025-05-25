import "./App.css";

import { createHashRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
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
import Layout from "./pages/Layout/Layout.tsx";
import MainDashboar from "./pages/MainDashboar/MainDashboar.tsx";
import OrdersDashboard from "./pages/OrdersDashboard/OrdersDashboard.tsx";
import ProductDashboard from "./pages/ProductDashboard/ProductDashboard.tsx";
import CustomerDashboard from "./pages/CustomerDashboard/CustomerDashboard.tsx";
import CouponDashbard from "./pages/CopunDashbard/CopunDashbard.tsx";
import CategoriesDashboard from "./pages/CategoriesDashboard/CategoriesDashboard.tsx";
import { Toaster } from "react-hot-toast";


const router = createHashRouter([
  {
    path: '', element: <Layout />, children:
      [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
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
          children:[
            {index:true,element:<MainDashboar/>},
            {path:"maindashboard",element:<MainDashboar/>},
            {path:"orders",element:<OrdersDashboard/>},
            {path:"products",element:<ProductDashboard/>},
            {path:"customer",element:<CustomerDashboard/>},
            {path:"coupons",element:<CouponDashbard/>},
            {path:"categories",element:<CategoriesDashboard/>},
          ]
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
      ]
  }

]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  );
}

export default App;
