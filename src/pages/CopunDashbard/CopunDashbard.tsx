import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import type { IState } from "../../interfaces/productsDashbord";
import { addCoupon, deleteAdminCoupon } from "../../lib/slices/dashboard";
import { useEffect, useState } from "react";
import type { IUserInfo } from "../../interfaces/userInfoDashboard";
import { jwtDecode } from "jwt-decode";
import AddCouponForm from "../../component/AddCouponForm";

const CouponDashbard = () => {
    const{coupons}=useSelector((state:IState)=>state.dashBoard);
    const [userDecoded,setUserDecode]=useState<IUserInfo>()
    const [openAddProductContainer,setOpenAddProductContainer]=useState<boolean>(false);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch=useDispatch<any>();

    const deleteCouponFun=(couponId:string)=>{
        dispatch(deleteAdminCoupon(couponId))
    }

    useEffect(()=>{
        const token=localStorage.getItem('Token') as string;
        if(token){
            const userDecodedFun = jwtDecode<IUserInfo>(token);
            console.log(userDecoded)
            setUserDecode(userDecodedFun)
        }
    },[])
    const handleAddCoupon=(data:FormData)=>{
            dispatch(addCoupon(data))
    }
  return (
     <>
        {openAddProductContainer && userDecoded?.role == "admin"
            &&
            <AddCouponForm handleAddCoupon={handleAddCoupon} coupons={coupons} setOpenAddProductContainer={setOpenAddProductContainer}/>
        }
        <h2 className="font-semibold text-2xl mt-7">Coupons</h2>
        {userDecoded?.role == "admin"
            &&
                <div className="flex justify-end mt-10 mr-7">
                    <button onClick={()=>setOpenAddProductContainer(true)} className="py-1 px-2 text-sky-700 rounded-xl border-2 border-sky-700 transition-all duration-300 hover:bg-sky-700 hover:text-white cursor-pointer">Add Coupon</button>
                </div>
                
            }
        <div className="scrollable-x">
            <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10">
                <thead className="bg-gray-100">
                    <tr>
                        <th className=" px-4 py-4 text-center text-gray-700">Coupon Id</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Code</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Use counter</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Discount</th>
                        <th className=" px-4 py-4 text-center text-gray-700 ">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {coupons?.length>0?
                        coupons?.map((item)=>{
                            return(
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className=" px-4 py-6 text-center text-gray-700">#{item._id}</td>
                                <td className=" px-4 py-6 text-center text-gray-700">{item.code}</td>
                                <td className=" px-4 py-6 text-center">{item.counterUser}</td>
                                <td className=" px-4 py-6 text-center text-gray-700">{item.discount}</td>
                                <td className=" px-4 py-6 text-center flex gap-1 justify-center">
                                    {/* <button className="bg-green-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-green-700 transition-all duration-300 hover:bg-white hover:text-green-700">Update</button> */}
                                    <button onClick={()=>{deleteCouponFun(item._id)}} className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                            )
                        })
                    :
                    <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">
                                You do not have any Coupon yet
                            </td>
                        </tr>
                    }
                </tbody>
            </motion.table>
        </div>
    </>
  )
}

export default CouponDashbard
