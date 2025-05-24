import placeholderImage from "../../assets/placeholderProduct.jpg"
const OrdersDashboard = () => {
    const products = [
  {
    productName: "Wireless Headphones",
    price: 99.99,
    status: "Complate",
    paymentDate: "2025-05-20",
    customer: "Alice Johnson",
    orderId: "ORD12345",
    quantity: 2,
    image: "https://example.com/images/wireless-headphones.jpg",
  },
  {
    productName: "Bluetooth Speaker",
    price: 49.99,
    status: "Cash On Delivery",
    paymentDate: '2025-07-1',
    customer: "Bob Smith",
    orderId: "ORD12346",
    quantity: 1,
    image: "https://example.com/images/bluetooth-speaker.jpg",
  },
  {
    productName: "Smart Watch",
    price: 199.99,
    status: "Complate",
    paymentDate: "2025-05-21",
    customer: "Charlie Davis",
    orderId: "ORD12347",
    quantity: 1,
    image: "https://example.com/images/smart-watch.jpg",
  },
  {
    productName: "Gaming Mouse",
    price: 59.99,
    status: "Complate",
    paymentDate: "2025-05-22",
    customer: "Dana Lee",
    orderId: "ORD12348",
    quantity: 3,
    image: "https://example.com/images/gaming-mouse.jpg",
  },
];

    return (
        <>
            <h2 className="font-semibold text-2xl mt-7">Orders</h2>
            <table className="min-w-full border-collapse bg-white mt-10">
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
                <tbody>
                    {products.map((item)=>{
                        return(
                        <tr key={item.orderId} className="hover:bg-gray-50">
                            <td className="flex items-center gap-3  px-4 py-6">
                                <img
                                src={placeholderImage}
                                alt="product"
                                className="w-12 h-12 object-cover rounded"
                                />
                                <p className="font-medium text-gray-900">{item.productName}</p>
                            </td>
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
        </>
    )
}

export default OrdersDashboard
