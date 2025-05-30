export default function SkeletonCard() {
  return (
    <div className="relative bg-white rounded-lg shadow-lg p-4 w-72 flex flex-col items-center text-center overflow-hidden">
      <div className="absolute top-3 right-3 bg-gray-200 rounded-full p-2 w-10 h-10"></div>
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
      <div className="w-3/4 h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>
      <div className="w-1/2 h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
      <div className="w-full h-4 bg-gray-200 rounded mb-4 animate-pulse"></div>
      <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  );
}
