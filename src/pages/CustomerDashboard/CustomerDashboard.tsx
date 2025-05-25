import placeholderImage from "../../assets/placeholderProduct.jpg"
import type { ICustomer } from "../../interfaces/customerDashboard";

const CustomerDashboard = () => {
   const customers:ICustomer[] = [
  {
    customerName: "Alice Johnson",
    totalOrder: 250.75,
    email: "alice.johnson@example.com",
    phone: "+1-555-1234"
  },
  {
    customerName: "Bob Smith",
    totalOrder: 120.00,
    email: "bob.smith@example.com",
    phone: "+1-555-5678"
  },
  {
    customerName: "Catherine Green",
    totalOrder: 330.40,
    email: "catherine.green@example.com",
    phone: "+1-555-9012"
  },
  {
    customerName: "David Lee",
    totalOrder: 89.99,
    email: "david.lee@example.com",
    phone: "+1-555-3456"
  }
];
    return (
        <>
            <h2 className="font-semibold text-2xl mt-7">Products</h2>
            <div className="scrollable-x">
                <table className="min-w-full border-collapse bg-white mt-10">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className=" px-4 py-4 text-left text-gray-700">Image</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Customer Name</th>
                            <th className=" px-4 py-4 text-left text-gray-700">Orders Total</th>
                            <th className=" px-4 py-4 text-center text-gray-700 ">Email</th>
                            <th className=" px-4 py-4 text-right text-gray-700">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item)=>{
                            return(
                            <tr key={item.customerName} className="hover:bg-gray-50">
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
                                <td className=" px-4 py-6 text-gray-700">{item.customerName}</td>
                                <td className=" px-4 py-6 text-gray-700 ">{item.totalOrder.toFixed(0)}</td>
                                <td className=" px-4 py-6 text-center">{item.email}</td>
                                <td className=" px-4 py-6 text-right text-gray-700">{item.phone}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CustomerDashboard
