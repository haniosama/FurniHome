import { MdOutlineAttachMoney } from "react-icons/md"
import ChartDashboard from "../../component/ChartDashboard"
import CusomterTableMainDashboard from "../../component/CusomterTableMainDashboard"
import ChartCricleDashboard from "../../component/ChartDashboardCricle"
import CardDashboard from "../../component/CardDashboard"
import {  useSelector } from "react-redux"
// import { useEffect, useState } from "react"
// import { getCustomerForAdmin, getProdectForAdmin } from "../../lib/slices/dashboard"
import type { IProduct, IState } from "../../interfaces/productsDashbord"
// import Cookie from "js-cookie"
// import { jwtDecode } from "jwt-decode"
// import type { IUserInfo } from "../../interfaces/userInfoDashboard"
import Loader from "../../component/Loader";
import { TiShoppingCart } from "react-icons/ti";
import { FiUsers } from "react-icons/fi"
import type { ICustomer } from "../../interfaces/customerDashboard"
import type { IOrder } from "../../interfaces/orderDashboard"




const MainDashboar = () => {
    const {customers,orders,products,isLoading}:{customers:ICustomer[],orders:IOrder[],products:IProduct[],isLoading:boolean}=useSelector((state:IState)=>state.dashBoard);

    const calcTotal=()=>{
        return customers?.reduce((total,current)=>{
            return total+current.orders.reduce((sum,order)=>{
                return order?.total+sum
            },0)
        },0)
    }



    
    if(isLoading){
        return <Loader/>
    }
    return (
        <div className="my-5">
                <div className="flex gap-4 justify-center lg:justify-around flex-wrap">
                    <CardDashboard header="Total Sales" icon={<MdOutlineAttachMoney className="text-lg"/>} ratio={3.2} quantity={calcTotal() || 0}/>
                    <CardDashboard header="Total Orders" icon={<TiShoppingCart className="text-lg"/>} ratio={12.2} quantity={orders?.length || 0}/>
                    <CardDashboard header="Customers" icon={<FiUsers  className="text-lg"/>} ratio={13.2} quantity={customers?.length || 0}/>
                </div>
                <div className="min-h-[430px] bg-white mt-5 rounded-2xl">
                    <h2 className='text-xl font-semibold ml-4 pt-4'>Report</h2>
                    <ChartDashboard/>
                </div>
                <div className="min-h-[430px] bg-white mt-5 rounded-2xl py-5">
                    <h2 className='text-xl font-semibold ml-4 pt-4'>Product && Customer</h2>
                    <div className="flex justify-center lg:justify-between gap-y-10 items-center px-3 gap-3 flex-wrap">
                        <ChartCricleDashboard products={products}/>
                        <CusomterTableMainDashboard customers={customers}/>
                    </div>
                </div>
        </div>
    )
}

export default MainDashboar
