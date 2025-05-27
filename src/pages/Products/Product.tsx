import { useDispatch, useSelector } from "react-redux";

import SidebarFilter from "../../component/filter";
import type { AppDispatch, RootState } from "../../lib/store/store";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../lib/slices/products";

import type Products from "../../interfaces/product";
import Product from "../../component/Product";

const AllProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  // const [price, setPrice] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => state.fetchProduct);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const handleSearch = (term: string) => {
    const filtered = products.filter((product: Products) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    if (!filtered) {
      return <h1>No Product Found</h1>;
    }
  };
  const handlePriceChange = (value: number) => {
    // Handle price change logic here
    console.log("Price:", value);
    // Filter products based on the selected price range
    const filteredProductsByPrice = products.filter(
      (product: Products) => parseFloat(product.price) <= value
    );
    setFilteredProducts(filteredProductsByPrice);
  };
  const handleRatingChange = (value: number) => {
    // Handle rating change logic here
    console.log("Rating:", value);
    // Filter products based on the selected rating
    const filteredProductsByRating = products.filter(
      (product: Products) => product.rating >= value
    );
    console.log(filteredProductsByRating);
    setFilteredProducts(filteredProductsByRating);
  };

  return (
    <div className="flex bg-gray-100 pt-15">
      <div className="flex-1 flex justify-center">
        <SidebarFilter
          onSearch={handleSearch}
          onPriceChange={handlePriceChange}
          onRatingChange={handleRatingChange}
        />
      </div>
      <div className="flex-4 flex flex-col md:flex-row justify-center items-center gap-10 flex-wrap max-w-7xl mx-auto ">
        <Product filteredProducts={filteredProducts} />
      </div>
    </div>
  );
};
export default AllProduct;
