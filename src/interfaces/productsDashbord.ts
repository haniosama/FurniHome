export interface IProduct {
  productName: string;
  category: string;
  price: number;
  status: "Available" | "Out of Stock" | string;
  stock: number;
  createdAt: string; // or Date if you parse it
  image?:string;
}