import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-black/30 backdrop-blur-md shadow-md py-4 px-8 fixed top-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-red-600 tracking-wider">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold tracking-wider">
            <span className="text-red-600">Lucky</span>
            <span className="text-white">Movies</span>
            <span className="text-yellow-400">🍿</span> {/* Optional: Add an emoji */}
          </Link>
        </div>
        <div className="space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-red-500 transition-colors duration-300">
            Home
          </Link>
          <Link to="/favorites" className="hover:text-red-500 transition-colors duration-300">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;