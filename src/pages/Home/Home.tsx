import Hero from "../../component/Hero";
import Products from "../Products/Product";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="p-8 bg-gray-100">
        <div className="text-center">
            <h2
              className="relative text-3xl md:text-5xl font-bold mt-5 text-[#0058AA]
                        inline-block
                        after:content-[''] after:absolute after:-bottom-3 after:left-0 
                        after:w-full after:h-1 after:bg-[#FBD913] after:opacity-100
                        before:content-[''] before:absolute before:-bottom-5 before:left-1/4 
                        before:w-1/2 before:h-1 before:bg-[#0058AA] before:opacity-80"
            >
                  Upgrade Your Space with IKEA Furniture
            </h2>
          </div>
          <Products />
       </div>


    </div>
  );
};
export default Home;
