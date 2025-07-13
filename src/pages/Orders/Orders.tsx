import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { clearCartAction } from "../../lib/slices/cartSlice";
import type { AppDispatch, RootState } from "../../lib/store/store";
const Order = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const dispatch: AppDispatch = useDispatch();
  const { loginToken } = useSelector((store: RootState) => store.auth);
  type ProductType = {
    productDetails: {
      _id: string;
      imageCover: string;
      title: string;
      price: number;
    };
    quantity: number;
  };

  type OrderType = {
    _id: string;
    isDelivered: boolean;
    orderStatus: boolean;
    total: number;
    createdAt: string;
    products: ProductType[];
  };
  let userId: string;
  type DecodedToken = {
    userID: string;
  };
  if (loginToken) {
    const user = jwtDecode<DecodedToken>(loginToken);
    userId = user.userID;
  }
  const [orders, setorders] = useState<OrderType[] | null>(null);

  const getAllOrders = async () => {
    const { data } = await axios.get(`${API_URL}/api/order/${userId}`, {
      headers: { Authorization: "Bearer " + loginToken },
    });
    console.log("🚀 ~ getAllOrders ~ data:", data.orders);
    setorders(data.orders);
  };

  useEffect(() => {
    if (loginToken) {
      getAllOrders();
      dispatch(clearCartAction());
    }
  }, [loginToken]);

  return (
    <>
      <div className=" container px-2 md:mx-auto  ">
        <div className="text-center pt-4">
          <h2
            className="relative text-2xl md:text-4xl font-bold mb-12 text-[#0058AA]
              inline-block
              after:content-[''] after:absolute after:-bottom-3 after:left-0 
              after:w-full after:h-1 after:bg-[#FBD913] after:opacity-100
              before:content-[''] before:absolute before:-bottom-5 before:left-1/4 
              before:w-1/2 before:h-1 before:bg-[#0058AA] before:opacity-80">
            Orders
          </h2>
        </div>
        <div>
          <Helmet>
            <title>Orders</title>
          </Helmet>

          {!orders ? (
            <Loader />
          ) : (
            orders?.map((order) => {
              return (
                <>
                  <div
                    key={order._id}
                    className="bg-white shadow-sm rounded-md my-3 border border-gray-500 ">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h6 className="text-gray-500 mb-1 text-sm">
                            Order ID
                          </h6>
                          <h5 className="font-bold text-lg">
                            #{order?._id.slice(0, 6)}
                          </h5>
                        </div>
                        <div className="text-right space-x-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.orderStatus
                                ? "bg-blue-600 text-white"
                                : "bg-yellow-400 text-black"
                            }`}>
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                        {order.products.map((product) => (
                          <div
                            key={product.productDetails._id}
                            className="border border-gray-500 rounded p-2 text-center h-full flex flex-col items-center justify-between">
                            <img
                              src={
                                product.productDetails.imageCover ||
                                "https://via.placeholder.com/150"
                              }
                              alt={product.productDetails.title}
                              className="h-[100px] object-contain mb-2"
                            />
                            <h6 className="text-sm font-medium">
                              {product.productDetails.title
                                .split(" ")
                                .slice(0, 3)
                                .join(" ")}
                            </h6>
                            <span className="text-sm ">
                              count: {product.quantity}
                            </span>
                            <span className="text-green-600 text-sm font-semibold">
                              {product.productDetails.price} EGP
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <p className="text-base font-medium">
                          Total Order Price:{" "}
                          <span className="text-main text-green-600">
                            {order.total} EGP
                          </span>
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                          Created At:{" "}
                          {new Date(order.createdAt).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
export default Order;
