import type { ICategories } from "../../interfaces/categoriesDasboard";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import { IoMdSearch } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import {  useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { IProduct, IState } from "../../interfaces/productsDashbord";
import { deleteCategoryForAdmin, getcategoryForAdmin, getcategoryForManager} from "../../lib/slices/dashboard";
import { jwtDecode } from "jwt-decode";
import type { IUserInfo } from "../../interfaces/userInfoDashboard";



const CategoriesDashboard = () => {

    const [searchCategories,setSearchCategories]=useState<ICategories[]>()
    const {categories,products}=useSelector((state:IState)=>state.dashBoard);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch=useDispatch<any>();


    console.log(categories,"jjjjjjjjjjjj")
    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        const searchName=e.target.value.toLowerCase();
        if(searchName !==""){
            const filtercategories=categories.filter(item=>item.name.toLowerCase().indexOf(searchName) !== -1);
            if(filtercategories.length>0){
                setSearchCategories(filtercategories)
            }else{
                toast.error('Category Not Found', {
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
            setSearchCategories(categories);
        }
    }
    const deleteCategory=async(categoryName:string)=>{
        
        await dispatch(deleteCategoryForAdmin(categoryName));

        const token=localStorage.getItem('Token') as string;
                
        if(token){
            const userDecodedFun = jwtDecode<IUserInfo>(token);
            if(userDecodedFun.role == "admin"){
                await dispatch(getcategoryForAdmin())
            }else{
                await dispatch(getcategoryForManager())
            }
        }
    }
    console.log(categories)
  return (
    <>
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Categories</h2>
                <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center w-[300px] mx-auto md:m-0">
                    <input type="text" placeholder="Search by Category Name" className="outline-0 border-0 pr-10" onChange={handleSearch}/>
                    <IoMdSearch className="text-lg " />
                </div>
            </div>
        <div className="scrollable-x">
            <motion.table initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} className="min-w-full border-collapse bg-white mt-10">
                <thead className="bg-gray-100">
                    <tr>
                        <th className=" px-4 py-4 text-left text-gray-700"></th>
                        <th className=" px-4 py-4 text-center text-gray-700 min-w-[170px]">Category Name</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Number Of product</th>
                        <th className=" px-4 py-4 text-center text-gray-700 ">Action</th>
                    </tr>
                </thead>
                <tbody >
                    {categories?.length>0?
                        (searchCategories|| categories).map((item)=>{
                            let counter=0;
                            products.forEach((pro:IProduct)=>{
                                if(item.name===pro.category.name) counter++
                            })
                            return(
                            <tr key={item.name} className="hover:bg-gray-50">
                                    <td className="flex items-center gap-3  px-4 py-6 ">
                                        <img
                                        src={item.image || placeholderImage}
                                        alt="product"
                                        className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>

                                <td className=" px-4 py-6 text-center text-gray-700 ">{item.name}</td>
                                <td className=" px-4 py-6 text-center text-gray-700">{counter}</td>
                                <td className=" px-4 py-6 text-center flex gap-1 justify-center">
                                    <button onClick={()=>deleteCategory(item.name)} className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                            )
                        })
                    :
                    <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-500">
                                You do not have any Category yet
                            </td>
                        </tr>
                    }
                </tbody>
            </motion.table>
        </div>
    </>
  )
}

export default CategoriesDashboard
