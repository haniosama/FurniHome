import { useParams } from "react-router";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category: {
    name: string;
  };
};

export default function CategoryDetails() {
  const { name } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://ecommerceapi-production-8d5f.up.railway.app/api/categories/${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.category)) {
          setProducts(data.category);
        }
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10 flex-wrap max-w-7xl mx-auto">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="relative bg-white rounded-lg shadow-lg p-4 w-72 flex flex-col items-center text-center overflow-hidden"
        >
          <div className="absolute top-3 right-3 bg-gray-200 rounded-full p-2 w-10 h-10"></div>
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
          <div className="w-3/4 h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-1/2 h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="w-full h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 min-h-screen">

      <div className="text-center">
            <h2
              className="relative text-3xl md:text-4xl font-bold mb-12 text-[#0058AA]
              inline-block
              after:content-[''] after:absolute after:-bottom-3 after:left-0 
              after:w-full after:h-1 after:bg-[#FBD913] after:opacity-100
              before:content-[''] before:absolute before:-bottom-5 before:left-1/4 
              before:w-1/2 before:h-1 before:bg-[#0058AA] before:opacity-80"
                  >
              {name} Products
              </h2>
      </div>

      
      {isLoading ? (
        <>
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <SkeletonLoader />
        </>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-600 mt-4">
            No products found in this category
          </h3>
          <p className="text-gray-500 mt-2">
            We couldn't find any products matching this category.
          </p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 flex-wrap max-w-7xl mx-auto">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-lg shadow-lg p-4 w-72 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleWishlist(product._id)}
                aria-label="Add to wishlist"
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10 border-2 border-gray-300 rounded-full p-2"
              >
                {wishlist[product._id] ? (
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
                src={`https://ecommerceapi-production-8d5f.up.railway.app/uploads/${product.imageCover}`}
                alt={product.title}
                className="w-full h-full object-contain rounded-md mb-4 hover:scale-105 transition-transform duration-300"
                crossOrigin="anonymous" 
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.title.split(' ').slice(0, 4).join(' ')}
                {product.title.split(' ').length > 4 && '...'}
              </h2>

              <p className="text-green-600 font-bold text-lg mb-2">
                {product.price} EGP
              </p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>

              <button className="bg-[#0058AA] hover:bg-[#2b4158] text-white px-6 py-2 rounded-md transition-colors duration-300 w-full cursor-pointer">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}