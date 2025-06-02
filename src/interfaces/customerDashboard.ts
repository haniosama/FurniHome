import type { IOrder } from "./orderDashboard";

export interface ICustomer{
    _id:string;
    image?:string;
    customerName:string,
    totalOrder:number;
    email:string;
    phone:string;
    userDetails:{
        username:string;
        avatar:string,
        email:string,
        phone:string,
    };
    orders:IOrder[]
}