import placeholderImage from "../assets/placeholderProduct.jpg"
import type { ICustomer } from "../interfaces/customerDashboard";

const CusomterTableMainDashboard = () => {
        const customersArr:ICustomer[] = [
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
    <div className="scrollable-y max-h-[320px] w-[420px]">
        <table className="min-w-full border-collapse bg-white">
        <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
                <th className="px-0 py-3 text-left text-gray-700 bg-gray-100"> </th>
                <th className="px-1 py-3 text-center text-gray-700 bg-gray-100">Customer Name</th>
                <th className="px-1 py-3 text-center text-gray-700 bg-gray-100">Orders Total</th>
            </tr>
        </thead>
        <tbody>
            {customersArr.map((item) => (
            <tr key={item.customerName} className="hover:bg-gray-50">
                <td className="px-1 pl-3 py-3">
                <div className="flex items-center gap-3">
                    <img
                    src={item.image || placeholderImage}
                    alt="product"
                    className="w-12 h-12 object-cover rounded"
                    />
                </div>
                </td>
                <td className="px-1 py-3 text-gray-700 text-center">{item.customerName}</td>
                <td className="px-1 py-3 text-gray-700 text-center">{item.totalOrder.toFixed(0)}</td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  )
}

export default CusomterTableMainDashboard
