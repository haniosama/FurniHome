import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store/store";
import { fetchProduct } from "../lib/slices/products";
import { motion } from "framer-motion";
import type IProducts from "../interfaces/product";
import { addTOCartAction } from "../lib/slices/cartSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// const Product = ({ filteredProducts = [] }: { filteredProducts?: Products[] }) => {
const Product = ({
  filteredProducts = [],
}: {
  filteredProducts?: IProducts[];
}) => {
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();
  const cartDispatch: AppDispatch = useDispatch();
  const toggleWishlist = (index: number) => {
    setWishlist((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  const { addLoading } = useSelector((state: RootState) => state.cartReducer);
  const dispatch: AppDispatch = useDispatch();
  const { loginToken } = useSelector((store: RootState) => store.auth);
  const { products, error, loading } = useSelector(
    (state: RootState) => state.fetchProduct
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-900">
        Upgrade Your Space with IKEA Furniture
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 flex-wrap max-w-7xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {products &&
          (filteredProducts?.length > 0 ? filteredProducts : products)
            .slice(0, 10)
            .map((item: IProducts, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-lg shadow-lg p-4 w-60 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <button
                  onClick={() => toggleWishlist(index)}
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10 border-2 border-gray-300 rounded-full p-2">
                  {wishlist[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke="red"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>

                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-md mb-4 hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title.slice(0, 15)}
                </h2>
                <p className="text-green-600 font-bold text-lg mb-2">
                  ${item.price}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description.slice(0, 50)}...
                </p>
                <button
                  onClick={() => {
                    if (loginToken) {
                      cartDispatch(addTOCartAction(item._id));
                    } else {
                      toast.error("You must be logged in first");
                      navigate("/login");
                    }
                  }}
                  disabled={addLoading}
                  aria-label="Add to cart"
                  className="bg-[#ceb123] hover:bg-[#fbd914] text-white px-6 py-2 rounded-md transition-colors duration-300 w-full">
                  Add to Cart
                </button>
              </motion.div>
            ))}
      </div>
    </div>
  );
};
export default Product;
