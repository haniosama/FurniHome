// import { useEffect, useState } from "react";
// // import img1 from "../assets/image1.jpg";
// // import img2 from "../assets/image2.jpg";
// // import img3 from "../assets/image3.jpg";
// // import img4 from "../assets/image4.jpg";
// // import img5 from "../assets/image5.webp";
// // import img6 from "../assets/image6.jpg";
// // import img7 from "../assets/image7.webp";
// // import img8 from "../assets/image8.webp";
// // import img9 from "../assets/image9.jpg";
// // import img10 from "../assets/image10.jpg";
// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../lib/store/store";
// import { fetchProduct } from "../lib/slices/products";

// // const ikeaFurniture = [
// //   {
// //     image: img1,
// //     title: "BILLY Bookcase",
// //     price: "EGP 1,299",
// //     description:
// //       "A classic, adjustable bookcase that fits many rooms and styles.",
// //     rating: 4.5,
// //   },
// //   {
// //     image: img2,
// //     title: "HEMNES Dresser",
// //     price: "EGP 3,799",
// //     description: "Spacious dresser with six drawers, crafted from solid wood.",
// //     rating: 4.2,
// //   },
// //   {
// //     image: img3,
// //     title: "KLIPPAN Sofa",
// //     price: "EGP 4,499",
// //     description: "Comfortable 2-seat sofa with removable, washable covers.",
// //     rating: 4.7,
// //   },
// //   {
// //     image: img4,
// //     title: "LACK Coffee Table",
// //     price: "EGP 449",
// //     description: "Minimalist coffee table that fits perfectly in small spaces.",
// //     rating: 4.0,
// //   },
// //   {
// //     image: img5,
// //     title: "MALM Bed Frame",
// //     price: "EGP 5,299",
// //     description: "Sleek and modern bed frame with underbed storage options.",
// //     rating: 4.6,
// //   },
// //   {
// //     image: img6,
// //     title: "POÄNG Armchair",
// //     price: "EGP 1,899",
// //     description: "Comfortable armchair with a bentwood frame and soft cushion.",
// //     rating: 4.3,
// //   },
// //   {
// //     image: img7,
// //     title: "EKET Wall Cabinet",
// //     price: "EGP 999",
// //     description: "Modular wall cabinet to customize your storage solutions.",
// //     rating: 3.9,
// //   },
// //   {
// //     image: img8,
// //     title: "KALLAX Shelving Unit",
// //     price: "EGP 1,499",
// //     description: "Spacious shelving unit perfect for storage and display.",
// //     rating: 4.1,
// //   },
// //   {
// //     image: img9,
// //     title: "STRANDMON Wing Chair",
// //     price: "EGP 3,899",
// //     description: "Classic wing chair with comfortable cushioning and support.",
// //     rating: 4.8,
// //   },
// //   {
// //     image: img10,
// //     title: "HEMNES TV Bench",
// //     price: "EGP 2,199",
// //     description: "Elegant TV bench with storage compartments and drawers.",
// //     rating: 4.4,
// //   },
// // ];
// interface Product {
//   imageCover: string;
//   title: string;
//   price: string;
//   description: string;
//   rating: number;
// }

// const Product = () => {
//   const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});

//   const toggleWishlist = (index: number) => {
//     setWishlist((prev) => ({ ...prev, [index]: !prev[index] }));
//   };
//   const dispatch = useDispatch<AppDispatch>();

//   const { products, error, loading } = useSelector(
//     (state: RootState) => state.fetchProduct
//   );

//   useEffect(() => {
//     dispatch(fetchProduct());
//   }, [dispatch]);
//   console.log(products);
//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-5xl font-bold text-center mb-8 text-gray-900">
//         Upgrade Your Space with IKEA Furniture
//       </h1>
//       <div className="flex flex-col md:flex-row justify-center items-center gap-10 flex-wrap max-w-7xl mx-auto">
//         {error && <p className="text-red-500">{error}</p>}
//         {loading && (
//           <div className="flex justify-center items-center h-screen">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         )}
//         {products &&
//           products.slice(0, 10).map((item: Product, index: number) => (
//             <div
//               key={index}
//               className="relative bg-white rounded-lg shadow-lg p-4 w-72 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 overflow-hidden"
//             >
//               <button
//                 onClick={() => toggleWishlist(index)}
//                 aria-label="Add to wishlist"
//                 className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10 border-2 border-gray-300 rounded-full p-2"
//               >
//                 {wishlist[index] ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="red"
//                     viewBox="0 0 24 24"
//                     stroke="red"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                     />
//                   </svg>
//                 )}
//               </button>

//               <img
//                 src={`https://ecommerceapi-production-8d5f.up.railway.app/uploads/${item.imageCover}`}
//                 alt={item.title}
//                 className="w-full h-48 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300"
//               />
//               <h2 className="text-xl font-semibold text-gray-800 mb-2">
//                 {item.title.slice(0, 15)}
//               </h2>

//               <p className="text-green-600 font-bold text-lg mb-2">
//                 ${item.price}
//               </p>
//               <p className="text-gray-600 text-sm mb-4">
//                 {item.description.slice(0, 50)}...
//               </p>

//               <button className="bg-[#fbd914] hover:bg-[#fbd919] text-white px-6 py-2 rounded-md transition-colors duration-300 w-full">
//                 Add to Cart
//               </button>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };
// export default Product;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/store/store";
import { fetchProduct } from "../lib/slices/products";
import { motion } from "framer-motion";
import { AddToCart } from "../lib/slices/addToCart";
import type Products from "../interfaces/product";

// const Product = ({ filteredProducts = [] }: { filteredProducts?: Products[] }) => {
const Product = ({
  filteredProducts = [],
}: {
  filteredProducts?: Products[];
}) => {
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});

  const toggleWishlist = (index: number) => {
    setWishlist((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const dispatch = useDispatch<AppDispatch>();
  const { data, loadings } = useSelector((state: RootState) => state.addToCart);
  const handleAddToCart = (productId: string) => {
    dispatch(AddToCart(productId));
  };
  const { products, error, loading } = useSelector(
    (state: RootState) => state.fetchProduct
  );
  console.log(data);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-8 text-gray-900">
        Upgrade Your Space with IKEA Furniture
      </h1>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 flex-wrap max-w-7xl mx-auto">
        {error && <p className="text-red-500">{error}</p>}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {products &&
          (filteredProducts?.length > 0 ? filteredProducts : products)
            .slice(0, 10)
            .map((item: Products, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-lg shadow-lg p-4 w-64 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleWishlist(index)}
                  aria-label="Add to wishlist"
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10 border-2 border-gray-300 rounded-full p-2"
                >
                  {wishlist[index] ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke="red"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
                </button>

                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-full h-48 object-contain rounded-md mb-4 hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                  loading="lazy"
                />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title.slice(0, 15)}
                </h2>
                <p className="text-green-600 font-bold text-lg mb-2">
                  ${item.price}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description.slice(0, 50)}...
                </p>
                <button
                  onClick={() => handleAddToCart(item._id)}
                  disabled={loadings}
                  aria-label="Add to cart"
                  className="bg-[#ceb123] hover:bg-[#fbd914] text-white px-6 py-2 rounded-md transition-colors duration-300 w-full"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
      </div>
    </div>
  );
};
export default Product;
