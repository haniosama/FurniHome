import placeholderImage from "../assets/placeholderProduct.jpg"
import type { ICustomer } from "../interfaces/customerDashboard";

const CusomterTableMainDashboard = ({customers}:{customers:ICustomer[]}) => {

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
                {customers.length > 0 ? (
                customers.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-1 pl-3 py-3">
                        <div className="flex items-center gap-3">
                        <img
                            src={item.image || placeholderImage}
                            alt="customer"
                            className="w-12 h-12 object-cover rounded"
                        />
                        </div>
                    </td>
                    <td className="px-1 py-3 text-gray-700 text-center">{item.userDetails.username}</td>
                    <td className="px-1 py-3 text-gray-700 text-center">{item.orders.length}</td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">
                    You do not have any Customer yet
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default CusomterTableMainDashboard
