import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import type { IState } from "../../interfaces/productsDashbord";
import { deleteAdminCoupon } from "../../lib/slices/dashboard";

const CouponDashbard = () => {
    const{coupons}=useSelector((state:IState)=>state.dashBoard);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch=useDispatch<any>();

    const deleteCouponFun=(couponId:string)=>{
        dispatch(deleteAdminCoupon(couponId))
    }
  return (
     <>
        <h2 className="font-semibold text-2xl mt-7">Coupons</h2>
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
                    {coupons.map((item)=>{
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
                    })}
                </tbody>
            </motion.table>
        </div>
    </>
  )
}

export default CouponDashbard
