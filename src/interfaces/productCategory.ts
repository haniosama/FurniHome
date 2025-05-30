export type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category?: {
    name: string;
  };
};
