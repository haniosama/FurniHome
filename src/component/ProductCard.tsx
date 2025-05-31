import React from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks/index';
import { addToWishlist, removeFromWishlist } from '../lib/slices/wishlistSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaHeart } from 'react-icons/fa';

interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
}

const truncate = (str: string | undefined, max: number): string => {
  if (!str) return '';
  return str.length > max ? str.substring(0, max) + '...' : str;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { ids: wishlistIds, loading } = useAppSelector((state) => state.wishlist);

  const isInWishlist = wishlistIds.includes(product._id);

  
const handleWishlistToggle = () => {
  if (!product._id) {
    toast.error('Product ID is missing.');
    return;
  }

  if (loading) {
    toast.info('Updating wishlist...');
    return;
  }
  const shortTitle = product.title.split(' ').slice(0, 2).join(' ');

  if (isInWishlist) {
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
    <div className="relative bg-white rounded-lg shadow-md p-4 w-72 flex flex-col items-center text-center hover:shadow-lg transition duration-300 group overflow-hidden">

      {/* Wishlist Icon */}
      <button
        onClick={handleWishlistToggle}
        aria-label="Toggle wishlist"
        disabled={loading}
        className="absolute top-3 right-3 z-10"
      >
        <FaHeart
          className={`w-6 h-6 transition-colors ${
            isInWishlist ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'
          }`}
        />
      </button>

      {/* Product Image */}
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-full h-48 object-contain rounded-md mb-4 transform transition-transform duration-300 group-hover:scale-105"
        crossOrigin="anonymous"
      />

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2 px-2 truncate">
        {truncate(product.title, 25)}
      </h2>

      {/* Price */}
      <p className="text-blue-700 font-bold text-lg mb-2">{product.price} EGP</p>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 px-2">
        {truncate(product.description, 80)}
      </p>

      {/* Add to Cart Button */}
      <button className="bg-[#0058AA] hover:bg-[#2b4158] text-white px-6 py-2 rounded-md transition duration-300 w-full">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
