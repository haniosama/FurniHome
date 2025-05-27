import { Outlet } from "react-router";
import Footer from "../../component/footer";
import Navbar from "../../component/navbar";

const Layout = () => {
    
  return (
    <>
      <div className="flex justify-between flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
