import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type Category = {
  _id?: string;
  name: string;
  image: string;
};

const API_URL = import.meta.env.VITE_API_URL;

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-4 py-10 ">
    <div className="text-center">
      <h2
        className="relative text-3xl md:text-4xl font-bold mb-12 text-[#0058AA]
                  inline-block
                  after:content-[''] after:absolute after:-bottom-3 after:left-0 
                  after:w-full after:h-1 after:bg-[#FBD913] after:opacity-100
                  before:content-[''] before:absolute before:-bottom-5 before:left-1/4 
                  before:w-1/2 before:h-1 before:bg-[#0058AA] before:opacity-80"
      >
       All Category
      </h2>
    </div>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
  {loading
    ? Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <Skeleton height={150} width={150} className="rounded-full" />
          <Skeleton height={20} width={60} className="mt-2" />
        </div>
      ))
    : categories.map((cat) => (
        <div
          key={cat.name}
          onClick={() => navigate(`/category/${cat.name}`)}
          className="cursor-pointer text-center group m-2 "
        >
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-60 md:h-60 mx-auto transition-transform duration-300 group-hover:scale-105">
            
            {/* Circels */}
            <div className="absolute -top-2 -left-2 w-full h-full bg-[#0058AA] rounded-[50%] z-0"></div>
            <div className="absolute -bottom-0 -right-2 w-full h-full bg-[#FBD913] rounded-full z-0"></div>

            <div className="relative w-full h-full bg-white rounded-full  p-3 shadow-lg z-10 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition-all duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-[100%] h-[100%] object-contain"
              />
            </div>
          </div>
          <p className="mt-4 text-gray-800 font-bold capitalize">{cat.name}</p>
        </div>
      ))}
</div>
    </div>
  );
}
