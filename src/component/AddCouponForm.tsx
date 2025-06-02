import { useReducer, useState } from "react"
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

type IAction={
  type:string,
  field:string,
  value:string | File[]
}
interface IInitState{
    code: string;
    discount: string;
}
interface IError{
    code:string,
    discount:string,
}
const AddCouponForm = ({handleAddCoupon,setOpenAddProductContainer,coupons}:{handleAddCoupon:(val:FormData)=>void,setOpenAddProductContainer:(val:boolean)=>void,coupons:{code:string,discount:number}[]}) => {
        const [errors,setErrors]=useState<IError>({
            code:"",
            discount:""
        })
    
        const initState:IInitState={
            code:"",
            discount:"",
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


        const formData = new FormData();
    const handleOnSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(state.code &&  Number(state.discount) > 0 && !isNaN(Number(state.discount)) && coupons.filter(item=>item.code == state.code).length==0){

            formData.append('code', state.code);
            formData.append('discount', state.discount);
            handleAddCoupon(formData);
            setOpenAddProductContainer(false);
        }else{
            setErrors(prev=>{return{...prev,code:"",discount:""}})
            if(!state.code.trim()){
                setErrors((prev)=>{return {...prev,code:"The code is Required"}})
            }
            
            if(isNaN(Number(state.discount)) || Number(state.discount) <= 0){
                setErrors((prev)=>{return {...prev,discount:"The discount must be Number"}})
            }
            if(coupons.filter(item=>item.code == state.code).length>0){
                setErrors((prev)=>{return {...prev,code:"The Code Aready exist"}})
            }
        }
    }
  return (
    <motion.form 
            onSubmit={handleOnSubmit} className="fixed top-[50%] left-[50%] py-7 px-10 -translate-[50%] bg-white rounded-2xl min-h-[250px] min-w-[90%] md:min-w-[700px] "
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            >
            
                <h2 className="text-center text-2xl font-medium text-sky-700 mb-10">Add Coupon</h2>
                <button title="close" onClick={()=>setOpenAddProductContainer(false)} className="absolute top-5 right-5 text-3xl font-medium text-red-700 transition-all duration-500 hover:rotate-180 cursor-pointer"><IoMdClose/> </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 h-[80%]">
                    <div >
                        <label htmlFor="code" className="block font-medium">Code:</label>
                        <input id="code" type="text" placeholder="Code" name="code" value={state.code} onChange={(e)=>handleOnChange(e)} className={` w-full py-2 px-2 border-b-2 ${errors.code ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.code 
                        &&
                        <p className="text-red-700">{errors.code}</p>
                        }
                    </div>
                    <div >
                        <label htmlFor="discount" className="block font-medium">Discount:</label>
                        <input id="discount" type="text" placeholder="Discount" name="discount" value={state.discount} onChange={(e)=>handleOnChange(e)} className={` w-full py-2 px-2 border-b-2 ${errors.discount ?"border-red-700" :"border-sky-700 "} outline-none rounded-sm transition-all duration-300 hover:scale-105 `} />
                        {errors.discount 
                        &&
                        <p className="text-red-700">{errors.discount}</p>
                        }
                    </div>
                </div>
                <input type="submit" className="bg-sky-700 cursor-pointer mt-10 text-white w-[90%] mx-auto block py-2 rounded-xl border-2 border-sky-700 transition-all duration-300 hover:bg-white hover:text-sky-700" />
            </motion.form>
  )
}

export default AddCouponForm
