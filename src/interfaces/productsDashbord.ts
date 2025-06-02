import type { ICategories } from "./categoriesDasboard";
import type { ICoupon } from "./coupons";
import type { ICustomer } from "./customerDashboard";
import type { IOrder } from "./orderDashboard";
import type { IUserInfo } from "./userInfoDashboard";

export interface IProduct {
  _id: string;
  adminId: string;
  category: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  imageCover: string;
  images: string[];
  isWachList: boolean;
  price: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any[];
  productDetails:IProduct
  __v: number;
}

export interface IState {
    dashBoard:{
        products:IProduct[],
        isLoading:boolean,
        error:string | null,
        customers:ICustomer[],
        orders:IOrder[],
        usersInfo:IUserInfo[],
        categories:ICategories[],
        coupons:ICoupon[],
        specificProduct:IProduct[],
        userDecoded:IUserInfo
    }
}
export interface IStateProduct {
    fetchProduct:{
      products:IProduct[]
    }
}