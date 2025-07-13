import { useEffect } from "react";
import { Link } from "react-router";
import Product from "../../component/Product";
import ProductCardSkeleton from "../../component/SkeletonCard";
import { useAppDispatch, useAppSelector } from "../../Hooks/index";
import type IProducts from "../../interfaces/product";
import { fetchWishlist } from "../../lib/slices/wishlistSlice";

const WishlistPage = () => {
  const { items, loading, error } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center">
        <h2
          className="relative text-2xl md:text-4xl font-bold mb-12 text-[#0058AA]
              inline-block
              after:content-[''] after:absolute after:-bottom-3 after:left-0 
              after:w-full after:h-1 after:bg-[#FBD913] after:opacity-100
              before:content-[''] before:absolute before:-bottom-5 before:left-1/4 
              before:w-1/2 before:h-1 before:bg-[#0058AA] before:opacity-80">
          My Wishlist
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">An error occurred: {error}</p>
      ) : items.length === 0 ? (
        <>
          <div className="w-full text-center">
            <p className="text-center my-2 text-gray-600">
              Your wishlist is empty.
            </p>
            <Link to="/">
              <button className="bg-teal-600 m-auto text-white px-6 py-2 rounded hover:bg-teal-700 transition">
                Go to Home
              </button>
            </Link>
          </div>
        </>
      ) : (
        <Product filteredProducts={items as IProducts[]} />
      )}
    </div>
  );
};

export default WishlistPage;
