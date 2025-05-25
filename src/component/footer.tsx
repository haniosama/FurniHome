const Footer = () => {
  return (
    <footer className="bg-[#0058ab] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 mg:grid-cols-1 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-3">FurniHome</h2>
          <p className="text-white">
            Stylish, sustainable furniture for modern living.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-white">
            <li>
              <a href="#" className="hover:text-gray-400">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M8 19c7.5 0 11.6-6.2 11.6-11.6v-.5A8.3 8.3 0 0 0 22 5.2a8.1 8.1 0 0 1-2.4.6A4.2 4.2 0 0 0 21.4 3a8.4 8.4 0 0 1-2.6 1A4.2 4.2 0 0 0 11 8.4a11.8 11.8 0 0 1-8.6-4.3A4.2 4.2 0 0 0 4 9.6a4.1 4.1 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.5a11.8 11.8 0 0 0 6 1.7" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
          <p className="text-white mb-3">Get special offers & updates.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-l bg-white text-gray-800 w-full"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 rounded-r hover:bg-yellow-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-white text-sm mt-10">
        &copy; {new Date().getFullYear()} FurniHome. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
