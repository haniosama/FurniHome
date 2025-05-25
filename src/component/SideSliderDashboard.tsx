import { AiOutlineHome } from "react-icons/ai"
import cartImage from "../assets/CartDashboard.png"
import { FaBars, FaRegFileAlt } from "react-icons/fa"
import { NavLink } from "react-router"
import { FiShoppingCart } from "react-icons/fi"
import { LuBox } from "react-icons/lu"
import { BiCategory } from "react-icons/bi"
import { FaUserGroup } from "react-icons/fa6"
import { MdSupportAgent } from "react-icons/md"
import { useState } from "react";
import "../pages/Dasboard/Dashboard.css"

const SideSliderDashboard = () => {
    const [openSlider,setOpenSlider]=useState(false);
    return (
        <div className={`${openSlider?"translate-x-0":"-translate-x-[207px]"} lg:translate-x-0 h-[90vh] bg-white p-2 fixed top-15 w-[210px] text-gray-700 transition-all duration-500`}>
                <div className="absolute top-9 lg:top-5 -right-[27px] lg:-right-2 bg-white p-2 rounded-lg cursor-pointer text-lg" onClick={()=>setOpenSlider(!openSlider)}>
                    <FaBars />
                </div>
            <div className="flex items-center">
                <img src={cartImage} alt="cart" className="w-[50px]"/>
                <h1 className="font-semibold text-xl">FurniHome</h1>
            </div>
            <NavLink onClick={()=>setOpenSlider(false)} to="maindashboard" className="flex items-center justify-start gap-2  w-[180px] mx-auto rounded-2xl mt-4 cursor-pointer py-3 pl-3 pr-10 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <AiOutlineHome className="text-lg font-medium"/>
                <h2 className="text-lg font-medium">Dashboard</h2>
            </NavLink>
            <NavLink onClick={()=>setOpenSlider(false)} to="products" className="flex items-center justify-start gap-2  w-[180px] mx-auto rounded-2xl mt-2 cursor-pointer py-3 pl-3 pr-10 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <LuBox className="text-lg font-medium"/> 
                <h2 className="text-lg font-medium">Products</h2>
            </NavLink>
            <NavLink onClick={()=>setOpenSlider(false)} to="orders" className="flex items-center  justify-start gap-2  w-[180px] mx-auto rounded-2xl mt-2 cursor-pointer py-3 pl-3 pr-7 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <FiShoppingCart className="text-lg font-medium"/>
                <h2 className="text-lg font-medium">Orders</h2>
                <div className="w-[25px] h-[25px] text-center font-medium bg-blue-800 text-white rounded-full ml-3">4</div>
            </NavLink>
            <NavLink onClick={()=>setOpenSlider(false)} to="categories" className="flex items-center justify-start gap-2  w-[180px] mx-auto rounded-2xl mt-2 cursor-pointer py-3 pl-3 pr-1 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <BiCategory className="text-lg font-medium"/>
                <h2 className="text-lg font-medium">Categories</h2>
                <div className="w-[25px] h-[25px] text-center font-medium bg-blue-800 text-white rounded-full ml-3">5</div>
            </NavLink>
            <NavLink onClick={()=>setOpenSlider(false)} to="customer" className="flex items-center justify-start gap-2  w-[180px] mx-auto rounded-2xl mt-2 cursor-pointer py-3 pl-3 pr-3 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <FaUserGroup className="text-lg font-medium"/>
                <h2 className="text-lg font-medium">Customers</h2>
                <div className="w-[25px] h-[25px] text-center font-medium bg-blue-800 text-white rounded-full ml-3">1</div>
            </NavLink>
            <NavLink onClick={()=>setOpenSlider(false)} to="coupons" className="flex items-center justify-start gap-2  w-[180px] mx-auto rounded-2xl mt-2 cursor-pointer py-3 pl-3 pr-10 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <FaRegFileAlt className="text-lg font-medium"/>
                <h2 className="text-lg font-medium">Coupons</h2>
            </NavLink>



            <div className="flex items-center justify-start gap-2  w-[220px] mx-auto rounded-2xl mt-2 cursor-pointer py-3 pl-3 pr-10 absolute bottom-0 left-3 transition-all duration-300 hover:text-[#3d5f9e] hover:bg-[#3d5f9e1a]">
                <MdSupportAgent className="text-lg font-medium"/>
                <h2 className=" font-medium">Help&Support</h2>
            </div>
        </div>
    )
}

export default SideSliderDashboard
