import { Outlet, useLocation } from "react-router";
import Footer from "../../component/footer";
import Navbar from "../../component/navbar";
import { useAppDispatch } from "../../Hooks/index";
import { fetchWishlist } from "../../lib/slices/wishlistSlice";
import { useEffect } from "react";

const Layout = () => {
    
  const url=useLocation()

  // console.log(url.pathname.includes("dashboard"),"ddddddd")

  const dispatch = useAppDispatch();
    useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  console.log(url.pathname.includes("dashboard"),"ddddddd")

  return (
    <>
      <div className="flex justify-between flex-col min-h-screen">
        <Navbar />
        <Outlet />
        {!url.pathname.includes("dashboard") &&  <Footer />}
      </div>
    </>
  );
};

export default Layout;
