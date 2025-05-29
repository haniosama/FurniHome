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
  __v: number;
}

export interface IState {
    dashBoard:{
        products:[],
        isloading:boolean,
        error:string | null,
        customers:[]
    }
}