import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { IOrderItem } from "../../interfaces/ordersDashboard";
const OrdersDashboard = () => {
    const orders:IOrderItem[] = [
  {
    productName: "Wireless Headphones",
    price: 99.99,
    status: "Complate",
    paymentDate: "2025-05-20",
    customer: "Alice Johnson",
    orderId: "ORD12345",
    quantity: 2,
  },
  {
    productName: "Bluetooth Speaker",
    price: 49.99,
    status: "Cash On Delivery",
    paymentDate: '2025-07-1',
    customer: "Bob Smith",
    orderId: "ORD12346",
    quantity: 1,
  },
  {
    productName: "Smart Watch",
    price: 199.99,
    status: "Complate",
    paymentDate: "2025-05-21",
    customer: "Charlie Davis",
    orderId: "ORD12347",
    quantity: 1,
  },
  {
    productName: "Gaming Mouse",
    price: 59.99,
    status: "Complate",
    paymentDate: "2025-05-22",
    customer: "Dana Lee",
    orderId: "ORD12348",
    quantity: 3,
  },
];

    return (
        <>
            <h2 className="font-semibold text-2xl mt-7">Orders</h2>
            <div className="scrollable-x">
                <table className="min-w-full border-collapse bg-white mt-10 ">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-left text-gray-700">Product Name</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Order ID</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Customer Name</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Date</th>
                            <th className=" px-4 py-4 text-right text-gray-700">QTY</th>
                            <th className=" px-4 py-4 text-right text-gray-700">Price</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {orders.map((item)=>{
                            return(
                            <tr key={item.orderId} className="hover:bg-gray-50">
                                {item.image?
                                <td className="flex items-center gap-3  px-4 py-6">
                                    <img
                                    src={item.image}
                                    alt="product"
                                    className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                :
                                <td className="flex items-center gap-3  px-4 py-6">
                                    <img
                                    src={placeholderImage}
                                    alt="product"
                                    className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                }
                                <td className=" px-4 py-6 text-gray-700">{item.orderId}</td>
                                <td className=" px-4 py-6 text-gray-700">{item.customer}</td>
                                <td className=" px-4 py-6 text-gray-700">{item.paymentDate}</td>
                                <td className=" px-4 py-6 text-right text-gray-700">{item.quantity}</td>
                                <td className=" px-4 py-6 text-right text-gray-700">${item.price}</td>
                                <td className=" px-4 py-6 text-center">
                                    <span className={`inline-block px-3 py-1 ${item.status.toLowerCase() == "complate"?"text-green-800 border border-green-800 bg-green-100 " : "text-gray-800 border border-gray-800 bg-gray-100"}   rounded-full font-semibold`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OrdersDashboard
