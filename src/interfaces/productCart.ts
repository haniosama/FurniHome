export interface ProductCart {
  status: string;
  message: string;
  cart: Cart;
}

interface Cart {
  _id: string;
  userId: string;
  products: object[];
  discount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
