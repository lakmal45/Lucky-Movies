import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-red-600">Movie App</h3>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        
        <div className="flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/favorites" className="hover:text-white transition-colors">Favorites</Link>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;