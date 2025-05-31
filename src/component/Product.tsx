import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store/store";
import { fetchProduct } from "../lib/slices/products";
import { motion } from "framer-motion";
import type IProducts from "../interfaces/product";
import { addTOCartAction } from "../lib/slices/cartSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../lib/slices/wishlistSlice";

const truncate = (str: string | undefined, max: number): string => {
  if (!str) return "";
  return str.length > max ? str.substring(0, max) + "..." : str;
};

const Product = ({
  filteredProducts = [],
}: {
  filteredProducts?: IProducts[];
}) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { loginToken } = useSelector((store: RootState) => store.auth);
  const { addLoading } = useSelector((state: RootState) => state.cartReducer);
  const { ids: wishlistIds, loading: wishlistLoading } = useSelector(
    (state: RootState) => state.wishlist
  );
  const { products, error, loading } = useSelector(
    (state: RootState) => state.fetchProduct
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  const handleWishlistToggle = (product: IProducts) => {
    if (!product._id) {
      toast.error("Product ID is missing.");
      return;
    }

    if (wishlistLoading) {
      toast.info("Updating wishlist...");
      return;
    }

    const shortTitle = product.title.split(" ").slice(0, 2).join(" ");
    
    if (wishlistIds.includes(product._id)) {
      dispatch(removeFromWishlist(product._id)).then(() => {
        toast.info(`Removed "${shortTitle}" from wishlist ❤️`);
      });
    } else {
      dispatch(addToWishlist(product._id)).then(() => {
        toast.success(`Added "${shortTitle}" to wishlist 💖`);
      });
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
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
            .map((product: IProducts, index: number) => {
              const isInWishlist = wishlistIds.includes(product._id);

              return (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white rounded-lg shadow-md p-4 w-72 flex flex-col items-center text-center hover:shadow-lg transition duration-300 group overflow-hidden"
                >
                  {/* Wishlist Icon */}
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    aria-label="Toggle wishlist"
                    disabled={wishlistLoading}
                    className="absolute top-3 right-3 z-10"
                  >
                    <FaHeart
                      className={`w-6 h-6 transition-colors ${
                        isInWishlist
                          ? "text-red-500"
                          : "text-gray-400 group-hover:text-red-400"
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-48 object-contain rounded-md mb-4 transform transition-transform duration-300 group-hover:scale-105"
                    crossOrigin="anonymous"
                    loading="lazy"
                  />

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 px-2 truncate">
                    {truncate(product.title, 25)}
                  </h2>

                  {/* Price */}
                  <p className="text-blue-700 font-bold text-lg mb-2">
                    {product.price} EGP
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 px-2">
                    {truncate(product.description, 80)}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      if (loginToken) {
                        dispatch(addTOCartAction(product._id));
                      } else {
                        toast.error("You must be logged in first");
                        navigate("/login");
                      }
                    }}
                    disabled={addLoading}
                    className="bg-[#0058AA] hover:bg-[#2b4158] text-white px-6 py-2 rounded-md transition duration-300 w-full"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default Product;
