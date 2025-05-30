/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useState, type ChangeEvent } from "react";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { IProduct, IState } from "../../interfaces/productsDashbord";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { Bounce, toast } from 'react-toastify';
import { motion } from "framer-motion";
import Loader from "../../component/Loader";
import { useSelector } from "react-redux";

// type IState2={
//   [key:string]:string
// }

type IAction={
  type:string,
  field:string,
  value:string
}
interface IInitState{
    title: string;
    description: string;
    price: string;
    category: string;
    quantity: string;
    images: never[];
}
const ProductDashboard = () => {

    const [searchProducts,setSearchProducts]=useState<IProduct[]>();
    const [openAddProductContainer,setOpenAddProductContainer]=useState<boolean>(false);
    const [errors,setErrors]=useState<{[key:string]:string |[]}>({
        title:"",
        description:"",
        price:"",
        category:"",
        quantity:"",
        images:[],

    })
    const initState:IInitState={
        title:"",
        description:"",
        price:"",
        category:"",
        quantity:"",
        images:[],
    }
    const reducer=(state:IInitState,action:IAction)=>{
        if(action.type === 'input'){
            return {...state,[action.field]:action.value}
        }
        return state
    }
    const [state,dispatch]=useReducer(reducer,initState);

    const {products,isLoading}:{products:IProduct[],isLoading:boolean}=useSelector((state:IState)=>state.dashBoard);
    console.log(products)    


    
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
    if(isLoading){
        return <Loader/>
    }

    const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        dispatch({
            type:"input",
            field:e.target.name,
            value:e.target.value
        })
    }
    const handleOnSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(state.title && state.description &&  !isNaN(Number(state.price)) &&  Number(state.price) > 0 && state.category &&  !isNaN(Number(state.quantity)) &&  Number(state.quantity) > 0  && state.images.length>0 && state.images.length<=5){
            console.log(state)
        }else{
            if(!state.title.trim()){
                setErrors((prev)=>{return {...prev,title:"The Title is Required"}})
            }
            if(!state.description.trim()){
                setErrors((prev)=>{return {...prev,description:"The Description is Required"}})
            }
            if(isNaN(Number(state.price)) || Number(state.price) <= 0){
                setErrors((prev)=>{return {...prev,price:"The Price must be Number"}})
            }
            if(!state.category.trim()){
                setErrors((prev)=>{return {...prev,category:"The Category is Required"}})
            }
            if(isNaN(Number(state.quantity)) || Number(state.quantity) <= 0){
                setErrors((prev)=>{return {...prev,quantity:"The Quantity must be Number"}})
            }
            if(state.images.length<=0){
                setErrors((prev)=>{return {...prev,images:"The Images is Required"}})
            }
            if(state.images.length>5){
                setErrors((prev)=>{return {...prev,images:"You can select 5 Images Only"}})
            }
        }
    }
    return (
        <>
        {openAddProductContainer
            &&
            <motion.form 
            onSubmit={handleOnSubmit} className="fixed top-[50%] left-[50%] py-7 px-10 -translate-[50%] bg-white rounded-2xl min-h-[450px] min-w-[90%] md:min-w-[700px] "
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            >
            
                <h2 className="text-center text-2xl font-medium text-sky-700 mb-10">Add Product</h2>
                <button title="close" onClick={()=>setOpenAddProductContainer(false)} className="absolute top-5 right-5 text-3xl font-medium text-red-700 transition-all duration-300 hover:rotate-180 cursor-pointer"><IoMdClose/> </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 h-[80%]">
                    <div >
                        <label htmlFor="title" className="block font-medium">Title:</label>
                        <input id="title" type="text" placeholder="Title" name="title" value={state.title} onChange={(e)=>handleOnChange(e)} className=" w-full py-2 px-2 border-b-2 border-sky-700 outline-none rounded-lg transition-all duration-300 hover:scale-105 " />
                    </div>
                    <div >
                        <label htmlFor="desc" className="block font-medium">Description:</label>
                        <input id="desc" type="text" placeholder="Description" value={state.description} name="description" onChange={(e)=>handleOnChange(e)} className=" w-full py-2 px-2 border-b-2 border-sky-700 outline-none rounded-lg transition-all duration-300 hover:scale-105 " />
                    </div>
                    <div >
                        <label htmlFor="price" className="block font-medium">Price:</label>
                        <input id="price" type="text" placeholder="Price" name="price" value={state.price} onChange={(e)=>handleOnChange(e)} className=" w-full py-2 px-2 border-b-2 border-sky-700 outline-none rounded-lg transition-all duration-300 hover:scale-105 " />
                    </div>
                    <div >
                        <label htmlFor="select" className="block font-medium">Categories:</label>
                        {/* <input type="select" placeholder="Title"  /> */}
                        <select id="select" title="selection" name="category" value={state.category} onChange={(e)=>handleOnChange(e)} className="  py-2 px-2 border-b-2 border-sky-700 outline-none rounded-lg transition-all duration-300 hover:scale-105 w-full">
                            <option value="Camera">Camera</option>
                            <option value="Phones">Phones</option>
                        </select>
                    </div>
                    <div >
                        <label htmlFor="quantity" className="block font-medium">Quantity:</label>
                        <input id="quantity"name="quantity" type="text" value={state.quantity} placeholder="Quantity" onChange={(e)=>handleOnChange(e)} className=" w-full py-2 px-2 border-b-2 border-sky-800 outline-none rounded-lg transition-all duration-300 hover:scale-105 " />
                    </div>
                    <div >
                        <label htmlFor="title" className="block font-medium">Image:</label>
                        <input type="file" name="images" accept="image/*" value={state.images} multiple title="images" onChange={(e)=>handleOnChange(e)} className=" w-full py-2 px-2 border-b-2 border-sky-700 outline-none rounded-lg transition-all duration-300 hover:scale-105 " />
                    </div>
                </div>
                <input type="submit" className="bg-sky-700 mt-10 text-white w-[90%] mx-auto block py-2 rounded-xl border-2 border-sky-700 transition-all duration-300 hover:bg-white hover:text-sky-700" />
            </motion.form>
        }
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Customer</h2>
                <div className="bg-white px-4 py-2 rounded-3xl flex justify-between items-center w-[300px] mx-auto md:m-0">
                    <input type="text" placeholder="Search by Produc Name" className="outline-0 border-0 pr-10" onChange={handleSearch}/>
                    <IoMdSearch className="text-lg " />
                </div>
            </div>
            <div className="flex justify-end mt-10 mr-7">
                <button onClick={()=>setOpenAddProductContainer(true)} className="py-1 px-2 text-sky-700 rounded-xl border-2 border-sky-700 transition-all duration-300 hover:bg-sky-700 hover:text-white cursor-pointer">Add Product</button>
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
                        {(searchProducts || products) ? (
                            (searchProducts || products).map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                <td className="flex items-center gap-3 px-4 py-6">
                                    <img
                                    src={item.imageCover || placeholderImage}
                                    alt="product"
                                    className="w-12 h-12 object-cover rounded"
                                    />
                                </td>

                                <td className="px-4 py-6 text-gray-700">{item.title}</td>
                                <td className="px-4 py-6 text-gray-700">{item.category.name}</td>
                                <td className="px-4 py-6 text-gray-700">{item.price}</td>

                                <td className="px-4 py-6 text-center">
                                    <span
                                    className={`inline-block px-3 py-1 rounded-full font-semibold ${
                                        item.quantity > 0
                                        ? "text-green-700 border border-green-700 bg-green-100"
                                        : "text-gray-700 border border-gray-700 bg-gray-100"
                                    }`}
                                    >
                                    {item.quantity > 0 ? "Available" : "Out of Stock"}
                                    </span>
                                </td>

                                <td className="px-4 py-6 text-right text-gray-700">{item.quantity}</td>
                                <td className="px-4 py-6 text-right text-gray-700">{item.createdAt}</td>

                                <td className="px-4 py-6 text-center flex gap-1">
                                    <button className="bg-sky-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-blue-700 transition-all duration-300 hover:bg-white hover:text-blue-700">
                                    Update
                                    </button>
                                    <button className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700">
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-500">
                                    You do not have any Customer yet
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
