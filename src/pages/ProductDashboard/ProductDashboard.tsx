/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type ChangeEvent } from "react";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { IProduct, IState } from "../../interfaces/productsDashbord";
import { IoMdSearch } from "react-icons/io";
import { Bounce, toast } from 'react-toastify';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getProdectForAdmin } from "../../lib/slices/dashboard";


const ProductDashboard = () => {

    const [searchProducts,setSearchProducts]=useState<IProduct[]>([]);

    const {products}:{products:IProduct[]}=useSelector((state:IState)=>state.dashBoard);
    const dispatch=useDispatch<any>();
    useEffect(()=>{
        (async()=>{
            await dispatch(getProdectForAdmin())
            setSearchProducts(products)
        })()
    },[dispatch])


    
    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        const searchName=e.target.value.toLowerCase();
        if(searchName !==""){
            const filterProducts=products.filter(item=>item.title.toLowerCase().indexOf(searchName) !== -1);
            if(filterProducts.length>0){
                setSearchProducts(filterProducts)
            }else{
                toast.error('Product Not Found', {
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
            setSearchProducts(products);
        }
    }
    return (
        <>
            {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                /> */}
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Customer</h2>
                <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center w-[300px] mx-auto md:m-0">
                    <input type="text" placeholder="Search by Produc Name" className="outline-0 border-0 pr-10" onChange={handleSearch}/>
                    <IoMdSearch className="text-lg " />
                </div>
            </div>
            <div className="scrollable-x">
                <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-left text-gray-700 min-w-[80px]"></th>
                            <th className=" px-4 py-4 text-left text-gray-700">Product Name</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Category</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Price</th>
                            <th className=" px-4 py-4 text-center text-gray-700 ">Status</th>
                            <th className=" px-4 py-4 text-right text-gray-700">Stock</th>
                            <th className=" px-4 py-4 text-right text-gray-700 min-w-[150px]">Create At</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {searchProducts.map((item)=>{
                            return(
                            <tr key={item.title} className="hover:bg-gray-50">
                                {item.imageCover?
                                <td className="flex items-center gap-3  px-4 py-6">
                                    <img
                                    src={item.imageCover}
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
                                <td className=" px-4 py-6 text-gray-700">{item.title}</td>
                                <td className=" px-4 py-6 text-gray-700">{item.category.name}</td>
                                <td className=" px-4 py-6 text-gray-700">{item.price}</td>
                                <td className=" px-4 py-6 text-center">
                                    <span className={`inline-block px-3 py-1 ${item.quantity>0?"text-green-800 border border-green-800 bg-green-100 " : "text-gray-800 border border-gray-800 bg-gray-100"}   rounded-full font-semibold`}>
                                        {item.quantity>0?"Available":"Out of Stock"}
                                    </span>
                                </td>
                                <td className=" px-4 py-6 text-right text-gray-700">{item.quantity}</td>
                                <td className=" px-4 py-6 text-right text-gray-700">{item.createdAt}</td>
                                <td className=" px-4 py-6 text-center flex gap-1">
                                    <button className="bg-green-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-blue-700 transition-all duration-300 hover:bg-white hover:text-blue-700">Update</button>
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

export default ProductDashboard
