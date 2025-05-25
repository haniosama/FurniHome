import { Outlet } from "react-router";

import Navbar from "../../component/Navbar";
import Footer from "../../component/footer";

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
