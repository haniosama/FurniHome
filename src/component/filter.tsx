import { motion } from "framer-motion";
import { useState } from "react";

const SidebarFilter = ({
  onSearch,
  onPriceChange,
}: {
  onSearch: (term: string) => void;
  onPriceChange: (value: number) => void;
  onRatingChange: (value: number) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPrice, setSelectedPrice] = useState<string | undefined>("All");

  const prices = [500, 1000, 1500, 2000, 3000];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-10/12 m-auto p-4 bg-white rounded-lg shadow-lg ">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Products</h2>

      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="mb-4 flex-1/2">
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

        <div className="mb-4 flex-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <select
            title="Price"
            value={selectedPrice}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setSelectedPrice(e.target.value);
              onPriceChange(val);
            }}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300">
            <option value={"All"}>All</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                ${price}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.aside>
  );
};
export default SidebarFilter;
