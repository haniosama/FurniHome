const Hero = () => {
  return (
    <div className="bg-[url('/image1.jpg')] h-screen bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl px-4">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
            Modern Elegance for Every Room
          </h1>
          <p className="text-lg mb-6 drop-shadow-md">
            Discover stylish and functional furniture that transforms your
            living space into a masterpiece. Curated designs, crafted comfort.
          </p>
          <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-[#fbd914] hover:text-white transition">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
};
export default Hero;
