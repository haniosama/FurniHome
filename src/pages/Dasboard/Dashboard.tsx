import { Outlet } from "react-router";
import SideSliderDashboard from "../../component/SideSliderDashboard";
import "./Dashboard.css"
const DashBoard = () => {
  return <div className="flex">
    <SideSliderDashboard/>
    <div className="lg:ml-[230px] bg-[#f4f5fc] min-h-[99vh] w-full p-4 ">
        <Outlet/>
    </div>
  </div>;
};
export default DashBoard;
