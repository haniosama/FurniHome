import { Outlet } from "react-router";

import Footer from "../../component/footer";
import Navbar from "../../component/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
