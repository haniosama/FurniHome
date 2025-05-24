export interface IOrderItem {
  productName: string;
  price: number;
  status: "Complete" | "Pending" | "Cancelled" | string;
  paymentDate: string; // or Date if you're parsing
  customer: string;
  orderId: string;
  quantity: number;
  image?: string;
}