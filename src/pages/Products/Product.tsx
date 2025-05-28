import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../lib/store/store";
import { useEffect, useState } from "react";
import { fetchProduct } from "../../lib/slices/products";
import Product from "../../component/Product";
import type IProducts from "../../interfaces/product";


const AllProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState<Iproducts[]>([]);
  // const [price, setPrice] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => state.fetchProduct);
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  const handleSearch = (term: string) => {

    const filtered = products.filter((product: IProducts) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
    if (!filtered) {
      return <h1>No Product Found</h1>;
    }
  };

  const handlePriceChange = (value: number) => {
    const filteredProductsByPrice = products.filter(
      (product: IProducts) => parseFloat(product.price.toString()) <= value
    );
    setFilteredProducts(filteredProductsByPrice);
  };
  const handleRatingChange = (value: number) => {
    // Handle rating change logic here
    console.log("Rating:", value);
    // Filter products based on the selected rating
    const filteredProductsByRating = products.filter(
      (product: IProducts) => product.rating >= value
    );
    console.log(filteredProductsByRating);
    setFilteredProducts(filteredProductsByRating);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 pt-20 min-h-screen">
      {/* Sidebar Filter */}
      <div className="w-full lg:w-1/5 px-4 mb-6 lg:mb-0 flex justify-center">

        <SidebarFilter
          onSearch={handleSearch}
          onPriceChange={handlePriceChange}
          onRatingChange={handleRatingChange}
        />

      </div>
      <div className="w-full lg:w-4/5 px-4">
        <div className="flex flex-wrap justify-center gap-6">
          <Product filteredProducts={filteredProducts} />
        </div>

      </div>
    </div>
  );
};
export default AllProduct;
