import {  useReducer, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";




type IAction={
  type:string,
  field:string,
  value:string | File[]
}
interface IInitState{
    title: string;
    description: string;
    price: string;
    category: string;
    quantity: string;
    images: File[];
}
interface IError{
    title:string,
    description:string,
    price:string,
    category:string,
    quantity:string,
    images:string,
}
const AddProductForm = ({setOpenAddProductContainer,handleAddProduct}:{setOpenAddProductContainer:(val:boolean)=>void,handleAddProduct:(val:FormData)=>void}) => {

    const [errors,setErrors]=useState<IError>({
        title:"",
        description:"",
        price:"",
        category:"",
        quantity:"",
        images:"",
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


    const handleOnChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        dispatch({
            type:"input",
            field:e.target.name,
            value:e.target.value
        })
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }

    const handleImagesChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            if (files.length > 5) {
            setErrors(prev => ({ ...prev, images: "You can select 5 images only" }));
            return;
            }
            dispatch({
            type: "input",
            field: "images",
            value: Array.from(files), 
            });
            setErrors(prev => ({ ...prev, images: "" })); 
        }
    };

    const formData = new FormData();
    const handleOnSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(state.title && state.description &&  !isNaN(Number(state.price)) &&  Number(state.price) > 0 && state.category &&  !isNaN(Number(state.quantity)) &&  Number(state.quantity) > 0  && state.images.length>0 && state.images.length<=5){

            formData.append('title', state.title);
            formData.append('description', state.description);
            formData.append('price', state.price);
            formData.append('quantity', state.quantity);
            formData.append('category', state.category);
            state.images.forEach((image) => {
                formData.append('images', image);
            });
            console.log(formData,"formate Datajjjjjjjjjjjj")
            handleAddProduct(formData)
        }else{
            setErrors(prev=>{return{...prev,title:"",description:"",price:"",category:"",quantity:"",images:""}})
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
            console.log(state.images,"immmmmmmmmmmmmmmmm")
            if(state.images.length>5){
                setErrors((prev)=>{return {...prev,images:"You can select 5 Images Only"}})
            }
        }
    }
  return (
    <motion.form 
            onSubmit={handleOnSubmit} className="fixed top-[50%] left-[50%] py-7 px-10 -translate-[50%] bg-white rounded-2xl min-h-[450px] min-w-[90%] md:min-w-[700px] "
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            >
            
                <h2 className="text-center text-2xl font-medium text-sky-700 mb-10">Add Product</h2>
                <button title="close" onClick={()=>setOpenAddProductContainer(false)} className="absolute top-5 right-5 text-3xl font-medium text-red-700 transition-all duration-500 hover:rotate-180 cursor-pointer"><IoMdClose/> </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 h-[80%]">
                    <div >
                        <label htmlFor="title" className="block font-medium">Title:</label>
                        <input id="title" type="text" placeholder="Title" name="title" value={state.title} onChange={(e)=>handleOnChange(e)} className={` w-full py-2 px-2 border-b-2 ${errors.title ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.title 
                        &&
                        <p className="text-red-700">{errors.title}</p>
                        }
                    </div>
                    <div >
                        <label htmlFor="desc" className="block font-medium">Description:</label>
                        <input id="desc" type="text" placeholder="Description" value={state.description} name="description" onChange={(e)=>handleOnChange(e)} className={` w-full py-2 px-2 border-b-2 ${errors.description ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.description 
                        &&
                        <p className="text-red-700">{errors.description}</p>
                        }
                    </div>
                    <div >
                        <label htmlFor="price" className="block font-medium">Price:</label>
                        <input id="price" type="text" placeholder="Price" name="price" value={state.price} onChange={(e)=>handleOnChange(e)} className={` w-full py-2 px-2 border-b-2 ${errors.price ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.price 
                        &&
                        <p className="text-red-700">{errors.price}</p>
                        }
                    </div>
                    <div >
                        <label htmlFor="select" className="block font-medium">Categories:</label>
                        {/* <input type="select" placeholder="Title"  /> */}
                        <select id="select" title="selection" name="category" value={state.category} onChange={(e)=>handleOnChange(e)} className={`  py-2 px-2 border-b-2 ${errors.category ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 w-full`}>
                            <option value="">Select Category</option>
                            <option value="Camera">Camera</option>
                            <option value="Phones">Phones</option>
                        </select>
                        {errors.category 
                        &&
                        <p className="text-red-700">{errors.category}</p>
                        }
                    </div>
                    <div >
                        <label htmlFor="quantity" className="block font-medium">Quantity:</label>
                        <input id="quantity"name="quantity" type="text" value={state.quantity} placeholder="Quantity" onChange={(e)=>handleOnChange(e)} className={` w-full py-2 px-2 border-b-2 ${errors.quantity ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.quantity 
                        &&
                        <p className="text-red-700">{errors.quantity}</p>
                        }
                    </div>
                    <div >
                        <label htmlFor="title" className="block font-medium">Image:</label>
                        <input type="file" name="images" accept="image/*" multiple title="images" onChange={(e)=>handleImagesChanges(e)} className={` w-full py-2 px-2 border-b-2 ${errors.images ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.images 
                        &&
                        <p className="text-red-700">{errors.images}</p>
                        }
                    </div>
                </div>
                <input type="submit" className="bg-sky-700 mt-10 text-white w-[90%] mx-auto block py-2 rounded-xl border-2 border-sky-700 transition-all duration-300 hover:bg-white hover:text-sky-700" />
            </motion.form>
  )
}

export default AddProductForm
