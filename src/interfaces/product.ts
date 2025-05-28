interface IProducts {
  _id: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  imageCover: string;
  category: {
    name: string;
  };
}

export interface Iproduct {
  _id: string;
  title: string;
  sold: number;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  category: {
    name: string;
  };
  ratingsAverage: number;
  ratingsQuantity: number;
  adminId: string;
  isWachList: boolean;
  createdAt: string;
  updatedAt: string;
  Comments: {
    userId: string;
    comment: string;
    createdAt: string;
    _id: string;
    updatedAt: string;
  }[];
  __v: number;
}

export interface ICartProduct {
  _id: string;
  quantity: number;
  productId: Iproduct;
}
export type { IProducts as default };
