import type { IProduct } from "./productsDashbord";

export interface IOrder{
  _id:string;
  order_details:{
    details:string,
    phone:string,
    address:string
  };
  products:IProduct[];
  total:number
  userId:string,
  createdAt:string
}