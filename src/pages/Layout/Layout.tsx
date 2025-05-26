import { Outlet, useLocation } from "react-router";
import Footer from "../../component/footer";
import Navbar from "../../component/navbar";
const Layout = () => {
  const url=useLocation()
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
