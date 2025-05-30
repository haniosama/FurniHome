// NotFound.jsx
import { motion } from "framer-motion";
import { Link } from "react-router";
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-lg"
      >
        <img src="/image404.jpg" alt="" />

        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#FBD913] text-white px-6 py-3 rounded-lg shadow hover:bg-[#FBD915] transition duration-300"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
