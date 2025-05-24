import placeholderImage from "../../assets/placeholderProduct.jpg"

const ProductDashboard = () => {
    const products = [
        {
            productName: "Wireless Headphones",
            category: "Electronics",
            price: 99.99,
            status: "Available",
            stock: 25,
            createdAt: "2025-04-10",
        },
        {
            productName: "Running Shoes",
            category: "Footwear",
            price: 79.99,
            status: "Out of Stock",
            stock: 0,
            createdAt: "2025-03-15",
        },
        {
            productName: "Smartphone",
            category: "Electronics",
            price: 699.99,
            status: "Available",
            stock: 10,
            createdAt: "2025-05-01",
        },
        {
            productName: "Coffee Maker",
            category: "Home Appliances",
            price: 49.99,
            status: "Available",
            stock: 30,
            createdAt: "2025-01-20",
        },
    ];
    return (
        <>
            <h2 className="font-semibold text-2xl mt-7">Products</h2>
            <table className="min-w-full border-collapse bg-white mt-10">
                <thead className="bg-gray-100">
                    <tr>
                        <th className=" px-4 py-4 text-left text-gray-700">Product Name</th>
                        <th className=" px-4 py-4 text-left text-gray-700">Category</th>
                        <th className=" px-4 py-4 text-left text-gray-700">Price</th>
                        <th className=" px-4 py-4 text-center text-gray-700 ">Status</th>
                        <th className=" px-4 py-4 text-right text-gray-700">Stock</th>
                        <th className=" px-4 py-4 text-right text-gray-700">Create At</th>
                        <th className=" px-4 py-4 text-center text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        return(
                        <tr key={item.productName} className="hover:bg-gray-50">
                            <td className="flex items-center gap-3  px-4 py-6">
                                <img
                                src={placeholderImage}
                                alt="product"
                                className="w-12 h-12 object-cover rounded"
                                />
                                <p className="font-medium text-gray-900">{item.productName}</p>
                            </td>
                            <td className=" px-4 py-6 text-gray-700">{item.category}</td>
                            <td className=" px-4 py-6 text-gray-700">{item.price}</td>
                            <td className=" px-4 py-6 text-center">
                                <span className={`inline-block px-3 py-1 ${item.status.toLowerCase() == "available"?"text-green-800 border border-green-800 bg-green-100 " : "text-gray-800 border border-gray-800 bg-gray-100"}   rounded-full font-semibold`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className=" px-4 py-6 text-right text-gray-700">{item.stock}</td>
                            <td className=" px-4 py-6 text-right text-gray-700">{item.createdAt}</td>
                            <td className=" px-4 py-6 text-center flex gap-1">
                                <button className="bg-green-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-green-700 transition-all duration-300 hover:bg-white hover:text-green-700">Update</button>
                                <button className="bg-red-700 px-2 py-1 rounded-lg text-white cursor-pointer border border-red-700 transition-all duration-300 hover:bg-white hover:text-red-700">Delete</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ProductDashboard
