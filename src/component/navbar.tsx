import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store/store";
import { getProductsCart } from "../lib/slices/cartSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FiSettings } from "react-icons/fi";
import { useAppSelector } from "../Hooks/index";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { productsCart, itemsCart } = useSelector(
    (state: RootState) => state.cartReducer
  );
  const dispatchs: AppDispatch = useDispatch();
  const { loginToken } = useSelector((store: RootState) => store.auth);
  const wishlistCount = useAppSelector((state) => state.wishlist.ids.length);

  useEffect(() => {
    dispatchs(getProductsCart());
  }, [dispatchs, itemsCart, loginToken]);

  const menuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-[#0058ab] text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex-shrink-0">
          <a href="/" className="text-2xl font-bold">
            FurniHome
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 mx-auto">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/product" className="hover:text-gray-300">Shop</Link>
          <Link to="/category" className="hover:text-gray-300">Category</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
        </div>

        {/* Desktop Right Menu */}
        <div className="hidden md:flex items-center space-x-2 justify-center">
          <Link to="/wishlist" className="relative">
            <FaHeart className="text-2xl text-white hover:text-red-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl hover:text-gray-300" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {!productsCart ? (
                <LiaSpinnerSolid className="animate-spin text-blue-500" />
              ) : (
                productsCart.length
              )}
            </span>
          </Link>

          <Link to="/register" className="hover:text-gray-300 border-r-2 border-gray-300 px-2">
            Register
          </Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>

          <Link to="/setting" className="hover:text-gray-300 mx-3" title="Settings">
            <FiSettings className="text-2xl" />
          </Link>
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-gray-800 px-6 overflow-hidden">
            <div className="flex flex-col py-4 space-y-2">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/product" className="hover:text-gray-300">Shop</Link>
              <Link to="/category" className="hover:text-gray-300">Category</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>

          <div className="flex items-center gap-2 text-white">
            {/* Wishlist */}
            <Link to="/wishlist" className="hover:text-gray-300" title="Wishlist">
              <div className="relative w-6 h-6">
                <FaHeart className="text-xl text-white hover:text-red-400" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Separator */}
            <span className="text-white text-lg">|</span>

            {/* Cart */}
            <Link to="/cart" className="hover:text-gray-300" title="Shopping Cart">
              <div className="relative w-6 h-6">
                <FaShoppingCart className="text-xl hover:text-gray-300" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {!productsCart ? (
                    <LiaSpinnerSolid className="animate-spin text-blue-500 text-xs" />
                  ) : (
                    productsCart.length
                  )}
                </span>
              </div>
            </Link>
          </div>


              {/* Row for Register, Login, Setting */}
              <div className="flex flex-row justify-start items-center gap-2 mt-2 text-sm">
                <Link to="/register" className="hover:text-gray-300">Register</Link>
                <span>|</span>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <span>|</span>
                <Link to="/setting" className="hover:text-gray-300 flex items-center gap-1" title="Settings">
                  <FiSettings className="text-xl" />
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
