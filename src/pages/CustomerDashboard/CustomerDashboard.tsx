import { IoMdSearch } from "react-icons/io";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { ICustomer } from "../../interfaces/customerDashboard";
import { Bounce, toast } from "react-toastify";
import {  useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/productsDashbord";
import Loader from "../../component/Loader";

const CustomerDashboard = () => {

const [searchCustomers,setSearchCustomers]=useState<ICustomer[]>()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {customers,isLoading}=useSelector((state:IState)=>state.dashBoard);

    


    
    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        const searchName=e.target.value.toLowerCase();
        if(searchName !==""){
            const filtercustomers=customers.filter(item=>item.userDetails.username.toLowerCase().indexOf(searchName) !== -1);
            console.log(filtercustomers)
            if(filtercustomers.length>0){
                setSearchCustomers(filtercustomers)
            }else{
                toast.error('Customer Not Found', {
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
            setSearchCustomers(customers);
        }
    }

    if(isLoading){
        return <Loader/>
    }
    return (
        <>
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Customers</h2>
                <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center w-[300px] mx-auto md:m-0">
                    <input type="text" placeholder="Search By Customer Name" className="outline-0 border-0 pr-10" onChange={handleSearch}/>
                    <IoMdSearch className="text-lg " />
                </div>
            </div>
            <div className="scrollable-x">
                <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-center text-gray-700">Image</th>
                            <th className=" px-4 py-4 text-center text-gray-700 min-w-[150px]">Customer Name</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Orders Total</th>
                            <th className=" px-4 py-4 text-center text-gray-700 ">Email</th>
                            <th className=" px-4 py-4 text-center text-gray-700 min-w-[150px]">Phone</th>
                        </tr>
                    </thead>
                    <tbody >
                        {customers?.length>0?
                            (searchCustomers || customers)?.map((customer)=>{
                                return(
                                <tr key={customer?._id} className="hover:bg-gray-50">
                                    <td className="flex items-center gap-3  px-4 py-6">
                                        <img
                                        src={customer?.userDetails.avatar || placeholderImage}
                                        alt="product"
                                        className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className=" px-4 py-6 text-gray-700">{customer?.userDetails.username}</td>
                                    <td className=" px-4 py-6 text-gray-700 text-center ">{customer?.orders.length.toFixed(0)}</td>
                                    <td className=" px-4 py-6 text-center">{customer?.userDetails.email}</td>
                                    <td className=" px-4 py-6 text-center text-gray-700">{customer?.userDetails.phone}</td>
                                </tr>
                                )
                            })
                        :
                        <tr>
                            <td colSpan={5} className="text-center py-6 text-gray-500">
                                You do not have any Customer yet
                            </td>
                        </tr>
                        }
                    </tbody>
                </motion.table>
            </div>
        </>
    )
}

export default CustomerDashboard
