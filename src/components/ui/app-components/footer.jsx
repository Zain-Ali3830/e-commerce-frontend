function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Z-Store</h2>
          <p className="text-sm">
            High-quality products at the best prices. Your one-stop online shop
            for everything.
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-black">
                Men
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Women
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Kids
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-black">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Returns & Exchanges
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-black">
                Shipping Info
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-4">Stay Updated</h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 py-6 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; 2025 Z-Store. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="hover:text-black">
            Facebook
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-black">
            Twitter
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-black">
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
