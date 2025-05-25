import type { IOreder } from "../../interfaces/orderDashboard";
import { motion } from "framer-motion";

const CouponDashbard = () => {
const orders: IOreder[] = [
    {
        code: "ORD001",
        id: "1",
        usedCounter: 2,
        discount: 10
    },
    {
        code: "ORD002",
        id: "2",
        usedCounter: 5,
        discount: 15
    },
    {
        code: "ORD003",
        id: "3",
        usedCounter: 1,
        discount: 5
    }
];
  return (
     <>
        <h2 className="font-semibold text-2xl mt-7">Products</h2>
        <div className="scrollable-x">
            <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10">
                <thead className="bg-gray-100">
                    <tr>
                        <th className=" px-4 py-4 text-left text-gray-700">Coupon Id</th>
                        <th className=" px-4 py-4 text-left text-gray-700">Code</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Use counter</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Discount</th>
                        <th className=" px-4 py-4 text-center text-gray-700 ">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {orders.map((item)=>{
                        return(
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className=" px-4 py-6 text-gray-700">#{item.id}</td>
                            <td className=" px-4 py-6 text-gray-700">{item.code}</td>
                            <td className=" px-4 py-6 text-center">{item.usedCounter}</td>
                            <td className=" px-4 py-6 text-center text-gray-700">{item.discount}</td>
                            <td className=" px-4 py-6 text-center flex gap-1 justify-center">
                                {/* <button className="bg-green-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-green-700 transition-all duration-300 hover:bg-white hover:text-green-700">Update</button> */}
                                <button className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700">Delete</button>
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
