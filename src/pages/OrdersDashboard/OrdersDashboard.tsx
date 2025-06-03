import { IoMdSearch } from "react-icons/io";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import { Bounce, toast } from "react-toastify";
import { Fragment, useEffect, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {  changeStatus, deleteOrderForUser, getUserInformayionForUser } from "../../lib/slices/dashboard";
import type { IProduct, IState } from "../../interfaces/productsDashbord";
import type { IOrder } from "../../interfaces/orderDashboard";
import Loader from "../../component/Loader";
import type { IUserInfo } from "../../interfaces/userInfoDashboard";
import { jwtDecode } from "jwt-decode";

const OrdersDashboard = () => {

    const [searchOrders,setSearchOrders]=useState<IOrder[]>()
    const [userDecoded,setUserDecode]=useState<IUserInfo>()
    
    // const [useInfo,setUserInfo]=useState<IUserInfo>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch=useDispatch<any>();
    const {orders,usersInfo,isLoading}=useSelector((state:IState)=>state.dashBoard);

    useEffect(()=>{
        const token=localStorage.getItem('Token') as string;
        if(token){
            const userDecodedFun = jwtDecode<IUserInfo>(token);
            console.log(userDecoded)
            setUserDecode(userDecodedFun)
        }
    },[])
    useEffect(()=>{
        try{
            (async()=>{
                if(orders?.length>0){
                    for(let i=0;i<orders?.length;i++){
                        await dispatch(getUserInformayionForUser(orders[i].userId))
                    }
                }
            })()
        }
        catch(error){
            console.log(error)
        }
    },[dispatch,orders]) 
    

    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        const orderId=e.target.value.toLowerCase();
        if(orderId !==""){
            const filterorders:IOrder[]=orders.filter((item:IOrder)=>item._id.toLowerCase().indexOf(orderId) !== -1);
            if(filterorders?.length>0){
                setSearchOrders(filterorders)
            }else{
                toast.error('Order Not Found', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            }
        }
        else{
            setSearchOrders(orders);
        }
    }
    if(isLoading){
        return <Loader/>
    }

    const deleteOrder=async(orderId:string)=>{
        await dispatch(deleteOrderForUser(orderId))
    }
    const handleChangeStatus=async(orderId:string,orderStatus:string)=>{
        await dispatch(changeStatus({orderId,orderStatus}))
    }
    return (
        <>
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Orders</h2>
                <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center w-[300px] mx-auto md:m-0">
                    <input type="text" placeholder="Search by OrderId" className="outline-0 border-0 pr-10" onChange={handleSearch}/>
                    <IoMdSearch className="text-lg " />
                </div>
            </div>
            <div className="scrollable-x mt-10">
                <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10 ">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-0 py-4 text-center text-gray-700 w-[150px]">Customer Name</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Order ID</th>
                            <th className=" px-0 py-4 text-center text-gray-700 min-w-[150px]">Payment Status</th>
                            <th className=" px-2 py-4 text-center text-gray-700">Total</th>
                            <th className=" px-0 py-4 text-center text-gray-700 min-w-[150px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {orders?.length>0?
                        (searchOrders||orders)?.map((order)=>{
                            const user =usersInfo?.find((u)=>u._id ==order.userId) || null
                            console.log(user?.role)
                            return(
                                <Fragment key={order._id}>
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className=" px-0 py-6 text-center text-gray-700">{user?user.username:"UnKnon"}</td>
                                        <td className=" px-2 py-6 text-center text-gray-700">{order._id}</td>
                                        <td className=" px-0 py-6 text-center">
                                            <span className={`inline-block px-2 py-1 ${order?.onlinePaymentDetails || order.orderStatus == "Delivered"?"text-green-800 border border-green-800 bg-green-100 " : "text-gray-800 border border-gray-800 bg-gray-100"}   rounded-full font-semibold`}>
                                                {order.onlinePaymentDetails?"Online Payment" : "Pay on Delivery"}
                                            </span>
                                        </td>
                                        <td className=" px-2 py-6 text-center  text-gray-700">
                                            {order.total}
                                        </td>
                                        {userDecoded?.role == "admin"?
                                            <td className=" px-0 py-6 text-center  text-gray-700">
                                                <button onClick={()=>deleteOrder(order._id)} className="bg-red-700 text-white py-1 px-4 rounded-lg transition-all duration-300 border border-red-700 hover:bg-white hover:text-red-800 cursor-pointer">Delete</button>
                                            </td>
                                        :
                                            <td className="px-2 py-6 text-center text-gray-700 flex flex-wrap justify-center w-[350px] items-center gap-2">
                                                <button onClick={()=>handleChangeStatus(order._id,"Pending")} className={` mr-2 mt-2 ${order.orderStatus == "Pending" && 'bg-sky-700 text-white'} py-1 px-4 rounded-lg transition-all duration-300 border border-sky-700 hover:bg-sky-700 hover:text-white cursor-pointer`}>Pending</button>
                                                <button onClick={()=>handleChangeStatus(order._id,"Shipped")} className={` mr-2 mt-2 ${order.orderStatus == "Shipped" && 'bg-sky-700 text-white'} py-1 px-4 rounded-lg transition-all duration-300 border border-sky-700 hover:bg-sky-700 hover:text-white cursor-pointer`}>Shipped</button>
                                                <button onClick={()=>handleChangeStatus(order._id,"Delivered")} className={` mr-2 mt-2 ${order.orderStatus == "Delivered" && 'bg-sky-700 text-white'} py-1 px-4 rounded-lg transition-all duration-300 border border-sky-700 hover:bg-sky-700 hover:text-white cursor-pointer`}>Delivered</button>
                                                <button onClick={()=>deleteOrder(order._id)} className="bg-red-700  mr-2 mt-2 text-white py-1 px-4 rounded-lg transition-all duration-300 border border-red-700 hover:bg-white hover:text-red-800 cursor-pointer">Delete</button>
                                            </td>
                                        }
                                        
                                        
                                    </tr>
                                </Fragment>
                            )
                        })
                        :
                        <tr>
                            <td className="text-center py-6 text-gray-500" colSpan={7}>Not Found Orders</td>
                        </tr>
                        }
                    </tbody>
                </motion.table>
            </div>

            <h2 className="text-2xl font-medium mt-10">Orders Details</h2>
            <div className="scrollable-x">
                <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10 ">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-center text-gray-700 w-[200px]">Product Name</th>
                            <th className=" px-4 py-4 text-center text-gray-700 w-[150px]">Customer Name</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Phone</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Address</th>
                            <th className=" px-4 py-4 text-center text-gray-700 w-[120px]">Date</th>
                            <th className=" px-4 py-4 text-center text-gray-700">QTY</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Price</th>
                            <th className=" px-4 py-4 text-center text-gray-700 min-w-[150px]">Order Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {orders?.length>0?
                            (searchOrders||orders).map((order,index:number)=>{
                                const user =usersInfo?.find((u)=>u._id ==order?.userId) || null
                                return(
                                    <Fragment key={index}>
                                    {order?.products.map((pro:IProduct,index2:number)=>{
                                        return(
                                            <Fragment key={index2}>
                                                <tr key={order?._id} className="hover:bg-gray-50">
                                                <td className="flex orders-center gap-3  px-4 py-6">
                                                    <img
                                                    src={pro.productDetails.imageCover || placeholderImage}
                                                    alt="product"
                                                    className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <p>{pro.productDetails.title.split(" ").slice(0,2).join(" ") }</p>
                                                </td>
                                                <td className=" px-4 py-6 text-center text-gray-700">{user?user?.username:"UnKnon"}</td>
                                                <td className=" px-4 py-6 text-center text-gray-700">{order?.order_details?.shippingAddress?.phone?order.order_details.shippingAddress.phone:"Unkown"}</td>
                                                <td className=" px-4 py-6 text-center text-gray-700">{order?.order_details?.shippingAddress?.city?order.order_details.shippingAddress.city:"Unkown"}</td>
                                                <td className=" px-4 py-6 text-gray-700 text-center">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                    <span className="text-sm text-gray-500 block text-center">
                                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </td>
                                                <td className=" px-4 py-6 text-center text-gray-700">
                                                    {pro.quantity}
                                                </td>
                                                <td className=" px-4 py-6 text-center text-gray-700">
                                                    {pro.price}
                                                </td>
                                                <td className="text-center">
                                                    <span className={`inline-block px-3 py-1 ${order.orderStatus == "Delivered"?"text-green-800 border border-green-800 bg-green-100 ": order.orderStatus =="Shipped"?"text-blue-800 border border-blue-800 bg-blue-100" : "text-gray-800 border border-gray-800 bg-gray-100"} rounded-full font-semibold`}>
                                                        <p>{order.orderStatus}</p>
                                                        
                                                    </span>
                                                </td>
                                                
                                            </tr>
                                            </Fragment>
                                        )
                                    })
                                    }
                                    </Fragment>
                                )
                            })
                        :
                        <tr>
                            <td colSpan={8} className="text-center py-6 text-gray-500">
                                You do not have any Order yet
                            </td>
                        </tr>
                        }
                    </tbody>
                </motion.table>
            </div>
            
        </>
    )
}

export default OrdersDashboard
