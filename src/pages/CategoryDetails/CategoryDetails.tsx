import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Product from '../../component/Product'; 
import SkeletonCard from '../../component/SkeletonCard';
import type IProducts from '../../interfaces/product';


const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryDetails() {
  const { name } = useParams();
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/categories/${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.category)) {
          setProducts(data.category);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

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
          <div className="flex flex-wrap justify-center items-center gap-10 max-w-7xl mx-auto">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <svg
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
        <Product filteredProducts={products} />
      )}
    </div>
  );
}
