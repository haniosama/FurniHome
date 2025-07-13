import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../lib/slices/productDetials";
import { addTOCartAction } from "../../lib/slices/cartSlice";
import toast from "react-hot-toast";
import CommentsSection from '../../component/CommentsSection';


const SpecificProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { loading, error, specificProduct } = useAppSelector(
    (state) => state.productById
  );

  const { loginToken } = useAppSelector((store) => store.auth);

  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (specificProduct) {
      setMainImage(specificProduct.images?.[0] || "");
    
    }
  }, [specificProduct]);

 

  if (loading)
    return (
      <div className="text-center text-lg font-medium mt-10">Loading...</div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  if (!specificProduct)
    return <div className="text-center mt-10">No product found.</div>;

  return (
    <>
      <div className=" bg-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto rounded-2xl shadow-lg bg-white p-6 md:flex gap-8">
          {/* Left: Image Gallery */}
          <div className="md:w-1/2 flex flex-col items-center">
            <img
              src={mainImage}
              alt={specificProduct.title}
              className="w-full max-w-md h-96 object-cover rounded-xl shadow"
            />

            <div className="mt-4 flex gap-2 justify-center flex-wrap">
              {specificProduct.images?.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                    mainImage === img ? "border-blue-500" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="md:w-1/2 space-y-4 mt-6 md:mt-0">
            <h1 className="text-3xl font-bold text-gray-800">
              {specificProduct.title}
            </h1>
            <p className="text-gray-500">{specificProduct.description}</p>

            <div className="text-xl font-semibold text-green-600">
              ${totalPrice}
            </div>

            <div className="text-gray-700">
              Category:{" "}
              <span className="font-medium">
                {specificProduct.category?.name}
              </span>
            </div>

            <div className="text-yellow-500">
              Rating: {specificProduct.ratingsAverage || 0} ⭐ (
              {specificProduct.ratingsQuantity} reviews)
            </div>

            <div className="text-sm text-gray-500">
              Available Quantity: {specificProduct.quantity} | Sold:{" "}
              {specificProduct.sold}
            </div>


            <button
              onClick={() => {
                if (loginToken) {
                  dispatch(addTOCartAction(specificProduct._id));
                } else {
                  toast.error("You must be logged in first");
                  navigate("/login");
                }
              }}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div>
        <CommentsSection productId={specificProduct._id} />
      </div>
    </>
  );
};

export default SpecificProductDetails;
