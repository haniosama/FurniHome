import type { ICategories } from "../../interfaces/categoriesDasboard";
import placeholderImage from "../../assets/placeholderProduct.jpg"
import { IoMdSearch } from "react-icons/io";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";


const CategoriesDashboard = () => {
  
    const categoriesArr: ICategories[] = [
        {
            id: "cat001",
            name: "Electronics",
            products: 150,
            imageUrl: "https://example.com/images/electronics.jpg"
        },
        {
            id: "cat002",
            name: "Clothing",
            products: 80,
            imageUrl: "https://example.com/images/clothing.jpg"
        },
        {
            id: "cat003",
            name: "Books",
            products: 200
        },
        {
            id: "cat004",
            name: "Home Appliances",
            products: 60,
            imageUrl: "https://example.com/images/appliances.jpg"
        }
    ];
    const [categories,setCategories]=useState<ICategories[]>(categoriesArr)


    
    const handleSearch=(e:ChangeEvent<HTMLInputElement>)=>{
        const searchName=e.target.value.toLowerCase();
        if(searchName !==""){
            const filtercategories=categories.filter(item=>item.name.toLowerCase().indexOf(searchName) !== -1);
            if(filtercategories.length>0){
                setCategories(filtercategories)
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
            setCategories(categoriesArr);
        }
    }
  return (
    <>
      <ToastContainer
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
                />
            <div className="flex items-center justify-between mt-7 pr-10 flex-wrap gap-y-3 ">
                <h2 className="font-semibold text-2xl ">Products</h2>
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
                      <th className=" px-4 py-4 text-center text-gray-700">Category Id</th>
                      <th className=" px-4 py-4 text-center text-gray-700">Number Of product</th>
                      <th className=" px-4 py-4 text-center text-gray-700 ">Action</th>
                  </tr>
              </thead>
              <tbody >
                  {categories.map((item)=>{
                      return(
                      <tr key={item.id} className="hover:bg-gray-50">
                          {item.imageUrl?
                                <td className="flex items-center gap-3  px-4 py-6 ">
                                    <img
                                    src={item.imageUrl}
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
                          <td className=" px-4 py-6 text-center text-gray-700 ">{item.name}</td>
                          <td className=" px-4 py-6 text-center text-gray-700">#{item.id}</td>
                          <td className=" px-4 py-6 text-center text-gray-700">{item.products}</td>
                          <td className=" px-4 py-6 text-center flex gap-1 justify-center">
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

export default CategoriesDashboard
