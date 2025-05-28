import { IoMdSearch } from "react-icons/io";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { IOrderItem } from "../../interfaces/ordersDashboard";
import { Bounce, toast } from "react-toastify";
import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";


const OrdersDashboard = () => {
    const ordersArr:IOrderItem[] = [
  {
    productName: "Wireless Headphones",
    price: 99.99,
    status: "Complate",
    paymentDate: "2025-05-20",
    customer: "Alice Johnson",
    orderId: "ORD12345",
    quantity: 2,
  },
  {
    productName: "Bluetooth Speaker",
    price: 49.99,
    status: "Cash On Delivery",
    paymentDate: '2025-07-1',
    customer: "Bob Smith",
    orderId: "ORD12346",
    quantity: 1,
  },
  {
    productName: "Smart Watch",
    price: 199.99,
    status: "Complate",
    paymentDate: "2025-05-21",
    customer: "Charlie Davis",
    orderId: "ORD12347",
    quantity: 1,
  },
  {
    productName: "Gaming Mouse",
    price: 59.99,
    status: "Complate",
    paymentDate: "2025-05-22",
    customer: "Dana Lee",
    orderId: "ORD12348",
    quantity: 3,
  },
];
    const [orders,setOrders]=useState<IOrderItem[]>(ordersArr)


    
    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        const orderId=e.target.value.toLowerCase();
        if(orderId !==""){
            const filterorders=orders.filter(item=>item.orderId.toLowerCase().indexOf(orderId) !== -1);
            if(filterorders.length>0){
                setOrders(filterorders)
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
            setOrders(ordersArr);
        }
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
            <div className="scrollable-x">
                <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10 ">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-left text-gray-700">Product Name</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Order ID</th>
                            <th className=" px-4 py-4 text-left text-gray-700 min-w-[150px]">Customer Name</th>
                            <th className=" px-4 py-4 text-left text-gray-700 min-w-[120px]">Date</th>
                            <th className=" px-4 py-4 text-right text-gray-700">QTY</th>
                            <th className=" px-4 py-4 text-right text-gray-700">Price</th>
                            <th className=" px-4 py-4 text-left text-gray-700 min-w-[200px]">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {orders.map((item)=>{
                            return(
                            <tr key={item.orderId} className="hover:bg-gray-50">
                                {item.image?
                                <td className="flex items-center gap-3  px-4 py-6">
                                    <img
                                    src={item.image}
                                    alt="product"
                                    className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                :
                                <td className="flex items-center gap-3  px-4 py-6">
                                    <img
                                    src={placeholderImage}
                                    alt="product"
                                    className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                }
                                <td className=" px-4 py-6 text-gray-700">{item.orderId}</td>
                                <td className=" px-4 py-6 text-gray-700">{item.customer}</td>
                                <td className=" px-4 py-6 text-gray-700">{item.paymentDate}</td>
                                <td className=" px-4 py-6 text-right text-gray-700">{item.quantity}</td>
                                <td className=" px-4 py-6 text-right text-gray-700">${item.price}</td>
                                <td className=" px-4 py-6 text-center">
                                    <span className={`inline-block px-3 py-1 ${item.status.toLowerCase() == "complate"?"text-green-800 border border-green-800 bg-green-100 " : "text-gray-800 border border-gray-800 bg-gray-100"}   rounded-full font-semibold`}>
                                        {item.status}
                                    </span>
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

export default OrdersDashboard
