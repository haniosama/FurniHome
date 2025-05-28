import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../lib/store/store";
import { getProductsCart } from "../lib/slices/cartSlice";
import { LiaSpinnerSolid } from "react-icons/lia";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { productsCart, itemsCart } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const dispatch: AppDispatch = useDispatch();
  const { loginToken } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    dispatch(getProductsCart());
  }, [dispatch, itemsCart, loginToken]);

  return (
    <nav className="w-full bg-[#0058ab] text-white z-50 shadow-lg ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex-shrink-0">
          <Link to="/" className="text-2xl font-bold">
            FurniHome
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 mx-auto">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/product" className="hover:text-gray-300">
            Shop
          </Link>
          <Link to="/category" className="hover:text-gray-300">
            Category
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-3xl  hover:text-gray-300" />

            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {!productsCart ? (
                <LiaSpinnerSolid className="animate-spin text-xl text-blue-500" />
              ) : (
                productsCart.length
              )}
            </span>
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-gray-800 px-6`}>
        <div className="flex flex-col py-4 space-y-2">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>

          <Link to="/product" className="hover:text-gray-300">
            Product
          </Link>

          <Link to="/shop" className="hover:text-gray-300">
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            Category
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-3xl  hover:text-gray-300" />

            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {!productsCart ? (
                <LiaSpinnerSolid className="animate-spin text-xl text-blue-500" />
              ) : (
                productsCart.length
              )}
            </span>
          </Link>
          <Link to="/register" className="hover:text-gray-300 ">
            Register
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
