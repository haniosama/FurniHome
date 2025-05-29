import type { IOrderItem } from "./ordersDashboard";

export interface ICustomer{
    _id:string;
    image?:string;
    customerName:string,
    totalOrder:number;
    email:string;
    phone:string;
    userDetails:{
        username:string;
    };
    orders:IOrderItem[]
}