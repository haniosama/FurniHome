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

  useEffect(() => {
    dispatch(getProductsCart());
    console.log(productsCart);
    console.log(productsCart?.length);
  }, [dispatch, itemsCart]);

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
          <Link to="/shop" className="hover:text-gray-300">
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            Category
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {/* <Link to="/cart" className="hover:text-gray-300" title="Shopping Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M7 18c-1.104 0-1.99.896-1.99 2s.886 2 1.99 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-1.99.896-1.99 2s.886 2 1.99 2 2-.896 2-2-.896-2-2-2zM7.01 16h11.986c.808 0 1.52-.49 1.82-1.23l2.944-7.21c.135-.332.21-.694.21-1.07 0-1.657-1.343-3-3-3H5.21L4.27.927A1 1 0 0 0 3.308 0H1v2h1.692l3.6 9.57-1.35 2.44C4.45 14.68 5.66 16 7.01 16z" />
            </svg>
            <span className="sr-only">Shopping Cart</span>
          </Link> */}
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
          <Link to="/shop" className="hover:text-gray-300">
            Shop
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            Category
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link
            to="/cart"
            className="hover:text-gray-300"
            title="Shopping Cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M7 18c-1.104 0-1.99.896-1.99 2s.886 2 1.99 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-1.99.896-1.99 2s.886 2 1.99 2 2-.896 2-2-.896-2-2-2zM7.01 16h11.986c.808 0 1.52-.49 1.82-1.23l2.944-7.21c.135-.332.21-.694.21-1.07 0-1.657-1.343-3-3-3H5.21L4.27.927A1 1 0 0 0 3.308 0H1v2h1.692l3.6 9.57-1.35 2.44C4.45 14.68 5.66 16 7.01 16z" />
            </svg>
            <span className="sr-only">Shopping Cart</span>
          </Link>
          <Link to="/login" className="hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
