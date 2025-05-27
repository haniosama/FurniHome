import { useState } from "react";
import { motion } from "framer-motion";

const SidebarFilter = ({
  onSearch,
  onPriceChange,
  onRatingChange,
}: {
  onSearch: (term: string) => void;
  onPriceChange: (value: number) => void;
  onRatingChange: (value: number) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(0);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full md:w-64 p-4 bg-white rounded-lg shadow-lg sticky top-44 h-fit"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Products</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          placeholder="Search by name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Price: ${price}
        </label>
        <input
          title="Price"
          type="range"
          min="0"
          max="10000"
          value={price}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            setPrice(val);
            onPriceChange(val);
          }}
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Min Rating: {rating}★
        </label>
        <input
          title="Rating"
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setRating(val);
            onRatingChange(val);
          }}
          className="w-full"
        />
      </div>
    </motion.aside>
  );
};
export default SidebarFilter;
