/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useCallback, useEffect, useState, type ChangeEvent } from "react";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { IProduct, IState } from "../../interfaces/productsDashbord";
import { IoMdSearch } from "react-icons/io";
import { Bounce, toast } from 'react-toastify';
import { motion } from "framer-motion";
import Loader from "../../component/Loader";
import { useDispatch, useSelector } from "react-redux";
import AddProductForm from "../../component/AddProductForm";
import { addProduct, deleteProduct, getSpecificProduct, updataProduct } from "../../lib/slices/dashboard";
import UpdataProductForm from "../../component/UpdataProductForm";
import type { IUserInfo } from "../../interfaces/userInfoDashboard";
import { jwtDecode } from "jwt-decode";

// type IState2={
//   [key:string]:string
// }


const ProductDashboard = () => {

    const [searchProducts,setSearchProducts]=useState<IProduct[]>();
    const [productId,setProductId]=useState<string>("");
    const [openAddProductContainer,setOpenAddProductContainer]=useState<boolean>(false);
    const [openUpdataProductContainer,setOpenUpdataProductContainer]=useState<boolean>(false);
    const dispatch=useDispatch<any>()
    const [userDecoded,setUserDecode]=useState<IUserInfo>()

    const {products,specificProduct,usersInfo,isLoading}:{products:IProduct[],usersInfo:IUserInfo[],isLoading:boolean,specificProduct:IProduct[]}=useSelector((state:IState)=>state.dashBoard);
    console.log(specificProduct,"sssssssssssssssssssssssssssss")    

        useEffect(()=>{
        const token=localStorage.getItem('Token') as string;
        if(token){
            const userDecodedFun = jwtDecode<IUserInfo>(token);
            console.log(userDecoded)
            setUserDecode(userDecodedFun)
        }
    },[])


    const handleAddProduct=useCallback(async(formtData:FormData)=>{
        await dispatch(addProduct(formtData))
    },[dispatch])
    
    const handleUpdataProduct=useCallback(async(productId:string,formtData:FormData)=>{
        setOpenUpdataProductContainer(true);
        await dispatch(updataProduct({productId,formtData}))
    },[dispatch]);
    

    useEffect(()=>{
        if(productId){
            (async()=>{
                await dispatch(getSpecificProduct(productId))
            })()
        }
    },[productId,dispatch])

    console.log(usersInfo,"ffffffff")

    const handleSearch=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
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

    const handleDeleteProduct=async(productId:string)=>{
        await dispatch(deleteProduct(productId))
    }
    if(isLoading){
        return <Loader/>
    }


    return (
        <>
        {openAddProductContainer && userDecoded?.role == "admin"
            &&
            <AddProductForm handleAddProduct={handleAddProduct} setOpenAddProductContainer={setOpenAddProductContainer}/>
        }
        {openUpdataProductContainer && specificProduct && userDecoded?.role == "admin"
            &&
            <UpdataProductForm productId={productId}  specificProduct={specificProduct[0]} handleUpdataProduct={handleUpdataProduct} setOpenUpdataProductContainer={setOpenUpdataProductContainer}/>
        }
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Products</h2>
                <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center w-[300px] mx-auto md:m-0">
                    <input type="text" placeholder="Search by Produc Name" className="outline-0 border-0 pr-10" onChange={handleSearch}/>
                    <IoMdSearch className="text-lg " />
                </div>
            </div>
            {userDecoded?.role == "admin"
            &&
                <div className="flex justify-end mt-10 mr-7">
                    <button onClick={()=>setOpenAddProductContainer(true)} className="py-1 px-2 text-sky-700 rounded-xl border-2 border-sky-700 transition-all duration-300 hover:bg-sky-700 hover:text-white cursor-pointer">Add Product</button>
                </div>
                
            }
            <div className="scrollable-x">
                <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-center text-gray-700 min-w-[80px]"></th>
                            <th className=" px-4 py-4 text-center text-gray-700">Product Name</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Category</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Price</th>
                            <th className=" px-4 py-4 text-center text-gray-700 ">Status</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Stock</th>
                            <th className=" px-4 py-4 text-center text-gray-700 min-w-[150px]">Create At</th>
                            <th className=" px-4 py-4 text-center text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {(searchProducts || products) ? (
                            (searchProducts || products)?.map((item) => (
                                <tr key={item?._id} className="hover:bg-gray-50">
                                <td className="flex items-center gap-3 px-4 py-6">
                                    <img
                                    src={item?.imageCover || placeholderImage}
                                    alt="product"
                                    className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="px-4 py-6 text-center text-gray-700">{item?.title.split(" ").slice(0,2).join(" ")}</td>
                                <td className="px-4 py-6 text-center text-gray-700">{item?.category.name}</td>
                                <td className="px-4 py-6 text-center text-gray-700">{item?.price}</td>
                                <td className="px-4 py-6  text-center">
                                    <span
                                    className={`inline-block px-3 py-1 rounded-full font-semibold ${
                                        item?.quantity > 0
                                        ? "text-green-700 border border-green-700 bg-green-100"
                                        : "text-gray-700 border border-gray-700 bg-gray-100"
                                    }`}
                                    >
                                    {item?.quantity > 0 ? "Available" : "Out of Stock"}
                                    </span>
                                </td>

                                <td className="px-4 py-6 text-center text-gray-700">{item?.quantity}</td>
                                <td className="px-4 py-6 text-center text-gray-700">
                                    {new Date(item?.createdAt).toLocaleDateString()}
                                    <span className="text-sm text-gray-500 block text-center">
                                        {new Date(item?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </td>

                                <td className="px-4 py-6 text-center flex gap-1">
                                    {userDecoded?.role == "admin"
                                    &&
                                        <button onClick={()=>{setProductId(item?._id) ; setOpenUpdataProductContainer(true)}} className="bg-sky-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-blue-700 transition-all duration-300 hover:bg-white hover:text-blue-700">
                                        Updata
                                        </button>
                                    }
                                    <button onClick={()=>handleDeleteProduct(item?._id)} className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700">
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500">
                                    You do not have any Product yet
                                    </td>
                                </tr>
                            )
                            }
                    </tbody>
                </motion.table>
            </div>
        </>
    )
}

export default ProductDashboard
