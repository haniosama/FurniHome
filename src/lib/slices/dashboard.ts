import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { IOrder } from '../../interfaces/orderDashboard';
import type { IUserInfo } from '../../interfaces/userInfoDashboard';
import type { ICategories } from "../../interfaces/categoriesDasboard";
import type { ICoupon } from "../../interfaces/coupons";
import type { IProduct } from "../../interfaces/productsDashbord";
const baseUrl: string = import.meta.env.VITE_API_URL as string;
const token=localStorage.getItem("Token") as string;



// ================ manager =============
export const getProdectForManager=createAsyncThunk('dashboard/getProdectForManager',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/products`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.products
    }
    catch(err){
        console.log(err)
    }
})

export const getOrdersForManager=createAsyncThunk('dashboard/getOrdersForManager',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/order/`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.orders
    }catch(err){
        console.log(err)
    }
})

export const getcategoryForManager=createAsyncThunk('dashboard/getcategoryForManager',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/categories`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        console.log(data,"manager")
        return data.data
    }catch(err){
        console.log(err,"erros")
    }
})

export const getCustomerForManager=createAsyncThunk('dashboard/getCustomerForManager',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/customer`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.customers
    }catch(err){
        console.log(err)
    }
})

export const getCouponsForManager=createAsyncThunk('dashboard/getCouponsForManager',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/coupon/manager`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.coupons
    }catch(err){
        console.log(err,"erros")
    }
})


// ============== Admin ==========
export const getProdectForAdmin=createAsyncThunk('dashboard/getProduct',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/dashboard`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        console.log(data,"for admin")
        return data.products
    }
    catch(err){
        console.log(err)
    }
})

export const getCustomerForAdmin=createAsyncThunk('dashboard/getCustomer',async(adminId:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/customer/${adminId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.customers
    }catch(err){
        console.log(err)
    }
})

export const getUserInformayionForUser=createAsyncThunk('dashboard/getUserInformation',async(userId:string)=>{
    console.log(userId,"kkkkkkkkkkkkkkkkkkkk")
    try{
        const data =await (await fetch(`${baseUrl}/api/user/${userId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        console.log(data,"daaaaaaaaate")
        return data
    }catch(err){
        console.log(err)
    } 
})

export const getOrdersForAdmin=createAsyncThunk('dashboard/getOrder',async(adminId:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/order/admin/${adminId}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.orders
    }catch(err){
        console.log(err)
    }
})
export const deleteOrderForUser=createAsyncThunk('dashboard/deleteOrder',async(orderId:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/order/delete/${orderId}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.orders
    }catch(err){
        console.log(err,"erros")
    }
})

export const getcategoryForAdmin=createAsyncThunk('dashboard/getCategies',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/categoriesForAdmin`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        console.log(data,"categories")
        return data.data
    }catch(err){
        console.log(err,"erros")
    }
})

export const deleteCategoryForAdmin=createAsyncThunk('dashboard/deleteCategoryForAdmin',async(categoryName:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/categories/${categoryName}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        console.log(data,"categoriesssssssssssss")
        return data.data
    }catch(err){
        console.log(err,"erros")
    }
})

export const getCouponsForAdmin=createAsyncThunk('dashboard/getCouponsForAdmin',async()=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/coupon`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.coupons
    }catch(err){
        console.log(err,"erros")
    }
})

export const deleteAdminCoupon=createAsyncThunk('dashboard/deleteCoupon',async(couponId:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/coupon/${couponId}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        console.log(data,"couponsssssssssssss")
        return data.coupons
    }catch(err){
        console.log(err,"erros")
    }
})

export const addCoupon=createAsyncThunk('dashboard/addCoupon',async(formtData:FormData)=>{
                console.log(formtData.get('code'),"lllll")
    try{
        const data =await (await fetch(`${baseUrl}/api/coupon`,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:formtData,
        })).json();
        return data
    }catch(err){
        console.log(err,"erros")
    }
})


export const getSpecificProduct=createAsyncThunk('dashboard/getSpecificProduct',async(productId:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/product/${productId}`,{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })).json();
        return data.product
    }catch(err){
        console.log(err,"erros")
    }
})

export const addProduct=createAsyncThunk('dashboard/addProduct',async(formtData:FormData)=>{
    console.log(formtData)
    try{
        const data =await (await fetch(`${baseUrl}/api/product`,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:formtData,
        })).json();
        return data.products
    }catch(err){
        console.log(err,"erros")
    }
})

export const updataProduct=createAsyncThunk('dashboard/updataProduct',async({productId,formtData}:{productId:string,formtData:FormData})=>{
    try{
        console.log(formtData,"eeeeeeeeeeeeeeee");
                    for (const pair of formtData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
                }
        const data =await (await fetch(`${baseUrl}/api/product/${productId}`,{
            method:"PATCH",
            headers:{
                'Authorization':`Bearer ${token}`
            },
            body:formtData,
        })).json();
        console.log(data,"ggggggggggggggggggggggg");
        return data.products
    }catch(err){
        console.log(err,"erros")
    }
})

export const deleteProduct=createAsyncThunk('dashboard/deleteProduct',async(productId:string)=>{
    try{
        const data =await (await fetch(`${baseUrl}/api/product/${productId}`,{
            method:"DELETE",
            headers:{
                'Authorization':`Bearer ${token}`
            },
        })).json();
        return data.products
    }catch(err){
        console.log(err,"erros")
    }
})

export const changeStatus=createAsyncThunk('dashboard/changeStatus',async({orderId,orderStatus}:{orderId:string,orderStatus:string})=>{
    console.log(orderStatus,"uuuuuuuuuuuuuuu")
    try{
        const data =await (await fetch(`${baseUrl}/api/order/status/${orderId}`,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({orderStatus})      
        })).json();
        console.log(data,"deleteoooooooooooooo")
        return data.orders
    }catch(err){
        console.log(err,"erros")
    }
})







const dashboardAdmim=createSlice({
    name:"dashboard",
    initialState:{specificProduct:{} as IProduct,products:[] as IProduct[],orders:[] as IOrder[],coupons:[] as ICoupon[],categories:[] as ICategories[], usersInfo:[] as IUserInfo[],customers:[] as [], isLoading: false as boolean, error:null as string | null},
    reducers:{},
    extraReducers:(builder)=>{
        // ========== Manager ===============
        builder.addCase(getProdectForManager.fulfilled,(state,action)=>{state.products=action.payload;state.isLoading=false});
        builder.addCase(getProdectForManager.pending,(state)=>{state.isLoading=true});
        builder.addCase(getProdectForManager.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getOrdersForManager.fulfilled,(state,action)=>{state.orders=action.payload;state.isLoading=false});
        builder.addCase(getOrdersForManager.pending,(state)=>{state.isLoading=true});
        builder.addCase(getOrdersForManager.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getcategoryForManager.fulfilled,(state,action)=>{state.categories=action.payload;state.isLoading=false});
        builder.addCase(getcategoryForManager.pending,(state)=>{state.isLoading=true});
        builder.addCase(getcategoryForManager.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getCustomerForManager.fulfilled,(state,action)=>{state.customers=action.payload;state.isLoading=false});
        builder.addCase(getCustomerForManager.pending,(state)=>{state.isLoading=true});
        builder.addCase(getCustomerForManager.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getCouponsForManager.fulfilled,(state,action)=>{state.coupons=action.payload;state.isLoading=false});
        builder.addCase(getCouponsForManager.pending,(state)=>{state.isLoading=true});
        builder.addCase(getCouponsForManager.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(changeStatus.fulfilled,(state,action)=>{state.orders=action.payload;state.isLoading=false});
        builder.addCase(changeStatus.pending,(state)=>{state.isLoading=true});
        builder.addCase(changeStatus.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        
        // ============== Admin ============
        builder.addCase(getProdectForAdmin.fulfilled,(state,action)=>{state.products=action.payload;state.isLoading=false});
        builder.addCase(getProdectForAdmin.pending,(state)=>{state.isLoading=true});
        builder.addCase(getProdectForAdmin.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getCustomerForAdmin.fulfilled,(state,action)=>{state.customers=action.payload;state.isLoading=false});
        builder.addCase(getCustomerForAdmin.pending,(state)=>{state.isLoading=true});
        builder.addCase(getCustomerForAdmin.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});

        builder.addCase(getOrdersForAdmin.fulfilled,(state,action)=>{state.orders=action.payload;state.isLoading=false});
        builder.addCase(getOrdersForAdmin.pending,(state)=>{state.isLoading=true});
        builder.addCase(getOrdersForAdmin.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});

        builder.addCase(getUserInformayionForUser.fulfilled,(state,action)=>{state.usersInfo=action.payload.data;state.isLoading=false});
        builder.addCase(getUserInformayionForUser.pending,(state)=>{state.isLoading=true});
        builder.addCase(getUserInformayionForUser.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});

        builder.addCase(deleteOrderForUser.fulfilled,(state,action)=>{state.orders=action.payload?.remainingOrders;state.isLoading=false});
        builder.addCase(deleteOrderForUser.pending,(state)=>{state.isLoading=true});
        builder.addCase(deleteOrderForUser.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getcategoryForAdmin.fulfilled,(state,action)=>{state.categories=action.payload;state.isLoading=false});
        builder.addCase(getcategoryForAdmin.pending,(state)=>{state.isLoading=true});
        builder.addCase(getcategoryForAdmin.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(deleteCategoryForAdmin.fulfilled,(state,action)=>{state.categories=action.payload.data;state.isLoading=false});
        builder.addCase(deleteCategoryForAdmin.pending,(state)=>{state.isLoading=true});
        builder.addCase(deleteCategoryForAdmin.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getCouponsForAdmin.fulfilled,(state,action)=>{state.coupons=action.payload;state.isLoading=false});
        builder.addCase(getCouponsForAdmin.pending,(state)=>{state.isLoading=true});
        builder.addCase(getCouponsForAdmin.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(deleteAdminCoupon.fulfilled,(state,action)=>{state.coupons=action.payload;state.isLoading=false});
        builder.addCase(deleteAdminCoupon.pending,(state)=>{state.isLoading=true});
        builder.addCase(deleteAdminCoupon.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(getSpecificProduct.fulfilled,(state,action)=>{state.specificProduct=action.payload;state.isLoading=false});
        builder.addCase(getSpecificProduct.pending,(state)=>{state.isLoading=true});
        builder.addCase(getSpecificProduct.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(addProduct.fulfilled,(state,action)=>{state.products=action.payload;state.isLoading=false});
        builder.addCase(addProduct.pending,(state)=>{state.isLoading=true});
        builder.addCase(addProduct.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{state.products=action.payload;state.isLoading=false});
        builder.addCase(deleteProduct.pending,(state)=>{state.isLoading=true});
        builder.addCase(deleteProduct.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(updataProduct.fulfilled,(state,action)=>{state.products=action.payload;state.isLoading=false});
        builder.addCase(updataProduct.pending,(state)=>{state.isLoading=true});
        builder.addCase(updataProduct.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
        
        builder.addCase(addCoupon.fulfilled,(state,action)=>{state.coupons=action.payload.coupons;state.isLoading=false});
        builder.addCase(addCoupon.pending,(state)=>{state.isLoading=true});
        builder.addCase(addCoupon.rejected,(state,action)=>{state.error=action.payload as string;state.isLoading=false});
    }
})

export const admimSlice= dashboardAdmim.reducer
