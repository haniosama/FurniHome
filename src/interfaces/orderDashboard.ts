import type { IProduct } from "./productsDashbord";

export interface IOrder{
  _id:string;
  order_details:{
    shippingAddress:{
      details:string,
      phone:string,
      city:string
    }
  };
  products:IProduct[];
  total:number
  userId:string,
  createdAt:string,
  onlinePaymentDetails:{
    amount_total:number
  }
}