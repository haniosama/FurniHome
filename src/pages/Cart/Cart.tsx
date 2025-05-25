import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import type { AppDispatch, RootState } from "../../lib/store/store";
import { useMemo } from "react";
import Loader from "../../component/Loader";
import {
  clearCartAction,
  deleteFromCartAction,
} from "../../lib/slices/cartSlice";
// import img1 from "react-store/src/assets/image1.jpg";
const Cart = () => {
  const { productsCart, getLoading, removeLoading, clearLoading } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const dispatch: AppDispatch = useDispatch();

  const subtotal = useMemo(() => {
    return (
      productsCart?.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      ) || 0
    );
  }, [productsCart]);

  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className=" relative flex justify-center items-center  px-4 py-8 ">
      {removeLoading || getLoading || clearLoading ? (
        <div className="absolute inset-0 bg-white bg-opacity-50 z-10 flex items-center justify-center">
          <Loader />
        </div>
      ) : productsCart?.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-20">
          <p className="text-2xl font-semibold text-gray-700">
            Your Cart is Empty
          </p>
          <img
            src="data:image/png;base64,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"
            alt="Empty Cart"
            className="w-40 h-40 object-contain"
          />

          <Link to="/">
            <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition">
              Go to Home
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-full  max-w-5xl mx-auto px-4 bg-white rounded-lg shadow p-8">
          <div className="flex mb-3 justify-between items-baseline    ">
            <div>
              <h3 className="text-3xl font-bold  text-left">Shopping Cart</h3>
            </div>

            <button
              onClick={() => {
                dispatch(clearCartAction());
              }}
              className="text-red-600 border   border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition">
              Clear Cart
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 ">
              {productsCart?.map((item) => {
                const { productId, quantity, _id } = item;
                return (
                  <div
                    key={_id}
                    className="flex gap-6 mb-5 bg-gray-50 shadow-md p-6 rounded-lg  ">
                    <img
                      src={productId.imageCover}
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-lg font-semibold">
                        {productId.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {productId.category.name}
                      </p>
                      <p className="text-gray-600">EGP {productId.price}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4">
                      <button
                        onClick={() => {
                          dispatch(deleteFromCartAction(productId._id));
                        }}
                        className="text-red-600 border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition">
                        Remove
                      </button>
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 bg-gray-200 rounded text-lg font-bold">
                          -
                        </button>
                        <span className="text-md font-medium">{quantity}</span>
                        <button className="w-8 h-8 bg-gray-200 rounded text-lg font-bold">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full md:w-80 border border-gray-300 rounded-lg shadow-md h-fit p-4">
              <div className="mb-4 ">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>EGP {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>EGP {shipping.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>EGP {total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded transition">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
